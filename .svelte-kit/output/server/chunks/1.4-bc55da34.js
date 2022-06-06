const patch = 1.4;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: {
          name: "ballad-in-goblet-2",
          character: "venti",
          buttonBoxPosition: {
            w: 180,
            t: 30,
            l: 50
          }
        },
        rateup: [
          "razor",
          "sucrose",
          "noelle"
        ]
      },
      weapons: {
        name: "epitome-invocation-9",
        fatepointsystem: false,
        featured: [
          {
            name: "elegy-for-the-end",
            type: "bow",
            buttonBoxPosition: {
              w: 70,
              t: 10,
              l: 35
            }
          },
          {
            name: "skyward-blade",
            type: "sword",
            buttonBoxPosition: {
              w: 80,
              t: 5,
              l: 60
            }
          }
        ],
        rateup: [
          "favonius-warbow",
          "wine-and-song",
          "dragon_s-bane",
          "favonius-greatsword",
          "the-alley-flash"
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
          name: "farewell-of-snezhnaya-2",
          character: "tartaglia",
          buttonBoxPosition: {
            w: 160,
            t: 22
          }
        },
        rateup: [
          "barbara",
          "fischl",
          "rosaria"
        ]
      },
      weapons: {
        name: "epitome-invocation-10",
        fatepointsystem: false,
        featured: [
          {
            name: "skyward-harp",
            type: "bow",
            buttonBoxPosition: {
              w: 80,
              t: 10,
              l: 35
            }
          },
          {
            name: "lost-prayer-to-the-sacred-winds",
            type: "catalyst",
            buttonBoxPosition: {
              w: 65,
              t: 40,
              l: 65
            }
          }
        ],
        rateup: [
          "alley-hunter",
          "favonius-codex",
          "sacrificial-greatsword",
          "favonius-lance",
          "favonius-sword"
        ]
      }
    }
  }
];
var _1_4 = {
  patch,
  data
};
export { data, _1_4 as default, patch };
