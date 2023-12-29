import Decimal from "decimal.js";
import type { DungeonDefinition } from "./dungeons";

export interface CalculatedScores {
  baseScore: {
    Tyrannical: Decimal;
    Fortified: Decimal;
  };
  weightedScore: {
    Tyrannical: Decimal;
    Fortified: Decimal;
  };
  weightedRawScore: {
    Tyrannical: Decimal;
    Fortified: Decimal;
  };
  higherScore: "Tyrannical" | "Fortified";
  totalScore: Decimal;
  totalRawScore: Decimal;
}

/**
 * Calculate the base score for a single run.
 */
export function calculateBaseScore(
  dungeon: DungeonDefinition,
  level: number,
  duration: number
): Decimal {
  const affixCount = getAffixCount(level);

  // gain or lose up to one level worth of score for being -40% to +40% of the timer
  const timerBonus = getTimerBonus(dungeon, duration);

  // levels above 10 are worth 2 extra points (7 instead of 5)
  const nAboveTen = Math.max(level - 10, 0);

  let calculatedLevel = timerBonus.plus(level);

  // substract one level if not timing it (not penalised the 2 points)
  if (timerBonus.lessThanOrEqualTo(0)) {
    calculatedLevel = calculatedLevel.minus(1);
  }

  const levelBonus = new Decimal(calculatedLevel).times(5);
  const aboveTenBonus = new Decimal(nAboveTen).times(2);
  const affixBonus = new Decimal(affixCount).times(10);

  return new Decimal(20).plus(levelBonus).plus(aboveTenBonus).plus(affixBonus);
}

/**
 * Calculate the scores for a single dungeon, consulting both tyrannical and fortified weeks.
 */
export function calculateScores(
  dungeon: DungeonDefinition,
  dungeonTime: OverallDungeonTime
): CalculatedScores {
  const tyrannicalScore = calculateBaseScore(
    dungeon,
    dungeonTime.Tyrannical.level,
    dungeonTime.Tyrannical.duration
  )
    .times(10)
    .round()
    .dividedBy(10);
  const fortifiedScore = calculateBaseScore(
    dungeon,
    dungeonTime.Fortified.level,
    dungeonTime.Fortified.duration
  )
    .times(10)
    .round()
    .dividedBy(10);

  const higherScore = tyrannicalScore.greaterThan(fortifiedScore)
    ? "Tyrannical"
    : "Fortified";

  const weightHeigher = 1.5;
  const weightLower = 0.5;

  const weightedRawScoreTyrannical = tyrannicalScore.times(
    higherScore === "Tyrannical" ? weightHeigher : weightLower
  );

  const weightedRawScoreFortified = fortifiedScore.times(
    higherScore === "Fortified" ? weightHeigher : weightLower
  );

  const totalRawScore = weightedRawScoreFortified.plus(
    weightedRawScoreTyrannical
  );

  return {
    baseScore: {
      Tyrannical: tyrannicalScore.times(10).round().dividedBy(10), // Math.round(tyrannicalScore * 10) / 10,
      Fortified: fortifiedScore.times(10).round().dividedBy(10), // Math.round(fortifiedScore * 10) / 10,
    } as const,
    weightedScore: {
      Tyrannical: weightedRawScoreTyrannical.times(10).round().dividedBy(10),
      Fortified: weightedRawScoreFortified.times(10).round().dividedBy(10),
    } as const,
    weightedRawScore: {
      Tyrannical: weightedRawScoreTyrannical,
      Fortified: weightedRawScoreFortified,
    },
    higherScore,
    totalScore: totalRawScore.times(10).round().dividedBy(10),
    totalRawScore: totalRawScore,
  };
}

export function calculatePlayerScore(
  scores: Record<DUNGEON_SHORTS, CalculatedScores>
): Decimal {
  return Object.values(scores).reduce((sum, score) => {
    return score.totalRawScore.plus(sum);
  }, new Decimal(0));
}

export function getAffixCount(level: number) {
  return level >= 14 ? 3 : level >= 7 ? 2 : 1;
}

/**
 * Return the maximum time that still rewards the given keyLevel / plus
 *
 * @param dungeon  The dungeon definition (use getDungeon() to get it)
 * @param plus      How many levels did key get upgraded?
 */
export function getTimeForKeyPlus(dungeon: DungeonDefinition, plus: 1 | 2 | 3) {
  switch (plus) {
    case 1:
      return dungeon.plus1;
    case 2:
      return dungeon.plus2;
    case 3:
      return dungeon.plus3;
  }
}

export function getTimerBonus(
  dungeon: DungeonDefinition,
  duration: number
): Decimal {
  const dungeonTimer = dungeon.plus1;
  const maxBonusTime = new Decimal(dungeonTimer).times(0.4);
  const beatTimerBy = dungeonTimer - duration;
  const bonus = new Decimal(beatTimerBy).dividedBy(maxBonusTime);

  return bonus.clamp(-1, 1);
}
