/**
 * PRE_LAUNCH_CLEANUP — remove with preLaunch.js and store-opening sections after launch.
 */
import { STORE_LAUNCH } from "./constants";

function getLaunchDate() {
  const [y, m, d] = STORE_LAUNCH.launchDate.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isBeforeLaunchDay() {
  const now = new Date();
  const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today0 < getLaunchDate();
}

export function getDaysUntilLaunch() {
  const now = new Date();
  const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const launch = getLaunchDate();
  return Math.ceil((launch - today0) / (1000 * 60 * 60 * 24));
}

export function getLaunchCountdown() {
  const launch = getLaunchDate();
  const diff = Math.max(0, launch - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

export function getLaunchCountdownLabel() {
  const days = getDaysUntilLaunch();

  if (days <= 0) return "Opens today!";
  if (days === 1) return "Opens tomorrow!";
  return `Opens in ${days} days`;
}
