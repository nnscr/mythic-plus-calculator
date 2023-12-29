<script setup lang="ts">
const region = ref("eu");
const realm = ref("Tirion");
const character = ref("Allonsy");

async function importCharacter(
  region: string,
  realm: string,
  character: string
) {
  const raiderIoImport = useUseRaiderIoImport();

  const data = await raiderIoImport.runImport(region, realm, character);

  raiderIoImport.applyImport(data);
  raiderIoImport.checkScores(data);
}
</script>

<template>
  <div class="text-black">
    <select v-model="region">
      <option value="eu">EU</option>
      <option value="us">US</option>
    </select>
    <input type="text" v-model="realm" />
    <input type="text" v-model="character" />
    <button
      @click="importCharacter(region, realm, character)"
      class="rounded bg-teal-500 px-3 py-1 text-white"
    >
      Import
    </button>

    <button
      @click="importCharacter('EU', 'Tirion', 'Allonsy')"
      class="rounded bg-teal-500 px-3 py-1 text-white"
    >
      Allonsy
    </button>
    <button
      @click="importCharacter('EU', 'Arthas', 'Crossair')"
      class="rounded bg-teal-500 px-3 py-1 text-white"
    >
      Crizzy
    </button>
    <button
      @click="importCharacter('EU', 'Arygos', 'Xynila')"
      class="rounded bg-teal-500 px-3 py-1 text-white"
    >
      Brian
    </button>
  </div>
</template>
