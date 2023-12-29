<script setup lang="ts">
import type { DungeonWeekRow } from "#build/components";
import { usePlayerData } from "../composables/usePlayerData";
import { type DungeonDefinition } from "../utils/dungeons";

const props = defineProps<{
  dungeon: DungeonDefinition;
}>();

const playerData = usePlayerData();
const scores = computed(() => playerData.scores[props.dungeon.short]);

// const tyrannicalScore = computed(() =>
//   calculateScore(
//     props.dungeon,
//     props.times.Tyrannical.level,
//     props.times.Tyrannical.duration
//   )
// );
// const fortifiedScore = computed(() =>
//   calculateScore(
//     props.dungeon,
//     props.times.Fortified.level,
//     props.times.Fortified.duration
//   )
// );

// const higherScore = computed(() =>
//   tyrannicalScore.value > fortifiedScore.value ? "Tyrannical" : "Fortified"
// );

// const weightedScoreTyrannical = computed(() => {
//   return (
//     tyrannicalScore.value * (higherScore.value === "Tyrannical" ? 1.5 : 0.5)
//   );
// });

// const weightedScoreFortified = computed(() => {
//   return fortifiedScore.value * (higherScore.value === "Fortified" ? 1.5 : 0.5);
// });

// const totalScore = computed(
//   () => weightedScoreFortified.value + weightedScoreTyrannical.value
// );
</script>

<template>
  <div class="mb-5">
    <div class="flex items-center gap-4">
      <h2
        class="border border-slate-500 w-20 px-3 py-2 rounded text-center text-xl mb-2 overflow-hidden"
      >
        {{ scores.totalScore }}
      </h2>
      <h2 class="text-xl mb-2">{{ dungeon.name }}</h2>
    </div>
    <div class="flex flex-row gap-4 text-slate-400">
      <div class="grow shrink-0 basis-0">
        <DungeonWeekRow :dungeon="dungeon" week="Fortified" />
      </div>

      <div class="grow shrink-0 basis-0">
        <DungeonWeekRow :dungeon="dungeon" week="Tyrannical" />
      </div>
    </div>
  </div>
</template>
