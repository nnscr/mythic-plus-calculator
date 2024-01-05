<script setup lang="ts">
import { useRaiderIoImport } from "../composables/useRaiderIoImport";

const playerData = usePlayerData();
const raiderIoImport = useRaiderIoImport();

function forceReloadCharacter() {
    if (!playerData.isImportedCharacter) {
        return;
    }

    raiderIoImport.importCharacter(
        playerData.characterInfo.region,
        playerData.characterInfo.realm,
        playerData.characterInfo.name,
        true
    );
}
</script>

<template>
    <div
        class="flex flex-col md:flex-row text-center justify-center border border-dashed border-slate-600 text-white my-5 items-stretch md:py-8"
    >
        <div
            class="md:pr-5 md:mr-5 border-b pb-5 md:pb-0 md:border-b-0 md:border-r mt-5 md:mt-0 border-dashed border-slate-600 grow basis-1"
            v-if="playerData.isImportedCharacter"
        >
            <!-- <div class="text-slate-500 text-sm">
        {{ playerData.characterInfo.region.toUpperCase() }}-{{
          playerData.characterInfo.realm
        }}
      </div> -->
            <img :src="playerData.characterInfo.thumbnailUrl" class="w-24 h-24 mx-auto mb-3 rounded-xl" />

            <div class="flex items-center justify-center gap-2">
                <div class="text-3xl">
                    {{ playerData.characterInfo.name }}
                </div>

                <div
                    class="cursor-pointer mb-1 ml-1 text-2xl"
                    @click="forceReloadCharacter()"
                    title="Force reload from raider.io"
                >
                    <Icon name="mynaui:undo"></Icon>
                </div>
            </div>

            <div class="" v-if="playerData.characterInfo.guildName">
                &lt;{{ playerData.characterInfo.guildName }}&gt;
            </div>

            <div class="text-sm" :style="{ color: classColor(playerData.characterInfo.class) }">
                {{ playerData.characterInfo.spec }} {{ playerData.characterInfo.class }}
            </div>
        </div>
        <div class="grow flex flex-col justify-center basis-1 tabular-nums">
            <div class="text-xl h-8"></div>
            <div class="text-2xl">Total Score</div>
            <div class="text-5xl">
                {{ playerData.playerScore.toFixed(1) }}
            </div>
            <div class="text-xl h-8">
                <Transition
                    enter-from-class="transition duration-300 -translate-y-full opacity-0 scale-0"
                    enter-to-class="transition duration-300 translate-y-0 opacity-100 scale-100"
                    leave-from-class="transition duration-300 translate-y-0 opacity-100 scale-100"
                    leave-to-class="transition duration-300 -translate-y-full opacity-0 scale-0"
                >
                    <RelativeScore
                        v-if="!playerData.playerScore.equals(playerData.originalPlayerScore)"
                        :hypothetical-score="playerData.playerScore"
                        :original-score="playerData.originalPlayerScore"
                    />
                </Transition>
            </div>
        </div>
        <div
            v-if="playerData.isImportedCharacter"
            class="md:mr-5 border-t pb-5 md:pb-0 md:border-t-0 md:border-l border-dashed border-slate-600 grow flex flex-col justify-center basis-1 tabular-nums"
        >
            <div class="text-xl h-8"></div>
            <div class="text-2xl">
                <div class="flex flex-row items-center gap-2 justify-center">
                    <div>Original Score</div>

                    <div
                        class="cursor-pointer mb-1"
                        @click="playerData.resetAll()"
                        title="Reset all scores to imported values"
                    >
                        <Icon name="mynaui:undo"></Icon>
                    </div>
                </div>
            </div>
            <div class="text-5xl">
                {{ playerData.originalPlayerScore.toFixed(1) }}
            </div>
            <div class="text-xl h-8"></div>
        </div>
    </div>
</template>
