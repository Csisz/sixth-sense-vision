const WALL_SCAN_IMAGE_KEY = "sixth-sense-vision.wall-scan-image";

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
