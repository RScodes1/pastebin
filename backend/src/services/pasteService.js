import redis from "../db/redis.js";
import { nanoid } from "nanoid";

const PREFIX = "paste:";

export async function createPaste({ content, ttlSeconds, maxViews }) {
  const id = nanoid(10);

  const paste = {
    content,
    remaining_views: maxViews ?? null,
    expires_at: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
  };

  const key = PREFIX + id;

  await redis.set(key, JSON.stringify(paste));

  return id;
}

export async function getPaste(id, nowMs) {
  const key = PREFIX + id;
  const raw = await redis.get(key);

  if (!raw) return null;

  const paste = JSON.parse(raw);

  // TTL check
  if (paste.expires_at && nowMs >= paste.expires_at) {
    await redis.del(key);
    return null;
  }

  // View check
  if (paste.remaining_views !== null) {
    if (paste.remaining_views <= 0) {
      await redis.del(key);
      return null;
    }

    paste.remaining_views -= 1;
    await redis.set(key, JSON.stringify(paste));
  }

  return paste;
}

export async function peekPaste(id, nowMs) {
  const key = PREFIX + id;
  const raw = await redis.get(key);
  if (!raw) return null;

  const paste = JSON.parse(raw);

  if (paste.expires_at && nowMs >= paste.expires_at) {
    await redis.del(key);
    return null;
  }

  if (paste.remaining_views !== null && paste.remaining_views <= 0) {
    await redis.del(key);
    return null;
  }

  return paste;
}
