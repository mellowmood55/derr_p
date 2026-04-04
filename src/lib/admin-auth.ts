import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "derrick_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.DATABASE_URL ?? "derrick-session-secret";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function encodeSession(username: string) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${username}:${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

function decodeSession(token: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  if (sign(payload) !== signature) {
    return null;
  }

  const [username, expiresAtText] = payload.split(":");
  const expiresAt = Number(expiresAtText);

  if (!username || Number.isNaN(expiresAt) || expiresAt < Date.now()) {
    return null;
  }

  return { username, expiresAt };
}

export function createAdminResponse(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

export function setAdminCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, encodeSession("derrick"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
  return response;
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export function isAdminAuthed(cookieValue?: string | null) {
  if (!cookieValue) {
    return false;
  }

  return Boolean(decodeSession(cookieValue));
}

export function requireAdminFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return false;
  }

  const cookieValue = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")
    .slice(1)
    .join("=");

  return isAdminAuthed(cookieValue);
}

export async function getAdminCookieValue() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}
