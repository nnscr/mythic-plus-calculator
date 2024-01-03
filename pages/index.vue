<script setup lang="ts">
import { dungeons } from "../utils/dungeons";
</script>

<template>
  <div class="p-5">
    <div class="flex justify-between flex-col md:flex-row">
      <CharacterImportCard />
      <SetAllButtons class="hidden 2xl:flex" />
    </div>

    <TotalScoreCard />
    <SetAllButtons class="2xl:hidden my-5" />
    <DungeonCard v-for="dungeon of dungeons" :dungeon="dungeon" />
  </div>
</template>
