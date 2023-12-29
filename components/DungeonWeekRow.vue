<script setup lang="ts">
import { usePlayerData } from "../composables/usePlayerData";
import { formatKeyLevel, formatSeconds } from "../utils/formatting";

const props = defineProps<{
  dungeon: DungeonDefinition;
  week: "Tyrannical" | "Fortified";
}>();

const playerData = usePlayerData();
const time = computed(() => playerData.times[props.dungeon.short][props.week]);
const score = computed(() => playerData.scores[props.dungeon.short]);

const plus1 = 100;
const plus2 = (100 / props.dungeon.plus1) * props.dungeon.plus2;
const plus3 = (100 / props.dungeon.plus1) * props.dungeon.plus3;

const actual = computed(
  () => (100 / props.dungeon.plus1) * time.value.duration
);

const inTime = computed(() => time.value.duration <= props.dungeon.plus1);
</script>

<template>
  <div
    class="mb-2 rounded bg-slate-600 p-4 border-slate-600 border"
    :class="{ '!border-lime-500': score.higherScore === week }"
  >
    <h3>{{ week }}</h3>
    <div>
      <b>Level:</b>
      {{ formatKeyLevel(time.level, time.plus) }}
      <input type="number" v-model="time.level" />
    </div>
    <div>
      <b>Time:</b>
      {{ formatSeconds(time.duration) }}
      /
      {{ formatSeconds(dungeon.plus1) }}

      ({{ time.duration }} / {{ dungeon.plus1 }})
    </div>

    <div class="h-6 w-full text-white relative">
      <div
        class="absolute top-0 text-sm bg-lime-900 rounded text-right px-1 shadow-lg"
        :style="{ width: `${plus1}%` }"
        @click="time.duration = dungeon.plus1"
      >
        {{ formatSeconds(dungeon.plus1) }}
      </div>

      <div
        class="absolute top-0 text-sm bg-lime-700 rounded text-right px-1 shadow-lg"
        :style="{ width: `${plus2}%` }"
        @click="time.duration = dungeon.plus2"
      >
        {{ formatSeconds(dungeon.plus2) }}
      </div>

      <div
        class="absolute top-0 text-sm bg-lime-500 rounded text-right px-1 shadow-lg"
        :style="{ width: `${plus3}%` }"
        @click="time.duration = dungeon.plus3"
      >
        {{ formatSeconds(dungeon.plus3) }}
      </div>

      <div
        v-if="inTime"
        class="absolute top-0 w-1 h-7 -mt-1 bg-white rounded shadow-lg -ml-1"
        :style="{ left: `${actual}%` }"
      ></div>
    </div>

    <div>
      <b>Base Score:</b>
      {{ score.baseScore[week] }}
    </div>

    <div>
      <b>Weighted Score:</b>
      {{ score.weightedScore[week] }}
    </div>

    <!-- <input v-model="time.duration" type="number" /> -->
    <TimeInput v-model="time.duration"></TimeInput>
  </div>
</template>
