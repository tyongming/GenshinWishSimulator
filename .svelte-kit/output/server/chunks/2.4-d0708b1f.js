const patch = 2.4;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: [
          {
            name: "the-transcendent-one-returns-1",
            character: "shenhe",
            buttonBoxPosition: {
              w: 180,
              t: 20,
              l: 30
            }
          },
          {
            name: "invitation-to-mundane-life-2",
            character: "xiao",
            buttonBoxPosition: {
              w: 140,
              t: 30,
              l: 50
            }
          }
        ],
        rateup: [
          "yun-jin",
          "ningguang",
          "chongyun"
        ]
      },
      weapons: {
        name: "epitome-invocation-23",
        fatepointsystem: true,
        featured: [
          {
            name: "calamity-queller",
            type: "polearm",
            buttonBoxPosition: {
              w: 80,
              t: 10,
              l: 30
            }
          },
          {
            name: "primordial-jade-winged-spear",
            type: "polearm",
            buttonBoxPosition: {
              w: 80,
              t: 10,
              l: 60
            }
          }
        ],
        rateup: [
          "favonius-warbow",
          "the-widsith",
          "favonius-greatsword",
          "lithic-spear",
          "the-flute"
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
            name: "gentry-of-hermitage-3",
            character: "zhongli",
            buttonBoxPosition: {
              w: 110,
              t: 25,
              l: 66
            }
          },
          {
            name: "adrift-in-the-harbor-2",
            character: "ganyu",
            buttonBoxPosition: {
              w: 200,
              t: 25
            }
          }
        ],
        rateup: [
          "xingqiu",
          "yanfei",
          "beidou"
        ]
      },
      weapons: {
        name: "epitome-invocation-24",
        fatepointsystem: true,
        featured: [
          {
            name: "vortex-vanquisher",
            type: "polearm",
            buttonBoxPosition: {
              w: 80,
              t: 20,
              l: 25
            }
          },
          {
            name: "amos-bow",
            type: "bow",
            buttonBoxPosition: {
              w: 70,
              l: 68,
              t: 0
            }
          }
        ],
        rateup: [
          "sacrificial-bow",
          "lithic-blade",
          "favonius-codex",
          "favonius-sword",
          "dragon_s-bane"
        ]
      }
    }
  }
];
var _2_4 = {
  patch,
  data
};
export { data, _2_4 as default, patch };
