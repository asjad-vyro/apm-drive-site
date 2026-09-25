import { NextResponse } from "next/server";

/**
 * Receives an application. Delivery, in order of preference:
 *   1. APPLY_WEBHOOK_URL  — a Slack incoming webhook (or any JSON endpoint)
 *   2. BLOB_READ_WRITE_TOKEN — Vercel Blob, one JSON file per application
 * With neither configured the form reports failure honestly instead of
 * swallowing the submission.
 */
type Application = {
  name: string; email: string; university: string; graduation: string; city: string;
  link: string; shipped: string; handle?: string; source?: string;
};

const REQUIRED: (keyof Application)[] = ["name", "email", "university", "graduation", "city", "link", "shipped"];

export async function POST(req: Request) {
  let body: Partial<Application>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 }); }
  for (const k of REQUIRED) {
    if (!body[k] || String(body[k]).trim().length === 0) return NextResponse.json({ ok: false, error: `missing ${k}` }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(body.email))) return NextResponse.json({ ok: false, error: "bad email" }, { status: 400 });
  if (String(body.shipped).length > 1200) return NextResponse.json({ ok: false, error: "too long" }, { status: 400 });

  const app: Application & { receivedAt: string; ua: string } = {
    name: String(body.name).trim(), email: String(body.email).trim(), university: String(body.university), graduation: String(body.graduation),
    city: String(body.city), link: String(body.link).trim(), shipped: String(body.shipped).trim(), handle: body.handle ? String(body.handle).trim() : "",
    source: body.source ? String(body.source).slice(0, 64) : "",
    receivedAt: new Date().toISOString(), ua: req.headers.get("user-agent") ?? "",
  };

  const webhook = process.env.APPLY_WEBHOOK_URL;
  if (webhook) {
    const text = [
      `*APM drive application* — ${app.name} (${app.university}, ${app.graduation}, ${app.city})`,
      `Email: ${app.email}${app.handle ? ` · ${app.handle}` : ""}`,
      `Link: ${app.link}`,
      `Shipped: ${app.shipped}`,
      app.source ? `Source: ${app.source}` : "",
    ].filter(Boolean).join("\n");
    const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, application: app }) });
    if (r.ok) return NextResponse.json({ ok: true, via: "webhook" });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const { put } = await import("@vercel/blob");
    const key = `applications/${app.receivedAt.replace(/[:.]/g, "-")}-${app.email.replace(/[^a-z0-9]/gi, "_")}.json`;
    await put(key, JSON.stringify(app, null, 2), { access: "private", contentType: "application/json", token, addRandomSuffix: false });
    return NextResponse.json({ ok: true, via: "blob" });
  }

  return NextResponse.json({ ok: false, error: "no delivery configured" }, { status: 503 });
}
