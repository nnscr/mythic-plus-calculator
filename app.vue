<script setup lang="ts">
import { AtomSpinner } from "epic-spinners";
import { dungeons, type DUNGEON_SHORTS } from "./utils/dungeons";

useHead({
  bodyAttrs: {
    class: "bg-slate-900 text-white",
  },
  title: "Twinis M+ Calculator",
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
});

const playerData = usePlayerData();

onMounted(async () => {
  playerData.loadFromStorage();
});

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
  <ClientOnly>
    <template #fallback>
      <div class="grid place-center">
        <div class="flex flex-col items-center justify-center fixed inset-0">
          <AtomSpinner :animation-duration="1000" :size="60" color="#14b8a6" />
          <b class="mt-5">Loading calculator</b>
        </div>
      </div>
    </template>
    <div class="p-5">
      <div class="flex justify-between">
        <CharacterImportCard />

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
      </div>

      <TotalScoreCard />
      <DungeonCard v-for="dungeon of dungeons" :dungeon="dungeon" />
    </div>

    <div class="bg-gradient-to-t from-black to-slate-900 px-20 py-10 mt-8">
      <div>
        Made in 🇩🇪 by Twini / Allonsy (EU-Tirion) with help from members of
        <a
          href="https://raider.io/guilds/eu/arthas/D%C3%ADe%20schwarze%20Rose"
          class="link"
          target="_blank"
          >Díe schwarze Rose</a
        >
        (looking for members).
      </div>

      <div>
        For bug reports or feature requests, join our
        <a href="https://discord.gg/XYJXrJSEGj" target="_blank" class="link"
          ><Icon name="ic:baseline-discord"></Icon> Discord</a
        >
        or open an issue on
        <a
          href="https://github.com/nnscr/mythic-utils"
          target="_blank"
          class="link"
          ><Icon name="mdi:github"></Icon> Github</a
        >.
      </div>

      <div class="mt-3">
        Character import using API from
        <a href="https://raider.io/" target="_blank" class="link">raider.io</a>.
        Hosted on
        <a href="https://vercel.com" target="_blank" class="link">
          <Icon name="ion:logo-vercel"></Icon> Vercel
        </a>
      </div>
    </div>
  </ClientOnly>
</template>

<style>
.input {
  @apply bg-slate-800 text-white px-3 border border-slate-700 rounded h-10;
}

.button {
  @apply rounded bg-teal-600 px-3 py-1 text-white;
}

.link {
  @apply text-teal-600;
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
