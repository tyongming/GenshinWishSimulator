const patch = 2.5;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: {
          name: "everbloom-violet-1",
          character: "yae-miko",
          buttonBoxPosition: {
            w: 170,
            t: 24,
            l: 50
          }
        },
        rateup: [
          "thoma",
          "diona",
          "fischl"
        ]
      },
      weapons: {
        name: "epitome-invocation-25",
        fatepointsystem: true,
        featured: [
          {
            name: "kagura_s-verity",
            type: "catalyst",
            buttonBoxPosition: {
              w: 70,
              t: 25,
              l: 37
            }
          },
          {
            name: "primordial-jade-cutter",
            type: "sword",
            buttonBoxPosition: {
              w: 90,
              t: -7,
              l: 67
            }
          }
        ],
        rateup: [
          "rainslasher",
          "eye-of-perception",
          "the-stringless",
          "wavebreaker_s-fin",
          "sacrificial-sword"
        ]
      }
    }
  },
  {
    phase: 2,
    banners: {
      standardVersion: 2,
      events: {
        item: [
          {
            name: "reign-of-serenity-2",
            character: "raiden-shogun",
            buttonBoxPosition: {
              w: 160,
              t: 5
            }
          },
          {
            name: "drifting-luminescence-2",
            character: "sagonomiya-kokomi",
            buttonBoxPosition: {
              w: 160,
              t: 30,
              l: 55
            }
          }
        ],
        rateup: [
          "bennett",
          "kujou-sara",
          "xinyan"
        ]
      },
      weapons: {
        name: "epitome-invocation-26",
        fatepointsystem: true,
        featured: [
          {
            name: "engulfing-lightning",
            type: "polearm",
            buttonBoxPosition: {
              w: 80,
              t: 20,
              l: 25
            }
          },
          {
            name: "everlasting-moonglow",
            type: "catalyst",
            buttonBoxPosition: {
              w: 70,
              t: 30,
              l: 60
            }
          }
        ],
        rateup: [
          "akuoumaru",
          "favonius-lance",
          "lion_s-roar",
          "mouun_s-moon",
          "sacrificial-fragments"
        ]
      }
    }
  }
];
var _2_5 = {
  patch,
  data
};
export { data, _2_5 as default, patch };
