<script setup lang="ts">
import { AtomSpinner } from "epic-spinners";
import { dungeons } from "./utils/dungeons";

useHead({
  bodyAttrs: {
    class: "bg-slate-900 text-white",
  },
  htmlAttrs: {
    lang: "en",
  },
  title: "Twinis M+ Calculator",
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
  ],
});

// const playerData = usePlayerData();
// onMounted(async () => {
//   playerData.loadFromStorage();
// });
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
      <div class="flex justify-between flex-col md:flex-row">
        <CharacterImportCard />
        <SetAllButtons class="hidden 2xl:flex" />
      </div>

      <TotalScoreCard />
      <SetAllButtons class="2xl:hidden my-5" />
      <DungeonCard v-for="dungeon of dungeons" :dungeon="dungeon" />
    </div>

    <div
      class="bg-gradient-to-t from-black to-slate-900 px-6 md:px-20 py-10 mt-8"
    >
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
  @apply bg-slate-800 text-white px-3 py-2 border border-slate-700 rounded h-10 appearance-none h-auto;
}

.button {
  @apply rounded bg-teal-600 px-3 py-2 text-white;
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
