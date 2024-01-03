<script setup lang="ts">
import { useSessionStorage } from "@vueuse/core";
import { computed } from "vue";

const itemLevels = useSessionStorage("itemLevels", {
    head: 0,
    neck: 0,
    shoulder: 0,
    back: 0,
    chest: 0,
    wrist: 0,
    hands: 0,
    waist: 0,
    legs: 0,
    feet: 0,
    finger1: 0,
    finger2: 0,
    trinket1: 0,
    trinket2: 0,
    mainhand: 0,
    offhand: 0,
});

const labels = {
    head: "Head",
    neck: "Neck",
    shoulder: "Shoulder",
    back: "Back",
    chest: "Chest",
    wrist: "Wrist",
    hands: "Hands",
    waist: "Waist",
    legs: "Legs",
    feet: "Feet",
    finger1: "Ring",
    finger2: "Ring",
    trinket1: "Trinket",
    trinket2: "Trinket",
};

const useTwoHand = useSessionStorage("itemLevels.useTwoHand", false);

const equipmentLevels = computed(() => {
    return (
        (itemLevels.value.head ?? 0) +
        (itemLevels.value.neck ?? 0) +
        (itemLevels.value.shoulder ?? 0) +
        (itemLevels.value.back ?? 0) +
        (itemLevels.value.chest ?? 0) +
        (itemLevels.value.wrist ?? 0) +
        (itemLevels.value.hands ?? 0) +
        (itemLevels.value.waist ?? 0) +
        (itemLevels.value.legs ?? 0) +
        (itemLevels.value.feet ?? 0) +
        (itemLevels.value.finger1 ?? 0) +
        (itemLevels.value.finger2 ?? 0) +
        (itemLevels.value.trinket1 ?? 0) +
        (itemLevels.value.trinket2 ?? 0)
    );
});

const totalTwoHand = computed(() => {
    return (equipmentLevels.value + (itemLevels.value.mainhand ?? 0) + (itemLevels.value.mainhand ?? 0)) / 16;
});

const totalOneHand = computed(() => {
    return (equipmentLevels.value + (itemLevels.value.mainhand ?? 0) + (itemLevels.value.offhand ?? 0)) / 16;
});
</script>

<template>
    <div class="flex flex-col grow">
        <div class="p-5">
            <h2 class="text-xl">Item Level Calculator</h2>
            <div class="xl:w-1/2 text-slate-400 max-sm:text-sm">
                You want to find out what item level upgrade in which slot brings you to which overall item level? What
                crafted item helps you to the desired 470 item level to flex on your friends? What item you should by
                from the auction house to get to the minimum item level to get in a raid? Find out with this calculator.
            </div>
        </div>
        <div class="grid place-content-center grow">
            <div>
                <div class="flex flex-row justify-between w-screen lg:w-auto px-5">
                    <div class="flex flex-col gap-2">
                        <div
                            class="flex flex-col lg:flex-row items-center gap-2"
                            v-for="slot of ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist']"
                            :class="{ 'grow !lg:items-end': slot === 'wrist' }"
                        >
                            <input
                                class="input no-spin w-16 text-center"
                                type="number"
                                v-model.number="itemLevels[slot]"
                            />
                            <div>{{ labels[slot] }}</div>
                        </div>
                    </div>

                    <div class="my-auto grow flex flex-col items-center lg:px-20">
                        <b class="text-xl">Total</b>
                        <div class="border border-dashed border-slate-600 px-3 py-3 text-2xl rounded">
                            {{ useTwoHand ? totalTwoHand.toFixed(2) : totalOneHand.toFixed(2) }}
                        </div>

                        <div class="mt-3 mb-10">
                            <button
                                type="button"
                                class="inline-flex items-center button border border-teal-600 transition duration-300"
                                @click="useTwoHand = !useTwoHand"
                                :class="useTwoHand ? '' : '!bg-transparent border border-teal-600'"
                            >
                                <div class="w-8 h-8">
                                    <Icon
                                        name="material-symbols-light:check-box-outline"
                                        class="w-full h-full"
                                        v-if="useTwoHand"
                                    />
                                    <Icon
                                        name="material-symbols-light:check-box-outline-blank"
                                        class="w-full h-full"
                                        v-else
                                    />
                                </div>
                                Use two hand
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-col items-end gap-2">
                        <div
                            class="flex flex-col lg:flex-row-reverse items-center gap-2"
                            v-for="slot of [
                                'hands',
                                'waist',
                                'legs',
                                'feet',
                                'finger1',
                                'finger2',
                                'trinket1',
                                'trinket2',
                            ]"
                        >
                            <input
                                class="input no-spin w-16 text-center"
                                type="number"
                                v-model.number="itemLevels[slot]"
                            />
                            <div>{{ labels[slot] }}</div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row justify-center gap-5">
                    <div class="flex flex-col items-center gap-2">
                        <input
                            class="input no-spin w-16 text-center"
                            type="number"
                            v-model.number="itemLevels.mainhand"
                        />
                        <div>Main Hand</div>
                    </div>
                    <div
                        class="flex flex-col items-center gap-2 transition duration-300"
                        :class="{ 'opacity-20': useTwoHand }"
                    >
                        <input
                            class="input no-spin w-16 text-center"
                            :disabled="useTwoHand"
                            type="number"
                            v-model.number="itemLevels.offhand"
                        />
                        <div>Off Hand</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slot {
    @apply flex flex-row items-center gap-2;
}
</style>
