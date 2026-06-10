import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { sendEmail } from "../utils/mailSender.js";

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    switch (job.name) {
      case "invite-operator":
        await sendEmail(job.data.to, job.data.subject, job.data.html);
        break;

      default:
        console.warn(`Unknown job type: ${job.name}`);
    }
  },
  {
    connection: redisConnection,
  },
);

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} (${job.name}) completed`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} (${job?.name}) failed:`, err.message);
});
