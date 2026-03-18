import { Queue, QueueEvents } from "bullmq";

// Upstash / Redis Cloud requires TLS — the plain `url` form doesn't pass
// the TLS options BullMQ needs. Parse the URL and set tls explicitly.
function makeConnection() {
  const url = process.env.REDIS_URL!;
  if (!url) throw new Error("REDIS_URL is not set");

  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port || "6379", 10),
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    // Enable TLS for rediss:// URLs (Upstash always uses rediss://)
    tls: parsed.protocol === "rediss:" ? {} : undefined,
  };
}

const connection = makeConnection();

const sharedJobOptions = {
  removeOnComplete: true,
  removeOnFail: true,
  attempts: 3,
  backoff: {
    type: "exponential" as const,
    delay: 1000,
  },
};

const runQueueEvents = new QueueEvents("runQueue", { connection });
const submitQueueEvents = new QueueEvents("submitQueue", { connection });

const runQueue = new Queue("runQueue", {
  connection,
  defaultJobOptions: sharedJobOptions,
});

const submitQueue = new Queue("submitQueue", {
  connection,
  defaultJobOptions: sharedJobOptions,
});

export { connection, runQueue, submitQueue, runQueueEvents, submitQueueEvents };