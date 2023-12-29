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
  <div class="text-black flex gap-1">
    <select v-model="region" class="input">
      <option value="eu">EU</option>
      <option value="us">US</option>
    </select>
    <input type="text" v-model="realm" class="input" />
    <input type="text" v-model="character" class="input" />
    <button @click="importCharacter(region, realm, character)" class="button">
      Import
    </button>

    <button @click="importCharacter('EU', 'Tirion', 'Allonsy')" class="button">
      Allonsy
    </button>
    <button @click="importCharacter('EU', 'Arthas', 'Crossair')" class="button">
      Crizzy
    </button>
    <button @click="importCharacter('EU', 'Arygos', 'Xynila')" class="button">
      Brian
    </button>
  </div>
</template>
