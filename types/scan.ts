export type WallScanZoneType =
  | "moisture_suspicion"
  | "crack_risk"
  | "surface_wear"
  | "material_changes";

export type WallScanZone = {
  id: string;
  type: WallScanZoneType;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WallScanResult = {
  mode: "wall_scan";
  createdAt: string;
  zones: WallScanZone[];
};
