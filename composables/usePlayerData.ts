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

  function loadFromStorage() {
    if (!process.client) {
      return;
    }

    const storage = JSON.parse(localStorage.getItem("playerData") ?? "{}");
    if (storage && storage.times) {
      for (const dungeon of Object.keys(storage.times)) {
        const timings = storage.times[dungeon as DUNGEON_SHORTS];

        if (!timings) {
          continue;
        }

        for (const week of Object.keys(timings)) {
          if (
            !["Tyrannical", "Fortified"].includes(week) ||
            !dungeons.hasOwnProperty(dungeon as DUNGEON_SHORTS)
          ) {
            continue;
          }

          const timing = timings[week as WeeklyAffix];

          times[dungeon as DUNGEON_SHORTS][week as WeeklyAffix] = {
            level: timing.level,
            plus: timing.plus,
            duration: timing.duration,
          };
        }
      }
    }

    watch(
      times,
      () => {
        localStorage.setItem("playerData", JSON.stringify({ times }));
      },
      { deep: true }
    );
  }

  function reset() {
    for (const dungeon of Object.keys(times)) {
      for (const week of Object.keys(times[dungeon as DUNGEON_SHORTS])) {
        times[dungeon as DUNGEON_SHORTS][week as WeeklyAffix] = {
          level: 0,
          plus: 0,
          duration: 0,
        };
      }
    }
  }

  return { times, scores, playerScore, loadFromStorage, reset } as const;
});
