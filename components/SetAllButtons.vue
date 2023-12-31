<script setup lang="ts">
const playerData = usePlayerData();
function setAll(level: number, week: "Tyrannical" | "Fortified") {
  for (const dungeon of Object.keys(dungeons)) {
    if (
      playerData.hypotheticalTimes[dungeon as DUNGEON_SHORTS][week].level >=
      level
    ) {
      continue;
    }

    playerData.hypotheticalTimes[dungeon as DUNGEON_SHORTS][week].level = level;
  }
}
const setAllLevel = ref(20);
</script>

<template>
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
</template>
