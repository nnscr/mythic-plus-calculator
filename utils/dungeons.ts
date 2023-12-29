export type DUNGEON_SHORTS =
  | "FALL"
  | "RISE"
  | "WM"
  | "AD"
  | "DHT"
  | "BRH"
  | "EB"
  | "TOTT";

export interface DungeonDefinition {
  name: string;
  short: DUNGEON_SHORTS;
  plus1: number;
  plus2: number;
  plus3: number;
}

export const dungeons: Record<DUNGEON_SHORTS, DungeonDefinition> = {
  BRH: dungeon("Black Rook Hold", "BRH", time(36, 0)),
  AD: dungeon("Atal'Dazar", "AD", time(30, 0)),
  EB: dungeon("Everbloom", "EB", time(33, 0)),
  WM: dungeon("Waycrest Manor", "WM", time(37, 0)),
  TOTT: dungeon("Throne of the Tides", "TOTT", time(34, 0)),
  RISE: dungeon("Murozond's Rise", "RISE", time(36, 0)),
  DHT: dungeon("Darkheart Thicket", "DHT", time(30, 0)),
  FALL: dungeon("Galakrond's Fall", "FALL", time(34, 0)),
} as const;

export function getDungeon(short: DUNGEON_SHORTS) {
  return dungeons[short as DUNGEON_SHORTS];
}

function dungeon(
  name: string,
  short: DUNGEON_SHORTS,
  plus1: number,
  plus2?: number,
  plus3?: number
): DungeonDefinition {
  // game has an internal buffer to allow slight over timing to still count as in time
  plus1 += 999;

  return {
    name,
    short,
    plus1,
    plus2: plus2 ?? plus1 * 0.8,
    plus3: plus3 ?? plus1 * 0.6,
  } as const;
}

// helper function to specifiy dungeon max times
function time(minutes: number, seconds: number) {
  return minutes * 60_000 + seconds * 60;
}
