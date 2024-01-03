<script setup lang="ts">
import { computed } from "vue";

interface KeyLevelReward {
    level: number;
    loot: ItemLevel;
    vault: ItemLevel;
    crest: CrestLevel;
}

interface ItemLevel {
    level: number;
    track: UpgradeTrack;
}

type CrestLevel = "Whelpling" | "Drake" | "Wyrm" | "Aspect";
type UpgradeTrack = "Veteran" | "Champion" | "Hero" | "Mythic";

function create(level: number, loot: ItemLevel, vault: ItemLevel, crest: KeyLevelReward["crest"]): KeyLevelReward {
    return {
        level,
        loot,
        vault,
        crest,
    };
}

function item(level: number, track: UpgradeTrack): ItemLevel {
    return { level, track };
}

function getReward(level: number): KeyLevelReward {
    switch (level) {
        case 1:
            return create(level, item(441, "Veteran"), item(454, "Champion"), "Whelpling");
        case 2:
            return create(level, item(441, "Veteran"), item(454, "Champion"), "Whelpling");
        case 3:
            return create(level, item(444, "Veteran"), item(457, "Champion"), "Whelpling");
        case 4:
            return create(level, item(444, "Veteran"), item(460, "Champion"), "Whelpling");
        case 5:
            return create(level, item(447, "Veteran"), item(460, "Champion"), "Drake");
        case 6:
            return create(level, item(447, "Veteran"), item(463, "Champion"), "Drake");
        case 7:
            return create(level, item(450, "Veteran"), item(463, "Champion"), "Drake");
        case 8:
            return create(level, item(450, "Veteran"), item(467, "Hero"), "Drake");
        case 9:
            return create(level, item(454, "Champion"), item(467, "Hero"), "Drake");
        case 10:
            return create(level, item(454, "Champion"), item(470, "Hero"), "Drake");
        case 11:
            return create(level, item(457, "Champion"), item(470, "Hero"), "Wyrm");
        case 12:
            return create(level, item(457, "Champion"), item(473, "Hero"), "Wyrm");
        case 13:
            return create(level, item(460, "Champion"), item(473, "Hero"), "Wyrm");
        case 14:
            return create(level, item(460, "Champion"), item(473, "Hero"), "Wyrm");
        case 15:
            return create(level, item(463, "Champion"), item(476, "Hero"), "Wyrm");
        case 16:
            return create(level, item(463, "Champion"), item(476, "Hero"), "Aspect");
        case 17:
            return create(level, item(467, "Hero"), item(476, "Hero"), "Aspect");
        case 18:
            return create(level, item(467, "Hero"), item(480, "Mythic"), "Aspect");
        case 19:
            return create(level, item(470, "Hero"), item(480, "Mythic"), "Aspect");
        default:
            return create(level, item(470, "Hero"), item(483, "Mythic"), "Aspect");
    }
}

const levels = computed(() => {
    const levels: KeyLevelReward[] = [];
    for (let i = 1; i <= 20; i++) {
        levels.push(getReward(i));
    }
    return levels;
});
</script>

<template>
    <div class="flex flex-col items-center my-auto py-5">
        <table class="text-center">
            <thead>
                <tr>
                    <th class="px-5">Key Level</th>
                    <th class="px-5">Loot</th>
                    <th class="px-5">Vault</th>
                    <th class="px-7">Crest</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in levels">
                    <td>{{ i.level }}</td>
                    <td :class="'ilvl-' + i.loot.track">{{ i.loot.level }}</td>
                    <td :class="'ilvl-' + i.vault.track">{{ i.vault.level }}</td>
                    <td :class="'crest-' + i.crest">{{ i.crest }}</td>
                </tr>
            </tbody>
        </table>

        <div class="flex flex-row gap-3 mt-5">
            <b>Legend:</b>
            <div class="ilvl-Veteran">Veteran</div>
            <div class="ilvl-Champion">Champion</div>
            <div class="ilvl-Hero">Hero</div>
            <div class="ilvl-Mythic">Mythic</div>
        </div>
    </div>
</template>

<style scoped>
.ilvl-Veteran,
.crest-Whelpling {
    @apply text-lime-500;
}

.ilvl-Champion,
.crest-Drake {
    @apply text-sky-300;
}

.ilvl-Hero,
.crest-Wyrm {
    @apply text-violet-700;
}

.ilvl-Mythic,
.crest-Aspect {
    @apply text-amber-500;
}
</style>
