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

    <div class="flex flex-row gap-3 items-start">
      <div class="flex flex-col items-center px-10 text-center">
        <h3 class="text-xl">{{ week }}</h3>
        <!-- {{ time.level }} -->
        <!-- {{ formatKeyLevel(time.level, time.plus) }} -->

        <div class="flex flex-col">
          <div class="cursor-pointer h-8" @click="time.level += 1">
            <Icon name="octicon:chevron-up-12"></Icon>
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
            class="cursor-pointer h-6"
            @click="time.level = Math.max(0, time.level - 1)"
          >
            <Icon name="octicon:chevron-down-12"></Icon>
          </div>
        </div>
        <!-- {{ formatKeyPlus(time.plus) }} -->
      </div>
      <div class="grow">
        <div class="flex flex-row justify-stretch">
          <div class="flex flex-col grow text-white">
            <b>Time:</b>
            <!-- {{ formatSeconds(time.duration) }} -->

            <div class="flex flex-row items-center gap-2">
              <TimeInput v-model="time.duration"></TimeInput>
              <div>
                /
                {{ formatSeconds(dungeon.plus1) }}
              </div>
            </div>

            <!-- ({{ time.duration }} / {{ dungeon.plus1 }}) -->
          </div>

          <div class="flex flex-col grow tabular-nums">
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

          <div class="flex flex-col grow text-white">
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
        </div>

        <!-- <input v-model="time.duration" type="number" /> -->

        <!-- <div class="flex flex-row items-end gap-3"> -->
        <TimerBar v-bind="{ dungeon, time }" />
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
