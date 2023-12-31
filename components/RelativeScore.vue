<script setup lang="ts">
import type Decimal from "decimal.js";

const props = defineProps<{
  originalScore: Decimal;
  hypotheticalScore: Decimal;
}>();

const prefix = computed(() => {
  if (props.hypotheticalScore.greaterThan(props.originalScore)) {
    return "+";
  } else if (props.hypotheticalScore.lessThan(props.originalScore)) {
    return "-";
  } else {
    return "";
  }
});

const playerData = usePlayerData();
</script>

<template>
  <div
    v-if="playerData.isImportedCharacter"
    :class="
      hypotheticalScore.eq(originalScore)
        ? 'text-slate-400'
        : hypotheticalScore.greaterThan(originalScore)
        ? 'text-lime-500'
        : 'text-rose-500'
    "
  >
    {{ prefix }}{{ hypotheticalScore.minus(originalScore).abs().toFixed(1) }}
  </div>
</template>
