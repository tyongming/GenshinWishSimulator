const patch = 1.2;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 1,
      events: {
        item: {
          name: "secretum-secretorum-1",
          character: "albedo",
          buttonBoxPosition: {
            w: 170,
            t: 28,
            l: 50
          }
        },
        rateup: [
          "bennett",
          "sucrose",
          "fischl"
        ]
      },
      weapons: {
        name: "epitome-invocation-5",
        fatepointsystem: false,
        featured: [
          {
            name: "summit-shaper",
            type: "sword",
            buttonBoxPosition: {
              w: 90,
              t: -10,
              l: 30
            }
          },
          {
            name: "skyward-atlas",
            type: "catalyst",
            buttonBoxPosition: {
              w: 65,
              t: 50,
              l: 70
            }
          }
        ],
        rateup: [
          "the-stringless",
          "favonius-lance",
          "favonius-greatsword",
          "lion_s-roar",
          "the-widsith"
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
          name: "adrift-in-the-harbor-1",
          character: "ganyu",
          buttonBoxPosition: {
            w: 200,
            t: 25
          }
        },
        rateup: [
          "beidou",
          "xinyan",
          "xingqiu"
        ]
      },
      weapons: {
        name: "epitome-invocation-6",
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
            name: "skyward-pride",
            type: "claymore",
            buttonBoxPosition: {
              w: 80,
              t: 10,
              l: 60
            }
          }
        ],
        rateup: [
          "favonius-warbow",
          "the-bell",
          "eye-of-perception",
          "dragon_s-bane",
          "sacrificial-sword"
        ]
      }
    }
  }
];
var _1_2 = {
  patch,
  data
};
export { data, _1_2 as default, patch };
