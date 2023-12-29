import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import {
  dungeons,
  type DUNGEON_SHORTS,
  type DungeonDefinition,
} from "../utils/dungeons";
import {
  calculateBaseScore,
  calculatePlayerScore,
  calculateScores,
  type CalculatedScores,
} from "../utils/score";

Decimal.set({ precision: 20, rounding: 4 });

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
  seraphinexd: {
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
  bigbirdo: {
    times: {
      EB: {
        Tyrannical: { level: 27, plus: 1, duration: 1818868 },
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
        Fortified: { level: 27, plus: 1, duration: 2079700 },
      },
      DHT: {
        Tyrannical: { level: 28, plus: 1, duration: 1625451 },
        Fortified: { level: 29, plus: 1, duration: 1780547 },
      },
      FALL: {
        Tyrannical: { level: 30, plus: 1, duration: 2012526 },
        Fortified: { level: 29, plus: 1, duration: 1921376 },
      },
    },
    expectedScores: {
      EB: { Tyrannical: 110, Fortified: 341, Total: 451 },
      BRH: { Tyrannical: 120.2, Fortified: 361.4, Total: 481.5 },
      AD: { Tyrannical: 360.5, Fortified: 120.1, Total: 480.6 },
      WM: { Tyrannical: 117.1, Fortified: 361.2, Total: 478.3 },
      TOTT: { Tyrannical: 113.1, Fortified: 339.3, Total: 452.4 },
      RISE: { Tyrannical: 340, Fortified: 109.8, Total: 449.8 },
      DHT: { Tyrannical: 113.6, Fortified: 349.7, Total: 463.3 },
      FALL: { Tyrannical: 360.3, Fortified: 116.9, Total: 477.2 },
    },
    expectedTotal: 3734.1,
  },
  // lowbob: {
  //   // Nágia-Silvermoon
  //   times: {
  //     EB: {
  //       Tyrannical: { level: 13, plus: 3, duration: 1145587 },
  //       Fortified: { level: 14, plus: 3, duration: 1149055 },
  //     },
  //     BRH: {
  //       Tyrannical: { level: 13, plus: 3, duration: 1020150 },
  //       Fortified: { level: 11, plus: 3, duration: 963027 },
  //     },
  //     AD: {
  //       Tyrannical: { level: 16, plus: 2, duration: 1104789 },
  //       Fortified: { level: 13, plus: 3, duration: 903501 },
  //     },
  //     WM: {
  //       Tyrannical: { level: 15, plus: 2, duration: 1593533 },
  //       Fortified: { level: 11, plus: 3, duration: 883011 },
  //     },
  //     TOTT: {
  //       Tyrannical: { level: 14, plus: 2, duration: 1343792 },
  //       Fortified: { level: 11, plus: 3, duration: 1096762 },
  //     },
  //     RISE: {
  //       Tyrannical: { level: 13, plus: 2, duration: 1487315 },
  //       Fortified: { level: 2, plus: 2, duration: 1324171 },
  //     },
  //     DHT: {
  //       Tyrannical: { level: 13, plus: 2, duration: 1109068 },
  //       Fortified: { level: 11, plus: 3, duration: 987965 },
  //     },
  //     FALL: {
  //       Tyrannical: { level: 14, plus: 3, duration: 1053018 },
  //       Fortified: { level: 11, plus: 3, duration: 894534 },
  //     },
  //   },
  //   expectedScores: {
  //     EB: { Tyrannical: 58, Fortified: 199.5, Total: 257.5 },
  //     BRH: { Tyrannical: 174, Fortified: 51, Total: 225 },
  //     AD: { Tyrannical: 220.2, Fortified: 58, Total: 278.2 },
  //     WM: { Tyrannical: 207.8, Fortified: 51, Total: 258.8 },
  //     TOTT: { Tyrannical: 198.5, Fortified: 51, Total: 249.5 },
  //     RISE: { Tyrannical: 172.4, Fortified: 22.3, Total: 194.7 },
  //     DHT: { Tyrannical: 173.7, Fortified: 51, Total: 224.7 },
  //     FALL: { Tyrannical: 199.5, Fortified: 51, Total: 250.5 },
  //   },
  //   expectedTotal: 1938.8,
  // },
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

describe("should calculate base scores correctly", async () => {
  const tests: [DungeonDefinition, number, number, number][] = [
    // dungeon, level, duration, expected base score
    [dungeons.BRH, 24, 1728706, 200.5],
    [dungeons.EB, 24, 1702196, 199.8],
    [dungeons.AD, 24, 1617173, 199.3],
    [dungeons.WM, 22, 1750256, 186.6],
    [dungeons.RISE, 22, 1801786, 186.1],
    [dungeons.TOTT, 22, 1713301, 186],
    [dungeons.DHT, 22, 1534763, 185.8],
    [dungeons.FALL, 21, 1718329, 179],
    [dungeons.AD, 22, 1261927, 187.7],
    [dungeons.BRH, 22, 1636840, 187],
    [dungeons.WM, 22, 1794199, 186.4],
    [dungeons.TOTT, 22, 1907494, 184.8],
    [dungeons.RISE, 22, 2110938, 184.3],
    [dungeons.DHT, 21, 1300294, 180.5],
    [dungeons.EB, 21, 1876504, 177.7],
    [dungeons.FALL, 20, 1212747, 175],
    [dungeons.RISE, 13, 1487315, 114.9],
    // [dungeons.RISE, 2, 1324171, 44.6],
    [dungeons.BRH, 24, 1728706, 200.5],
    [dungeons.EB, 24, 1702196, 199.8],
    [dungeons.AD, 24, 1617173, 199.3],
    [dungeons.TOTT, 24, 2033680, 198],
    [dungeons.WM, 22, 1401077, 188.6],
    [dungeons.FALL, 22, 1424879, 187.8],
    [dungeons.RISE, 22, 1801786, 186.1],
    [dungeons.DHT, 22, 1534763, 185.8],
    [dungeons.AD, 22, 1261927, 187.7],
    [dungeons.BRH, 22, 1516403, 187.7],
    [dungeons.FALL, 22, 1559913, 186.9],
    [dungeons.WM, 22, 1750256, 186.6],
    [dungeons.EB, 22, 1715865, 185.7],
    [dungeons.TOTT, 22, 1907494, 184.8],
    [dungeons.RISE, 22, 2110938, 184.3],
    [dungeons.DHT, 21, 1300294, 180.5],
    [dungeons.EB, 9, 1465360, 88.3],
    [dungeons.DHT, 8, 1206956, 84.1],
    [dungeons.BRH, 7, 1960929, 76.2],
    [dungeons.AD, 6, 1621887, 61.2],
    [dungeons.FALL, 5, 1419299, 58.8],
    [dungeons.TOTT, 2, 1026024, 45],
    [dungeons.WM, 2, 1352392, 44.9],
    [dungeons.EB, 2, 911873, 45],
    // no score
    [dungeons.AD, 0, 0, 0],
    // massively overtimed
    [dungeons.AD, 24, 9999999999, 0],
    // almost massively overtimed
    [dungeons.AD, 24, 2_521_398, 188],
    // exactly massively overtimed
    [dungeons.AD, 24, 2_521_399, 0],
  ];

  for (const x of tests) {
    it(`for ${x[0].short} level ${x[1]} duration ${x[2]} should be ${x[3]}`, () => {
      expect(
        calculateBaseScore(x[0], x[1], x[2])
          .times(10)
          .round()
          .dividedBy(10)
          .toNumber()
      ).toEqual(x[3]);
    });
  }
});

describe("calculate weight scores", async () => {
  for (const [
    testName,
    { times, expectedScores, expectedTotal },
  ] of Object.entries(testCases)) {
    for (const [dungeon_, dungeonTimes] of Object.entries(times)) {
      const dungeon = dungeon_ as DUNGEON_SHORTS;
      const scores = calculateScores(dungeons[dungeon], dungeonTimes);

      it(`${testName} should calculate ${dungeon} weighted score for tyrannical correctly (raw: ${scores.weightedRawScore.Tyrannical}, base ${scores.baseScore.Tyrannical}, raw base ${scores.rawBaseScore.Tyrannical})`, async () => {
        expect(scores.weightedScore.Tyrannical.toNumber()).toEqual(
          expectedScores[dungeon].Tyrannical
        );
      });
      it(`${testName} should calculate ${dungeon} weighted score for fortified correctly (raw: ${scores.weightedRawScore.Fortified}, base ${scores.baseScore.Fortified}, raw base ${scores.rawBaseScore.Fortified}, duration ${dungeonTimes.Fortified.duration}, level ${dungeonTimes.Fortified.level})`, async () => {
        expect(scores.weightedScore.Fortified.toNumber()).toEqual(
          expectedScores[dungeon].Fortified
        );
      });
    }
  }
});

describe("calculate dungeon totals", async () => {
  for (const [
    testName,
    { times, expectedScores, expectedTotal },
  ] of Object.entries(testCases)) {
    const allScores: Record<string, CalculatedScores> = {};

    for (const [dungeon_, dungeonTimes] of Object.entries(times)) {
      const dungeon = dungeon_ as DUNGEON_SHORTS;
      const scores = calculateScores(dungeons[dungeon], dungeonTimes);

      allScores[dungeon] = scores;

      it(`${testName} should calculate ${dungeon} dungeon total score correctly (raw: ${scores.totalRawScore})`, async () => {
        expect(scores.totalScore.toNumber()).toEqual(
          expectedScores[dungeon].Total
        );
      });
    }
  }
});

describe("calculate player totals", async () => {
  {
    for (const [
      testName,
      { times, expectedScores, expectedTotal },
    ] of Object.entries(testCases)) {
      const allScores: Record<string, CalculatedScores> = {};

      for (const [dungeon_, dungeonTimes] of Object.entries(times)) {
        const dungeon = dungeon_ as DUNGEON_SHORTS;
        const scores = calculateScores(dungeons[dungeon], dungeonTimes);

        allScores[dungeon] = scores;
      }

      const totalScore = calculatePlayerScore(allScores);
      it(`for ${testName} (raw: ${totalScore})`, async () => {
        expect(totalScore.toNumber()).toEqual(expectedTotal);
      });
    }
  }
});
