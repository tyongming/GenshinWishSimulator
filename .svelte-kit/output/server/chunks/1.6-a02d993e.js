const patch = 1.6;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: {
          name: "sparkling-steps-2",
          character: "klee",
          buttonBoxPosition: {
            w: 110,
            t: 32
          }
        },
        rateup: [
          "fischl",
          "barbara",
          "sucrose"
        ]
      },
      weapons: {
        name: "epitome-invocation-13",
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
            name: "skyward-pride",
            type: "claymore",
            buttonBoxPosition: {
              w: 70,
              t: 10,
              l: 65
            }
          }
        ],
        rateup: [
          "mitternachts-waltz",
          "the-widsith",
          "the-bell",
          "favonius-lance",
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
          name: "leaves-in-the-wind-1",
          character: "kaedehara-kazuha",
          buttonBoxPosition: {
            w: 110,
            t: 32
          }
        },
        rateup: [
          "rosaria",
          "bennett",
          "razor"
        ]
      },
      weapons: {
        name: "epitome-invocation-14",
        fatepointsystem: false,
        featured: [
          {
            name: "freedom-sworn",
            type: "sword",
            buttonBoxPosition: {
              w: 100,
              t: -20,
              l: 25
            }
          },
          {
            name: "skyward-atlas",
            type: "catalyst",
            buttonBoxPosition: {
              w: 75,
              t: 40,
              l: 72
            }
          }
        ],
        rateup: [
          "alley-hunter",
          "wine-and-song",
          "favonius-greatsword",
          "dragon_s-bane",
          "the-alley-flash"
        ]
      }
    }
  }
];
var _1_6 = {
  patch,
  data
};
export { data, _1_6 as default, patch };
