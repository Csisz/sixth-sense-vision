import type { WallScanResult } from "@/types/scan";

const WALL_SCAN_IMAGE_KEY = "sixth-sense-vision.wall-scan-image";
const WALL_SCAN_RESULT_KEY = "sixth-sense-vision.wall-scan-result";

function canUseSessionStorage() {
  return typeof window !== "undefined" && "sessionStorage" in window;
}

export function saveWallScanImage(dataUrl: string) {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.setItem(WALL_SCAN_IMAGE_KEY, dataUrl);
}

export function getWallScanImage() {
  if (!canUseSessionStorage()) {
    return null;
  }

  return window.sessionStorage.getItem(WALL_SCAN_IMAGE_KEY);
}

export function clearWallScanImage() {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.removeItem(WALL_SCAN_IMAGE_KEY);
}

export function saveWallScanResult(result: WallScanResult) {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.setItem(WALL_SCAN_RESULT_KEY, JSON.stringify(result));
}

export function getWallScanResult() {
  if (!canUseSessionStorage()) {
    return null;
  }

  const storedResult = window.sessionStorage.getItem(WALL_SCAN_RESULT_KEY);

  if (!storedResult) {
    return null;
  }

  try {
    return JSON.parse(storedResult) as WallScanResult;
  } catch {
    window.sessionStorage.removeItem(WALL_SCAN_RESULT_KEY);
    return null;
  }
}

export function clearWallScanResult() {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.removeItem(WALL_SCAN_RESULT_KEY);
}
