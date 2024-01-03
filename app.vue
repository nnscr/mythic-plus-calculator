<script setup lang="ts">
import { AtomSpinner } from "epic-spinners";

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
            content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
    ],
});

// const playerData = usePlayerData();
// onMounted(async () => {
//   playerData.loadFromStorage();
// });
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <div class="px-0 xl:px-8 bg-gradient-to-b from-slate-900 to-black shadow shadow-black">
            <div class="flex">
                <NuxtLink
                    to="/"
                    class="border-b border-b-transparent py-5 px-6"
                    active-class="text-teal-600 !border-b-teal-600"
                >
                    M+ Calculator
                </NuxtLink>
                <NuxtLink
                    to="/gear-calculator"
                    class="border-b border-b-transparent py-5 px-6"
                    active-class="text-teal-600 !border-teal-600"
                >
                    Gear Calculator
                </NuxtLink>
                <NuxtLink
                    to="/dungeon-levels"
                    class="border-b border-b-transparent py-5 px-6"
                    active-class="text-teal-600 !border-teal-600"
                >
                    M+ Levels
                </NuxtLink>
            </div>
        </div>

        <div class="grow flex flex-col">
            <ClientOnly>
                <template #fallback>
                    <div class="grid place-center">
                        <div class="flex flex-col items-center justify-center fixed inset-0">
                            <AtomSpinner :animation-duration="1000" :size="60" color="#14b8a6" />
                            <b class="mt-5">Loading calculator</b>
                        </div>
                    </div>
                </template>
                <NuxtPage />
            </ClientOnly>
        </div>

        <div>
            <PageFooter />
        </div>
    </div>
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
