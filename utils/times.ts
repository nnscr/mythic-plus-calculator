export interface DungeonTime {
  level: number;
  plus: 1 | 2 | 3;
  duration: number;
}

export interface OverallDungeonTime {
  Tyrannical: DungeonTime;
  Fortified: DungeonTime;
}

export type WeeklyAffix = "Tyrannical" | "Fortified";
