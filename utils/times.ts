export interface DungeonTime {
  level: number;
  plus: number;
  duration: number;
}

export interface OverallDungeonTime {
  Tyrannical: DungeonTime;
  Fortified: DungeonTime;
}

export type WeeklyAffix = "Tyrannical" | "Fortified";
