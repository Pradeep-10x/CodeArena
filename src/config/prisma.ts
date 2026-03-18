import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import {setupOTPCleanup,setupSessionCleanup,setupContestStatusCleanup} from "../utility"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/**
 * Connects to the database and sets up OTP cleanup.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
async function connectDB(): Promise<void> {
  try {
    await prisma.$connect();
    await Promise.all([
      setupOTPCleanup(),
      setupSessionCleanup(),
      setupContestStatusCleanup()
    ]);
    console.log("Connected to the database!");
  } catch (err) {
    console.error("Connection error", err);
    throw err;
  }
}

export { prisma, connectDB };
