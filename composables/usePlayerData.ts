import { type DUNGEON_SHORTS } from "../utils/dungeons";
import { calculateScores } from "../utils/score";
import { type OverallDungeonTime, type WeeklyAffix } from "../utils/times";

export type CharacterClasses =
  | "Warrior"
  | "Paladin"
  | "Hunter"
  | "Rogue"
  | "Priest"
  | "Death Knight"
  | "Shaman"
  | "Mage"
  | "Warlock"
  | "Monk"
  | "Druid"
  | "Demon Hunter"
  | undefined;

export interface CharacterInfo {
  name: string;
  realm: string;
  region: string;
  class: CharacterClasses;
  spec: string | undefined;
  thumbnailUrl: string | undefined;
  guildName: string | undefined;
}

export const usePlayerData = defineStore("playerData", () => {
  const characterInfo = ref<CharacterInfo>(createEmptyCharacterInfo());
  const lastImport = ref<Date | null>(null);
  const isImportedCharacter = computed(() => characterInfo.value.name !== "");

  const originalTimes = reactive({
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

  const hypotheticalTimes: Record<DUNGEON_SHORTS, OverallDungeonTime> =
    reactive({
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

  const hypotheticalScores = computed(() => ({
    EB: calculateScores(dungeons.EB, hypotheticalTimes.EB),
    BRH: calculateScores(dungeons.BRH, hypotheticalTimes.BRH),
    AD: calculateScores(dungeons.AD, hypotheticalTimes.AD),
    WM: calculateScores(dungeons.WM, hypotheticalTimes.WM),
    TOTT: calculateScores(dungeons.TOTT, hypotheticalTimes.TOTT),
    RISE: calculateScores(dungeons.RISE, hypotheticalTimes.RISE),
    DHT: calculateScores(dungeons.DHT, hypotheticalTimes.DHT),
    FALL: calculateScores(dungeons.FALL, hypotheticalTimes.FALL),
  }));

  const originalScores = computed(() => ({
    EB: calculateScores(dungeons.EB, originalTimes.EB),
    BRH: calculateScores(dungeons.BRH, originalTimes.BRH),
    AD: calculateScores(dungeons.AD, originalTimes.AD),
    WM: calculateScores(dungeons.WM, originalTimes.WM),
    TOTT: calculateScores(dungeons.TOTT, originalTimes.TOTT),
    RISE: calculateScores(dungeons.RISE, originalTimes.RISE),
    DHT: calculateScores(dungeons.DHT, originalTimes.DHT),
    FALL: calculateScores(dungeons.FALL, originalTimes.FALL),
  }));

  const playerScore = computed(() =>
    calculatePlayerScore(hypotheticalScores.value)
  );
  const originalPlayerScore = computed(() =>
    calculatePlayerScore(originalScores.value)
  );

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

          hypotheticalTimes[dungeon as DUNGEON_SHORTS][week as WeeklyAffix] = {
            level: timing.level,
            plus: timing.plus,
            duration: timing.duration,
          };
        }
      }
    }

    watch(
      hypotheticalTimes,
      () => {
        localStorage.setItem(
          "hypotheticalTimes",
          JSON.stringify({ hypotheticalTimes })
        );
      },
      { deep: true }
    );
  }

  function setCharacterInfo(newCharacterInfo: CharacterInfo) {
    characterInfo.value = newCharacterInfo;
  }

  /** Reset all data to a new, fully virtual character */
  function newCharacter() {
    for (const dungeon of Object.keys(hypotheticalTimes)) {
      for (const week of Object.keys(
        hypotheticalTimes[dungeon as DUNGEON_SHORTS]
      )) {
        hypotheticalTimes[dungeon as DUNGEON_SHORTS][week as WeeklyAffix] = {
          level: 0,
          plus: 0,
          duration: 0,
        };

        originalTimes[dungeon as DUNGEON_SHORTS][week as WeeklyAffix] = {
          level: 0,
          plus: 0,
          duration: 0,
        };
      }
    }

    characterInfo.value = createEmptyCharacterInfo();
  }

  /** Reset all hypothetical times to the original times */
  function resetAll() {
    for (const dungeon of Object.keys(hypotheticalTimes)) {
      for (const week of Object.keys(
        hypotheticalTimes[dungeon as DUNGEON_SHORTS]
      )) {
        hypotheticalTimes[dungeon as DUNGEON_SHORTS][week as WeeklyAffix] = {
          ...originalTimes[dungeon as DUNGEON_SHORTS][week as WeeklyAffix],
        };
      }
    }
  }

  /** Reset a single dungeon to the original times */
  function resetDungeon(dungeon: DUNGEON_SHORTS, week: WeeklyAffix) {
    hypotheticalTimes[dungeon][week as WeeklyAffix] = {
      level: originalTimes[dungeon][week as WeeklyAffix].level,
      plus: originalTimes[dungeon][week as WeeklyAffix].plus,
      duration: originalTimes[dungeon][week as WeeklyAffix].duration,
    };
  }

  return {
    originalTimes,
    hypotheticalTimes,
    hypotheticalScores,
    originalScores,
    playerScore,
    originalPlayerScore,
    loadFromStorage,
    newCharacter,
    characterInfo,
    lastImport,
    resetAll,
    resetDungeon,
    isImportedCharacter,
    setCharacterInfo,
  } as const;
});

function createEmptyCharacterInfo(): CharacterInfo {
  return {
    name: "",
    realm: "",
    region: "",
    class: undefined,
    spec: undefined,
    thumbnailUrl: undefined,
    guildName: undefined,
  };
}
