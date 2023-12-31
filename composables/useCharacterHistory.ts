import type { CharacterInfo } from "./usePlayerData";

export function useCharacterHistory() {
  const list = useLocalStorage<CharacterInfo[]>("characterHistory", []);

  function save(characterInfo: CharacterInfo) {
    list.value = list.value.filter((char) => !compare(char, characterInfo));
    list.value = [characterInfo, ...list.value].splice(0, 6);
  }

  function compare(infoA: CharacterInfo, infoB: CharacterInfo) {
    return (
      infoA.name === infoB.name &&
      infoA.realm === infoB.realm &&
      infoA.region === infoB.region
    );
  }

  function remove(info: CharacterInfo) {
    list.value = list.value.filter((char) => !compare(char, info));
  }

  return { list, save, remove } as const;
}
