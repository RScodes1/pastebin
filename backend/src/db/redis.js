import Redis from "ioredis";
import config from "../config.js";

const redis = new Redis(config.redisUrl);

export async function checkRedis() {
  await redis.ping();
}

export default redis;
