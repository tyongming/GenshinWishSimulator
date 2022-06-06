const patch = 2.1;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: {
          name: "reign-of-serenity-1",
          character: "raiden-shogun",
          buttonBoxPosition: {
            w: 180,
            t: 10
          }
        },
        rateup: [
          "xiangling",
          "sucrose",
          "kujou-sara"
        ]
      },
      weapons: {
        name: "epitome-invocation-17",
        fatepointsystem: true,
        featured: [
          {
            name: "engulfing-lightning",
            type: "polearm",
            buttonBoxPosition: {
              w: 80,
              t: 20,
              l: 30
            }
          },
          {
            name: "the-unforged",
            type: "claymore",
            buttonBoxPosition: {
              w: 60,
              t: 20,
              l: 60
            }
          }
        ],
        rateup: [
          "the-bell",
          "sacrificial-bow",
          "favonius-lance",
          "the-widsith",
          "lion_s-roar"
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
          name: "drifting-luminescence-1",
          character: "sagonomiya-kokomi",
          buttonBoxPosition: {
            w: 180,
            t: 25,
            l: 55
          }
        },
        rateup: [
          "rosaria",
          "xingqiu",
          "beidou"
        ]
      },
      weapons: {
        name: "epitome-invocation-18",
        fatepointsystem: true,
        featured: [
          {
            name: "primordial-jade-cutter",
            type: "sword",
            buttonBoxPosition: {
              w: 100,
              t: -14,
              l: 30
            }
          },
          {
            name: "everlasting-moonglow",
            type: "catalyst",
            buttonBoxPosition: {
              w: 80,
              t: 20,
              l: 60
            }
          }
        ],
        rateup: [
          "dragon_s-bane",
          "the-stringless",
          "favonius-codex",
          "favonius-greatsword",
          "the-flute"
        ]
      }
    }
  }
];
var _2_1 = {
  patch,
  data
};
export { data, _2_1 as default, patch };
