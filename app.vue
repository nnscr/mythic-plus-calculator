<script setup lang="ts">
import { dungeons } from "./utils/dungeons";

useHead({
  bodyAttrs: {
    class: "bg-slate-900 p-5 text-white",
  },
});

const playerData = usePlayerData();
</script>

<template>
  <div>
    <CharacterImportCard />

    <div
      class="flex flex-col text-center py-8 justify-center border border-dashed border-slate-600 text-white my-5"
    >
      <div class="text-2xl">Total Score</div>
      <div class="text-5xl">
        {{ playerData.playerScore }}
      </div>
    </div>

    <DungeonCard v-for="dungeon of dungeons" :dungeon="dungeon" />
  </div>
</template>

<style>
.input {
  @apply bg-slate-800 text-white px-3 border border-slate-700 rounded h-10;
}

.button {
  @apply rounded bg-teal-500 px-3 py-1 text-white;
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
