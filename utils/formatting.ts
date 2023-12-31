import type { CharacterClasses } from "~/composables/usePlayerData";

/**
 * Converts { level: 15, plus: 3 } to "15+++"
 * @param level
 * @param plus
 */
export function formatKeyPlus(plus: number) {
  return `${"+".repeat(plus)}`;
}

export function formatSeconds(millis: number) {
  const minutes = Math.floor(millis / 60_000);
  const seconds = Math.floor((millis % 60_000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function round(value: number, precision = 1) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.floor((value + 0.5) * multiplier) / multiplier;
}

export function classColor(className: CharacterClasses): string {
  if (className === undefined) return "";

  return {
    "Death Knight": "#C41E3A",
    "Demon Hunter": "#A330C9",
    Druid: "#FF7D0A",
    Hunter: "#ABD473",
    Mage: "#69CCF0",
    Monk: "#00FF96",
    Paladin: "#F48CBA",
    Priest: "#FFFFFF",
    Rogue: "#FFF569",
    Shaman: "#0070DE",
    Warlock: "#9482C9",
    Warrior: "#C79C6E",
  }[className];
}
