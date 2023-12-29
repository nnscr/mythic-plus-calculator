import { test, expect, describe, it } from "vitest";
import {
  calculateBaseScore,
  calculateScores,
  calculatePlayerScore,
} from "../utils/score";
import { dungeons } from "../utils/dungeons";
import { Decimal } from "decimal.js";

const testCases = {
  allonsy: {
    times: {
      EB: {
        Tyrannical: { level: 24, plus: 1, duration: 1702196 },
        Fortified: { level: 21, plus: 1, duration: 1876504 },
      },
      BRH: {
        Tyrannical: { level: 24, plus: 2, duration: 1728706 },
        Fortified: { level: 22, plus: 2, duration: 1636840 },
      },
      AD: {
        Tyrannical: { level: 24, plus: 1, duration: 1617173 },
        Fortified: { level: 22, plus: 2, duration: 1261927 },
      },
      WM: {
        Tyrannical: { level: 22, plus: 2, duration: 1750256 },
        Fortified: { level: 22, plus: 1, duration: 1794199 },
      },
      TOTT: {
        Tyrannical: { level: 22, plus: 1, duration: 1713301 },
        Fortified: { level: 22, plus: 1, duration: 1907494 },
      },
      RISE: {
        Tyrannical: { level: 22, plus: 1, duration: 1801786 },
        Fortified: { level: 22, plus: 1, duration: 2110938 },
      },
      DHT: {
        Tyrannical: { level: 22, plus: 1, duration: 1534763 },
        Fortified: { level: 21, plus: 2, duration: 1300294 },
      },
      FALL: {
        Tyrannical: { level: 21, plus: 1, duration: 1718329 },
        Fortified: { level: 20, plus: 3, duration: 1212747 },
      },
    },
    expectedScores: {
      EB: { Tyrannical: 299.7, Fortified: 88.9, Total: 388.6 },
      BRH: { Tyrannical: 300.8, Fortified: 93.5, Total: 394.3 },
      AD: { Tyrannical: 299, Fortified: 93.9, Total: 392.8 },
      WM: { Tyrannical: 279.9, Fortified: 93.2, Total: 373.1 },
      TOTT: { Tyrannical: 279, Fortified: 92.4, Total: 371.4 },
      RISE: { Tyrannical: 279.2, Fortified: 92.2, Total: 371.3 },
      DHT: { Tyrannical: 278.7, Fortified: 90.3, Total: 369 },
      FALL: { Tyrannical: 268.5, Fortified: 87.5, Total: 356 },
    },
    expectedTotal: 3016.3,
  },
  xynila: {
    times: {
      EB: {
        Tyrannical: { level: 24, plus: 1, duration: 1702196 },
        Fortified: { level: 22, plus: 1, duration: 1715865 },
      },
      BRH: {
        Tyrannical: { level: 24, plus: 2, duration: 1728706 },
        Fortified: { level: 22, plus: 2, duration: 1516403 },
      },
      AD: {
        Tyrannical: { level: 24, plus: 1, duration: 1617173 },
        Fortified: { level: 22, plus: 2, duration: 1261927 },
      },
      WM: {
        Tyrannical: { level: 22, plus: 2, duration: 1750256 },
        Fortified: { level: 22, plus: 2, duration: 1401077 },
      },
      TOTT: {
        Tyrannical: { level: 24, plus: 1, duration: 2033680 },
        Fortified: { level: 22, plus: 1, duration: 1907494 },
      },
      RISE: {
        Tyrannical: { level: 22, plus: 1, duration: 1801786 },
        Fortified: { level: 22, plus: 1, duration: 2110938 },
      },
      DHT: {
        Tyrannical: { level: 22, plus: 1, duration: 1534763 },
        Fortified: { level: 21, plus: 2, duration: 1300294 },
      },
      FALL: {
        Tyrannical: { level: 22, plus: 2, duration: 1559913 },
        Fortified: { level: 22, plus: 2, duration: 1424879 },
      },
    },
    expectedScores: {
      EB: { Tyrannical: 299.7, Fortified: 92.9, Total: 392.6 },
      BRH: { Tyrannical: 300.8, Fortified: 93.9, Total: 394.6 },
      AD: { Tyrannical: 299, Fortified: 93.9, Total: 392.8 },
      WM: { Tyrannical: 93.3, Fortified: 282.9, Total: 376.2 },
      TOTT: { Tyrannical: 297, Fortified: 92.4, Total: 389.4 },
      RISE: { Tyrannical: 279.2, Fortified: 92.2, Total: 371.3 },
      DHT: { Tyrannical: 278.7, Fortified: 90.3, Total: 369 },
      FALL: { Tyrannical: 93.5, Fortified: 281.7, Total: 375.2 },
    },
    expectedTotal: 3061.0,
  },
  crossair: {
    times: {
      EB: {
        Tyrannical: { level: 20, plus: 2, duration: 1561905 },
        Fortified: { level: 19, plus: 0, duration: 2326443 },
      },
      BRH: {
        Tyrannical: { level: 21, plus: 1, duration: 1966417 },
        Fortified: { level: 12, plus: 3, duration: 898992 },
      },
      AD: {
        Tyrannical: { level: 22, plus: 1, duration: 1540490 },
        Fortified: { level: 16, plus: 1, duration: 1562688 },
      },
      WM: {
        Tyrannical: { level: 20, plus: 2, duration: 1674573 },
        Fortified: { level: 18, plus: 1, duration: 1832327 },
      },
      TOTT: {
        Tyrannical: { level: 21, plus: 1, duration: 1813679 },
        Fortified: { level: 16, plus: 2, duration: 1559077 },
      },
      RISE: {
        Tyrannical: { level: 18, plus: 1, duration: 1820992 },
        Fortified: { level: 16, plus: 1, duration: 1997723 },
      },
      DHT: {
        Tyrannical: { level: 20, plus: 2, duration: 1288305 },
        Fortified: { level: 15, plus: 2, duration: 1426153 },
      },
      FALL: {
        Tyrannical: { level: 20, plus: 1, duration: 1784345 },
        Fortified: { level: 19, plus: 2, duration: 1458863 },
      },
    },
    expectedScores: {
      EB: { Tyrannical: 258.9, Fortified: 77.9, Total: 336.8 },
      BRH: { Tyrannical: 267.2, Fortified: 54.5, Total: 321.7 },
      AD: { Tyrannical: 278.7, Fortified: 71.9, Total: 350.6 },
      WM: { Tyrannical: 259.7, Fortified: 79.1, Total: 338.8 },
      TOTT: { Tyrannical: 267.6, Fortified: 72.5, Total: 340.1 },
      RISE: { Tyrannical: 237, Fortified: 71.5, Total: 308.5 },
      DHT: { Tyrannical: 260.4, Fortified: 68.8, Total: 329.2 },
      FALL: { Tyrannical: 257.4, Fortified: 83.3, Total: 340.7 },
    },
    expectedTotal: 2666.1,
  },
  xervius: {
    times: {
      EB: {
        Tyrannical: { level: 11, plus: 3, duration: 1167145 },
        Fortified: { level: 17, plus: 2, duration: 1538180 },
      },
      BRH: {
        Tyrannical: { level: 16, plus: 2, duration: 1326170 },
        Fortified: { level: 17, plus: 1, duration: 1813778 },
      },
      AD: {
        Tyrannical: { level: 15, plus: 2, duration: 1157171 },
        Fortified: { level: 17, plus: 1, duration: 1602503 },
      },
      WM: {
        Tyrannical: { level: 15, plus: 2, duration: 1377045 },
        Fortified: { level: 18, plus: 1, duration: 1832327 },
      },
      TOTT: {
        Tyrannical: { level: 15, plus: 1, duration: 2009434 },
        Fortified: { level: 13, plus: 1, duration: 1723673 },
      },
      RISE: {
        Tyrannical: { level: 17, plus: 1, duration: 1899965 },
        Fortified: { level: 14, plus: 1, duration: 1923390 },
      },
      DHT: {
        Tyrannical: { level: 16, plus: 1, duration: 1467933 },
        Fortified: { level: 15, plus: 1, duration: 1658597 },
      },
      FALL: {
        Tyrannical: { level: 14, plus: 0, duration: 2127388 },
        Fortified: { level: 18, plus: 1, duration: 1847495 },
      },
    },
    expectedScores: {
      EB: { Tyrannical: 51, Fortified: 227.7, Total: 278.7 },
      BRH: { Tyrannical: 73.4, Fortified: 226.5, Total: 299.9 },
      AD: { Tyrannical: 69.8, Fortified: 225.6, Total: 295.4 },
      WM: { Tyrannical: 69.9, Fortified: 237.3, Total: 307.2 },
      TOTT: { Tyrannical: 202.8, Fortified: 56.5, Total: 259.3 },
      RISE: { Tyrannical: 225.8, Fortified: 64.7, Total: 290.5 },
      DHT: { Tyrannical: 216.5, Fortified: 68, Total: 284.5 },
      FALL: { Tyrannical: 61.3, Fortified: 235.8, Total: 297 },
    },
    expectedTotal: 2312.3,
  },
  yodafotm: {
    times: {
      EB: {
        Tyrannical: { level: 28, plus: 1, duration: 1972779 },
        Fortified: { level: 28, plus: 1, duration: 1781290 },
      },
      BRH: {
        Tyrannical: { level: 30, plus: 1, duration: 2105136 },
        Fortified: { level: 30, plus: 1, duration: 2004242 },
      },
      AD: {
        Tyrannical: { level: 30, plus: 1, duration: 1752690 },
        Fortified: { level: 30, plus: 1, duration: 1778204 },
      },
      WM: {
        Tyrannical: { level: 29, plus: 1, duration: 2005843 },
        Fortified: { level: 30, plus: 1, duration: 2079034 },
      },
      TOTT: {
        Tyrannical: { level: 28, plus: 1, duration: 2003474 },
        Fortified: { level: 28, plus: 1, duration: 2001507 },
      },
      RISE: {
        Tyrannical: { level: 28, plus: 1, duration: 2034654 },
        Fortified: { level: 28, plus: 1, duration: 2156553 },
      },
      DHT: {
        Tyrannical: { level: 28, plus: 1, duration: 1625451 },
        Fortified: { level: 29, plus: 1, duration: 1780547 },
      },
      FALL: {
        Tyrannical: { level: 30, plus: 1, duration: 2012526 },
        Fortified: { level: 30, plus: 1, duration: 1990433 },
      },
    },
    expectedScores: {
      EB: { Tyrannical: 113.1, Fortified: 341, Total: 454 },
      BRH: { Tyrannical: 120.2, Fortified: 361.4, Total: 481.5 },
      AD: { Tyrannical: 360.5, Fortified: 120.1, Total: 480.6 },
      WM: { Tyrannical: 117.1, Fortified: 361.2, Total: 478.3 },
      TOTT: { Tyrannical: 113.1, Fortified: 339.3, Total: 452.4 },
      RISE: { Tyrannical: 340, Fortified: 113, Total: 453 },
      DHT: { Tyrannical: 113.6, Fortified: 349.7, Total: 463.3 },
      FALL: { Tyrannical: 120.1, Fortified: 360.5, Total: 480.6 },
    },
    expectedTotal: 3743.8,
  },
  // _template: {
  //   times: {
  //     EB: {
  //       Tyrannical: { level:, plus: , duration: },
  //       Fortified: { level: , plus: , duration: },
  //     },
  //     BRH: {
  //       Tyrannical: { level: , plus: , duration:  },
  //       Fortified: { level: , plus: , duration:  },
  //     },
  //     AD: {
  //       Tyrannical: { level: , plus: , duration:  },
  //       Fortified: { level: , plus: , duration:  },
  //     },
  //     WM: {
  //       Tyrannical: { level: , plus: , duration:  },
  //       Fortified: { level: , plus: , duration:  },
  //     },
  //     TOTT: {
  //       Tyrannical: { level: , plus: , duration:  },
  //       Fortified: { level: , plus: , duration:  },
  //     },
  //     RISE: {
  //       Tyrannical: { level: , plus: , duration:  },
  //       Fortified: { level: , plus: , duration:  },
  //     },
  //     DHT: {
  //       Tyrannical: { level: , plus: , duration:  },
  //       Fortified: { level: , plus: , duration:  },
  //     },
  //     FALL: {
  //       Tyrannical: { level: , plus: , duration:  },
  //       Fortified: { level: , plus: , duration:  },
  //     },
  //   },
  //   expectedScores: {
  //     EB: { Tyrannical: , Fortified: , Total:  },
  //     BRH: { Tyrannical: , Fortified: , Total:  },
  //     AD: { Tyrannical: , Fortified: , Total:  },
  //     WM: { Tyrannical: , Fortified: , Total:  },
  //     TOTT: { Tyrannical: , Fortified: , Total:  },
  //     RISE: { Tyrannical: , Fortified: , Total:  },
  //     DHT: { Tyrannical: , Fortified: , Total:  },
  //     FALL: { Tyrannical: , Fortified: , Total:  },
  //   },
  //   expectedTotal: ,
  // }
};

it("should calculate base scores correctly", async () => {
  // todo
  expect(calculateBaseScore(dungeons.DHT, 22, 1502040).equals(150.2));
  expect(calculateBaseScore(dungeons.DHT, 21, 1262400).equals(180.7));
  expect(calculateBaseScore(dungeons.BRH, 21, 1742280).equals(179.4));
  expect(calculateBaseScore(dungeons.BRH, 24, 1682880).equals(200.8));
  expect(calculateBaseScore(dungeons.EB, 22, 1860960).equals(185.7));
  expect(calculateBaseScore(dungeons.EB, 24, 1681320).equals(199.8));
});

for (const [
  testName,
  { times, expectedScores, expectedTotal },
] of Object.entries(testCases)) {
  describe(`${testName} test case`, async () => {
    const allScores: Record<DUNGEON_SHORTS, OverallDungeonTime> = {};

    for (const [dungeon, dungeonTimes] of Object.entries(times)) {
      const scores = calculateScores(dungeons[dungeon], dungeonTimes);

      allScores[dungeon] = scores;

      it(`should calculate ${dungeon} weighted score for tyrannical correctly (raw: ${scores.weightedRawScore.Tyrannical})`, async () => {
        expect(scores.weightedScore.Tyrannical.toNumber()).toEqual(
          expectedScores[dungeon].Tyrannical
        );
      });
      it(`should calculate ${dungeon} weighted score for fortified correctly (raw: ${scores.weightedRawScore.Fortified})`, async () => {
        expect(scores.weightedScore.Fortified.toNumber()).toEqual(
          expectedScores[dungeon].Fortified
        );
      });

      it(`should calculate ${dungeon} total score correctly (raw: ${scores.totalRawScore})`, async () => {
        expect(scores.totalScore.toNumber()).toEqual(
          expectedScores[dungeon].Total
        );
      });
    }

    const totalScore = calculatePlayerScore(allScores);
    it(`should calculate total score correctly (raw: ${totalScore})`, async () => {
      expect(totalScore.toNumber()).toEqual(expectedTotal);
    });
  });
}
