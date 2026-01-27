import config from "../config.js";

export function now(req) {
  if (config.testMode) {
    const header = req.headers["x-test-now-ms"];
    if (header) {
      return Number(header);
    }
  }
  return Date.now();
}
