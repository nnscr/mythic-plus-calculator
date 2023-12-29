export function time(minutes: number, seconds: number) {
  return minutes * 60_000 + seconds * 60;
}

/**
 * Converts { level: 15, plus: 3 } to "15+++"
 * @param level
 * @param plus
 */
export function formatKeyLevel(level: number, plus: 1 | 2 | 3) {
  return `${level}${"+".repeat(plus)}`;
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
