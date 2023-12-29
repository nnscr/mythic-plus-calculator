<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const minutes = computed({
  get() {
    return Math.floor(props.modelValue / 60_000);
  },

  set(value) {
    emit("update:modelValue", value * 60_000 + seconds.value * 1000);
  },
});

const seconds = computed({
  get() {
    return Math.floor((props.modelValue % 60_000) / 1000);
  },

  set(value) {
    emit("update:modelValue", minutes.value * 60_000 + value * 1000);
  },
});
</script>

<template>
  <div class="inline-flex flex-row gap-2 bg-slate-900 rounded items-center">
    <input
      type="number"
      class="w-9 text-center bg-transparent border-0 pl-2 py-1"
      v-model="minutes"
    />
    <span>:</span>
    <input
      type="number"
      class="w-9 text-center bg-transparent border-0 pr-2 py-1"
      v-model="seconds"
    />
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
