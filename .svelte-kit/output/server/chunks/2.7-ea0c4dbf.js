const patch = 2.7;
const data = [
  {
    phase: 1,
    banners: {
      standardVersion: 2,
      events: {
        item: [
          {
            name: "discerner-of-enigmas-1",
            character: "yelan",
            buttonBoxPosition: {
              w: 110,
              t: 32,
              l: 50
            }
          },
          {
            name: "invitation-to-mundane-life-3",
            character: "xiao",
            buttonBoxPosition: {
              w: 130,
              t: 30,
              l: 50
            }
          }
        ],
        rateup: [
          "yanfei",
          "barbara",
          "noelle"
        ]
      },
      weapons: {
        name: "epitome-invocation-29",
        fatepointsystem: true,
        featured: [
          {
            name: "aqua-simulacra",
            type: "bow",
            buttonBoxPosition: {
              t: 5,
              w: 80,
              l: 35
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
          "lithic-spear",
          "sacrificial-bow",
          "sacrificial-sword",
          "eye-of-perception",
          "favonius-greatsword"
        ]
      }
    }
  }
];
var _2_7 = {
  patch,
  data
};
export { data, _2_7 as default, patch };
