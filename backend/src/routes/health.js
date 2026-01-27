import express from "express";
import { checkRedis } from "../db/redis.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await checkRedis();
    res.json({ ok: true });
  } catch(error) {
    console.log(error);
    res.status(500).json({ ok: false });
  }
});

export default router;
