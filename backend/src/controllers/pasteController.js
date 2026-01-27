import { validateCreatePaste } from "../utils/validators.js";
import { createPaste, getPaste, peekPaste } from "../services/pasteService.js";
import { now } from "../services/timeService.js";
import config from "../config.js";
import escapeHtml from "escape-html";

export async function create(req, res) {
  const errors = validateCreatePaste(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const id = await createPaste({
    content: req.body.content,
    ttlSeconds: req.body.ttl_seconds,
    maxViews: req.body.max_views,
  });

  res.status(201).json({
    id,
    url: `${config.baseUrl}/p/${id}`,
  });
}

export async function fetch(req, res) {
  const paste = await getPaste(req.params.id, now(req));
  if (!paste) {
    return res.status(404).json({ error: "Paste unavailable" });
  }

  res.json({
    content: paste.content,
    remaining_views: paste.remaining_views,
    expires_at: paste.expires_at ? new Date(paste.expires_at).toISOString() : null,
  });
}

export async function renderPasteHtml(req, res) {
  const paste = await peekPaste(req.params.id, now(req));
  if (!paste) {
    return res.status(404).send("Paste not found");
  }

  res.send(`
    <html>
      <head><title>Paste</title></head>
      <body>
        <pre>${escapeHtml(paste.content)}</pre>
      </body>
    </html>
  `);
}
