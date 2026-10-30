import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

const escapeAttribute = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  const origin = `https://${request.headers.host || "weddingfe.vercel.app"}`;
  const incoming = new URL(request.url || "/", origin);
  const invitation = new URL("/", origin);
  const guest = incoming.searchParams.get("guest");
  if (guest !== null) {
    if (incoming.searchParams.get("invitationPath") === "1") {
      invitation.pathname = `/moi/${encodeURIComponent(guest)}`;
    } else {
      invitation.searchParams.set("guest", guest);
    }
  }

  // Social crawlers read the initial HTML without running React.
  // Keep each invitation's destination instead of identifying it as the homepage.
  const template = await readFile(join(process.cwd(), "dist", "index.html"), "utf8");
  const html = template.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/?\s*>)/,
    (_match, before: string, after: string) => `${before}${escapeAttribute(invitation.href)}${after}`,
  );
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "private, no-store");
  response.end(html);
}
