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

    {{ playerData.playerScore }}
    <DungeonCard v-for="dungeon of dungeons" :dungeon="dungeon" />
  </div>
</template>
