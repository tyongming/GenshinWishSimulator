const patch = 1;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 1,
      events: {
        item: {
          name: "ballad-in-goblets-1",
          character: "venti",
          buttonBoxPosition: {
            w: 180,
            t: 30,
            l: 50
          }
        },
        rateup: [
          "xiangling",
          "fischl",
          "barbara"
        ]
      },
      weapons: {
        name: "epitome-invocation-1",
        fatepointsystem: false,
        featured: [
          {
            name: "amos-bow",
            type: "bow",
            buttonBoxPosition: {
              w: 70,
              t: 0,
              l: 35
            }
          },
          {
            name: "aquila-favonia",
            type: "sword",
            buttonBoxPosition: {
              w: 80,
              t: -10,
              l: 65
            }
          }
        ],
        rateup: [
          "the-stringless",
          "favonius-lance",
          "the-bell",
          "the-widsith",
          "the-flute"
        ]
      }
    }
  },
  {
    phase: 2,
    banners: {
      standardVersion: 1,
      events: {
        item: {
          name: "sparkling-steps-1",
          character: "klee",
          buttonBoxPosition: {
            w: 110,
            t: 32
          }
        },
        rateup: [
          "sucrose",
          "xingqiu",
          "noelle"
        ]
      },
      weapons: {
        name: "epitome-invocation-2",
        fatepointsystem: false,
        featured: [
          {
            name: "lost-prayer-to-the-sacred-winds",
            type: "catalyst",
            buttonBoxPosition: {
              w: 60,
              t: 40,
              l: 40
            }
          },
          {
            name: "wolf_s-gravestone",
            type: "claymore",
            buttonBoxPosition: {
              w: 80,
              t: 15,
              l: 65
            }
          }
        ],
        rateup: [
          "sacrificial-greatsword",
          "sacrificial-sword",
          "sacrificial-fragments",
          "dragon_s-bane",
          "sacrificial-bow"
        ]
      }
    }
  }
];
var _1_0 = {
  patch,
  data
};
export { data, _1_0 as default, patch };
