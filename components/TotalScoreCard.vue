<script setup lang="ts">
const playerData = usePlayerData();
</script>

<template>
  <div
    class="flex flex-row text-center py-8 justify-center border border-dashed border-slate-600 text-white my-5 items-stretch"
  >
    <div
      class="pr-5 mr-5 border-r border-dashed border-slate-600 grow basis-1"
      v-if="playerData.isImportedCharacter"
    >
      <!-- <div class="text-slate-500 text-sm">
        {{ playerData.characterInfo.region.toUpperCase() }}-{{
          playerData.characterInfo.realm
        }}
      </div> -->
      <img
        :src="playerData.characterInfo.thumbnailUrl"
        class="w-24 h-24 mx-auto mb-3 rounded-2xl"
      />

      <div class="text-3xl">
        {{ playerData.characterInfo.name }}
      </div>

      <div class="" v-if="playerData.characterInfo.guildName">
        &lt;{{ playerData.characterInfo.guildName }}&gt;
      </div>

      <div
        class="text-sm"
        :style="{ color: classColor(playerData.characterInfo.class) }"
      >
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
            v-if="
              !playerData.playerScore.equals(playerData.originalPlayerScore)
            "
            :hypothetical-score="playerData.playerScore"
            :original-score="playerData.originalPlayerScore"
          />
        </Transition>
      </div>
    </div>
    <div
      v-if="playerData.isImportedCharacter"
      class="pl-5 ml-5 border-l border-dashed border-slate-600 grow flex flex-col justify-center basis-1 tabular-nums"
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
