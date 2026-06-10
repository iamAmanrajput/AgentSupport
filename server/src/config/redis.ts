import dotenv from "dotenv";
dotenv.config();
import { Redis } from "ioredis";

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null as null,
   tls: {},
};

// BullMQ
export const redisConnection = redisOptions;

// Caching
export const redisClient = new Redis(redisOptions);
