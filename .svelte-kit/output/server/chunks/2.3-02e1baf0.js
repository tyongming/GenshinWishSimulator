const patch = 2.3;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: [
          {
            name: "secretum-secretorum-2",
            character: "albedo",
            buttonBoxPosition: {
              w: 170,
              t: 28,
              l: 50
            }
          },
          {
            name: "born-of-ocean-swell-2",
            character: "eula",
            buttonBoxPosition: {
              w: 140,
              t: 32
            }
          }
        ],
        rateup: [
          "bennett",
          "noelle",
          "rosaria"
        ]
      },
      weapons: {
        name: "epitome-invocation-21",
        fatepointsystem: true,
        featured: [
          {
            name: "freedom-sworn",
            type: "sword",
            buttonBoxPosition: {
              t: -10,
              w: 100,
              l: 30
            }
          },
          {
            name: "song-of-broken-pines",
            type: "claymore",
            buttonBoxPosition: {
              t: 10,
              w: 80,
              l: 60
            }
          }
        ],
        rateup: [
          "lion_s-roar",
          "alley-hunter",
          "wine-and-song",
          "dragon_s-bane",
          "sacrificial-greatsword"
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
          name: "oni_s-royale-1",
          character: "arataki-itto",
          buttonBoxPosition: {
            w: 190,
            t: 30,
            l: 50
          }
        },
        rateup: [
          "barbara",
          "xiangling",
          "gorou"
        ]
      },
      weapons: {
        name: "epitome-invocation-22",
        fatepointsystem: true,
        featured: [
          {
            name: "skyward-harp",
            type: "bow",
            buttonBoxPosition: {
              t: 10,
              w: 80,
              l: 35
            }
          },
          {
            name: "redhorn-stonethresher",
            type: "claymore",
            buttonBoxPosition: {
              t: 10,
              w: 80,
              l: 60
            }
          }
        ],
        rateup: [
          "the-alley-flash",
          "mitternachts-waltz",
          "sacrificial-fragments",
          "favonius-lance",
          "the-bell"
        ]
      }
    }
  }
];
var _2_3 = {
  patch,
  data
};
export { data, _2_3 as default, patch };
