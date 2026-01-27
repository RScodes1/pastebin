import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || "http://localhost:4500",
  redisUrl: process.env.REDIS_URL,
  testMode: process.env.TEST_MODE === "1",
};

if (!config.baseUrl) {
  console.warn("⚠️ BASE_URL not set");
}

export default config;
