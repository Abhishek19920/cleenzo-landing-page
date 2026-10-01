import { getPublicApiBase } from "./apiBase";

function bookingApiBase() {
  return getPublicApiBase();
}

function organizationSlug() {
  const fromEnv = (process.env.REACT_APP_CLEENZO_ORG_SLUG || "").trim();
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return "cleenzo-demo";
  }
  return undefined;
}

export function websiteOrganizationSlug() {
  return organizationSlug();
}

async function readError(res) {
  const data = await res.json().catch(() => ({}));
  const message = Array.isArray(data.message)
    ? data.message.join(" ")
    : data.message;
  return message || "We could not complete the booking. Please try again.";
}

export async function fetchPickupSlots(date) {
  const apiBase = bookingApiBase();
  if (!apiBase) throw new Error("Booking is unavailable right now.");
  const params = new URLSearchParams({ days: "7" });
  if (date) params.set("date", date);
  const slug = organizationSlug();
  if (slug) params.set("organizationSlug", slug);
  const res = await fetch(`${apiBase}/public/website/pickup-slots?${params}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
}

export async function confirmWebsitePickup(body) {
  const apiBase = bookingApiBase();
  if (!apiBase) throw new Error("Booking is unavailable right now.");
  const slug = organizationSlug();
  const res = await fetch(`${apiBase}/public/website/pickups`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
      ...(slug ? { organizationSlug: slug } : {}),
    }),
  });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
}

export async function requestManualWebsitePickup(body) {
  const apiBase = bookingApiBase();
  if (!apiBase) throw new Error("Booking is unavailable right now.");
  const slug = organizationSlug();
  const res = await fetch(`${apiBase}/public/website/manual-pickups`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
      ...(slug ? { organizationSlug: slug } : {}),
    }),
  });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
}
