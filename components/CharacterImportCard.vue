<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { AtomSpinner } from "epic-spinners";

const region = useLocalStorage("import:region", "eu");
const realm = useLocalStorage("import:realm", "Tirion");
const character = useLocalStorage("import:character", "Allonsy");

const loading = ref(false);

async function importCharacter(
  region: string,
  realm: string,
  character: string
) {
  const raiderIoImport = useUseRaiderIoImport();

  loading.value = true;
  try {
    const data = await raiderIoImport.runImport(region, realm, character);

    raiderIoImport.applyImport(data);
    raiderIoImport.checkScores(data);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form
    class="text-black flex gap-1"
    @submit.prevent="importCharacter(region, realm, character)"
  >
    <select v-model="region" class="input">
      <option value="eu">EU</option>
      <option value="us">US</option>
    </select>
    <input type="text" v-model="realm" class="input" />
    <input type="text" v-model="character" class="input" />
    <button type="submit" class="button">Import</button>

    <button
      @click="importCharacter('EU', 'Tirion', 'Allonsy')"
      class="button"
      type="button"
    >
      Allonsy
    </button>
    <button
      @click="importCharacter('EU', 'Arthas', 'Crossair')"
      class="button"
      type="button"
    >
      Crizzy
    </button>
    <button
      @click="importCharacter('EU', 'Arygos', 'Xynila')"
      class="button"
      type="button"
    >
      Brian
    </button>
  </form>

  <div
    class="fixed inset-0 bg-slate-600/90 z-50 grid items-center justify-center backdrop-blur-sm"
    v-if="loading"
  >
    <div class="flex flex-col items-center">
      <AtomSpinner :animation-duration="1000" :size="60" color="#14b8a6" />
      <b class="mt-5">Character is loading...</b>
    </div>
  </div>
</template>
