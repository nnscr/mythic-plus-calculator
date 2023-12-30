<script setup lang="ts">
import { AtomSpinner } from "epic-spinners";
import { dungeons, type DUNGEON_SHORTS } from "./utils/dungeons";

useHead({
  bodyAttrs: {
    class: "bg-slate-900 p-5 text-white",
  },
  title: "Twinis M+ Calculator",
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
});

const playerData = usePlayerData();

onMounted(async () => {
  playerData.loadFromStorage();
});

function setAll(level: number, week: "Tyrannical" | "Fortified") {
  for (const dungeon of Object.keys(dungeons)) {
    if (playerData.times[dungeon as DUNGEON_SHORTS][week].level >= level) {
      continue;
    }

    playerData.times[dungeon as DUNGEON_SHORTS][week].level = level;
  }
}
const setAllLevel = ref(20);
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div class="grid place-center">
        <div class="flex flex-col items-center justify-center fixed inset-0">
          <AtomSpinner :animation-duration="1000" :size="60" color="#14b8a6" />
          <b class="mt-5">Loading calculator</b>
        </div>
      </div>
    </template>
    <div>
      <div class="flex justify-between">
        <CharacterImportCard />

        <div class="flex flex-row items-stretch gap-1 justify-end">
          <div class="mr-3 flex items-center">Set all to level</div>

          <input v-model="setAllLevel" class="input w-14 text-center" />
          <button class="button" @click="setAll(setAllLevel, 'Fortified')">
            Fortified
          </button>
          <button class="button" @click="setAll(setAllLevel, 'Tyrannical')">
            Tyrannical
          </button>
        </div>
      </div>

      <div
        class="flex flex-col text-center py-8 justify-center border border-dashed border-slate-600 text-white my-5"
      >
        <div class="text-2xl">Total Score</div>
        <div class="text-5xl">
          {{ playerData.playerScore.toFixed(1) }}
        </div>
      </div>

      <DungeonCard v-for="dungeon of dungeons" :dungeon="dungeon" /></div
  ></ClientOnly>
</template>

<style>
.input {
  @apply bg-slate-800 text-white px-3 border border-slate-700 rounded h-10;
}

.button {
  @apply rounded bg-teal-600 px-3 py-1 text-white;
}

input.no-spin::-webkit-outer-spin-button,
input.no-spin::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input.no-spin[type="number"] {
  -moz-appearance: textfield;
}
</style>
