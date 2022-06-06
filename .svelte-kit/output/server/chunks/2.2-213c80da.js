const patch = 2.2;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: {
          name: "farewell-of-snezhnaya-3",
          character: "tartaglia",
          buttonBoxPosition: {
            w: 160,
            t: 22
          }
        },
        rateup: [
          "yanfei",
          "chongyun",
          "ningguang"
        ]
      },
      weapons: {
        name: "epitome-invocation-19",
        fatepointsystem: true,
        featured: [
          {
            name: "polar-star",
            type: "bow",
            buttonBoxPosition: {
              w: 70,
              t: 2,
              l: 35
            }
          },
          {
            name: "memory-of-dust",
            type: "catalyst",
            buttonBoxPosition: {
              t: 30,
              w: 65,
              l: 65
            }
          }
        ],
        rateup: [
          "favonius-lance",
          "rust",
          "eye-of-perception",
          "akuoumaru",
          "favonius-sword"
        ]
      }
    }
  },
  {
    phase: 2,
    banners: {
      standardVersion: 2,
      events: {
        item: {
          name: "moment-of-bloom-2",
          character: "hu-tao",
          buttonBoxPosition: {
            w: 160,
            t: 22
          }
        },
        rateup: [
          "thoma",
          "diona",
          "sayu"
        ]
      },
      weapons: {
        name: "epitome-invocation-20",
        fatepointsystem: true,
        featured: [
          {
            name: "elegy-for-the-end",
            type: "bow",
            buttonBoxPosition: {
              t: 10,
              w: 70,
              l: 35
            }
          },
          {
            name: "staff-of-homa",
            type: "polearm",
            buttonBoxPosition: {
              t: 15,
              w: 90,
              l: 60
            }
          }
        ],
        rateup: [
          "wavebreaker_s-fin",
          "mouun_s-moon",
          "the-widsith",
          "rainslasher",
          "sacrificial-sword"
        ]
      }
    }
  }
];
var _2_2 = {
  patch,
  data
};
export { data, _2_2 as default, patch };
