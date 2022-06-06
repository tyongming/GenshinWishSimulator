const patch = 2;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: {
          name: "the-heron_s-court-2",
          character: "kamisato-ayaka",
          buttonBoxPosition: {
            w: 95,
            t: 32
          }
        },
        rateup: [
          "yanfei",
          "chongyun",
          "ningguang"
        ]
      },
      weapons: {
        name: "epitome-invocation-15",
        fatepointsystem: true,
        featured: [
          {
            name: "mistsplitter-reforged",
            type: "sword",
            buttonBoxPosition: {
              w: 100,
              t: -20,
              l: 30
            }
          },
          {
            name: "skyward-spine",
            type: "polearm",
            buttonBoxPosition: {
              w: 80,
              t: 10,
              l: 60
            }
          }
        ],
        rateup: [
          "the-stringless",
          "favonius-codex",
          "sacrificial-greatsword",
          "favonius-lance",
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
          name: "tapestry-of-golden-flames-1",
          character: "yoimiya",
          buttonBoxPosition: {
            w: 150,
            t: 20,
            l: 40
          }
        },
        rateup: [
          "sayu",
          "xinyan",
          "diona"
        ]
      },
      weapons: {
        name: "epitome-invocation-16",
        fatepointsystem: true,
        featured: [
          {
            name: "thundering-pulse",
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
          "sacrificial-sword",
          "sacrificial-fragments",
          "favonius-warbow",
          "rainslasher",
          "dragon_s-bane"
        ]
      }
    }
  }
];
var _2_0 = {
  patch,
  data
};
export { data, _2_0 as default, patch };
