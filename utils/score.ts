import Decimal from "decimal.js";
import type { DungeonDefinition } from "./dungeons";

export interface CalculatedScores {
  rawBaseScore: {
    Tyrannical: Decimal;
    Fortified: Decimal;
  };
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
  if (level <= 0) {
    // nu run for this dungeon
    return new Decimal(0);
  }

  const affixCount = getAffixCount(level);

  // gain or lose up to one level worth of score for being -40% to +40% of the timer
  const timerBonus = getTimerBonus(dungeon, duration);

  if (timerBonus === null) {
    // massive overtuning, no score
    return new Decimal(0);
  }

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
  const tyrannicalRawScore = calculateBaseScore(
    dungeon,
    dungeonTime.Tyrannical.level,
    dungeonTime.Tyrannical.duration
  );
  const tyrannicalScore = tyrannicalRawScore.times(10).round().dividedBy(10);

  const fortifiedRawScore = calculateBaseScore(
    dungeon,
    dungeonTime.Fortified.level,
    dungeonTime.Fortified.duration
  );
  const fortifiedScore = fortifiedRawScore.times(10).round().dividedBy(10);

  const higherScore = tyrannicalScore.greaterThan(fortifiedScore)
    ? "Tyrannical"
    : "Fortified";

  const weightHeigher = 1.5;
  const weightLower = 0.5;

  const weightTyrannical =
    higherScore === "Tyrannical" ? weightHeigher : weightLower;
  const weightForitifed =
    higherScore === "Fortified" ? weightHeigher : weightLower;

  // weighted scores are calculated as actual floats, because why not
  const weightedRawScoreTyrannical = new Decimal(
    tyrannicalScore.toNumber() * weightTyrannical
  );

  const weightedRawScoreFortified = new Decimal(
    fortifiedScore.toNumber() * weightForitifed
  );

  // using decimal.plus actually doesnt work here
  // const totalRawScore = weightedRawScoreFortified.plus(weightedRawScoreTyrannical);

  // instead we add the floats (which is ridiculous, but it's how they do it...)
  // const totalRawScore = tyrannicalRawScore
  //   .times(weightTyrannical)
  //   .plus(fortifiedRawScore.times(weightForitifed));
  const totalRawScore = new Decimal(
    weightedRawScoreFortified.toNumber() + weightedRawScoreTyrannical.toNumber()
  );

  // const totalRawScore = tyrannicalScore
  //   .times(weightTyrannical)
  //   .plus(fortifiedScore.times(weightForitifed));

  return {
    rawBaseScore: {
      Tyrannical: tyrannicalRawScore,
      Fortified: fortifiedRawScore,
    },
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
    totalRawScore: new Decimal(
      tyrannicalRawScore.toNumber() * weightTyrannical
    ).plus(new Decimal(fortifiedRawScore.toNumber() * weightForitifed)),
  };
}

export function calculatePlayerScore(
  scores: Record<DUNGEON_SHORTS, CalculatedScores>
): Decimal {
  let sum = new Decimal(0);

  for (const score of Object.values(scores)) {
    sum = score.totalRawScore.plus(sum);
  }

  // return sum;
  return sum.times(10).round().dividedBy(10);
  // return new Decimal(
  //   Object.values(scores).reduce((sum, score) => {
  //     return score.totalScore.toNumber() + sum;
  //   }, 0)
  // );
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
): Decimal | null {
  const dungeonTimer = dungeon.plus1;
  const maxBonusTime = new Decimal(dungeonTimer).times(0.4);
  const beatTimerBy = dungeonTimer - duration;
  const bonus = new Decimal(beatTimerBy).dividedBy(maxBonusTime);

  if (bonus.lessThan(-1)) {
    // massive overtiming, no score, indicated by null
    return null;
  }

  return bonus.clamp(-1, 1);
}
