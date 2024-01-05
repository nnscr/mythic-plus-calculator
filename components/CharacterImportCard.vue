<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { AtomSpinner } from "epic-spinners";
import { classColor } from "~/utils/formatting";

const region = useLocalStorage("import:region", "eu");
const realm = useLocalStorage("import:realm", "Tirion");
const character = useLocalStorage("import:character", "Allonsy");

const characterHistory = useCharacterHistory();
const playerData = usePlayerData();

const raiderIoImport = useRaiderIoImport();
</script>

<template>
    <form
        class="text-black flex gap-1 md:flex-row flex-col"
        @submit.prevent="raiderIoImport.importCharacter(region, realm, character)"
    >
        <select v-model="region" class="input">
            <option value="eu">EU</option>
            <option value="us">US</option>
            <option value="tw">TW</option>
        </select>
        <input type="text" v-model="realm" class="input xl:w-48" />
        <input type="text" v-model="character" class="input xl:w-40" />
        <button type="submit" class="button">Import</button>
        <button type="button" class="button" @click="playerData.newCharacter()">Clear</button>

        <div class="flex flex-row gap-2 my-3 md:my-0">
            <button
                @click="raiderIoImport.importCharacter(char.region, char.realm, char.name)"
                class="button flex items-center border-l-[32px]"
                type="button"
                v-for="char of characterHistory.list.value"
                :style="{ borderColor: classColor(char.class) }"
            >
                <Icon
                    name="fa:times"
                    class="-ml-9 mr-4"
                    :class="char.class === 'Priest' ? 'text-slate-700' : ''"
                    @click.prevent.stop="characterHistory.remove(char)"
                ></Icon>

                <span>
                    {{ char.name }}
                </span>
            </button>
        </div>
    </form>

    <Transition
        enter-from-class="transition duration-300 -translate-y-full"
        enter-to-class="transition duration-300 translate-y-0"
        leave-from-class="transition duration-300 translate-y-0"
        leave-to-class="transition duration-300 -translate-y-full"
    >
        <div
            class="fixed inset-0 bg-slate-600/90 z-50 grid items-center justify-center backdrop-blur-sm"
            v-if="raiderIoImport.loading"
            @click="raiderIoImport.dismissError()"
        >
            <div class="flex flex-col items-center" v-if="!raiderIoImport.error">
                <AtomSpinner :animation-duration="1000" :size="60" color="#14b8a6" />
                <b class="mt-5">Character is loading...</b>
            </div>

            <div class="flex flex-col items-center text-red-500" v-if="raiderIoImport.error">
                <Icon name="game-icons:dead-head" size="80"></Icon>
                <b class="mt-5">Failed to load character</b>

                <button type="button" class="button mt-5">OK</button>
            </div>
        </div>
    </Transition>
</template>
