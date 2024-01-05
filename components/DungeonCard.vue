<script setup lang="ts">
import type { DungeonWeekRow } from "#build/components";
import { usePlayerData } from "../composables/usePlayerData";
import { type DungeonDefinition } from "../utils/dungeons";

const props = defineProps<{
    dungeon: DungeonDefinition;
}>();

const playerData = usePlayerData();
const hypotheticalScores = computed(() => playerData.hypotheticalScores[props.dungeon.short]);
const originalScores = computed(() => playerData.originalScores[props.dungeon.short]);

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
            <h2 class="text-xl mb-2">{{ dungeon.name }}</h2>
        </div>
        <div class="flex flex-col md:flex-row gap-4 text-slate-400">
            <div class="grow shrink-0 basis-0 order-1">
                <DungeonWeekRow :dungeon="dungeon" week="Fortified" />
            </div>

            <div class="flex items-center justify-center order-4 md:order-2">
                <div class="flex flex-row items-center justify-center">
                    <h2
                        class="border border-slate-500 w-32 px-3 py-2 rounded-md text-center mb-2 overflow-hidden text-white"
                    >
                        <div class="opacity-70">Rating</div>
                        <div class="text-3xl">
                            {{ hypotheticalScores.totalScore.toFixed(1) }}
                        </div>
                        <RelativeScore
                            :hypothetical-score="hypotheticalScores.totalScore"
                            :original-score="originalScores.totalScore"
                        />
                    </h2>
                </div>
            </div>
            <div class="grow shrink-0 basis-0 order-3">
                <DungeonWeekRow :dungeon="dungeon" week="Tyrannical" />
            </div>
        </div>
    </div>
</template>
