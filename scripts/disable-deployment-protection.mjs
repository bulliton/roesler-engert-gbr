#!/usr/bin/env node

/**
 * Disable Vercel Authentication / password protection so preview URLs are public.
 *
 * Usage:
 *   VERCEL_TOKEN=xxx node scripts/disable-deployment-protection.mjs
 *   # or: vercel login && VERCEL_TOKEN=$(vercel token) node scripts/disable-deployment-protection.mjs
 *
 * Create a token at https://vercel.com/account/tokens
 */

const project = process.env.VERCEL_PROJECT ?? "roesler-engert-gbr";
const teamId = process.env.VERCEL_TEAM_ID ?? "team_f2jcNBCaZsr5mPUha8YkXlOs";
const token = process.env.VERCEL_TOKEN;

if (!token) {
  console.error(
    "Missing VERCEL_TOKEN. Create one at https://vercel.com/account/tokens, then run:\n" +
      "  VERCEL_TOKEN=your_token node scripts/disable-deployment-protection.mjs",
  );
  process.exit(1);
}

const url = `https://api.vercel.com/v9/projects/${encodeURIComponent(project)}?teamId=${teamId}`;

const response = await fetch(url, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ssoProtection: null,
    passwordProtection: null,
  }),
});

const data = await response.json().catch(() => ({}));

if (!response.ok) {
  console.error("Failed to update project:", response.status, data);
  process.exit(1);
}

console.log(`Updated ${project}: preview and production URLs are now public (no Vercel login).`);
