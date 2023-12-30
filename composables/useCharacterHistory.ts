export interface CharacterName {
  name: string;
  realm: string;
  region: string;
  characterClass: string;
}

export function useCharacterHistory() {
  const list = useLocalStorage<CharacterName[]>("characterHistory", []);

  function save(
    region: string,
    realm: string,
    name: string,
    characterClass: string
  ) {
    list.value = list.value.filter(
      (char) => !compare(char, { name, realm, region, characterClass })
    );
    list.value = [
      { name, realm, region, characterClass },
      ...list.value,
    ].splice(0, 6);
  }

  function compare(infoA: CharacterName, infoB: CharacterName) {
    return (
      infoA.name === infoB.name &&
      infoA.realm === infoB.realm &&
      infoA.region === infoB.region
    );
  }

  function remove(info: CharacterName) {
    list.value = list.value.filter((char) => !compare(char, info));
  }

  return { list, save, remove } as const;
}
