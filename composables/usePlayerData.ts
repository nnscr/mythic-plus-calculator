import { type DUNGEON_SHORTS } from "../utils/dungeons";
import { calculateScores } from "../utils/score";
import { type OverallDungeonTime } from "../utils/times";

export const usePlayerData = defineStore("playerData", () => {
  const times: Record<DUNGEON_SHORTS, OverallDungeonTime> = reactive({
    EB: {
      Tyrannical: { level: 0, plus: 0, duration: 0 },
      Fortified: { level: 0, plus: 0, duration: 0 },
    },
    BRH: {
      Tyrannical: { level: 0, plus: 0, duration: 0 },
      Fortified: { level: 0, plus: 0, duration: 0 },
    },
    AD: {
      Tyrannical: { level: 0, plus: 0, duration: 0 },
      Fortified: { level: 0, plus: 0, duration: 0 },
    },
    WM: {
      Tyrannical: { level: 0, plus: 0, duration: 0 },
      Fortified: { level: 0, plus: 0, duration: 0 },
    },
    TOTT: {
      Tyrannical: { level: 0, plus: 0, duration: 0 },
      Fortified: { level: 0, plus: 0, duration: 0 },
    },
    RISE: {
      Tyrannical: { level: 0, plus: 0, duration: 0 },
      Fortified: { level: 0, plus: 0, duration: 0 },
    },
    DHT: {
      Tyrannical: { level: 0, plus: 0, duration: 0 },
      Fortified: { level: 0, plus: 0, duration: 0 },
    },
    FALL: {
      Tyrannical: { level: 0, plus: 0, duration: 0 },
      Fortified: { level: 0, plus: 0, duration: 0 },
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
