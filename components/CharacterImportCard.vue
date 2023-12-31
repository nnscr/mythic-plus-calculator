<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { AtomSpinner } from "epic-spinners";
import { classColor } from "~/utils/formatting";

const region = useLocalStorage("import:region", "eu");
const realm = useLocalStorage("import:realm", "Tirion");
const character = useLocalStorage("import:character", "Allonsy");

const characterHistory = useCharacterHistory();
const playerData = usePlayerData();

const loading = ref(false);
const error = ref(false);

function dismissError() {
  if (error.value) {
    loading.value = false;
    error.value = false;
  }
}

async function importCharacter(
  region: string,
  realm: string,
  character: string
) {
  const raiderIoImport = useUseRaiderIoImport();

  loading.value = true;
  try {
    const data = await raiderIoImport.runImport(region, realm, character);

    characterHistory.save(data.characterInfo);

    raiderIoImport.applyImport(data.timings, data.characterInfo);
    raiderIoImport.checkScores(data.timings);
    // await new Promise((r) => setTimeout(r, 2000));
    // throw new Error("Failed to load character");
  } catch {
    error.value = true;
    return;
  }
  loading.value = false;
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
    <button type="button" class="button" @click="playerData.newCharacter()">
      Clear
    </button>

    <button
      @click="importCharacter(char.region, char.realm, char.name)"
      class="button flex items-center border-l-[32px]"
      type="button"
      v-for="char of characterHistory.list.value"
      :style="{ borderColor: classColor(char.class) }"
    >
      <Icon
        name="fa:times"
        class="-ml-9 mr-4"
        @click.prevent.stop="characterHistory.remove(char)"
      ></Icon>

      <span>
        {{ char.name }}
      </span>
    </button>
  </form>

  <Transition
    enter-from-class="transition duration-300 -translate-y-full"
    enter-to-class="transition duration-300 translate-y-0"
    leave-from-class="transition duration-300 translate-y-0"
    leave-to-class="transition duration-300 -translate-y-full"
  >
    <div
      class="fixed inset-0 bg-slate-600/90 z-50 grid items-center justify-center backdrop-blur-sm"
      v-if="loading"
      @click="dismissError()"
    >
      <div class="flex flex-col items-center" v-if="!error">
        <AtomSpinner :animation-duration="1000" :size="60" color="#14b8a6" />
        <b class="mt-5">Character is loading...</b>
      </div>

      <div class="flex flex-col items-center text-red-500" v-if="error">
        <Icon name="game-icons:dead-head" size="80"></Icon>
        <b class="mt-5">Failed to load character</b>

        <button type="button" class="button mt-5">OK</button>
      </div>
    </div>
  </Transition>
</template>
