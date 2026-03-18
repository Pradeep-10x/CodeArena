import { Worker, Job } from "bullmq";
import { connection } from "./queues.js";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PISTON_BASE_URL =
  (process.env.PISTON_URL ?? "https://emkc.org/api/v2/piston").replace(/\/$/, "");

// Maps the language strings your jobs use → Piston runtime names + versions.
// Full list: GET https://emkc.org/api/v2/piston/runtimes
const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  python:      { language: "python",     version: "3.10.0"  },
  python3:     { language: "python",     version: "3.10.0"  },
  javascript:  { language: "javascript", version: "18.15.0" },
  js:          { language: "javascript", version: "18.15.0" },
  typescript:  { language: "typescript", version: "5.0.3"   },
  ts:          { language: "typescript", version: "5.0.3"   },
  cpp:         { language: "c++",        version: "10.2.0"  },
  "c++":       { language: "c++",        version: "10.2.0"  },
  c:           { language: "c",          version: "10.2.0"  },
  java:        { language: "java",       version: "15.0.2"  },
  rust:        { language: "rust",       version: "1.50.0"  },
  go:          { language: "go",         version: "1.16.2"  },
  ruby:        { language: "ruby",       version: "3.0.1"   },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JobData {
  code: string;
  language: string;
  input?: string;
  timeoutMs?: number;
  taskId: string;
  userId: string;
}

interface ExecuteResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  timedOut: boolean;
  taskId: string;
  userId: string;
  executedAt: string;
}

interface PistonResponse {
  language: string;
  version: string;
  compile?: { stdout: string; stderr: string; code: number; signal: string | null };
  run: { stdout: string; stderr: string; code: number; signal: string | null };
}

// ---------------------------------------------------------------------------
// Core execution function
// ---------------------------------------------------------------------------

async function executeCode(data: JobData): Promise<ExecuteResult> {
  const { code, language, input = "", timeoutMs = 5000, taskId, userId } = data;

  const runtime = LANGUAGE_MAP[language.toLowerCase()];
  if (!runtime) {
    throw new Error(
      `Unsupported language: "${language}". Supported: ${Object.keys(LANGUAGE_MAP).join(", ")}`
    );
  }

  // Give the HTTP request a hard ceiling slightly above Piston's own timeout
  // so we always get Piston's structured error back rather than a raw abort.
  const httpTimeoutMs = timeoutMs + 8_000;
  const controller = new AbortController();
  const httpTimer = setTimeout(() => controller.abort(), httpTimeoutMs);

  let res: Response;
  try {
    res = await fetch(`${PISTON_BASE_URL}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [{ name: "main", content: code }],
        stdin: input,
        run_timeout: timeoutMs,      // ms — Piston kills the process after this
        compile_timeout: 10_000,     // ms — generous compile window
      }),
    });
  } catch (err) {
    clearTimeout(httpTimer);
    if ((err as Error).name === "AbortError") {
      throw new Error(`Piston HTTP request timed out after ${httpTimeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(httpTimer);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable body)");
    throw new Error(`Piston API responded ${res.status}: ${body}`);
  }

  const piston: PistonResponse = await res.json();

  const compileStderr = piston.compile?.stderr ?? "";
  const run = piston.run;

  // Piston signals a timeout kill with SIGKILL
  const timedOut = run.signal === "SIGKILL";

  return {
    stdout: run.stdout ?? "",
    stderr: [compileStderr, run.stderr ?? ""].filter(Boolean).join("\n"),
    exitCode: run.code ?? (timedOut ? 124 : 1),
    timedOut,
    taskId,
    userId,
    executedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Shared processor — both queues do the same work
// ---------------------------------------------------------------------------

async function processor(job: Job<JobData>): Promise<ExecuteResult> {
  const { code, language, input, timeoutMs, taskId, userId } = job.data;
  return executeCode({
    code,
    language,
    input,
    timeoutMs: timeoutMs ?? 5_000,
    taskId,
    userId,
  });
}

// ---------------------------------------------------------------------------
// Workers
// ---------------------------------------------------------------------------

const runWorker = new Worker<JobData, ExecuteResult>("runQueue", processor, {
  connection,
  concurrency: 200,
});

const submitWorker = new Worker<JobData, ExecuteResult>("submitQueue", processor, {
  connection,
  concurrency: 300,
});

// ---------------------------------------------------------------------------
// Error logging
// ---------------------------------------------------------------------------

runWorker.on("failed", (job, err) => {
  console.error(`[runQueue] Job ${job?.id} failed (attempt ${job?.attemptsMade}):`, err.message);
});

submitWorker.on("failed", (job, err) => {
  console.error(`[submitQueue] Job ${job?.id} failed (attempt ${job?.attemptsMade}):`, err.message);
});

runWorker.on("error", (err) => {
  console.error("[runQueue] Worker error:", err.message);
});

submitWorker.on("error", (err) => {
  console.error("[submitQueue] Worker error:", err.message);
});

export { runWorker, submitWorker };