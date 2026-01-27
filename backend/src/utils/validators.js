export function validateCreatePaste(body) {
  const errors = [];

  if (!body.content || typeof body.content !== "string" || body.content.trim() === "") {
    errors.push("content must be a non-empty string");
  }

  if (body.ttl_seconds !== undefined) {
    if (!Number.isInteger(body.ttl_seconds) || body.ttl_seconds < 1) {
      errors.push("ttl_seconds must be an integer ≥ 1");
    }
  }

  if (body.max_views !== undefined) {
    if (!Number.isInteger(body.max_views) || body.max_views < 1) {
      errors.push("max_views must be an integer ≥ 1");
    }
  }

  return errors;
}

