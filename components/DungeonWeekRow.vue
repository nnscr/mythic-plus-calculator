<script setup lang="ts">
import { usePlayerData } from "../composables/usePlayerData";
import { formatSeconds } from "../utils/formatting";

const props = defineProps<{
  dungeon: DungeonDefinition;
  week: "Tyrannical" | "Fortified";
}>();

const playerData = usePlayerData();
const time = computed(
  () => playerData.hypotheticalTimes[props.dungeon.short][props.week]
);

const hypotheticalScore = computed(
  () => playerData.hypotheticalScores[props.dungeon.short]
);

const originalScore = computed(
  () => playerData.originalScores[props.dungeon.short]
);

const changed = computed(
  () =>
    !hypotheticalScore.value.totalScore.equals(originalScore.value.totalScore)
);
</script>

<template>
  <div
    class="mb-2 rounded-lg px-4 py-2 text-white bg-gradient-to-br from-slate-700 to-slate-800 border-slate-900 border-2 relative"
    :class="{
      '!from-slate-600 !to-slate-700 !border-teal-500':
        hypotheticalScore.higherScore === week && time.level > 0,
      '': time.level === 0,
    }"
  >
    <div
      class="cursor-pointer absolute top-2 right-3"
      v-if="changed"
      @click="playerData.resetDungeon(dungeon.short, week)"
      title="Reset score to original value"
    >
      <Icon name="mynaui:undo"></Icon>
    </div>

    <div class="week-row">
      <div
        class="week-row--level flex flex-col items-center lg:px-4 xl:px-10 text-center"
      >
        <h3 class="text-xl h-8">{{ week }}</h3>
        <!-- {{ time.level }} -->
        <!-- {{ formatKeyLevel(time.level, time.plus) }} -->

        <div class="flex flex-row-reverse md:flex-col items-center">
          <div class="cursor-pointer md:h-8 w-8" @click="time.level += 1">
            <div class="hidden md:block">
              <Icon name="octicon:chevron-up-12"></Icon>
            </div>
            <div class="block md:hidden">
              <Icon name="octicon:chevron-right"></Icon>
            </div>
          </div>

          <input
            type="number"
            v-model="time.level"
            class="input no-spin w-12 text-center"
            min="0"
            step="1"
            :class="{
              '!border-1 !border-rose-700': time.level <= 0,
            }"
          />

          <div
            class="cursor-pointer md:h-6 w-8"
            @click="time.level = Math.max(0, time.level - 1)"
          >
            <div class="hidden md:block">
              <Icon name="octicon:chevron-down-12"></Icon>
            </div>
            <div class="block md:hidden">
              <Icon name="octicon:chevron-left"></Icon>
            </div>
          </div>
        </div>
        <!-- {{ formatKeyPlus(time.plus) }} -->
      </div>
      <!-- <div class="flex flex-row justify-stretch"> -->
      <div class="week-row--time flex flex-col grow text-white">
        <b class="h-8 block">Time:</b>
        <!-- {{ formatSeconds(time.duration) }} -->

        <div class="flex flex-row items-center gap-2">
          <TimeInput v-model="time.duration"></TimeInput>
          <div class="hidden xl:block">
            /
            {{ formatSeconds(dungeon.plus1) }}
          </div>
        </div>

        <!-- ({{ time.duration }} / {{ dungeon.plus1 }}) -->
      </div>

      <div class="week-row--base flex flex-col grow tabular-nums">
        <b>Base Score:</b>
        <div class="flex flex-row items-center">
          <div>
            {{ hypotheticalScore.baseScore[week].toFixed(1) }}
          </div>

          <Transition
            enter-from-class="transition duration-300 -translate-x-full opacity-0 scale-0"
            enter-to-class="transition duration-300 translate-x-0 opacity-100 scale-100"
            leave-from-class="transition duration-300 translate-x-0 opacity-100 scale-100"
            leave-to-class="transition duration-300 -translate-x-full opacity-0 scale-0"
          >
            <RelativeScore
              class="ml-1 text-sm"
              v-if="
                !hypotheticalScore.baseScore[week].equals(
                  originalScore.baseScore[week]
                )
              "
              :hypothetical-score="hypotheticalScore.baseScore[week]"
              :original-score="originalScore.baseScore[week]"
            />
          </Transition>
        </div>
      </div>

      <div class="week-row--final flex flex-col grow text-white">
        <b>Final Score:</b>

        <div class="flex flex-row items-center">
          <div>{{ hypotheticalScore.weightedScore[week].toFixed(1) }}</div>
          <Transition
            enter-from-class="transition duration-300 -translate-x-full opacity-0 scale-0"
            enter-to-class="transition duration-300 translate-x-0 opacity-100 scale-100"
            leave-from-class="transition duration-300 translate-x-0 opacity-100 scale-100"
            leave-to-class="transition duration-300 -translate-x-full opacity-0 scale-0"
          >
            <RelativeScore
              class="ml-1 text-sm"
              v-if="
                !hypotheticalScore.weightedScore[week].equals(
                  originalScore.weightedScore[week]
                )
              "
              :hypothetical-score="hypotheticalScore.weightedScore[week]"
              :original-score="originalScore.weightedScore[week]"
            />
          </Transition>
        </div>
      </div>
      <!-- </div> -->

      <!-- <input v-model="time.duration" type="number" /> -->

      <!-- <div class="flex flex-row items-end gap-3"> -->
      <div class="week-row--bar">
        <TimerBar v-bind="{ dungeon, time }" />
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped>
.week-row {
  display: grid;
  grid-template-areas:
    "level time base final"
    "level bar bar bar";
  grid-auto-columns: min-content 1fr 1fr 1fr;
}

.week-row--level {
  grid-area: level;
}

.week-row--time {
  grid-area: time;
}

.week-row--base {
  grid-area: base;
}

.week-row--final {
  grid-area: final;
}

.week-row--bar {
  grid-area: bar;
}

@media screen and (max-width: 768px) {
  .week-row {
    grid-template-areas:
      "level time"
      "base final"
      "bar bar";
    grid-auto-columns: 2fr 3fr;
  }
}
</style>
