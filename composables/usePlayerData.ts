import { Decimal } from "decimal.js";
import { type DUNGEON_SHORTS } from "../utils/dungeons";
import { time } from "../utils/formatting";
import { type OverallDungeonTime } from "../utils/times";
import { calculateScores } from "../utils/score";

export const usePlayerData = defineStore("playerData", () => {
  const times: Record<DUNGEON_SHORTS, OverallDungeonTime> = reactive({
    EB: {
      Tyrannical: { level: 24, plus: 1, duration: 1702196 },
      Fortified: { level: 21, plus: 1, duration: 1876504 },
    },
    BRH: {
      Tyrannical: { level: 24, plus: 2, duration: 1728706 },
      Fortified: { level: 22, plus: 2, duration: 1636840 },
    },
    AD: {
      Tyrannical: { level: 24, plus: 1, duration: 1617173 },
      Fortified: { level: 22, plus: 2, duration: 1261927 },
    },
    WM: {
      Tyrannical: { level: 22, plus: 2, duration: 1750256 },
      Fortified: { level: 22, plus: 1, duration: 1794199 },
    },
    TOTT: {
      Tyrannical: { level: 22, plus: 1, duration: 1713301 },
      Fortified: { level: 22, plus: 1, duration: 1907494 },
    },
    RISE: {
      Tyrannical: { level: 22, plus: 1, duration: 1801786 },
      Fortified: { level: 22, plus: 1, duration: 2110938 },
    },
    DHT: {
      Tyrannical: { level: 22, plus: 1, duration: 1534763 },
      Fortified: { level: 21, plus: 2, duration: 1300294 },
    },
    FALL: {
      Tyrannical: { level: 21, plus: 1, duration: 1718329 },
      Fortified: { level: 20, plus: 3, duration: 1212747 },
    },
  });

  const scores = computed(() => ({
    EB: calculateScores(dungeons.EB, times.EB),
    BRH: calculateScores(dungeons.BRH, times.BRH),
    AD: calculateScores(dungeons.AD, times.AD),
    WM: calculateScores(dungeons.WM, times.WM),
    TOTT: calculateScores(dungeons.TOTT, times.TOTT),
    RISE: calculateScores(dungeons.RISE, times.RISE),
    DHT: calculateScores(dungeons.DHT, times.DHT),
    FALL: calculateScores(dungeons.FALL, times.FALL),
  }));

  const playerScore = computed(() => calculatePlayerScore(scores.value));

  return { times, scores, playerScore } as const;
});
