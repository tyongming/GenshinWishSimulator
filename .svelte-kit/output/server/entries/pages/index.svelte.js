import { c as create_ssr_component, a as subscribe, h as createEventDispatcher, d as escape, e as each, b as add_attribute, v as validate_component, i as null_to_empty, o as onDestroy, j as is_promise, n as noop } from "../../chunks/index-437e72a6.js";
import { d as showBeginner, f as fatePoint, e as selectedCourse, g as beginner, m as mobileMode, p as primogem, h as acquaint, j as intertwined, k as genesis, l as stardust, n as starglitter, v as viewportHeight, u as unlimitedFates, o as muted, q as patchVersion, r as bannerPhase, i as isMobile, a as bannerList, b as bannerActive, t as isFatepointSystem, w as viewportWidth, x as showFatepointPopup, c as isAcquaintUsed, A as APP_TITLE, y as query, z as allPatch, B as isLoaded, H as HOST, C as pageActive, E as backsound } from "../../chunks/env-0d653bb5.js";
import "howler";
import "idb";
import "html-to-image";
import "file-saver";
import { p as positionToStyle, I as Icon, S as ShareScreenshot } from "../../chunks/WishListResult.svelte_svelte_type_style_lang-554a645a.js";
import "overlayscrollbars";
import { P as PopUp, I as Iklan } from "../../chunks/Iklan-e7ec31fa.js";
import { g as getName } from "../../chunks/nameText-77619b29.js";
const beginnerRoll = {
  set(pity) {
    localStorage.setItem("beginnerRoll", pity);
    return pity;
  },
  get() {
    let pity = parseInt(localStorage.getItem("beginnerRoll"));
    if (pity > 20)
      return 20;
    return pity || 0;
  }
};
const guaranteedStatus = {
  _getData() {
    const status = localStorage.getItem("guaranteedStatus");
    if (!status)
      return { status: {} };
    const parsed = JSON.parse(status);
    return parsed;
  },
  set(key, value = false) {
    const { status } = this._getData();
    status[key] = !!value;
    localStorage.setItem("guaranteedStatus", JSON.stringify({ status }));
  },
  get(key) {
    const { status } = this._getData();
    return !!status[key];
  }
};
const localFatePoint = {
  getData() {
    const localFatepointData = localStorage.getItem("fatepoint");
    if (!localFatepointData)
      return { data: [] };
    const parsed = JSON.parse(localFatepointData);
    return parsed;
  },
  init(patch, phase, selected = null) {
    this.patch = patch;
    this.phase = phase;
    this.selected = selected;
    this.data = this.getData().data;
    this.selectedPhase = this.data.find((d) => d.patch === patch && d.phase === phase);
    return this;
  },
  set(point) {
    const { patch, phase, selected } = this;
    if (!this.selectedPhase)
      this.data.push({ patch, phase, selected, point });
    const findIndex = this.data.findIndex((d) => d.patch === patch && d.phase === phase);
    this.data[findIndex].point = point;
    this.data[findIndex].selected = selected;
    localStorage.setItem("fatepoint", JSON.stringify({ data: this.data }));
  },
  getSelected() {
    if (this.selectedPhase === void 0)
      return null;
    return this.selectedPhase.selected;
  },
  getPoint() {
    const { selectedPhase } = this;
    return selectedPhase ? selectedPhase.point : 0;
  },
  remove() {
    const { patch, phase, data: data2 } = this;
    const index = data2.findIndex((d) => d.patch === patch && d.phase === phase);
    const newArray = data2.filter((ar, i) => i !== index);
    localStorage.setItem("fatepoint", JSON.stringify({ data: newArray }));
  }
};
const localConfig = {
  _getData() {
    const config = localStorage.getItem("config");
    if (!config)
      return { config: {} };
    const parsed = JSON.parse(config);
    return parsed;
  },
  get(key) {
    const { config } = this._getData();
    return config[key] || null;
  },
  set(key, value) {
    const { config } = this._getData();
    config[key] = value;
    localStorage.setItem("config", JSON.stringify({ config }));
  }
};
const sounds = {};
const playSfx = (nameOfSoundfx = "click", { paused = false } = {}) => {
  try {
    if (!sounds[nameOfSoundfx])
      throw new Error("No Sound effect for " + nameOfSoundfx);
    if (paused || localConfig.get("muted"))
      sounds[nameOfSoundfx].stop();
    else
      sounds[nameOfSoundfx].play();
  } catch (e) {
    console.error("Unable to Play Sfx : ", e.message);
  }
};
const data$1 = [
  {
    rarity: 5,
    list: [
      {
        name: "amos-bow",
        weaponType: "bow"
      },
      {
        name: "aqua-simulacra",
        weaponType: "bow",
        limited: true
      },
      {
        name: "aquila-favonia",
        weaponType: "sword"
      },
      {
        name: "calamity-queller",
        weaponType: "polearm",
        limited: true
      },
      {
        name: "elegy-for-the-end",
        weaponType: "bow",
        limited: true
      },
      {
        name: "engulfing-lightning",
        weaponType: "polearm",
        limited: true
      },
      {
        name: "everlasting-moonglow",
        weaponType: "catalyst",
        limited: true
      },
      {
        name: "freedom-sworn",
        weaponType: "sword",
        limited: true
      },
      {
        name: "haran-geppaku-futsu",
        weaponType: "sword",
        limited: true
      },
      {
        name: "kagura_s-verity",
        weaponType: "catalyst",
        limited: true
      },
      {
        name: "lost-prayer-to-the-sacred-winds",
        weaponType: "catalyst"
      },
      {
        name: "memory-of-dust",
        weaponType: "catalyst",
        limited: true
      },
      {
        name: "mistsplitter-reforged",
        weaponType: "sword",
        limited: true
      },
      {
        name: "polar-star",
        weaponType: "bow",
        limited: true
      },
      {
        name: "primordial-jade-cutter",
        weaponType: "sword",
        limited: true
      },
      {
        name: "primordial-jade-winged-spear",
        weaponType: "polearm"
      },
      {
        name: "redhorn-stonethresher",
        weaponType: "claymore",
        limited: true
      },
      {
        name: "skyward-atlas",
        weaponType: "catalyst",
        style: "left: 80%"
      },
      {
        name: "skyward-blade",
        weaponType: "sword",
        style: ""
      },
      {
        name: "skyward-harp",
        weaponType: "bow",
        style: ""
      },
      {
        name: "skyward-pride",
        weaponType: "claymore"
      },
      {
        name: "skyward-spine",
        weaponType: "polearm",
        style: ""
      },
      {
        name: "song-of-broken-pines",
        weaponType: "claymore",
        limited: true
      },
      {
        name: "staff-of-homa",
        weaponType: "polearm",
        limited: true
      },
      {
        name: "summit-shaper",
        weaponType: "sword",
        limited: true
      },
      {
        name: "the-unforged",
        weaponType: "claymore",
        limited: true
      },
      {
        name: "thundering-pulse",
        limited: true,
        weaponType: "bow",
        style: ""
      },
      {
        name: "vortex-vanquisher",
        weaponType: "polearm",
        limited: true
      },
      {
        name: "wolf_s-gravestone",
        weaponType: "claymore"
      }
    ]
  },
  {
    rarity: 4,
    list: [
      {
        name: "akuoumaru",
        weaponType: "claymore",
        limited: true
      },
      {
        name: "alley-hunter",
        weaponType: "bow",
        limited: true
      },
      {
        name: "dragon_s-bane",
        weaponType: "polearm"
      },
      {
        name: "eye-of-perception",
        weaponType: "catalyst"
      },
      {
        name: "favonius-codex",
        weaponType: "catalyst"
      },
      {
        name: "favonius-greatsword",
        weaponType: "claymore"
      },
      {
        name: "favonius-lance",
        weaponType: "polearm"
      },
      {
        name: "favonius-sword",
        weaponType: "sword"
      },
      {
        name: "favonius-warbow",
        weaponType: "bow"
      },
      {
        name: "lion_s-roar",
        weaponType: "sword"
      },
      {
        name: "lithic-blade",
        weaponType: "claymore",
        limited: true
      },
      {
        name: "lithic-spear",
        weaponType: "polearm",
        limited: true
      },
      {
        name: "mitternachts-waltz",
        weaponType: "bow",
        limited: true
      },
      {
        name: "mouun_s-moon",
        weaponType: "bow",
        limited: true
      },
      {
        name: "rainslasher",
        weaponType: "claymore"
      },
      {
        name: "the-alley-flash",
        weaponType: "sword",
        limited: true
      },
      {
        name: "the-bell",
        weaponType: "claymore"
      },
      {
        name: "the-flute",
        weaponType: "sword"
      },
      {
        name: "the-stringless",
        weaponType: "bow"
      },
      {
        name: "the-widsith",
        weaponType: "catalyst"
      },
      {
        name: "rust",
        weaponType: "bow",
        style: ""
      },
      {
        name: "sacrificial-bow",
        weaponType: "bow"
      },
      {
        name: "sacrificial-fragments",
        weaponType: "catalyst"
      },
      {
        name: "sacrificial-greatsword",
        weaponType: "claymore"
      },
      {
        name: "sacrificial-sword",
        weaponType: "sword"
      },
      {
        name: "wavebreaker_s-fin",
        weaponType: "polearm",
        limited: true
      },
      {
        name: "wine-and-song",
        weaponType: "catalyst",
        limited: true
      }
    ]
  },
  {
    rarity: 3,
    list: [
      {
        name: "black-tassel",
        weaponType: "polearm"
      },
      {
        name: "bloodtained-greatsword",
        weaponType: "claymore"
      },
      {
        name: "cool-steel",
        weaponType: "sword"
      },
      {
        name: "debate-club",
        weaponType: "claymore"
      },
      {
        name: "emerald-orb",
        weaponType: "catalyst"
      },
      {
        name: "ferrous-shadow",
        weaponType: "claymore"
      },
      {
        name: "harbinger-of-dawn",
        weaponType: "sword"
      },
      {
        name: "magic-guide",
        weaponType: "catalyst"
      },
      {
        name: "raven-bow",
        weaponType: "bow"
      },
      {
        name: "sharpshooter_s-oath",
        weaponType: "bow"
      },
      {
        name: "skyrider-sword",
        weaponType: "sword"
      },
      {
        name: "slingshot",
        weaponType: "bow"
      },
      {
        name: "thrilling-tales-of-dragon-slayers",
        weaponType: "catalyst"
      }
    ]
  }
];
var weapons = {
  data: data$1
};
const onlyStandard = [
  "amber",
  "kaeya",
  "lisa"
];
const data = [
  {
    rarity: 5,
    list: [
      {
        name: "albedo",
        vision: "geo",
        limited: true,
        title: "Kreideprinz",
        wishBoxPosition: {
          l: 22,
          t: 72,
          h: 190
        }
      },
      {
        name: "arataki-itto",
        vision: "geo",
        limited: true,
        title: "Hanamizaka Heroics",
        wishBoxPosition: {
          t: 85,
          l: 75,
          h: 195
        }
      },
      {
        name: "diluc",
        vision: "pyro",
        title: "The Dark Side of Dawn"
      },
      {
        name: "eula",
        vision: "cryo",
        limited: true,
        title: "The Sprindrift Knight",
        wishBoxPosition: {
          t: 83,
          h: 200
        }
      },
      {
        name: "ganyu",
        vision: "cryo",
        limited: true,
        title: "Plenilune Gaze",
        wishBoxPosition: {
          t: 79,
          h: 175,
          l: 55
        }
      },
      {
        name: "hu-tao",
        vision: "pyro",
        limited: true,
        title: "77th Master of Wangsheng Funeral Parlor",
        wishBoxPosition: {
          l: -110,
          h: 200,
          t: 70
        }
      },
      {
        name: "jean",
        vision: "anemo",
        title: "Der L\xF6wenzahn",
        wishBoxPosition: {
          t: 80,
          h: 200
        }
      },
      {
        name: "kaedehara-kazuha",
        vision: "anemo",
        limited: true,
        title: "Scarlet Leaves Pursue Wild Waves",
        wishBoxPosition: {
          h: 230,
          t: 90,
          l: 70
        }
      },
      {
        name: "kamisato-ayaka",
        vision: "cryo",
        limited: true,
        title: "Frostlake Heron",
        wishBoxPosition: {
          l: 40
        }
      },
      {
        name: "kamisato-ayato",
        vision: "hydro",
        limited: true,
        title: "Pillar of Fortitude",
        wishBoxPosition: {
          h: 210,
          l: 100,
          t: 90
        }
      },
      {
        name: "keqing",
        vision: "electro",
        title: "Driving Thunder",
        wishBoxPosition: {
          t: 70,
          l: 25
        }
      },
      {
        name: "klee",
        vision: "pyro",
        limited: true,
        title: "Spark Knight",
        wishBoxPosition: {
          t: 43,
          h: 160,
          l: 100
        }
      },
      {
        name: "mona",
        vision: "hydro",
        title: "Astral Reflection",
        wishBoxPosition: {
          l: 35,
          h: 190
        }
      },
      {
        name: "qiqi",
        vision: "cryo",
        title: "Icy Resurrection",
        wishBoxPosition: {
          t: 55
        }
      },
      {
        name: "raiden-shogun",
        limited: true,
        vision: "electro",
        title: "Plane of Euthymia",
        wishBoxPosition: {
          t: 80,
          l: 95,
          h: 200
        }
      },
      {
        name: "sagonomiya-kokomi",
        vision: "hydro",
        limited: true,
        title: "Pearl of Wisdom",
        wishBoxPosition: {
          h: 190,
          l: 65
        }
      },
      {
        name: "shenhe",
        limited: true,
        vision: "cryo",
        title: "Lonesome Transcendence",
        wishBoxPosition: {
          h: 190,
          l: -15,
          t: 78
        }
      },
      {
        name: "tartaglia",
        vision: "hydro",
        limited: true,
        title: "Childe",
        wishBoxPosition: {
          l: 120,
          h: 225,
          t: 75
        }
      },
      {
        name: "venti",
        vision: "anemo",
        limited: true,
        title: "Windborne Bard",
        wishBoxPosition: {
          t: 70,
          l: 90
        }
      },
      {
        name: "xiao",
        vision: "anemo",
        limited: true,
        title: "Vigilant Yaksha",
        wishBoxPosition: {
          t: 50
        }
      },
      {
        name: "yae-miko",
        vision: "electro",
        limited: true,
        title: "Astute Amusement",
        wishBoxPosition: {
          h: 210,
          t: 87,
          l: 10
        }
      },
      {
        name: "yelan",
        vision: "hydro",
        limited: true,
        title: "Valley Orchid",
        wishBoxPosition: {
          h: 220,
          t: 82,
          l: 80
        }
      },
      {
        name: "yoimiya",
        vision: "pyro",
        limited: true,
        title: "Frolicking Flames",
        wishBoxPosition: {
          t: 66,
          l: 40
        }
      },
      {
        name: "zhongli",
        vision: "geo",
        limited: true,
        title: "Vago Mundo",
        wishBoxPosition: {
          t: 94,
          l: 80,
          h: 240
        }
      }
    ]
  },
  {
    rarity: 4,
    list: [
      {
        name: "amber",
        rarity: 4,
        vision: "pyro",
        release: "1.0-1",
        title: "Champion Glider",
        wishBoxPosition: {
          t: 60,
          l: 70
        }
      },
      {
        name: "barbara",
        vision: "hydro",
        release: "1.0-1",
        title: "Shining Starlet",
        wishBoxPosition: {
          t: 70
        }
      },
      {
        name: "beidou",
        vision: "electro",
        release: "1.0-1",
        title: "Uncrowned Lord of Ocean"
      },
      {
        name: "bennett",
        vision: "pyro",
        release: "1.0-1",
        title: "Trial by Fire",
        wishBoxPosition: {
          l: -22,
          t: 55,
          h: 190
        }
      },
      {
        name: "chongyun",
        vision: "cryo",
        release: "1.0-1",
        title: "Frozen Ardor",
        wishBoxPosition: {
          t: 70,
          l: 40,
          h: 190
        }
      },
      {
        name: "diona",
        vision: "cryo",
        release: "1.0-1",
        title: "K\xE4tzlein Cocktail",
        wishBoxPosition: {
          t: 50,
          l: 80,
          h: 190
        }
      },
      {
        name: "fischl",
        vision: "electro",
        release: "1.0-1",
        title: "Prinzessin der Verurteilung",
        wishBoxPosition: {
          t: 70,
          l: 35
        }
      },
      {
        name: "gorou",
        vision: "geo",
        release: "2.3-2",
        title: "Canine Warrior",
        wishBoxPosition: {
          l: 100,
          h: 165,
          t: 65
        }
      },
      {
        name: "kaeya",
        vision: "cryo",
        release: "1.0-1",
        title: "Frostblade",
        wishBoxPosition: {
          l: 20,
          t: 82,
          h: 190
        }
      },
      {
        name: "kujou-sara",
        vision: "electro",
        release: "2.1-1",
        title: "Crowfeather Kaburaya",
        wishBoxPosition: {
          h: 210,
          t: 85
        }
      },
      {
        name: "lisa",
        vision: "electro",
        release: "1.0-1",
        title: "Rose Witch"
      },
      {
        name: "ningguang",
        vision: "geo",
        release: "1.0-1",
        title: "Eclipsing Star"
      },
      {
        name: "noelle",
        title: "Chivalric Blossom",
        vision: "geo",
        release: "1.0-1",
        wishBoxPosition: {
          t: 70
        }
      },
      {
        name: "razor",
        vision: "electro",
        release: "1.0-1",
        title: "Wolf Boy",
        wishBoxPosition: {
          l: -5,
          t: 65
        }
      },
      {
        name: "rosaria",
        vision: "cryo",
        release: "1.4-2",
        title: "Thorny Benevolence",
        wishBoxPosition: {
          h: 190,
          t: 77,
          l: 60
        }
      },
      {
        name: "sayu",
        vision: "anemo",
        release: "2.0-2",
        title: "Mujina Ninja",
        wishBoxPosition: {
          t: 63,
          h: 185,
          l: -50
        }
      },
      {
        name: "sucrose",
        vision: "anemo",
        release: "1.0-1",
        title: "Harmless Sweetie",
        wishBoxPosition: {
          h: 175,
          t: 72
        }
      },
      {
        name: "thoma",
        vision: "pyro",
        release: "2.2-2",
        title: "Protector From Afar",
        wishBoxPosition: {
          l: 80,
          h: 160,
          t: 70
        }
      },
      {
        name: "xiangling",
        vision: "pyro",
        release: "1.0-1",
        title: "Chef De Cuisine",
        wishBoxPosition: {
          l: 120,
          t: 66,
          h: 175
        }
      },
      {
        name: "xingqiu",
        vision: "hydro",
        release: "1.0-1",
        title: "Juvenile Galant",
        wishBoxPosition: {
          h: 200,
          t: 80,
          l: 40
        }
      },
      {
        name: "xinyan",
        vision: "pyro",
        release: "1.0-1",
        title: "Blazing Riff",
        wishBoxPosition: {
          h: 200,
          t: 72
        }
      },
      {
        name: "yanfei",
        vision: "pyro",
        release: "1.0-1",
        title: "Wise Innocence",
        wishBoxPosition: {
          l: 160,
          t: 70
        }
      },
      {
        name: "yun-jin",
        vision: "geo",
        release: "2.4-1",
        title: "Stage Lucida",
        wishBoxPosition: {
          h: 165,
          l: 70,
          t: 70
        }
      }
    ]
  }
];
var characters = {
  onlyStandard,
  data
};
const rand = (array) => array[Math.floor(Math.random() * array.length)];
const getAllChars = (star) => characters.data.find(({ rarity }) => rarity === star).list.map((arr) => {
  arr.type = "character";
  arr.rarity = star;
  return arr;
});
const getAllWeapons = (star) => weapons.data.find(({ rarity }) => rarity === star).list.map((arr) => {
  arr.type = "weapon";
  arr.rarity = star;
  return arr;
});
const standardWeapons = (star) => getAllWeapons(star).filter(({ limited }) => !limited);
const standardChars5Star = (chars) => getAllChars(5).filter(({ name }) => chars.includes(name));
const get4StarChars = getAllChars(4).filter(({ name }) => {
  return !characters.onlyStandard.includes(name);
});
const filterCharByReleased = (charlist, version = null, phase = null) => {
  return charlist.filter(({ release }) => {
    if (!release)
      return true;
    const [v, phs] = release.split("-");
    if (parseFloat(version) < parseFloat(v))
      return false;
    if (parseFloat(version) === parseFloat(v) && phase <= parseInt(phs))
      return false;
    return true;
  });
};
const get3StarItem = () => rand(standardWeapons(3));
const get4StarItem = (bannerToRoll = "allExcludeStandard", version = null, phase = null) => {
  const itemType = rand(["weap", "char"]);
  let charList = get4StarChars;
  if (bannerToRoll === "standard")
    charList = getAllChars(4);
  if (bannerToRoll === "limited")
    charList = get4StarChars;
  const items = itemType === "weap" ? standardWeapons(4) : charList;
  const filtered = filterCharByReleased(items, version, phase);
  return rand(filtered);
};
const getStandard5StarItem = ({ exclude }) => {
  const itemType = rand(["weap", "char"]);
  const items = itemType === "weap" ? standardWeapons(5) : standardChars5Star(exclude);
  return rand(items);
};
const limitedWish = {
  init(eventsData, indexOfBanner) {
    const { item, rateup } = eventsData;
    this._character = item;
    this._rateup = rateup;
    this._indexOfBanner = indexOfBanner;
    return this;
  },
  _rateupChars() {
    return getAllChars(4).filter(({ name }) => this._rateup.includes(name));
  },
  _featuredChars() {
    let { _character, _indexOfBanner } = this;
    if (Array.isArray(_character))
      _character = _character[_indexOfBanner];
    const result = getAllChars(5).find(({ name }) => name === _character.character);
    return result;
  },
  get(rarity, opt) {
    const { version, phase, excluded } = opt;
    if (rarity === 3)
      return get3StarItem();
    if (rarity === 4) {
      const resultType = rand(["rateup", "std"]);
      if (resultType === "rateup" || guaranteedStatus.get("events4Star")) {
        const result2 = rand(this._rateupChars());
        guaranteedStatus.set("events4Star", false);
        return result2;
      }
      const result = get4StarItem("limited", version, phase);
      const isItemRateup = this._rateupChars().map(({ name }) => name).includes(result.name);
      guaranteedStatus.set("events4Star", !isItemRateup);
      return result;
    }
    if (rarity === 5) {
      const limitedResult = this._featuredChars();
      if (guaranteedStatus.get("events")) {
        guaranteedStatus.set("events", false);
        return limitedResult;
      }
      const resultType = rand(["limited", "std"]);
      if (resultType === "std") {
        guaranteedStatus.set("events", true);
        return rand(standardChars5Star(excluded));
      }
      guaranteedStatus.set("events", false);
      return limitedResult;
    }
  }
};
const prob = (items) => {
  let chances = [];
  for (let i = 0; i < items.length; i++) {
    chances[i] = items[i].chance + (chances[i - 1] || 0);
  }
  const random = Math.random() * chances[chances.length - 1];
  const result = items[chances.findIndex((chance) => chance > random)];
  return result;
};
const beginerWish = (rarity, beginnerData, standardData, { version, phase }) => {
  let { character, vision } = beginnerData;
  const alreadyGetFeatured = guaranteedStatus.get("beginner");
  console.log(alreadyGetFeatured);
  const rollCount = beginnerRoll.get() || 0;
  beginnerRoll.set(rollCount + 1);
  if (rollCount === 19) {
    showBeginner.set(false);
    if (!alreadyGetFeatured) {
      guaranteedStatus.set("beginner", true);
      return { type: "character", rarity: 4, name: character, vision };
    }
  }
  if (rarity === 3)
    return get3StarItem();
  if (rarity === 5)
    return getStandard5StarItem({ exclude: standardData.characters });
  if (rarity === 4) {
    if (!alreadyGetFeatured) {
      const item = [
        {
          name: "rateup",
          chance: 25
        },
        {
          name: "other",
          chance: 75
        }
      ];
      const rng = prob(item);
      if (rng.name === "rateup") {
        guaranteedStatus.set("beginner", true);
        return get4StarChars.find((c) => c.name === character);
      }
    }
    const result = get4StarItem("standard", version, phase);
    if (result.name === character)
      guaranteedStatus.set("beginner", true);
    return result;
  }
};
const fatepoint = {
  init(version, phase, featuredData) {
    this._localFate = localFatePoint.init(version, phase);
    this._version = version;
    this._phase = phase;
    this._featured = featuredData;
    return this;
  },
  check() {
    const localSelectedCourse = this._localFate.getSelected();
    if (localSelectedCourse === null)
      return { localSelectedCourse };
    this.localFate = localFatePoint.init(this._version, this._phase, localSelectedCourse);
    const localPoint = this._localFate.getPoint();
    this.localPoint = localPoint;
    if (localPoint !== 2)
      return { localSelectedCourse: null, localPoint };
    this._localFate.remove();
    return { localSelectedCourse, localPoint };
  },
  updater(obj) {
    const localSelectedCourse = this._localFate.getSelected();
    if (localSelectedCourse === null)
      return;
    const resultIndex = this._featured.findIndex(({ name }) => obj.name === name);
    if (localSelectedCourse - 1 === resultIndex) {
      fatePoint.set(0);
      selectedCourse.set({ name: null, index: null });
      return this._localFate.remove();
    }
    const point = this.localPoint + 1;
    fatePoint.set(point);
    return this._localFate.set(point);
  }
};
const weaponWish = {
  init(version, phase, weaponsData) {
    this._weapons = weaponsData;
    this._phase = phase;
    this._version = version;
    return this;
  },
  _rateupWeapons() {
    return getAllWeapons(4).filter(({ name }) => this._weapons.rateup.includes(name));
  },
  _featuredWeaponsName() {
    return this._weapons.featured.map(({ name }) => name);
  },
  _featuredWeapons() {
    return getAllWeapons(5).filter(({ name }) => this._featuredWeaponsName().includes(name));
  },
  get(rarity) {
    if (rarity === 3)
      return get3StarItem();
    if (rarity === 4) {
      const isGuaranteed = guaranteedStatus.get("weapons4Star");
      const resultType = rand(["rateup", "std"]);
      if (resultType === "rateup" || isGuaranteed) {
        const result2 = rand(this._rateupWeapons());
        guaranteedStatus.set("weapons4Star", false);
        return result2;
      }
      const result = get4StarItem("weapons", this._weapons, this._phase);
      const isItemRateup = this._rateupWeapons().map(({ name }) => name).includes(result.name);
      guaranteedStatus.set("weapons4Star", !isItemRateup);
      return result;
    }
    if (rarity === 5) {
      const { _version, _phase, _weapons } = this;
      const course = fatepoint.init(_version, _phase, _weapons.featured);
      const { localSelectedCourse, localPoint } = course.check();
      const isGuaranteed = guaranteedStatus.get("weapons");
      if (localPoint > 1) {
        guaranteedStatus.set("weapons", false);
        const result2 = this._featuredWeapons().find(({ name }) => {
          return _weapons.featured[localSelectedCourse - 1].name === name;
        });
        course.updater(result2);
        return result2;
      }
      if (!isGuaranteed) {
        const item = [
          { type: "featured", chance: 50 },
          { type: "std", chance: 50 }
        ];
        const { type } = prob(item);
        if (type === "std") {
          const result2 = rand(standardWeapons(5));
          const isFeaturedStandardWeapon = this._featuredWeaponsName().includes(result2.name);
          if (isFeaturedStandardWeapon)
            guaranteedStatus.set("weapons", false);
          else
            guaranteedStatus.set("weapons", true);
          course.updater(result2);
          return result2;
        }
      }
      const result = rand(this._featuredWeapons());
      guaranteedStatus.set("weapons", false);
      course.updater(result);
      return result;
    }
  }
};
const storeName = "history";
let IndexedDB;
const HistoryIDB = {
  async historyCount() {
    return (await IndexedDB).count(storeName);
  },
  async getList(banner) {
    return (await IndexedDB).getAllFromIndex(storeName, "banner", banner);
  },
  async countItem(name) {
    return (await IndexedDB).countFromIndex(storeName, "name", name);
  },
  async getByName(name) {
    return (await IndexedDB).getAllFromIndex(storeName, "name", name);
  },
  async resetHistory(banner) {
    try {
      const idb = await IndexedDB;
      const keys = await idb.getAllKeysFromIndex(storeName, "banner", banner);
      keys.forEach((key) => idb.delete(storeName, key));
      return "success";
    } catch (e) {
      return "failed";
    }
  },
  async clearIDB() {
    return (await IndexedDB).clear(storeName);
  },
  async getAllHistories() {
    return (await IndexedDB).getAll(storeName);
  },
  async addHistory(data2) {
    if (!data2.hasOwnProperty("banner"))
      return;
    return (await IndexedDB).put(storeName, data2);
  },
  async delete(id) {
    if (!id)
      return;
    return (await IndexedDB).delete(storeName, id);
  }
};
function __variableDynamicImportRuntime1__$2(path) {
  switch (path) {
    case "../../data/banners/standard/1.json":
      return import("../../chunks/1-f8d41ce4.js");
    case "../../data/banners/standard/2.json":
      return import("../../chunks/2-ba4673b6.js");
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
function __variableDynamicImportRuntime0__$3(path) {
  switch (path) {
    case "../../data/banners/events/1.0.json":
      return import("../../chunks/1.0-b51db3df.js");
    case "../../data/banners/events/1.1.json":
      return import("../../chunks/1.1-e0f76d83.js");
    case "../../data/banners/events/1.2.json":
      return import("../../chunks/1.2-ce4d433d.js");
    case "../../data/banners/events/1.3.json":
      return import("../../chunks/1.3-2c2ef70c.js");
    case "../../data/banners/events/1.4.json":
      return import("../../chunks/1.4-bc55da34.js");
    case "../../data/banners/events/1.5.json":
      return import("../../chunks/1.5-f8e908c0.js");
    case "../../data/banners/events/1.6.json":
      return import("../../chunks/1.6-a02d993e.js");
    case "../../data/banners/events/2.0.json":
      return import("../../chunks/2.0-134166ed.js");
    case "../../data/banners/events/2.1.json":
      return import("../../chunks/2.1-8e52de73.js");
    case "../../data/banners/events/2.2.json":
      return import("../../chunks/2.2-213c80da.js");
    case "../../data/banners/events/2.3.json":
      return import("../../chunks/2.3-02e1baf0.js");
    case "../../data/banners/events/2.4.json":
      return import("../../chunks/2.4-d0708b1f.js");
    case "../../data/banners/events/2.5.json":
      return import("../../chunks/2.5-3a0e6b59.js");
    case "../../data/banners/events/2.6.json":
      return import("../../chunks/2.6-f5124a1b.js");
    case "../../data/banners/events/2.7.json":
      return import("../../chunks/2.7-ea0c4dbf.js");
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
const Wish = {
  async init(version, phase) {
    const { data: data2 } = await __variableDynamicImportRuntime0__$3(`../../data/banners/events/${version}.json`);
    const { standardVersion, weapons: weapons2, events } = data2.find((d) => d.phase === phase).banners;
    const { standard } = await __variableDynamicImportRuntime1__$2(`../../data/banners/standard/${standardVersion}.json`);
    this._version = version;
    this._phase = phase;
    this._beginner = beginner;
    this._events = events;
    this._isDualBanner = Array.isArray(events.item) && events.item?.length > 1;
    this._weapons = weapons2;
    this._standard = standard;
    return this;
  },
  _limitedWish(rarity, indexOfBannerEvents) {
    const { item } = this._events;
    const eventBanner = limitedWish.init(this._events, indexOfBannerEvents);
    const result = eventBanner.get(rarity, {
      excluded: this._standard.characters,
      version: this._version,
      phase: this._phase
    });
    result.bannerName = Array.isArray(item) ? item[indexOfBannerEvents].name : item.name;
    return result;
  },
  _beginnerWish(rarity) {
    const result = beginerWish(rarity, this._beginner, this._standard, {
      phase: this._phase,
      version: this._version
    });
    result.bannerName = "beginner";
    return result;
  },
  _standardWish(rarity) {
    let result;
    if (rarity === 3)
      result = get3StarItem();
    if (rarity === 4)
      result = get4StarItem("standard", this._version, this._phase);
    if (rarity === 5)
      result = getStandard5StarItem({ exclude: this._standard.characters });
    result.bannerName = this._standard.featured.name;
    return result;
  },
  _weaponWish(rarity) {
    const { _weapons, _phase, _version } = this;
    const weaponBanner = weaponWish.init(_version, _phase, _weapons);
    const result = weaponBanner.get(rarity);
    result.bannerName = _weapons.name;
    return result;
  },
  getItem(rarity, banner, indexOfBanner) {
    let result;
    if (banner === "beginner")
      result = this._beginnerWish(rarity);
    if (banner === "standard")
      result = this._standardWish(rarity);
    if (banner === "events")
      result = this._limitedWish(rarity, indexOfBanner);
    if (banner === "weapons")
      result = this._weaponWish(rarity);
    if (!result)
      return { type: null, rarity: 0, name: null };
    const date = new Date();
    result.time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return result;
  }
};
var Obtained_svelte_svelte_type_style_lang = "";
var SplashLight_svelte_svelte_type_style_lang = "";
var WishResult_svelte_svelte_type_style_lang = "";
var BannerButton_svelte_svelte_type_style_lang = "";
const css$q = {
  code: "button.svelte-1g3aw9d.svelte-1g3aw9d{display:block;background-color:var(--secondary-color);border-radius:0.25rem;width:90px;min-width:50px;aspect-ratio:2.4/1;margin:0.6em;position:relative;transition:all.2s;zoom:115%}button.svelte-1g3aw9d.svelte-1g3aw9d::after,button.svelte-1g3aw9d.svelte-1g3aw9d::before{content:'';display:block;width:90%;height:75%;border:2.5px solid #6d8fbb;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);transition:all 0.2s}button.svelte-1g3aw9d.svelte-1g3aw9d::after{border-radius:0.4rem}button.svelte-1g3aw9d.svelte-1g3aw9d::before{border-radius:40px}button.active.svelte-1g3aw9d.svelte-1g3aw9d,button.svelte-1g3aw9d.svelte-1g3aw9d:hover{background-color:var(--tertiary-color)}button.active.svelte-1g3aw9d.svelte-1g3aw9d::before,button.active.svelte-1g3aw9d.svelte-1g3aw9d::after,button.svelte-1g3aw9d.svelte-1g3aw9d:hover::before,button.svelte-1g3aw9d.svelte-1g3aw9d:hover::after{border:2.5px solid #eee2c8}button.active.svelte-1g3aw9d.svelte-1g3aw9d{transform:scale(1.1)}.gi-primo-star.svelte-1g3aw9d.svelte-1g3aw9d{left:15px;font-size:0.7rem}.gi-companion.svelte-1g3aw9d.svelte-1g3aw9d{right:5px;font-size:3rem;line-height:0;top:55% !important}.gi-primo-star.svelte-1g3aw9d.svelte-1g3aw9d,.gi-companion.svelte-1g3aw9d.svelte-1g3aw9d{position:absolute;top:50%;transform:translateY(-50%);color:#6d8fbb;transition:all 0.2s}.active.svelte-1g3aw9d .gi-primo-star.svelte-1g3aw9d,.active.svelte-1g3aw9d .gi-companion.svelte-1g3aw9d,button.svelte-1g3aw9d:hover .gi-primo-star.svelte-1g3aw9d,button.svelte-1g3aw9d:hover .gi-companion.svelte-1g3aw9d{color:#eee2c8}.picture.svelte-1g3aw9d.svelte-1g3aw9d{width:100%;height:150%;position:absolute;bottom:0;left:0;overflow:hidden;pointer-events:none;border-bottom-left-radius:7px;border-bottom-right-radius:7px}img.svelte-1g3aw9d.svelte-1g3aw9d{position:absolute;z-index:+1;left:50%;transform:translateX(-50%);transition:all 0.2s}.discount.svelte-1g3aw9d.svelte-1g3aw9d{background-color:#8ab958;position:absolute;z-index:+2;left:50%;bottom:-5px;border-radius:20px;color:#fff;transform:scale(0.65) translateX(-50%);padding:0.2rem 0.5rem}@media screen and (min-width: 750px){.discount.svelte-1g3aw9d.svelte-1g3aw9d{font-size:0.7rem}}.mobile button.svelte-1g3aw9d.svelte-1g3aw9d{transform:scale(0.93);margin:0.2rem 0}.mobile button.active.svelte-1g3aw9d.svelte-1g3aw9d{transform:scale(0.96)}",
  map: null
};
const BannerButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mobileMode, $$unsubscribe_mobileMode;
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  let { active = false } = $$props;
  let { type = "events" } = $$props;
  let { weapons: weapons2 = [] } = $$props;
  let { character = {} } = $$props;
  const buttonStyle = (position, isActive = false) => {
    if (!position)
      return;
    const tempPosition = { ...position };
    if (!tempPosition.t)
      tempPosition.t = 0;
    if (!$mobileMode)
      tempPosition.t = tempPosition.t - 10;
    if (isActive)
      tempPosition.t = tempPosition.t - 10;
    return positionToStyle(tempPosition);
  };
  createEventDispatcher();
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.weapons === void 0 && $$bindings.weapons && weapons2 !== void 0)
    $$bindings.weapons(weapons2);
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  $$result.css.add(css$q);
  $$unsubscribe_mobileMode();
  return `<button class="${["button " + escape(type) + " svelte-1g3aw9d", active ? "active" : ""].join(" ").trim()}"><i class="${"gi-primo-star svelte-1g3aw9d"}"></i>
	<i class="${"gi-companion svelte-1g3aw9d"}"></i>
	<div class="${"picture svelte-1g3aw9d"}">${type === "weapons" ? `${each(weapons2.featured, ({ name, buttonBoxPosition, type: type2 }) => {
    return `<img src="${"/assets/images/weapons/" + escape(type2) + "/5star/" + escape(name) + ".webp"}" alt="${"Weapon Wish"}"${add_attribute("style", buttonStyle(buttonBoxPosition, active), 0)} class="${"svelte-1g3aw9d"}">`;
  })}` : `<img src="${"/assets/images/characters/banner-button/" + escape(character.character) + ".webp"}" alt="${escape(type) + " Wish"}"${add_attribute("style", buttonStyle(character.buttonBoxPosition, active), 0)} class="${"svelte-1g3aw9d"}">`}</div>
	${type === "beginner" ? `<div class="${"discount svelte-1g3aw9d"}">-20%</div>` : ``}
</button>`;
});
var ExchangePopup_svelte_svelte_type_style_lang = "";
const css$p = {
  code: ".red.svelte-o3v6g8.svelte-o3v6g8{color:#de2f22 !important}.content.svelte-o3v6g8.svelte-o3v6g8{width:100%;height:100%;display:flex;flex-direction:column}.item.svelte-o3v6g8.svelte-o3v6g8{display:flex;width:100%;background-image:linear-gradient(-15deg, #e0b466, #817874)}.primo.svelte-o3v6g8.svelte-o3v6g8{position:absolute;top:0.2rem;right:0.2rem}.primogem.svelte-o3v6g8.svelte-o3v6g8{padding:2px 15px 0 30px;display:inline-flex;align-items:center;max-width:112px;height:25px;position:relative;overflow:hidden;background-color:rgba(0, 0, 0, 0.3);border-radius:50px;color:#fff;text-align:center;margin:0 8px;font-size:0.8rem}picture.svelte-o3v6g8.svelte-o3v6g8{display:flex;justify-content:center;align-items:center}.description.svelte-o3v6g8.svelte-o3v6g8{color:#fff;font-size:0.7rem;display:flex;flex-direction:column;align-items:flex-start;text-align:left;padding:0.3rem}.title.svelte-o3v6g8.svelte-o3v6g8{font-size:1.1rem;text-transform:capitalize}.gi-star.svelte-o3v6g8.svelte-o3v6g8{color:#eac343;font-size:0.9rem;padding-top:2px}.description.svelte-o3v6g8 p.svelte-o3v6g8{height:100%;overflow-y:auto;color:#fff}.genesis-exchange.svelte-o3v6g8.svelte-o3v6g8{display:flex;width:80%;height:100%;position:relative;margin:0 auto}.col.svelte-o3v6g8.svelte-o3v6g8{width:100%;flex-basis:50%;display:flex;justify-content:center;align-items:center;position:relative;padding:0.1em 0 0.7em}.col.svelte-o3v6g8 span.svelte-o3v6g8{width:100%;position:absolute;bottom:0.3rem;left:50%;transform:translateX(-50%);font-size:0.7rem}.divider.svelte-o3v6g8.svelte-o3v6g8{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);font-size:x-large;color:#fff}.genesis-exchange.svelte-o3v6g8 .genesis.svelte-o3v6g8{background-color:#d1c8bb}.genesis-exchange.svelte-o3v6g8 .primo-exchange.svelte-o3v6g8{background-color:#ecd7a5}.slider.svelte-o3v6g8.svelte-o3v6g8,.rangeNumber.svelte-o3v6g8.svelte-o3v6g8,.rangeInput.svelte-o3v6g8.svelte-o3v6g8,.control.svelte-o3v6g8.svelte-o3v6g8,.input.svelte-o3v6g8.svelte-o3v6g8{display:flex;justify-content:center;flex-direction:column;align-items:center;width:100%;position:relative;font-size:1rem}.rangeNumber.svelte-o3v6g8.svelte-o3v6g8{font-size:0.8rem;margin-bottom:-0.5rem}.slider.svelte-o3v6g8.svelte-o3v6g8{height:100%}.control.svelte-o3v6g8.svelte-o3v6g8{flex-direction:row;margin:0 3rem}.control.svelte-o3v6g8>span.svelte-o3v6g8{width:2.2em;height:2em;line-height:0;display:flex;justify-content:center;align-items:center;font-size:larger}[type='range'].svelte-o3v6g8.svelte-o3v6g8{--range:calc(var(--max) - var(--min));--ratio:calc((var(--val) - var(--min)) / var(--range));--sx:calc(0.5 * 1.5em + var(--ratio) * (100% - 1.5em));margin:0;padding:0;width:55%;height:1.5em;background:transparent;font:1em/1 arial, sans-serif}[type='range'].svelte-o3v6g8.svelte-o3v6g8,[type='range'].svelte-o3v6g8.svelte-o3v6g8::-webkit-slider-thumb{-webkit-appearance:none}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-webkit-slider-runnable-track{box-sizing:border-box;border:none;width:100%;height:0.4em;background:#ccc}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-webkit-slider-runnable-track{background:linear-gradient(#4a5265, #4a5265) 0 / var(--sx) 100% no-repeat #ccc;border-radius:10px}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-moz-range-track{box-sizing:border-box;border-radius:10px;width:100%;height:0.4em;background:#ccc}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-ms-track{box-sizing:border-box;border:none;width:100%;height:0.4em;background:#ccc}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-moz-range-progress{height:0.4em;border-radius:10px;background:#4a5265}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-ms-fill-lower{height:0.4em;background:#ccc}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-webkit-slider-thumb{box-sizing:border-box;border:none;border-radius:0;width:0.75em;height:0.75em;background:#4a5265;margin-top:-0.22rem;transform:rotate(45deg);border:0.15em solid #ece6de;outline:0.15em solid #4a5265;box-shadow:0 0 6px #ece6de}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-moz-range-thumb{box-sizing:border-box;border:none;border-radius:0;width:0.75em;height:0.75em;background:#4a5265;margin-top:-0.22rem;transform:rotate(45deg);border:0.15em solid #ece6de;outline:0.15em solid #4a5265;box-shadow:0 0 6px #ece6de}[type='range'].svelte-o3v6g8.svelte-o3v6g8::-ms-tooltip{display:none}button.plus.svelte-o3v6g8.svelte-o3v6g8:disabled,button.min.svelte-o3v6g8.svelte-o3v6g8:disabled{background-color:rgb(173, 179, 192)}button.plus.svelte-o3v6g8.svelte-o3v6g8,button.min.svelte-o3v6g8.svelte-o3v6g8{background-color:#4a5265;display:inline-flex;justify-content:center;align-items:center;line-height:0;position:absolute;width:2rem;height:2rem;padding:0.5rem;color:#fff;border-radius:100%;top:50%;transform:translateY(-50%)}button.plus.svelte-o3v6g8.svelte-o3v6g8{right:7%}button.min.svelte-o3v6g8.svelte-o3v6g8{left:7%;z-index:+3}@media screen and (max-width: 890px){.primogem.svelte-o3v6g8.svelte-o3v6g8{height:20px;margin:0 3px}}@media screen and (max-width: 400px){.primogem.svelte-o3v6g8.svelte-o3v6g8{max-width:80px}}",
  map: null
};
const ExchangePopup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rangeStyle;
  let itemFieldStyle;
  let pictureWidthStyle;
  let descriptionStyle;
  let $primogem, $$unsubscribe_primogem;
  let $$unsubscribe_acquaint;
  let $$unsubscribe_intertwined;
  let $genesis, $$unsubscribe_genesis;
  let $stardust, $$unsubscribe_stardust;
  let $starglitter, $$unsubscribe_starglitter;
  $$unsubscribe_primogem = subscribe(primogem, (value) => $primogem = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => value);
  $$unsubscribe_genesis = subscribe(genesis, (value) => $genesis = value);
  $$unsubscribe_stardust = subscribe(stardust, (value) => $stardust = value);
  $$unsubscribe_starglitter = subscribe(starglitter, (value) => $starglitter = value);
  let { show = false } = $$props;
  let { itemToBuy = "intertwined" } = $$props;
  let { fundType = "primogem" } = $$props;
  const data2 = {
    intertwined: {
      description: "A fateful stone that connects dreams. Its glimmers can entwine fates and connect dreams, just as how its glimmer links stars into the shapes of a heart's desires.",
      star: 5
    },
    acquaint: {
      description: "A seed that lights up the night. No matter the distance apart, guided by the stone's glimmer, the fated will meet under the stars.",
      star: 5
    }
  };
  const base = {
    starglitter: 5,
    stardust: 125,
    primogem: 160
  };
  let contentHeight;
  let rangeVal = 1;
  let maxRange = 1;
  let minRange = 0;
  let fundQty = 0;
  let fateQty = 0;
  createEventDispatcher();
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.itemToBuy === void 0 && $$bindings.itemToBuy && itemToBuy !== void 0)
    $$bindings.itemToBuy(itemToBuy);
  if ($$props.fundType === void 0 && $$bindings.fundType && fundType !== void 0)
    $$bindings.fundType(fundType);
  $$result.css.add(css$p);
  {
    {
      if (fundType === "starglitter") {
        fateQty = ($starglitter - $starglitter % base.starglitter) / base.starglitter;
        fundQty = base.starglitter * rangeVal;
      }
      if (fundType === "stardust") {
        fateQty = ($stardust - $stardust % base.stardust) / base.stardust;
        fundQty = base.stardust * rangeVal;
      }
      if (fundType === "primogem") {
        fateQty = ($primogem - $primogem % base.primogem) / base.primogem;
        fundQty = base.primogem * rangeVal;
      }
      if (fundType === "genesis") {
        fateQty = $genesis;
        fundQty = rangeVal;
      }
      maxRange = fateQty > 0 ? fateQty : 1;
      minRange = fateQty > 1 ? 1 : 0;
    }
  }
  rangeStyle = `--min: ${minRange}; --max: ${maxRange}; --val: ${rangeVal}`;
  itemFieldStyle = `height:${45 / 100 * contentHeight}px`;
  pictureWidthStyle = `height:${45 / 100 * contentHeight}px; width:${45 / 100 * contentHeight}px`;
  descriptionStyle = `max-width:calc(100% - ${45 / 100 * contentHeight}px)`;
  $$unsubscribe_primogem();
  $$unsubscribe_acquaint();
  $$unsubscribe_intertwined();
  $$unsubscribe_genesis();
  $$unsubscribe_stardust();
  $$unsubscribe_starglitter();
  return `${validate_component(PopUp, "PopUp").$$render($$result, {
    show,
    title: "Item To " + (fundType === "genesis" ? "Exchange" : "Purchase"),
    button: fateQty < 1 ? "cancel" : "all"
  }, {}, {
    default: () => {
      return `<div class="${"content svelte-o3v6g8"}">${fundType === "genesis" ? `
			<div class="${"row genesis-exchange svelte-o3v6g8"}"${add_attribute("style", itemFieldStyle, 0)}><div class="${"col genesis svelte-o3v6g8"}"><picture class="${"svelte-o3v6g8"}">${validate_component(Icon, "Icon").$$render($$result, { type: "genesis", width: "50%" }, {}, {})}
						<span class="${"svelte-o3v6g8"}">Genesis Crystal</span></picture></div>

				<div class="${"col primo-exchange svelte-o3v6g8"}"><picture class="${"svelte-o3v6g8"}">${validate_component(Icon, "Icon").$$render($$result, { type: "primogem", width: "50%" }, {}, {})}
						<span class="${"svelte-o3v6g8"}">Primogem</span></picture></div>

				<div class="${"divider svelte-o3v6g8"}"><i class="${"gi-arrow-right"}"></i></div></div>

			` : `<div class="${"item svelte-o3v6g8"}"${add_attribute("style", itemFieldStyle, 0)}><div class="${"primo svelte-o3v6g8"}"><span class="${["primogem svelte-o3v6g8", fateQty < 1 ? "red" : ""].join(" ").trim()}">${validate_component(Icon, "Icon").$$render($$result, {
        type: fundType,
        height: "80%",
        width: "auto",
        style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
      }, {}, {})}
						${escape(fundQty)}</span></div>
				<picture${add_attribute("style", pictureWidthStyle, 0)} class="${"svelte-o3v6g8"}">${validate_component(Icon, "Icon").$$render($$result, { type: itemToBuy, width: "70%" }, {}, {})}</picture>
				<div class="${"description svelte-o3v6g8"}"${add_attribute("style", descriptionStyle, 0)}><div class="${"title svelte-o3v6g8"}">${escape(itemToBuy)} Fate</div>
					<div class="${"star"}">${each(Array(data2[itemToBuy].star), (_, i) => {
        return `<i class="${"gi-star svelte-o3v6g8"}"></i>`;
      })}</div>

					<p class="${"svelte-o3v6g8"}">${escape(data2[itemToBuy].description)}</p></div></div>`}

		<div class="${"slider svelte-o3v6g8"}"><div class="${"rangeNumber svelte-o3v6g8"}"><span>Qty :</span>
				<span style="${"font-size: larger"}">${escape(rangeVal)}</span></div>
			<div class="${"rangeInput svelte-o3v6g8"}"><div class="${"input svelte-o3v6g8"}"><button class="${"min svelte-o3v6g8"}" ${"disabled"}><span style="${"font-size: 1.5rem; margin-top: -0.4rem; margin-left: 0rem"}">- </span></button>
					<div class="${"control svelte-o3v6g8"}"><span style="${"pointer-events:none"}" class="${"svelte-o3v6g8"}">${escape(minRange)}</span>
						<input class="${"range svelte-o3v6g8"}" type="${"range"}"${add_attribute("max", maxRange, 0)}${add_attribute("min", minRange, 0)}${add_attribute("style", rangeStyle, 0)} ${fateQty < 1 ? "disabled" : ""}${add_attribute("value", rangeVal, 0)}>
						<span style="${"pointer-events:none"}" class="${"svelte-o3v6g8"}">${escape(maxRange)}</span></div>
					<button class="${"plus svelte-o3v6g8"}" ${rangeVal >= maxRange ? "disabled" : ""}><i class="${"gi-plus"}"></i></button></div>

				${fundType === "genesis" ? `<div class="${"consume"}" style="${"display: inline-flex; align-items:center"}">Consume
						${validate_component(Icon, "Icon").$$render($$result, { type: "genesis" }, {}, {})}
						<span class="${["svelte-o3v6g8", $genesis < 1 ? "red" : ""].join(" ").trim()}">${escape(rangeVal)}</span></div>` : ``}
				${fateQty < 1 ? `<div class="${"error red svelte-o3v6g8"}">Insufficient Funds</div>` : ``}</div></div></div>`;
    }
  })}`;
});
var MyFund_svelte_svelte_type_style_lang = "";
const css$o = {
  code: ".primogem.svelte-9ua9dn span.svelte-9ua9dn{width:1.2rem;height:1.2rem;color:#000;background-color:#fff;border-radius:100%;position:absolute;right:3px;top:50%;font-size:0.8rem;transform:translateY(-50%)}.primogem.svelte-9ua9dn.svelte-9ua9dn{padding-right:30px !important}button.svelte-9ua9dn.svelte-9ua9dn{display:inline-block;max-width:112px;height:25px;overflow:hidden;background-color:rgba(0, 0, 0, 0.3);border-radius:50px;color:#fff;vertical-align:middle;text-align:center;position:relative;margin:0 8px;padding:0 15px 0 30px}@media screen and (max-width: 900px){button.svelte-9ua9dn.svelte-9ua9dn{height:20px;margin:0 3px}}@media screen and (max-width: 400px){button.svelte-9ua9dn.svelte-9ua9dn{max-width:80px}.primogem.svelte-9ua9dn.svelte-9ua9dn{margin-bottom:2px;padding:0 30px}.gi-plus.svelte-9ua9dn.svelte-9ua9dn{right:2px;transform:translateY(-50%) scale(0.9)}}",
  map: null
};
const MyFund = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "primogem" } = $$props;
  let showExchangePopup = false;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css$o);
  return `
${``}



${validate_component(ExchangePopup, "ExchangePopup").$$render($$result, {
    fundType: "genesis",
    itemToBuy: "primogem",
    show: showExchangePopup
  }, {}, {})}


<button class="${escape(null_to_empty(type)) + " svelte-9ua9dn"}">${validate_component(Icon, "Icon").$$render($$result, {
    type,
    height: "80%",
    width: "auto",
    style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
  }, {}, {})}
	${slots.default ? slots.default({}) : ``}
	${type === "primogem" ? `<span class="${"svelte-9ua9dn"}"><i class="${"gi-plus svelte-9ua9dn"}"></i></span>` : ``}
</button>`;
});
var Toast_svelte_svelte_type_style_lang = "";
const css$n = {
  code: ".toast.svelte-wg50cp{padding:0.5rem 1.5rem;text-align:center;border-radius:0.3rem;min-width:10rem;max-width:20rem;color:var(--tertiary-color);background-color:#4a5265;position:fixed;z-index:999;left:50%;top:1rem;transform:translateX(-50%);font-size:0.7rem}",
  map: null
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const dispatch = createEventDispatcher();
  const timer = setTimeout(() => {
    dispatch("close");
    clearTimeout(timer);
  }, 3e3);
  $$result.css.add(css$n);
  return `<div class="${"toast svelte-wg50cp"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
var Option_svelte_svelte_type_style_lang = "";
const css$m = {
  code: ".option.svelte-1fhfrzz.svelte-1fhfrzz{display:flex;width:100%;padding:0.5rem 0}@media screen and (max-width: 900px){.option.svelte-1fhfrzz.svelte-1fhfrzz{padding:0.3rem 0}}.option-name.svelte-1fhfrzz.svelte-1fhfrzz{background-color:#fff;width:75%;padding:0.3rem 2rem;border-top-left-radius:5rem;border-bottom-left-radius:5rem}.option-select.svelte-1fhfrzz.svelte-1fhfrzz{background-color:var(--tertiary-color);width:40%;max-width:14rem;text-align:center;position:relative;display:inline-flex;justify-content:center;align-items:center;border-top-right-radius:5rem;border-bottom-right-radius:5rem;transition:all 0.2s}.option-select.svelte-1fhfrzz i.svelte-1fhfrzz{position:absolute;top:50%;right:1rem;font-size:1rem;transform:translateY(-50%);pointer-events:none}.option-select.svelte-1fhfrzz button.svelte-1fhfrzz,.option-select.svelte-1fhfrzz.svelte-1fhfrzz{font-size:0.8rem !important}.select.svelte-1fhfrzz.svelte-1fhfrzz{position:absolute;top:110%;left:0;width:100%;background-color:var(--tertiary-color);box-shadow:0px 2px 5px rgba(0, 0, 0, 0.3);z-index:+1;border-radius:0.3rem;overflow:hidden}.select.svelte-1fhfrzz button.svelte-1fhfrzz{display:block;width:100%;padding:0.15rem}.select.svelte-1fhfrzz button.svelte-1fhfrzz:hover,.select.svelte-1fhfrzz button.selected.svelte-1fhfrzz{background-color:#f0e0c7}",
  map: null
};
const Option = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text } = $$props;
  let { activeIndicator } = $$props;
  createEventDispatcher();
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.activeIndicator === void 0 && $$bindings.activeIndicator && activeIndicator !== void 0)
    $$bindings.activeIndicator(activeIndicator);
  $$result.css.add(css$m);
  return `<div class="${"option svelte-1fhfrzz"}"><div class="${"option-name svelte-1fhfrzz"}">${escape(text)}</div>
	<div class="${"option-select svelte-1fhfrzz"}"><button class="${"selected svelte-1fhfrzz"}" style="${"width: 100%; height:100%"}">${escape(activeIndicator ? "Yes" : "No")}</button>
		<i class="${"gi-caret-" + escape("down") + " svelte-1fhfrzz"}"></i>
		${``}</div>
</div>`;
});
var MainMenu_svelte_svelte_type_style_lang = "";
const css$l = {
  code: ".confirmation.svelte-19zxap1.svelte-19zxap1{display:flex;justify-content:center;align-items:center;width:100%;height:100%}h2.svelte-19zxap1.svelte-19zxap1{color:var(--tertiary-color);margin-top:1rem;margin-bottom:0.5rem}section.svelte-19zxap1.svelte-19zxap1{width:100vw;display:block;position:fixed;top:0;left:0;backdrop-filter:blur(12px);background-color:rgba(0, 0, 0, 0.3);z-index:100}.head.svelte-19zxap1.svelte-19zxap1{display:flex;justify-content:space-between;margin:2%;color:var(--tertiary-color)}.mobile .head.svelte-19zxap1.svelte-19zxap1{margin:0.5rem 2%}.container.svelte-19zxap1.svelte-19zxap1{display:flex;justify-content:center;margin:0 2%;height:calc(100% - 7rem)}.mobile .container.svelte-19zxap1.svelte-19zxap1{height:calc(100% - 5rem)}.sidebar.svelte-19zxap1.svelte-19zxap1{width:30%;max-width:20rem}.mobile .sidebar.svelte-19zxap1.svelte-19zxap1{width:25%}.sidebar.svelte-19zxap1 .menu-list.svelte-19zxap1{display:flex;flex-direction:column}.menu-item.svelte-19zxap1 button.svelte-19zxap1{color:var(--tertiary-color);transition:all 0.2s;opacity:0.8;transform-origin:left;padding:0.5rem}.menu-item.svelte-19zxap1.svelte-19zxap1::before{content:'\\63';font-family:'genshin-icon' !important;font-style:normal !important;font-weight:normal !important;font-variant:normal !important;text-transform:none !important;speak:none;line-height:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#fff;padding:0.5rem;visibility:hidden}.menu-item.active.svelte-19zxap1.svelte-19zxap1::before{visibility:visible}.menu-item.active.svelte-19zxap1 button.svelte-19zxap1{transform:scale(1.2);color:#fff;opacity:1}.menu-item.svelte-19zxap1:hover button.svelte-19zxap1{color:#fff;opacity:1}.content.svelte-19zxap1.svelte-19zxap1{width:70%;position:relative}.option.svelte-19zxap1.svelte-19zxap1{display:flex;width:100%;padding:0.5rem 0}.option-name.svelte-19zxap1.svelte-19zxap1{background-color:#fff;width:75%;padding:0.3rem 2rem;border-top-left-radius:5rem;border-bottom-left-radius:5rem}.option-select.svelte-19zxap1.svelte-19zxap1{background-color:var(--tertiary-color);width:40%;max-width:14rem;text-align:center;position:relative;display:inline-flex;justify-content:center;align-items:center;border-top-right-radius:5rem;border-bottom-right-radius:5rem;transition:all 0.2s}.option-select.svelte-19zxap1 i.svelte-19zxap1{position:absolute;top:50%;right:1rem;font-size:1rem;transform:translateY(-50%);pointer-events:none}.option-select.svelte-19zxap1.svelte-19zxap1{font-size:0.8rem !important}button.option-select.svelte-19zxap1.svelte-19zxap1:hover{background-color:#f0e0c7}.text.svelte-19zxap1.svelte-19zxap1{color:#fff;margin-bottom:1rem;font-size:1rem;font-weight:bold;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}a.svelte-19zxap1.svelte-19zxap1{text-decoration:underline}a.svelte-19zxap1.svelte-19zxap1:hover{color:var(--tertiary-color)}.notes.svelte-19zxap1.svelte-19zxap1,.updates.svelte-19zxap1 .update-item.svelte-19zxap1{font-weight:100;background-color:#fff;padding:1rem 2.5rem 0.5rem;font-size:0.87rem;border-radius:0.3rem}.content-container.svelte-19zxap1.svelte-19zxap1{display:flex;flex-direction:column;height:100%}.update-item.svelte-19zxap1.svelte-19zxap1{height:100%;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:0.97rem;display:block;overflow:hidden}.updates.svelte-19zxap1 p.svelte-19zxap1{position:relative;padding-left:1rem}.updates.svelte-19zxap1 p.svelte-19zxap1::before{content:'*';display:inline-block;width:10px;line-height:0;font-size:1.3rem;padding-top:0.5rem;position:absolute;left:0;top:50%;transform:translateY(-50%)}.updates.svelte-19zxap1 h2.svelte-19zxap1:nth-child(1){margin-top:0}.updates.svelte-19zxap1 h2.svelte-19zxap1{margin-left:-1rem;font-weight:bold;color:#f7cf33}.updates.svelte-19zxap1 .tgl.svelte-19zxap1{color:#bd6932}ol.svelte-19zxap1 li.svelte-19zxap1{margin-bottom:1rem}.rotate.svelte-19zxap1.svelte-19zxap1{position:absolute;bottom:0;right:0;color:#fff;display:flex;flex-direction:column;text-align:center}.gi-rotate-phone.svelte-19zxap1.svelte-19zxap1{font-size:3rem;animation:svelte-19zxap1-rotatePhone 1s infinite alternate}@media screen and (max-width: 900px){.option.svelte-19zxap1.svelte-19zxap1{padding:0.3rem 0}main:not(.mobile) .container.svelte-19zxap1.svelte-19zxap1{flex-direction:column}main:not(.mobile) .content.svelte-19zxap1.svelte-19zxap1{width:100%;height:100%;margin-top:1.5rem}main:not(.mobile) .sidebar.svelte-19zxap1.svelte-19zxap1{width:100%;max-width:unset}main:not(.mobile) .sidebar.svelte-19zxap1 .menu-list.svelte-19zxap1{flex-direction:row;justify-content:center}main:not(.mobile) .menu-item.svelte-19zxap1.svelte-19zxap1::before{display:none}main:not(.mobile) .menu-item.svelte-19zxap1 button.svelte-19zxap1{padding:0.2rem 1rem;border-radius:50px;opacity:unset}main:not(.mobile) .menu-item.active.svelte-19zxap1 button.svelte-19zxap1,main:not(.mobile) .menu-item.svelte-19zxap1:hover button.svelte-19zxap1{background-color:var(--tertiary-color);color:#4a5265;transform:unset}}@keyframes svelte-19zxap1-rotatePhone{0%{transform:rotate(0deg)}100%{transform:rotate(-90deg)}}",
  map: null
};
const MainMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fullscreen;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $unlimitedFates, $$unsubscribe_unlimitedFates;
  let $muted, $$unsubscribe_muted;
  let $patchVersion, $$unsubscribe_patchVersion;
  let $bannerPhase, $$unsubscribe_bannerPhase;
  let $isMobile, $$unsubscribe_isMobile;
  let $mobileMode, $$unsubscribe_mobileMode;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_unlimitedFates = subscribe(unlimitedFates, (value) => $unlimitedFates = value);
  $$unsubscribe_muted = subscribe(muted, (value) => $muted = value);
  $$unsubscribe_patchVersion = subscribe(patchVersion, (value) => $patchVersion = value);
  $$unsubscribe_bannerPhase = subscribe(bannerPhase, (value) => $bannerPhase = value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  let { show = false } = $$props;
  let showResetPopup = false;
  let activeContent = "options";
  let showAllItemsIndicator = false;
  createEventDispatcher();
  let optionsContainer;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  $$result.css.add(css$l);
  fullscreen = false;
  $$unsubscribe_viewportHeight();
  $$unsubscribe_unlimitedFates();
  $$unsubscribe_muted();
  $$unsubscribe_patchVersion();
  $$unsubscribe_bannerPhase();
  $$unsubscribe_isMobile();
  $$unsubscribe_mobileMode();
  return `${show ? `${validate_component(PopUp, "PopUp").$$render($$result, {
    title: "Factory Reset",
    show: showResetPopup,
    button: "all"
  }, {}, {
    default: () => {
      return `<div class="${"confirmation svelte-19zxap1"}"><div style="${"padding: 1rem"}">Are You sure to clear <strong>All Data </strong> and restore to default ?
				<br>
				<small>It also remove your History, Pity Calculation, Balance and all items from Inventory.
				</small></div></div>`;
    }
  })}

	${``}

	<section style="${"height: " + escape($viewportHeight) + "px;"}" class="${"svelte-19zxap1"}"><div class="${"head svelte-19zxap1"}"><h1>Menu / ${escape(getName(activeContent))}</h1>
			<button class="${"close"}" title="${"Change Banner"}"><i class="${"gi-close"}"></i></button></div>
		<div class="${"container svelte-19zxap1"}"><div class="${"sidebar svelte-19zxap1"}"><div class="${"menu-list svelte-19zxap1"}"><div class="${["menu-item svelte-19zxap1", "active"].join(" ").trim()}"><button class="${"svelte-19zxap1"}">Options </button></div>
					<div class="${["menu-item svelte-19zxap1", ""].join(" ").trim()}"><button class="${"svelte-19zxap1"}">Update History </button></div></div></div>

			<div class="${"content svelte-19zxap1"}">${`<div class="${"content-container svelte-19zxap1"}"${add_attribute("this", optionsContainer, 0)}>${validate_component(Option, "Option").$$render($$result, {
    text: "Unlimited Fates",
    activeIndicator: $unlimitedFates
  }, {}, {})}
						${validate_component(Option, "Option").$$render($$result, {
    text: "Show not owned Item on Inventory",
    activeIndicator: showAllItemsIndicator
  }, {}, {})}
						${validate_component(Option, "Option").$$render($$result, {
    text: "Mute Audio and Sound Effect",
    activeIndicator: $muted
  }, {}, {})}

						<div class="${"option svelte-19zxap1"}"><div class="${"option-name svelte-19zxap1"}">Switch Banner</div>
							<button class="${"option-select svelte-19zxap1"}"><i class="${"gi-caret-down svelte-19zxap1"}"></i>
								${escape($patchVersion)} - ${escape($bannerPhase)}</button></div>

						${validate_component(Option, "Option").$$render($$result, {
    text: "Display Fullscreen (press F11)",
    activeIndicator: fullscreen
  }, {}, {})}

						<div class="${"option svelte-19zxap1"}"><div class="${"option-name svelte-19zxap1"}">Clear Data and Restore Default</div>
							<button class="${"option-select svelte-19zxap1"}"><i class="${"gi-delete svelte-19zxap1"}" style="${"vertical-align: bottom; line-height: 0; margin-right: .2rem"}"></i> Reset Now
							</button></div>

						<h2 class="${"svelte-19zxap1"}">Notes :</h2>
						<div class="${"notes svelte-19zxap1"}"><ol class="${"svelte-19zxap1"}"><li class="${"svelte-19zxap1"}">This app use Localstorage and IndexedDB to save your pull history, it&#39;s native on
									your browser, if you clear your browser data, you will lost your data that related
									to this app too. No chance to recover it back, because we never store your data on
									cloud
								</li>
								<li class="${"svelte-19zxap1"}">This Service does not collect or store any personally identifiable information
									about you. However, this app use third party services that may collect information
									used to identify you. The information that these third party services request will
									be retained on your device and is not collected by me in any way.
								</li>
								<li class="${"svelte-19zxap1"}">This Service may contain links to other apps. If you click on a third-party link,
									you will be directed to that app. Note that these external apps are not operated
									by me. Therefore, I strongly advise you to review the Privacy Policy of these
									webapps. I have no control over and assume no responsibility for the content,
									privacy policies, or practices of any third-party apps or services.
								</li></ol></div></div>`}

				${``}

				${$isMobile && !$mobileMode ? `<div class="${"rotate svelte-19zxap1"}"><i class="${"gi-rotate-phone svelte-19zxap1"}"></i>
						<span>Rotate for better experience </span></div>` : ``}</div></div></section>` : ``}`;
});
var FatepointIcon_svelte_svelte_type_style_lang = "";
const css$k = {
  code: ".fatepoint-button.svelte-8fpul1.svelte-8fpul1{width:15vh}.mobile .fatepoint-button.svelte-8fpul1.svelte-8fpul1{width:18vh}.active.svelte-8fpul1 svg.svelte-8fpul1{filter:drop-shadow(0 0 0.5rem rgb(0, 183, 255))}@media screen and (max-width: 500px){.fatepoint-button.svelte-8fpul1.svelte-8fpul1{width:10vh}}.fil1.svelte-8fpul1.svelte-8fpul1{fill:#fefefe}.fil2.svelte-8fpul1.svelte-8fpul1{fill:#5f6e8b}.fil3.svelte-8fpul1.svelte-8fpul1{fill:transparent}.active.svelte-8fpul1 .fil3.svelte-8fpul1{fill:#62c5ff}.fil0.svelte-8fpul1.svelte-8fpul1{fill:#a0907d}",
  map: null
};
const FatepointIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$k);
  return `<div class="${["fatepoint-button svelte-8fpul1", active ? "active" : ""].join(" ").trim()}"><svg xmlns="${"http://www.w3.org/2000/svg"}" xml:space="${"preserve"}" width="${"100%"}" height="${"100%"}" version="${"1.1"}" style="${"shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"}" viewBox="${"0 0 508847 506460"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" class="${"svelte-8fpul1"}"><g id="${"Layer_x0020_1"}"><metadata id="${"CorelCorpID_0Corel-Layer"}"></metadata><circle class="${"fil0 svelte-8fpul1"}" cx="${"254424"}" cy="${"253230"}" r="${"235000"}"></circle><path class="${"fil1 svelte-8fpul1"}" d="${"M255693 0c13547,26247 28024,32190 42571,35155 86821,17695 155401,85552 174155,171983 3340,15397 8488,34162 36428,46862 -23707,12700 -32662,29168 -35212,42704 -17117,90856 -89026,162369 -180088,178895 -13076,2373 -26000,6154 -39547,30861 -11853,-20473 -28814,-28563 -42256,-31076 -92318,-17262 -164722,-91085 -179876,-184128 -1926,-11825 -6468,-24556 -31868,-35563 27093,-10160 29923,-25044 31812,-36761 14555,-90240 82951,-162462 171176,-182650 16150,-3695 39159,-5802 52705,-36282z"}"></path><path class="${"fil2 svelte-8fpul1"}" d="${"M255542 30055c11940,23132 24698,28369 37519,30983 76516,15594 136957,75398 153485,151571 2944,13569 7481,30107 32104,41300 -20893,11192 -28785,25706 -31032,37635 -15086,80073 -78460,143098 -158714,157663 -11524,2091 -22915,5423 -34854,27198 -10446,-18043 -25394,-25173 -37240,-27388 -81362,-15213 -145172,-80274 -158528,-162274 -1697,-10422 -5700,-21642 -28085,-31342 23877,-8954 26371,-22072 28036,-32398 12828,-79530 73106,-143180 150860,-160972 14233,-3257 34511,-5114 46449,-31976z"}"></path><path class="${"fil1 svelte-8fpul1"}" d="${"M330264 271900c123,-533 12562,-25081 10158,-32020 -1162,-1427 -2401,-2861 -3702,-5015 -10709,-2024 -12079,-25210 -13164,-33686 -14482,-47196 -72342,-40941 -75929,-52261 -358,-5588 -312,-4871 -670,-10459 -7941,-1020 -13237,1312 -15009,8106 -10178,3252 -5167,18577 -5501,26637 -1026,-642 -5493,-4403 -5588,-4447 -15337,-7251 -37943,31295 -36627,45876 -2865,18246 -4687,19434 -13733,25783 -2850,2000 -600,259 -2382,1933l565 8165c13533,41301 39679,48402 77665,53316 -1307,1383 991,2598 -2457,4085 -17607,7585 -16560,12591 -21001,31019 -1670,3686 -3464,12046 -2869,16028 -138,14893 63684,19907 79345,971 1836,-15767 -2789,-25064 -10248,-39071 -6148,-5850 -3857,-7275 -14719,-8437 -5230,-2021 -2896,1743 -3630,-4393 21183,67 46793,-11256 59496,-32130zm-57388 55269c4914,9251 4765,12192 14138,13865 -8154,-4650 -10703,-14461 -18651,-21822 -5039,-2075 -10340,-4118 -13672,-3026 -6579,2156 -10978,6676 -17718,15712 8536,-3503 10646,-9555 18301,-13067 7391,5619 -1300,14794 -3372,23823 -1079,4703 476,9454 2036,12648 -2369,-10300 409,-16090 6895,-17943 3642,6892 3606,8549 8908,12534 -3457,-7528 -12293,-20101 -7056,-29210 3890,-1154 4734,2232 10191,6486zm-30308 -71245c-9691,1465 -6106,3188 -12543,6960 -10988,6437 -14245,-5177 -25718,-6891 2209,18389 33672,21098 38261,-69zm30053 0c9691,1465 6106,3188 12543,6960 10987,6437 14245,-5177 25718,-6891 -2209,18389 -33672,21098 -38261,-69zm-15561 31599c6016,-1307 5913,-1191 7499,-6781 -3798,-269 -10937,-717 -14214,-158 1060,4275 2615,5911 6715,6939z"}"></path><path class="${"fil3 svelte-8fpul1"}" d="${"M254424 68164c102209,0 185066,82857 185066,185066 0,102209 -82857,185066 -185066,185066 -102209,0 -185066,-82857 -185066,-185066 0,-102209 82857,-185066 185066,-185066zm0 28190c86640,0 156876,70236 156876,156876 0,86640 -70236,156876 -156876,156876 -86640,0 -156876,-70236 -156876,-156876 0,-86640 70236,-156876 156876,-156876z"}"></path><path class="${"fil1 svelte-8fpul1"}" d="${"M329531 141779c3037,10634 9793,17203 20000,20000 -10634,3037 -17203,9793 -20000,20000 -3037,-10634 -9793,-17203 -20000,-20000 10634,-3037 17203,-9793 20000,-20000z"}"></path><path class="${"fil1 svelte-8fpul1"}" d="${"M165200 297389c2278,7976 7345,12902 15000,15000 -7976,2278 -12902,7345 -15000,15000 -2278,-7976 -7345,-12902 -15000,-15000 7976,-2278 12902,-7345 15000,-15000z"}"></path><path class="${"fil1 svelte-8fpul1"}" d="${"M362750 205788c1519,5317 4897,8602 10000,10000 -5317,1519 -8602,4897 -10000,10000 -1519,-5317 -4897,-8602 -10000,-10000 5317,-1519 8602,-4897 10000,-10000z"}"></path></g></svg>
</div>`;
});
var FatepointButton_svelte_svelte_type_style_lang = "";
const css$j = {
  code: "button.svelte-4yc7ue.svelte-4yc7ue{position:relative;zoom:90%}.point-number.svelte-4yc7ue.svelte-4yc7ue{border-radius:50px;background-color:#fff;border:3px solid #fff;padding:0.2rem;width:100%;transition:all 0.2s;color:#a49a90;border:1px solid #a49a90;display:inline-flex;justify-content:center;align-items:center;position:absolute;bottom:5%;left:50%;transform:translateX(-50%)}.point-number.svelte-4yc7ue span.svelte-4yc7ue{color:#ff8700}.point-number.svelte-4yc7ue span.small.svelte-4yc7ue{font-size:0.75rem;line-height:0.7rem;padding:0 1rem;color:var(--text-color)}.mobile button.svelte-4yc7ue.svelte-4yc7ue{margin-top:auto;margin-bottom:7.5%}.mobile .point-number.svelte-4yc7ue.svelte-4yc7ue{padding:0.1rem}.mobile .point-number.svelte-4yc7ue span.small.svelte-4yc7ue{font-size:0.5rem;line-height:0.5rem}",
  map: null
};
const FatepointButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isWeapon;
  let $bannerList, $$unsubscribe_bannerList;
  let $$unsubscribe_bannerPhase;
  let $$unsubscribe_patchVersion;
  let $bannerActive, $$unsubscribe_bannerActive;
  let $isFatepointSystem, $$unsubscribe_isFatepointSystem;
  let $fatePoint, $$unsubscribe_fatePoint;
  let $selectedCourse, $$unsubscribe_selectedCourse;
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_bannerPhase = subscribe(bannerPhase, (value) => value);
  $$unsubscribe_patchVersion = subscribe(patchVersion, (value) => value);
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
  $$unsubscribe_isFatepointSystem = subscribe(isFatepointSystem, (value) => $isFatepointSystem = value);
  $$unsubscribe_fatePoint = subscribe(fatePoint, (value) => $fatePoint = value);
  $$unsubscribe_selectedCourse = subscribe(selectedCourse, (value) => $selectedCourse = value);
  $$result.css.add(css$j);
  isWeapon = $bannerList[$bannerActive].type === "weapons";
  $$unsubscribe_bannerList();
  $$unsubscribe_bannerPhase();
  $$unsubscribe_patchVersion();
  $$unsubscribe_bannerActive();
  $$unsubscribe_isFatepointSystem();
  $$unsubscribe_fatePoint();
  $$unsubscribe_selectedCourse();
  return `${$isFatepointSystem && isWeapon ? `<button class="${"container svelte-4yc7ue"}">${validate_component(FatepointIcon, "FatepointIcon").$$render($$result, { active: $fatePoint === 2 }, {}, {})}
		<div class="${"point-number svelte-4yc7ue"}">${$selectedCourse.name ? `<span class="${"svelte-4yc7ue"}">${escape($fatePoint)}</span>/2` : `<span class="${"small svelte-4yc7ue"}">Epitomized Path</span>`}</div></button>` : ``}`;
});
var FatepointTribal_svelte_svelte_type_style_lang = "";
const css$i = {
  code: "svg.svelte-1w2xzfi.svelte-1w2xzfi{width:100%}.fil0.svelte-1w2xzfi.svelte-1w2xzfi{fill:#a0907d}.fil1.svelte-1w2xzfi.svelte-1w2xzfi{fill:#d7d0c7}.bg.svelte-1w2xzfi .fil1.svelte-1w2xzfi{fill:#e1ddd4}.filled.svelte-1w2xzfi.svelte-1w2xzfi{fill:#5b9ee2}.full.svelte-1w2xzfi .fil1.svelte-1w2xzfi{fill:#d5d9df}",
  map: null
};
const FatepointTribal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $fatePoint, $$unsubscribe_fatePoint;
  $$unsubscribe_fatePoint = subscribe(fatePoint, (value) => $fatePoint = value);
  let { mode = "" } = $$props;
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  $$result.css.add(css$i);
  $$unsubscribe_fatePoint();
  return `<svg class="${escape(mode) + " " + escape($fatePoint > 1 ? "full" : "") + " svelte-1w2xzfi"}" xmlns="${"http://www.w3.org/2000/svg"}" xml:space="${"preserve"}" width="${"100%"}" height="${"100%"}" version="${"1.1"}" style="${"shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"}" viewBox="${"0 0 1500001 1500018"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}"><defs></defs><g id="${"Layer_x0020_1"}"><metadata id="${"CorelCorpID_0Corel-Layer"}"></metadata><path class="${escape($fatePoint > 0 ? "filled" : "") + " " + escape(mode === "bg" ? "fil1" : "fil0") + " svelte-1w2xzfi"}" d="${"M1237835 754784c-41627,24154 -57713,54476 -62457,79583 -33219,176299 -172756,315073 -349462,347141 -25370,4606 -50457,11941 -76748,59882 -22997,-39721 -55914,-55418 -81993,-60308 -179134,-33502 -319645,-176741 -349037,-357292 -3738,-22943 -12543,-47658 -61831,-69006l107099 0c804,211542 172526,382804 384273,382804 211731,0 383470,-171245 384274,-382804l105882 0z"}"></path><path class="${escape($fatePoint === 2 ? "filled" : "") + " " + escape(mode === "bg" ? "fil1" : "fil0") + " svelte-1w2xzfi"}" d="${"M752463 258628c26291,50936 54372,62469 82613,68209 168468,34335 301555,166006 337946,333729 6484,29871 16476,66296 70689,90940 -2014,1079 -3971,2172 -5876,3278l-105882 0c2,-498 19,-991 19,-1489 0,-212228 -172047,-384292 -384293,-384292 -212228,0 -384292,172047 -384292,384292 0,498 17,991 19,1489l-107099 0c52566,-19719 58058,-48597 61725,-71328 28241,-175111 160956,-315250 332170,-354422 31341,-7175 75987,-11250 102279,-70406l-18 0z"}"></path><path class="${"fil1 svelte-1w2xzfi"}" d="${"M751489 18l60785 226720c6804,25370 40501,32740 68298,39260l-8486 39544 -1293 -691c-55223,2374 -121395,-68493 -112714,-91276l13146 -34495 -24644 -45992 -19719 54213 12845 22996c7600,13606 -8132,48987 -38357,73595 -21508,17504 -51112,28807 -80983,26788l-6307 -41971c27957,-4412 56694,-213 66792,-33768l70637 -234941 0 18zm479803 614060c4411,27957 212,56693 33768,66792l234941 70636 -226721 60786c-25370,6803 -32740,40500 -39260,68298l-39544 -8486 691 -1294c-2374,-55223 68493,-121394 91277,-112713l34494 13145 45993 -24643 -54213 -19719 -22997 12844c-13606,7601 -48986,-8131 -73595,-38356 -17504,-21508 -28807,-51113 -26787,-80983l41970 -6307 -17 0zm-345352 617231c-27957,4412 -56693,213 -66791,33768l-70637 234941 -60786 -226720c-6803,-25371 -40500,-32741 -68298,-39260l8487 -39544 1293 691c55223,-2374 121395,68493 112713,91276l-13145 34495 24644 45992 19718 -54213 -12844 -22996c-7601,-13607 8132,-48987 38356,-73595 21508,-17504 51113,-28808 80983,-26788l6307 41971 0 -18zm-617231 -345351c-4412,-27957 -213,-56693 -33768,-66792l-234941 -70636 226720 -60786c25371,-6803 32741,-40501 39261,-68298l39543 8486 -691 1294c2374,55222 -68492,121394 -91276,112713l-34495 -13146 -45992 24644 54213 19719 22996 -12845c13607,-7600 48987,8132 73595,38357 17504,21508 28808,51112 26788,80983l-41971 6307 18 0z"}"></path><path class="${"fil1 svelte-1w2xzfi"}" d="${"M820743 133283c91099,116664 206594,101800 284937,176298l3207 2534 -9726 50864 -22306 -17716c-61264,-58253 -147261,-57066 -223124,-121501l-32988 -90497 0 0 0 18zm375186 249185c95121,112625 59138,196106 170523,288675l-77794 -19896c-69839,-75951 -50049,-148040 -131847,-242506l-13589 -10789 52707 -15502 0 18zm170807 438293c-116665,91099 -101800,206594 -176299,284937l-2533 3207 -50865 -9727 17717 -22305c58252,-61264 57065,-147261 121501,-223124l90496 -32988 0 0 -17 0zm-249185 375186c-112625,95121 -196106,59138 -288676,170523l19896 -77794c75951,-69839 148040,-50050 242506,-131848l10789 -13588 15502 52707 -17 0zm-438293 170806c-91100,-116664 -206595,-101800 -284938,-176298l-3207 -2534 9727 -50865 22305 17717c61265,58253 147261,57066 223124,121501l32989 90497 0 0 0 -18zm-375187 -249185c-95120,-112625 -59138,-196106 -170523,-288675l77794 19895c69839,75952 50050,148041 131848,242506l13589 10790 -52708 15502 0 -18zm-170806 -438293c116664,-91099 101800,-206594 176299,-284937l2533 -3207 50865 9727 -17717 22305c-58252,61264 -57065,147261 -121501,223124l-90497 32988 0 0 18 0zm249185 -375186c112625,-95121 196106,-59138 288676,-170523l-19896 77794c-75952,69839 -148041,50050 -242506,131847l-10790 13589 -15502 -52707 18 0z"}"></path><path class="${"fil1 svelte-1w2xzfi"}" d="${"M1128694 1220874c26841,2374 67359,15608 98576,36975 -9850,-34495 -10559,-79052 -8539,-110269 -28843,0 -65393,-24449 -114681,-60591 21367,50936 24644,105042 24644,133903l0 -18zm-762845 -948267c-26840,-2375 -67358,-15609 -98575,-36975 9850,34494 10559,79052 8539,110268 28843,0 65393,24449 114680,60591 -21366,-50935 -24644,-105042 -24644,-133902l0 18zm762845 0c26841,-2375 67359,-15609 98576,-36975 -9850,34494 -10559,79052 -8539,110268 -28843,0 -65393,24449 -114681,60591 21367,-50935 24644,-105042 24644,-133902l0 18zm-762845 948267c-26840,2374 -67358,15608 -98575,36975 9850,-34495 10559,-79052 8539,-110269 28843,0 65393,-24449 114680,-60591 -21366,50936 -24644,105042 -24644,133903l0 -18z"}"></path><path class="${"fil1 svelte-1w2xzfi"}" d="${"M738201 377613l-31748 28878c21348,14794 32864,29871 44362,52867 11498,-24644 24644,-39721 44363,-49589l-34371 -32191c21385,602 42326,3029 62664,7087l22465 22464c-73754,65074 -83623,116151 -91825,226225 32864,-294221 335164,-220290 179080,-77351 42715,-116647 -96928,-114999 -175785,110073l-4164 69272c45515,-77935 86316,-197416 152027,-139908 65711,57508 -64081,113369 -139731,150521l66774 -4961c234941,-77227 236730,-207533 110375,-172808 126497,-154437 241213,144887 -75881,174456 90037,-4447 154437,3295 228670,-85944l19878 19878c4004,20020 6395,40625 7051,61672l-28878 -31748c-14794,21348 -29871,32864 -52867,44362 24644,11498 39721,24644 49589,44363l32191 -34371c-602,21385 -3029,42326 -7086,62664l-22465 22465c-65073,-73754 -116151,-83623 -226224,-91825 294221,32864 220289,335164 77351,179080 116646,42715 114999,-96928 -110074,-175785l-69272 -4164c77935,45515 197417,86316 139908,152027 -57508,65711 -113369,-64081 -150521,-139731l4961 66774c77227,234941 207533,236730 172809,110375 154436,126497 -144887,241212 -174457,-75881 4447,90037 -3295,154437 85944,228670l-19878 19878c-20020,4004 -40624,6395 -61672,7051l31748 -28878c-21348,-14794 -32864,-29871 -44362,-52867 -11498,24644 -24644,39721 -44363,49589l34371 32191c-21384,-602 -42325,-3029 -62664,-7086l-22465 -22465c73755,-65073 83623,-116151 91826,-226224 -32865,294221 -335165,220289 -179081,77351 -42715,116646 96928,114999 175785,-110074l4164 -69272c-45514,77935 -86316,197417 -152027,139908 -65711,-57508 64081,-113369 139731,-150521l-66774 4961c-234941,77227 -236730,207533 -110375,172809 -126497,154436 -241212,-144887 75881,-174457 -90036,4447 -154437,-3295 -228669,85944l-19879 -19878c-4004,-20020 -6395,-40624 -7051,-61672l28878 31748c14794,-21348 29871,-32864 52867,-44362 -24644,-11498 -39721,-24644 -49589,-44363l-32191 34371c602,-21384 3029,-42325 7086,-62664l22465 -22465c65074,73755 116151,83623 226225,91826 -294221,-32865 -220290,-335165 -77352,-179081 -116646,-42715 -114999,96928 110074,175785l69272 4164c-77935,-45514 -197417,-86316 -139908,-152027 57508,-65711 113369,64081 150521,139731l-4961 -66774c-77227,-234941 -207533,-236730 -172808,-110375 -154437,-126497 144887,-241212 174456,75881 -4447,-90036 3295,-154436 -85944,-228669l19878 -19878c20020,-4004 40625,-6396 61672,-7052z"}"></path></g></svg>`;
});
var InventoryItem_svelte_svelte_type_style_lang = "";
const css$h = {
  code: ".content.svelte-50ymys.svelte-50ymys{border-radius:0.5em;width:100%;height:100%;display:flex;flex-direction:column;text-align:center;background-color:#fff;color:#3a4156;line-height:1.2rem;position:relative}.content.owned.svelte-50ymys.svelte-50ymys::after{content:'';position:absolute;z-index:-1;top:50%;left:50%;transform:translate(-50%, -50%);width:100%;height:100%;border-radius:0.8rem;border:0.3rem solid #eac343;opacity:0;transition:opacity 0.15s}.content.owned.svelte-50ymys.svelte-50ymys:hover::after{opacity:1}.overlay.svelte-50ymys.svelte-50ymys{top:0;left:0;position:absolute;z-index:+1;width:100%;height:100%;background-color:#000;opacity:0.5;border-radius:0.5em}picture.svelte-50ymys.svelte-50ymys{width:100%;aspect-ratio:1/1;display:flex;justify-content:flex-end;align-items:flex-start;background-size:cover;position:relative;overflow:hidden;border-top-left-radius:0.5em;border-top-right-radius:0.5em;border-bottom-right-radius:1.2em}picture.svelte-50ymys img.svelte-50ymys{width:100%;object-fit:cover}picture.svelte-50ymys span.svelte-50ymys{position:absolute;top:0}.element.svelte-50ymys.svelte-50ymys{left:0;font-size:2rem}.qty.svelte-50ymys.svelte-50ymys{right:0;background-color:#a36b5e;border-bottom-left-radius:0.5rem;font-size:0.9rem;padding:0.1rem 0.3rem;color:#f0c882}.star3.svelte-50ymys.svelte-50ymys{background-image:url('/assets/images/utility/3star-bg.webp')}.star4.svelte-50ymys.svelte-50ymys{background-image:url('/assets/images/utility/4star-bg.webp')}.star5.svelte-50ymys.svelte-50ymys{background-image:url('/assets/images/utility/5star-bg.webp')}.star.svelte-50ymys.svelte-50ymys{position:absolute;left:50%;top:-0.7rem;transform:translateX(-50%)}.gi-star.svelte-50ymys.svelte-50ymys{color:#eac343;font-size:1.3rem}.mobile .gi-star.svelte-50ymys.svelte-50ymys{font-size:1rem}@media screen and (max-width: 500px){.gi-star.svelte-50ymys.svelte-50ymys{font-size:1rem}}.caption.svelte-50ymys.svelte-50ymys{display:flex;justify-content:center;align-items:center;width:100%;padding:0.2rem;position:relative}.caption.svelte-50ymys span.svelte-50ymys{display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-transform:capitalize}.popup-content .caption.svelte-50ymys.svelte-50ymys{padding:0 0.2rem;font-size:0.6rem}img.claymore.svelte-50ymys.svelte-50ymys{transform:rotate(18deg) scale(1.15) translateX(-1.5em)}img.bow.svelte-50ymys.svelte-50ymys{transform:rotate(10deg) scale(1.25) translateX(-0.5em)}img.polearm.svelte-50ymys.svelte-50ymys{transform:rotate(10deg) scale(1.5) translate(-12%, 12%)}img.sword.svelte-50ymys.svelte-50ymys{transform:rotate(10deg) scale(1.2) translateY(-1em) translateX(-0.7em)}@media screen and (max-width: 500px){.caption.svelte-50ymys.svelte-50ymys{font-size:0.85rem}}",
  map: null
};
const InventoryItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { rarity = 3 } = $$props;
  let { type = "character" } = $$props;
  let { name = "No Name" } = $$props;
  let { vision = "" } = $$props;
  let { weaponType = "" } = $$props;
  let { qty = 0 } = $$props;
  let { isOwned = true } = $$props;
  let countInfo;
  if (type === "character") {
    countInfo = `C${qty > 7 ? `6 + ${qty - 7}` : qty - 1}`;
  } else {
    countInfo = `R${qty > 5 ? `5 + ${qty - 5}` : qty}`;
  }
  createEventDispatcher();
  if ($$props.rarity === void 0 && $$bindings.rarity && rarity !== void 0)
    $$bindings.rarity(rarity);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.vision === void 0 && $$bindings.vision && vision !== void 0)
    $$bindings.vision(vision);
  if ($$props.weaponType === void 0 && $$bindings.weaponType && weaponType !== void 0)
    $$bindings.weaponType(weaponType);
  if ($$props.qty === void 0 && $$bindings.qty && qty !== void 0)
    $$bindings.qty(qty);
  if ($$props.isOwned === void 0 && $$bindings.isOwned && isOwned !== void 0)
    $$bindings.isOwned(isOwned);
  $$result.css.add(css$h);
  return `<div class="${["content svelte-50ymys", isOwned ? "owned" : ""].join(" ").trim()}">${!isOwned ? `<div class="${"overlay svelte-50ymys"}"></div>` : ``}
	<picture class="${"wish-result star" + escape(rarity) + " " + escape(type) + " svelte-50ymys"}">${type === "character" ? `<img src="${"/assets/images/characters/profile/" + escape(name) + ".webp"}"${add_attribute("alt", getName(name), 0)} class="${"svelte-50ymys"}">
			<span class="${"gi-" + escape(vision) + " element svelte-50ymys"}"></span>` : `<img src="${"/assets/images/weapons/" + escape(weaponType) + "/" + escape(rarity) + "star/" + escape(name) + ".webp"}"${add_attribute("alt", getName(name), 0)} class="${escape(null_to_empty(weaponType)) + " svelte-50ymys"}">`}
		${qty > 1 ? `<span class="${"qty svelte-50ymys"}">${escape(countInfo)}</span>` : ``}</picture>
	<div class="${"caption svelte-50ymys"}"><div class="${"star svelte-50ymys"}">${each(Array(rarity), (_, i) => {
    return `<i class="${"gi-star svelte-50ymys"}"></i>`;
  })}</div>
		<span class="${"svelte-50ymys"}">${escape(getName(name))}</span></div>
</div>`;
});
var FatepointPopup_svelte_svelte_type_style_lang = "";
const css$g = {
  code: ".popup.svelte-1g535r6.svelte-1g535r6{position:fixed;top:0;left:0;width:100vw;background-color:rgba(0, 0, 0, 0.7);z-index:10;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(2px)}.popup-content.svelte-1g535r6.svelte-1g535r6{width:1000px;max-width:90%;min-width:250px;text-align:center;position:relative}.mobile .popup-content.svelte-1g535r6.svelte-1g535r6{max-width:130vh}.popup-content.svelte-1g535r6 img.svelte-1g535r6{position:relative;width:100%}.close-popup.svelte-1g535r6.svelte-1g535r6{position:absolute;top:1.5rem;right:-0.2rem;z-index:+10}.gi-close.svelte-1g535r6.svelte-1g535r6{font-size:1.3rem;background-color:transparent;color:#383b40}.container.svelte-1g535r6.svelte-1g535r6{width:100%;height:100%;display:flex;position:absolute;top:0;left:0}.container.svelte-1g535r6>div.svelte-1g535r6{flex-basis:50%;flex-grow:1;padding:3% 7%}.container.svelte-1g535r6 .content.svelte-1g535r6{width:100%;height:82%;overflow:hidden;margin:22% 0 0;text-align:left;color:#aa8e77}.selector.svelte-1g535r6.svelte-1g535r6{display:flex;flex-direction:column;height:100%;color:#383b40}.selector.svelte-1g535r6.svelte-1g535r6,.selector.svelte-1g535r6>div.svelte-1g535r6{position:relative;padding:5%}.selector.svelte-1g535r6 .bg.svelte-1g535r6{position:absolute;width:90%;top:50%;left:50%;transform:translate(-50%, -50%)}.counter.selector.svelte-1g535r6 .bg.svelte-1g535r6{width:110%;top:48%}.top.svelte-1g535r6.svelte-1g535r6{font-size:2rem}.weapon-item.svelte-1g535r6.svelte-1g535r6{display:flex;flex-direction:column;height:100%;border:solid #dcd8cd;border-width:3px 0;font-size:x-large;padding-left:0 !important;padding-right:0 !important}.counter.svelte-1g535r6 .weapon-item.svelte-1g535r6{border:0}.weapon-list.svelte-1g535r6.svelte-1g535r6{height:100%;width:100%;padding:0 10%;background-color:#dcd8cd;display:flex;justify-content:center;align-items:center;overflow:hidden;text-align:center;color:#3a4156;line-height:1.2rem}.counter.svelte-1g535r6 .weapon-list.svelte-1g535r6{background-color:transparent}.weapon-content.svelte-1g535r6.svelte-1g535r6{display:inline-block;padding:5%;width:50%}.weapon-content.svelte-1g535r6 button.svelte-1g535r6{font-size:small;aspect-ratio:8.75 / 10;position:relative;vertical-align:middle;width:100%}.mobile .weapon-content.svelte-1g535r6 button.svelte-1g535r6{font-size:xx-small}.weapon-content.active.svelte-1g535r6 button.svelte-1g535r6::after,.weapon-content.active.svelte-1g535r6 button.svelte-1g535r6::before{position:absolute;right:0;top:0}.weapon-content.active.svelte-1g535r6 button.svelte-1g535r6::after{display:block;content:'';width:100%;height:calc(100% - 0.4rem);border:solid #bed634;border-width:0.2rem 0;border-radius:0.5em}.weapon-content.active.svelte-1g535r6 button.svelte-1g535r6::before{content:'\u2714';font-size:1.2rem;color:#759a28;display:flex;justify-content:center;align-items:center;background-color:#bed634;width:20%;height:20%;z-index:+1;border-top-right-radius:0.5em}.text.svelte-1g535r6.svelte-1g535r6{margin-top:auto;height:40%;display:flex;justify-content:center;align-items:center}span.svelte-1g535r6.svelte-1g535r6{color:#f0b164}.counter.svelte-1g535r6 .text.svelte-1g535r6{height:unset;margin-bottom:-1rem}.button.svelte-1g535r6 button.svelte-1g535r6{border-radius:40px;color:white;background-color:#4a5265;display:inline-flex;align-items:center;justify-content:space-between;padding:5px 3rem 5px 5px;transition:all 0.2s}.mobile .button.svelte-1g535r6 button.svelte-1g535r6{padding:0.2rem 2rem 0.2rem 0}button.svelte-1g535r6 i.svelte-1g535r6{width:2rem;height:2rem;background-color:#353533;border-radius:100%;display:inline-flex;justify-content:center;align-items:center;font-size:1rem;margin-right:2rem}.button.svelte-1g535r6 button.svelte-1g535r6:hover{background-color:rgb(51, 57, 71)}.gi-times.svelte-1g535r6.svelte-1g535r6{color:#3f9ad1}.gi-circle-o.svelte-1g535r6.svelte-1g535r6{color:#ffc107}@media screen and (max-width: 800px) and (min-width: 500px){.top.svelte-1g535r6.svelte-1g535r6{font-size:1rem}.weapon-item.svelte-1g535r6.svelte-1g535r6{font-size:medium}}.mobile .top.svelte-1g535r6.svelte-1g535r6{font-size:medium}.mobile .text.svelte-1g535r6.svelte-1g535r6{height:30%}.mobile .counter.svelte-1g535r6 .text.svelte-1g535r6{height:unset;margin-bottom:-1rem}.mobile .weapon-item.svelte-1g535r6.svelte-1g535r6{font-size:small}",
  map: null
};
const FatepointPopup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let half;
  let weaponName;
  let weaponIndex;
  let weapons2;
  let $$unsubscribe_bannerPhase;
  let $$unsubscribe_patchVersion;
  let $bannerList, $$unsubscribe_bannerList;
  let $selectedCourse, $$unsubscribe_selectedCourse;
  let $viewportWidth, $$unsubscribe_viewportWidth;
  let $showFatepointPopup, $$unsubscribe_showFatepointPopup;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $fatePoint, $$unsubscribe_fatePoint;
  $$unsubscribe_bannerPhase = subscribe(bannerPhase, (value) => value);
  $$unsubscribe_patchVersion = subscribe(patchVersion, (value) => value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_selectedCourse = subscribe(selectedCourse, (value) => $selectedCourse = value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => $viewportWidth = value);
  $$unsubscribe_showFatepointPopup = subscribe(showFatepointPopup, (value) => $showFatepointPopup = value);
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_fatePoint = subscribe(fatePoint, (value) => $fatePoint = value);
  let showCancelConfirmation = false;
  let targetActive = null;
  let content;
  $$result.css.add(css$g);
  half = $viewportWidth < 500;
  weaponName = $selectedCourse.name;
  weaponIndex = $selectedCourse.index;
  weapons2 = $bannerList.find(({ type }) => type === "weapons")?.weapons.featured || [];
  $$unsubscribe_bannerPhase();
  $$unsubscribe_patchVersion();
  $$unsubscribe_bannerList();
  $$unsubscribe_selectedCourse();
  $$unsubscribe_viewportWidth();
  $$unsubscribe_showFatepointPopup();
  $$unsubscribe_viewportHeight();
  $$unsubscribe_fatePoint();
  return `${validate_component(PopUp, "PopUp").$$render($$result, { show: showCancelConfirmation }, {}, {
    default: () => {
      return `<div class="${"pop-up"}" style="${"display: flex; width:100%; height:100%; justify-content: center; align-items:center;"}"><div>Do you wish to cancel your curent Course ?
			<br>
			<span style="${"font-size: smaller; padding: 2rem"}" class="${"svelte-1g535r6"}">Cancelation will reset your accumulated Fate Points
			</span></div></div>`;
    }
  })}

${$showFatepointPopup ? `<section class="${"popup svelte-1g535r6"}" style="${"height:" + escape($viewportHeight) + "px"}"><div class="${"popup-content svelte-1g535r6"}"><img src="${"/assets/images/utility/fatepointbook" + escape(half ? "-half" : "") + ".webp"}" alt="${"Fatepoint Background"}" class="${"svelte-1g535r6"}">
			<button class="${"close-popup svelte-1g535r6"}"><i class="${"gi-close svelte-1g535r6"}"></i></button>
			<div class="${"container svelte-1g535r6"}">${!half ? `<div class="${"description svelte-1g535r6"}"><div class="${"content svelte-1g535r6"}"${add_attribute("this", content, 0)}><p>&quot;Epitomized Path&quot; is a wish mechanic in &quot;Epitome Invocation.&quot; Travelers can chart a
								course towards a specific 5-star promotional weapon they hope to obtain.
							</p>
							<p>\xB7 Once you have charted a course towards your chosen weapon, you will obtain 1 Fate
								Point upon <span class="${"svelte-1g535r6"}">receiving a 5-star weapon that is not the one that you chose
								</span>. You can obtain a maximum of 2 Fate Points.
							</p>
							<p>\xB7 Once you&#39;ve reached the maximum amount of Fate Points, the next 5-star weapon you
								choose will be the one you have chosen through &quot;Epitomized Path&quot;.
							</p>
							<p>\xB7 When you obtain the chosen weapon in Epitome Invocation through Epitomized Path,
								<span class="${"svelte-1g535r6"}">the accumulated Fate Points will be cleared </span>.
							</p>
							<p>\xB7 If you do not use Epitomized Path to obtain a weapon, you will not accumulate Fate
								Points.
							</p>
							<p>\xB7 The charted course towards a certain weapon can be changed or cancelled. However,
								after doing so, any current Fate Points will be cleared.
							</p>
							<p>\xB7 At the end of the current period of Epitome Invocation, any current Fate Points
								will be cleared.
							</p></div></div>` : ``}
				<div class="${["selector svelte-1g535r6", weaponName ? "counter" : ""].join(" ").trim()}"><div class="${"bg svelte-1g535r6"}">${validate_component(FatepointTribal, "FatepointTribal").$$render($$result, { mode: weaponName ? "counter" : "bg" }, {}, {})}</div>
					<div class="${"top svelte-1g535r6"}">Select Weapon</div>
					<div class="${"weapon-item svelte-1g535r6"}"><div class="${"weapon-list svelte-1g535r6"}">${weaponName ? `<div class="${"weapon-content svelte-1g535r6"}"><button class="${"svelte-1g535r6"}">${validate_component(InventoryItem, "InventoryItem").$$render($$result, {
    name: weaponName,
    weaponType: weapons2[weaponIndex].type,
    type: "weapon",
    rarity: 5
  }, {}, {})}</button></div>` : `${each(weapons2, ({ name, type }, i) => {
    return `<div class="${["weapon-content svelte-1g535r6", targetActive === i ? "active" : ""].join(" ").trim()}"><button class="${"svelte-1g535r6"}">${validate_component(InventoryItem, "InventoryItem").$$render($$result, {
      name,
      weaponType: type,
      type: "weapon",
      rarity: 5
    }, {}, {})}</button>
									</div>`;
  })}`}</div>
						<div class="${"text svelte-1g535r6"}"><div>${weaponName ? `Fate Points : <span class="${"svelte-1g535r6"}">${escape($fatePoint)}</span>/2` : `${`Select Weapon`}`}</div></div></div>
					<div class="${"button svelte-1g535r6"}">${weaponName ? `<button class="${"svelte-1g535r6"}"><i class="${"gi-times svelte-1g535r6"}"></i> Cancel Course
							</button>` : `<button class="${"svelte-1g535r6"}"><i class="${"gi-circle-o svelte-1g535r6"}"></i> Chart Course
							</button>`}</div></div></div></div></section>` : ``}`;
});
var Header_svelte_svelte_type_style_lang = "";
const css$f = {
  code: "#header.svelte-sh0x0j.svelte-sh0x0j{position:relative;display:block;width:100%;padding:30px 2%;z-index:5}.help.svelte-sh0x0j.svelte-sh0x0j{display:inline-flex;justify-content:center;align-items:center;border-radius:50px;border:0.15rem solid #fff;color:#fff;margin-left:1rem;width:1.7rem;height:1.7rem;line-height:0;transition:all 0.2s}.help.svelte-sh0x0j.svelte-sh0x0j:hover{background-color:var(--tertiary-color);color:#3a4156}.bg.svelte-sh0x0j.svelte-sh0x0j{display:none}.top.svelte-sh0x0j.svelte-sh0x0j{display:flex;justify-content:space-between;width:100%;position:relative}.wish-title.svelte-sh0x0j.svelte-sh0x0j{color:#fff;text-transform:capitalize;display:flex;align-items:center;text-align:left}.wish-title.svelte-sh0x0j img.svelte-sh0x0j{width:30px;margin-right:15px}.budget.svelte-sh0x0j.svelte-sh0x0j{text-align:right;display:flex;justify-content:flex-end;align-items:center}.banner-button.svelte-sh0x0j.svelte-sh0x0j{text-align:center;display:flex;justify-content:center;position:relative;z-index:10}.mobile #header.svelte-sh0x0j.svelte-sh0x0j{padding:0 !important}.mobile .top.svelte-sh0x0j.svelte-sh0x0j{position:fixed;top:0;right:2%;width:calc(100% - 100px);display:flex;justify-content:space-between}.mobile .wish-title.svelte-sh0x0j img.svelte-sh0x0j{display:none}.mobile .banner-button.svelte-sh0x0j.svelte-sh0x0j{flex-direction:column;align-items:center;width:120px;margin-top:0;height:100%;justify-content:flex-start;padding-top:2.5rem;z-index:-10}.mobile .bg.svelte-sh0x0j.svelte-sh0x0j{display:block;position:absolute;top:0;left:50%;width:40px;background-color:rgba(0, 0, 0, 0.4);z-index:-1;transform:translateX(-50%);text-align:center;border:solid rgba(207, 186, 143, 0.5);border-width:0 2px}.bg.svelte-sh0x0j>img.svelte-sh0x0j{width:60%;margin-top:3px}@media screen and (min-width: 975px){.banner-button.svelte-sh0x0j.svelte-sh0x0j{position:absolute;max-width:50%;top:20px;left:50%;transform:translateX(-50%);margin-top:0}}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let headerHeightstyle;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $bannerList, $$unsubscribe_bannerList;
  let $bannerActive, $$unsubscribe_bannerActive;
  let $starglitter, $$unsubscribe_starglitter;
  let $stardust, $$unsubscribe_stardust;
  let $unlimitedFates, $$unsubscribe_unlimitedFates;
  let $primogem, $$unsubscribe_primogem;
  let $isAcquaintUsed, $$unsubscribe_isAcquaintUsed;
  let $acquaint, $$unsubscribe_acquaint;
  let $intertwined, $$unsubscribe_intertwined;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
  $$unsubscribe_starglitter = subscribe(starglitter, (value) => $starglitter = value);
  $$unsubscribe_stardust = subscribe(stardust, (value) => $stardust = value);
  $$unsubscribe_unlimitedFates = subscribe(unlimitedFates, (value) => $unlimitedFates = value);
  $$unsubscribe_primogem = subscribe(primogem, (value) => $primogem = value);
  $$unsubscribe_isAcquaintUsed = subscribe(isAcquaintUsed, (value) => $isAcquaintUsed = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => $acquaint = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => $intertwined = value);
  let showMenu = false;
  $$result.css.add(css$f);
  headerHeightstyle = $mobileMode ? `height: ${$viewportHeight}px` : "";
  $$unsubscribe_viewportHeight();
  $$unsubscribe_mobileMode();
  $$unsubscribe_bannerList();
  $$unsubscribe_bannerActive();
  $$unsubscribe_starglitter();
  $$unsubscribe_stardust();
  $$unsubscribe_unlimitedFates();
  $$unsubscribe_primogem();
  $$unsubscribe_isAcquaintUsed();
  $$unsubscribe_acquaint();
  $$unsubscribe_intertwined();
  return `${validate_component(FatepointPopup, "FatepointPopup").$$render($$result, {}, {}, {})}
${validate_component(MainMenu, "MainMenu").$$render($$result, { show: showMenu }, {}, {})}

<div id="${"header"}"${add_attribute("style", headerHeightstyle, 0)} class="${"svelte-sh0x0j"}"><div class="${"top svelte-sh0x0j"}"><h1 class="${"wish-title svelte-sh0x0j"}"><img src="${"/assets/images/utility/brand.svg"}" alt="${"Brand"}" class="${"svelte-sh0x0j"}">
			<span>${escape($bannerList[$bannerActive]?.type || "")} Wish </span>
			<button class="${"help svelte-sh0x0j"}"><i class="${"gi-help"}"></i></button></h1>
		<div class="${"budget svelte-sh0x0j"}"><div class="${"fates"}">${$mobileMode ? `${validate_component(MyFund, "MyFund").$$render($$result, { type: "starglitter" }, {}, {
    default: () => {
      return `${escape($starglitter)}`;
    }
  })}
					${validate_component(MyFund, "MyFund").$$render($$result, { type: "stardust" }, {}, {
    default: () => {
      return `${escape($stardust)}`;
    }
  })}` : ``}

				${validate_component(MyFund, "MyFund").$$render($$result, { type: "primogem" }, {}, {
    default: () => {
      return `${escape($unlimitedFates ? "\u221E" : $primogem)}`;
    }
  })}
				${$isAcquaintUsed ? `${validate_component(MyFund, "MyFund").$$render($$result, { type: "acquaint" }, {}, {
    default: () => {
      return `${escape($unlimitedFates ? "\u221E" : $acquaint)}`;
    }
  })}` : `${validate_component(MyFund, "MyFund").$$render($$result, { type: "intertwined" }, {}, {
    default: () => {
      return `${escape($unlimitedFates ? "\u221E" : $intertwined)}`;
    }
  })}`}</div>

			<button class="${"close"}" title="${"Change Banner"}"><i class="${"gi-close"}"></i></button></div></div>

	<div class="${"banner-button svelte-sh0x0j"}"><div class="${"bg svelte-sh0x0j"}"${add_attribute("style", headerHeightstyle, 0)}><img src="${"/assets/images/utility/brand.svg"}" alt="${"Brand"}" class="${"svelte-sh0x0j"}"></div>

		${each($bannerList, ({ type, character, weapons: weapons2 }, i) => {
    return `${validate_component(BannerButton, "BannerButton").$$render($$result, {
      type,
      character: character || "",
      weapons: weapons2 || [],
      active: $bannerActive === i
    }, {}, {})}`;
  })}

		${$mobileMode ? `${validate_component(FatepointButton, "FatepointButton").$$render($$result, {}, {}, {})}` : ``}</div>
</div>`;
});
var Footer_svelte_svelte_type_style_lang = "";
const css$e = {
  code: "#footer.svelte-1dz3qv8.svelte-1dz3qv8{position:relative}.red.svelte-1dz3qv8.svelte-1dz3qv8{color:#de2f22 !important}.footer-info.svelte-1dz3qv8.svelte-1dz3qv8{position:absolute;left:5%;bottom:75%;align-items:center;display:flex;flex-direction:column}.wish.svelte-1dz3qv8>div.svelte-1dz3qv8{display:inline-flex;align-items:center;margin-right:5px;padding:2px 20px 2px 2px;font-size:0.9rem}.wish.svelte-1dz3qv8 span.svelte-1dz3qv8{margin-left:10px;color:#fff;text-shadow:0 0 3px rgba(0, 0, 0, 0.5)}button.svelte-1dz3qv8.svelte-1dz3qv8{transform:scale(1);transition:all 0.2s;color:#4a5265;text-decoration:none}button.svelte-1dz3qv8.svelte-1dz3qv8:active{transform:scale(0.95)}.row.svelte-1dz3qv8.svelte-1dz3qv8{width:100%;height:100%;padding:0 5%;display:flex;justify-content:space-between;align-items:center}.menu-button.svelte-1dz3qv8 button.svelte-1dz3qv8{border-radius:50px;background-color:#fff;border:3px solid #fff;padding:3px 20px;margin:2px 5px;transition:all 0.2s}.menu-button.svelte-1dz3qv8 button.svelte-1dz3qv8:active,.menu-button.svelte-1dz3qv8 button.svelte-1dz3qv8:hover{background-color:var(--tertiary-color)}.roll-button.svelte-1dz3qv8.svelte-1dz3qv8{text-align:right}.roll-button.svelte-1dz3qv8 button.svelte-1dz3qv8{background-image:url('/assets/images/utility/button.webp');background-size:contain;background-position:center;background-repeat:no-repeat;width:230px;aspect-ratio:355/88;margin:0 5px;display:inline-flex;justify-content:center;align-items:center;flex-direction:column;color:#a49a90;transition:all 0.2s}.roll-button.svelte-1dz3qv8 button .bottom.svelte-1dz3qv8{display:flex;align-items:center}.discount.svelte-1dz3qv8.svelte-1dz3qv8{background-color:#8ab958;position:absolute;z-index:+2;left:15%;top:-5%;border-radius:20px;color:#fff;transform:scale(0.8) translateX(-50%);padding:0.2rem 0.5rem}@media screen and (min-width: 750px){.discount.svelte-1dz3qv8.svelte-1dz3qv8{font-size:0.7rem}}.mobile .row.svelte-1dz3qv8.svelte-1dz3qv8{padding:0}.mobile .menu-button.svelte-1dz3qv8 button.svelte-1dz3qv8{padding:1.5px 11px;margin:1px 2px;font-size:0.75rem}.mobile .roll-button.svelte-1dz3qv8.svelte-1dz3qv8{margin-right:40px !important}.mobile .roll-button.svelte-1dz3qv8 button.svelte-1dz3qv8{margin-right:-0.7rem !important;margin-left:-0.7rem !important;font-size:0.75rem}.mobile .roll-button.svelte-1dz3qv8 img{transform:scale(0.7)}.mobile .bottom.svelte-1dz3qv8.svelte-1dz3qv8{margin-top:-3px}@media screen and (max-width: 900px){button.svelte-1dz3qv8.svelte-1dz3qv8,.menu-button.svelte-1dz3qv8 button.svelte-1dz3qv8{padding:2px 15px;margin:2px 5px}.roll-button.svelte-1dz3qv8 button.svelte-1dz3qv8{width:180px;height:40px;margin:0}.roll-button.svelte-1dz3qv8 img{transform:scale(0.8)}}@media screen and (max-width: 700px){.roll-button.svelte-1dz3qv8.svelte-1dz3qv8{width:100%}}@media screen and (max-width: 550px){.menu-button.svelte-1dz3qv8.svelte-1dz3qv8{width:100%}.roll-button.svelte-1dz3qv8.svelte-1dz3qv8{width:auto}}@media screen and (max-width: 400px){.menu-button.svelte-1dz3qv8 button.svelte-1dz3qv8{padding:1px 10px;margin:1px 2px}.roll-button.svelte-1dz3qv8 button.svelte-1dz3qv8{width:140px;height:30px;margin:0}.roll-button.svelte-1dz3qv8 img{transform:scale(0.7)}.roll-button.svelte-1dz3qv8 .bottom.svelte-1dz3qv8{margin-top:-3px}}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fateQty;
  let fateType;
  let activeBanner;
  let bannerActiveType;
  let multiRollPrice;
  let $bannerActive, $$unsubscribe_bannerActive;
  let $bannerList, $$unsubscribe_bannerList;
  let $isAcquaintUsed, $$unsubscribe_isAcquaintUsed;
  let $intertwined, $$unsubscribe_intertwined;
  let $acquaint, $$unsubscribe_acquaint;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $starglitter, $$unsubscribe_starglitter;
  let $stardust, $$unsubscribe_stardust;
  let $unlimitedFates, $$unsubscribe_unlimitedFates;
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_isAcquaintUsed = subscribe(isAcquaintUsed, (value) => $isAcquaintUsed = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => $intertwined = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => $acquaint = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_starglitter = subscribe(starglitter, (value) => $starglitter = value);
  $$unsubscribe_stardust = subscribe(stardust, (value) => $stardust = value);
  $$unsubscribe_unlimitedFates = subscribe(unlimitedFates, (value) => $unlimitedFates = value);
  createEventDispatcher();
  $$result.css.add(css$e);
  fateQty = $isAcquaintUsed ? $acquaint : $intertwined;
  fateType = $isAcquaintUsed ? "acquaint" : "intertwined";
  activeBanner = $bannerList[$bannerActive];
  bannerActiveType = activeBanner.type + (isNaN(activeBanner.index) ? "" : activeBanner.index);
  multiRollPrice = bannerActiveType === "beginner" ? 8 : 10;
  $$unsubscribe_bannerActive();
  $$unsubscribe_bannerList();
  $$unsubscribe_isAcquaintUsed();
  $$unsubscribe_intertwined();
  $$unsubscribe_acquaint();
  $$unsubscribe_mobileMode();
  $$unsubscribe_starglitter();
  $$unsubscribe_stardust();
  $$unsubscribe_unlimitedFates();
  return `<div id="${"footer"}" style="${"width: 100%; height: 100%"}" class="${"svelte-1dz3qv8"}"><div class="${"footer-info svelte-1dz3qv8"}">${!$mobileMode ? `${validate_component(FatepointButton, "FatepointButton").$$render($$result, {}, {}, {})}
			<div class="${"wish svelte-1dz3qv8"}"><div class="${"starglitter svelte-1dz3qv8"}">${validate_component(Icon, "Icon").$$render($$result, { type: "starglitter" }, {}, {})}
					<span class="${"svelte-1dz3qv8"}">${escape($starglitter)}</span></div>
				<div class="${"stardust svelte-1dz3qv8"}">${validate_component(Icon, "Icon").$$render($$result, { type: "stardust" }, {}, {})}
					<span class="${"svelte-1dz3qv8"}">${escape($stardust)}</span></div></div>` : ``}</div>

	<div class="${"row svelte-1dz3qv8"}"><div class="${"left menu-button svelte-1dz3qv8"}"><button class="${"svelte-1dz3qv8"}">Shop </button>
			<button class="${"svelte-1dz3qv8"}">Inventory </button>
			<button class="${"svelte-1dz3qv8"}">History </button></div>
		<div class="${"right roll-button svelte-1dz3qv8"}">${bannerActiveType !== "beginner" ? `<button class="${"single svelte-1dz3qv8"}"><div class="${"top"}">Wish x1</div>
					<div class="${"bottom svelte-1dz3qv8"}">${validate_component(Icon, "Icon").$$render($$result, { type: fateType }, {}, {})}
						<span style="${"margin-left: 7px"}">x
							<span class="${["svelte-1dz3qv8", fateQty < 1 && !$unlimitedFates ? "red" : ""].join(" ").trim()}">1 </span></span></div></button>` : ``}

			<button class="${"ten svelte-1dz3qv8"}">${bannerActiveType === "beginner" ? `<span class="${"discount svelte-1dz3qv8"}">-20%</span>` : ``}
				<div class="${"top"}">Wish x10</div>
				<div class="${"bottom svelte-1dz3qv8"}">${validate_component(Icon, "Icon").$$render($$result, { type: fateType }, {}, {})}
					<span style="${"margin-left: 7px"}">x
						<span class="${[
    "svelte-1dz3qv8",
    fateQty < multiRollPrice && !$unlimitedFates ? "red" : ""
  ].join(" ").trim()}">${escape(multiRollPrice)}</span></span></div></button></div></div>
</div>`;
});
var Meteor_svelte_svelte_type_style_lang = "";
const css$d = {
  code: ".red.svelte-1f6mv94{color:#de2f22 !important}.yellow.svelte-1f6mv94{color:rgb(218, 177, 45)}.exchange.svelte-1f6mv94{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.wish-output.svelte-1f6mv94{position:fixed;z-index:998;display:none;top:0;left:0;width:100vw}.wish-output.show.svelte-1f6mv94{display:block;background-color:#fff}.video.svelte-1f6mv94{position:relative;width:100vw;height:100%}.skip.svelte-1f6mv94{position:absolute;top:2%;right:2%;color:#fff;font-size:1.2rem;z-index:10}.gi-caret-up.svelte-1f6mv94{display:inline-block;transform:rotate(90deg) translateX(-0.1rem);vertical-align:middle;margin-left:-0.5em}.mobile .skip.svelte-1f6mv94{font-size:0.8rem;right:1rem;top:1rem}video.svelte-1f6mv94{display:none;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:100%;height:100%;object-fit:cover}",
  map: null
};
const Meteor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let balance;
  let isBeginner;
  let balanceNeededToRoll;
  let popupButton;
  let fateType;
  let $isAcquaintUsed, $$unsubscribe_isAcquaintUsed;
  let $primogem, $$unsubscribe_primogem;
  let $bannerActive, $$unsubscribe_bannerActive;
  let $bannerList, $$unsubscribe_bannerList;
  let $intertwined, $$unsubscribe_intertwined;
  let $acquaint, $$unsubscribe_acquaint;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $muted, $$unsubscribe_muted;
  $$unsubscribe_isAcquaintUsed = subscribe(isAcquaintUsed, (value) => $isAcquaintUsed = value);
  $$unsubscribe_primogem = subscribe(primogem, (value) => $primogem = value);
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => $intertwined = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => $acquaint = value);
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_muted = subscribe(muted, (value) => $muted = value);
  let { showMeteor = false } = $$props;
  let { meteorStar = 3 } = $$props;
  let { singleMeteor = true } = $$props;
  let { showConvertPopup = false } = $$props;
  let { rollCount = 0 } = $$props;
  let v3star;
  let v4starSingle;
  let v4star;
  let v5starSingle;
  let v5star;
  let showToast = false;
  const dispatch = createEventDispatcher();
  const showVideoHandle = (rarity, single = true) => {
    let videoContent = v3star;
    if (single && rarity !== 3) {
      videoContent = rarity === 5 ? v5starSingle : v4starSingle;
    }
    if (!single) {
      videoContent = rarity === 5 ? v5star : v4star;
    }
    if (isNaN(videoContent.duration)) {
      showToast = true;
      console.error("Can't play Meteor Animation because it cannot be loaded");
      return dispatch("endAnimation");
    }
    videoContent.style.display = "unset";
    return videoContent.play();
  };
  if ($$props.showMeteor === void 0 && $$bindings.showMeteor && showMeteor !== void 0)
    $$bindings.showMeteor(showMeteor);
  if ($$props.meteorStar === void 0 && $$bindings.meteorStar && meteorStar !== void 0)
    $$bindings.meteorStar(meteorStar);
  if ($$props.singleMeteor === void 0 && $$bindings.singleMeteor && singleMeteor !== void 0)
    $$bindings.singleMeteor(singleMeteor);
  if ($$props.showConvertPopup === void 0 && $$bindings.showConvertPopup && showConvertPopup !== void 0)
    $$bindings.showConvertPopup(showConvertPopup);
  if ($$props.rollCount === void 0 && $$bindings.rollCount && rollCount !== void 0)
    $$bindings.rollCount(rollCount);
  $$result.css.add(css$d);
  balance = $isAcquaintUsed ? $acquaint : $intertwined;
  isBeginner = $bannerList[$bannerActive]?.type === "beginner";
  balanceNeededToRoll = (isBeginner && rollCount > 1 ? 8 : rollCount) - balance;
  popupButton = $primogem < balanceNeededToRoll * 160 ? "cancel" : "all";
  fateType = $isAcquaintUsed ? "Acquaint" : "Intertwined";
  {
    if (showMeteor)
      showVideoHandle(meteorStar, singleMeteor);
  }
  $$unsubscribe_isAcquaintUsed();
  $$unsubscribe_primogem();
  $$unsubscribe_bannerActive();
  $$unsubscribe_bannerList();
  $$unsubscribe_intertwined();
  $$unsubscribe_acquaint();
  $$unsubscribe_viewportHeight();
  $$unsubscribe_muted();
  return `${validate_component(PopUp, "PopUp").$$render($$result, {
    title: "Paimon Bargains",
    sfx: false,
    button: popupButton,
    show: showConvertPopup
  }, {}, {
    default: () => {
      return `<div class="${"exchange svelte-1f6mv94"}"><div>An Aditional <span class="${"yellow svelte-1f6mv94"}">${escape(balanceNeededToRoll)}</span>
			${escape(fateType)}
			Fate are needed. <br>
			Purchase with
			<span class="${[
        "yellow svelte-1f6mv94",
        $primogem < balanceNeededToRoll * 160 ? "red" : ""
      ].join(" ").trim()}">${escape(balanceNeededToRoll * 160)}</span>
			Primogem ?

			${$primogem < balanceNeededToRoll * 160 ? `<br>
				<br>
				<span class="${"red svelte-1f6mv94"}">Infsufficient Funds</span>` : ``}</div></div>`;
    }
  })}

${showToast ? `${validate_component(Toast, "Toast").$$render($$result, {}, {}, {
    default: () => {
      return `Meteor Animation Failed to Load`;
    }
  })}` : ``}

<div class="${["wish-output svelte-1f6mv94", showMeteor ? "show" : ""].join(" ").trim()}" style="${"height: " + escape($viewportHeight) + "px"}"><div class="${"video svelte-1f6mv94"}"><video preload="${"auto"}" ${$muted ? "muted" : ""} class="${"svelte-1f6mv94"}"${add_attribute("this", v3star, 0)}><source src="${"/assets/videos/3star-single.webm"}" type="${"video/webm"}"><track kind="${"captions"}"></video>
		<video preload="${"auto"}" ${$muted ? "muted" : ""} class="${"svelte-1f6mv94"}"${add_attribute("this", v4starSingle, 0)}><source src="${"/assets/videos/4star-single.webm"}" type="${"video/webm"}"><track kind="${"captions"}"></video>
		<video preload="${"auto"}" ${$muted ? "muted" : ""} class="${"svelte-1f6mv94"}"${add_attribute("this", v4star, 0)}><source src="${"/assets/videos/4star.webm"}" type="${"video/webm"}"><track kind="${"captions"}"></video>
		<video preload="${"auto"}" ${$muted ? "muted" : ""} class="${"svelte-1f6mv94"}"${add_attribute("this", v5starSingle, 0)}><source src="${"/assets/videos/5star-single.webm"}" type="${"video/webm"}"><track kind="${"captions"}"></video>
		<video preload="${"auto"}" ${$muted ? "muted" : ""} class="${"svelte-1f6mv94"}"${add_attribute("this", v5star, 0)}><source src="${"/assets/videos/5star.webm"}" type="${"video/webm"}"><track kind="${"captions"}"></video>
		<button class="${"skip svelte-1f6mv94"}">Skip <i class="${"gi-caret-up svelte-1f6mv94"}"></i></button></div>
</div>`;
});
var BannerItem_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".banner.svelte-gi9yuv.svelte-gi9yuv{padding:30px 0;width:80%;max-width:850px;max-height:75vh;display:flex;align-items:center;position:absolute;bottom:0;left:50%;transform:translateX(-50%)}img.svelte-gi9yuv.svelte-gi9yuv,.banner-content.svelte-gi9yuv.svelte-gi9yuv{max-height:100%;max-width:100%}.banner-content.svelte-gi9yuv.svelte-gi9yuv{position:relative}.mobile .banner.svelte-gi9yuv.svelte-gi9yuv{padding:0;width:88%;max-height:unset;margin-bottom:-10px}.navigate.svelte-gi9yuv.svelte-gi9yuv{position:absolute;top:50%;left:50%;width:115%;transform:translate(-50%, -50%);display:flex;justify-content:space-between;transition:all 0.2s}.navigate.svelte-gi9yuv button.svelte-gi9yuv{color:#dad4b4;font-size:2rem;line-height:0}.mobile .navigate.svelte-gi9yuv.svelte-gi9yuv{display:none}.selected.svelte-gi9yuv.svelte-gi9yuv{position:absolute;bottom:0.3rem;right:0;max-width:80%;padding:0.2rem 1rem;color:#fff;background-color:rgba(0, 0, 0, 0.4);font-size:1rem;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}.selected.fill.svelte-gi9yuv.svelte-gi9yuv{background-color:#62c5ff}.detail.svelte-gi9yuv.svelte-gi9yuv{position:absolute;left:5%;bottom:13%;background-color:#eee8e3;color:rgba(0, 0, 0, 0.5);padding:0.2rem 1.5rem;border-radius:20px;border:#e2d7b6 0.1rem solid;font-size:0.9rem;transition:all 0.2s}.detail.svelte-gi9yuv.svelte-gi9yuv:hover{background-color:#e2d7b6;color:rgba(0, 0, 0, 1)}",
  map: null
};
const BannerItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mobileBannerStyle;
  let style;
  let activeBanner;
  let $bannerActive, $$unsubscribe_bannerActive;
  let $bannerList, $$unsubscribe_bannerList;
  let $viewportWidth, $$unsubscribe_viewportWidth;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $patchVersion, $$unsubscribe_patchVersion;
  let $selectedCourse, $$unsubscribe_selectedCourse;
  let $fatePoint, $$unsubscribe_fatePoint;
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => $viewportWidth = value);
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_patchVersion = subscribe(patchVersion, (value) => $patchVersion = value);
  $$unsubscribe_selectedCourse = subscribe(selectedCourse, (value) => $selectedCourse = value);
  $$unsubscribe_fatePoint = subscribe(fatePoint, (value) => $fatePoint = value);
  $$result.css.add(css$c);
  mobileBannerStyle = $mobileMode ? `max-width: ${150 / 100 * $viewportHeight}px;` : "";
  style = $viewportHeight > 800 || $viewportHeight > $viewportWidth || $viewportHeight / $viewportWidth > 0.5 ? "bottom: unset; top: 50%; transform: translate(-50%, -50%);" + mobileBannerStyle : mobileBannerStyle;
  activeBanner = $bannerList[$bannerActive];
  $$unsubscribe_bannerActive();
  $$unsubscribe_bannerList();
  $$unsubscribe_viewportWidth();
  $$unsubscribe_viewportHeight();
  $$unsubscribe_mobileMode();
  $$unsubscribe_patchVersion();
  $$unsubscribe_selectedCourse();
  $$unsubscribe_fatePoint();
  return `<div class="${"banner svelte-gi9yuv"}"${add_attribute("style", style, 0)}>${activeBanner.type === "beginner" ? `<div><div class="${"banner-content svelte-gi9yuv"}"><img src="${"/assets/images/banner/beginner.webp"}" alt="${"Beginner Banner"}" class="${"svelte-gi9yuv"}">
				<button class="${"detail svelte-gi9yuv"}">Details </button></div></div>` : `${activeBanner.type === "weapons" ? `<div><div class="${"banner-content svelte-gi9yuv"}"><img src="${"/assets/images/banner/" + escape($patchVersion) + "/" + escape(activeBanner.weapons.name) + ".webp"}" alt="${"Weapon Banner"}" class="${"svelte-gi9yuv"}">

				${$selectedCourse.name ? `<div class="${["selected svelte-gi9yuv", $fatePoint === 2 ? "fill" : ""].join(" ").trim()}">Course Set For: ${escape(getName($selectedCourse.name))}</div>` : ``}
				<button class="${"detail svelte-gi9yuv"}">Details </button></div></div>` : `${activeBanner.type === "standard" ? `<div><div class="${"banner-content svelte-gi9yuv"}"><img src="${"/assets/images/banner/standard/" + escape(activeBanner.character.name) + ".webp"}" alt="${"Standard Banner"}" class="${"svelte-gi9yuv"}">
				<button class="${"detail svelte-gi9yuv"}">Details </button></div></div>` : `${activeBanner.type === "events" ? `<div><div class="${"banner-content svelte-gi9yuv"}"><img src="${"/assets/images/banner/" + escape($patchVersion) + "/" + escape(activeBanner.character.name) + ".webp"}" alt="${"Character Events Banner"}" class="${"svelte-gi9yuv"}">
				<button class="${"detail svelte-gi9yuv"}">Details </button></div></div>` : ``}`}`}`}

	<div class="${"navigate svelte-gi9yuv"}">${$bannerActive > 0 ? `<button class="${"left svelte-gi9yuv"}" style="${"margin-right: auto;"}"><i class="${"gi-arrow-left"}"></i></button>` : ``}

		${$bannerActive < $bannerList.length - 1 ? `<button class="${"left svelte-gi9yuv"}" style="${"margin-left: auto;"}"><i class="${"gi-arrow-right"}"></i></button>` : ``}</div>
</div>`;
});
var MainBanner_svelte_svelte_type_style_lang = "";
const css$b = {
  code: "section.svelte-ckbgiq{width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;overflow:hidden;background-image:url('/assets/images/background/wish-background.webp');background-repeat:no-repeat;background-position:center;background-size:cover}.top.svelte-ckbgiq,.banner.svelte-ckbgiq,.button.svelte-ckbgiq,.item.svelte-ckbgiq{display:block;width:100%}.top.svelte-ckbgiq{min-height:70px}.banner.svelte-ckbgiq,.item.svelte-ckbgiq{height:100%}.item.svelte-ckbgiq{position:relative}.banner.svelte-ckbgiq{display:flex;justify-content:center;flex-direction:column;zoom:115%}.button.svelte-ckbgiq{height:120px}.mobile section.svelte-ckbgiq{flex-direction:row}.mobile .top.svelte-ckbgiq{height:100%;width:min-content}.mobile .banner.svelte-ckbgiq{width:120%;margin-left:-20px}.mobile .button.svelte-ckbgiq{height:50px;margin-bottom:0.2rem}",
  map: null
};
const MainBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_unlimitedFates;
  let $$unsubscribe_bannerList;
  let $bannerPhase, $$unsubscribe_bannerPhase;
  let $patchVersion, $$unsubscribe_patchVersion;
  let $$unsubscribe_intertwined;
  let $$unsubscribe_acquaint;
  let $$unsubscribe_isAcquaintUsed;
  let $$unsubscribe_bannerActive;
  $$unsubscribe_unlimitedFates = subscribe(unlimitedFates, (value) => value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => value);
  $$unsubscribe_bannerPhase = subscribe(bannerPhase, (value) => $bannerPhase = value);
  $$unsubscribe_patchVersion = subscribe(patchVersion, (value) => $patchVersion = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => value);
  $$unsubscribe_isAcquaintUsed = subscribe(isAcquaintUsed, (value) => value);
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => value);
  let showMeteor = false;
  let singleMeteor = true;
  let meteorStar = 3;
  let showConvertPopup = false;
  let rollCount = 0;
  const preloadWish = (version, phase) => {
    if (!version || !phase)
      return;
    Wish.init(version, phase);
  };
  $$result.css.add(css$b);
  {
    preloadWish($patchVersion, $bannerPhase);
  }
  $$unsubscribe_unlimitedFates();
  $$unsubscribe_bannerList();
  $$unsubscribe_bannerPhase();
  $$unsubscribe_patchVersion();
  $$unsubscribe_intertwined();
  $$unsubscribe_acquaint();
  $$unsubscribe_isAcquaintUsed();
  $$unsubscribe_bannerActive();
  return `${$$result.head += `${$$result.title = `<title>${escape(APP_TITLE)}</title>`, ""}`, ""}

${``}
${``}

<section class="${"svelte-ckbgiq"}"><div class="${"col top svelte-ckbgiq"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}</div>

	${validate_component(Meteor, "Meteor").$$render($$result, {
    showMeteor,
    singleMeteor,
    meteorStar,
    showConvertPopup,
    rollCount
  }, {}, {})}
	<div class="${"col banner svelte-ckbgiq"}"><div class="${"item svelte-ckbgiq"}">${validate_component(BannerItem, "BannerItem").$$render($$result, {}, {}, {})}</div>
		<div class="${"col button svelte-ckbgiq"}">${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div></div>
</section>`;
});
var PreviousBannerList_svelte_svelte_type_style_lang = "";
function __variableDynamicImportRuntime0__$2(path) {
  switch (path) {
    case "../../data/banners/events/1.0.json":
      return import("../../chunks/1.0-b51db3df.js");
    case "../../data/banners/events/1.1.json":
      return import("../../chunks/1.1-e0f76d83.js");
    case "../../data/banners/events/1.2.json":
      return import("../../chunks/1.2-ce4d433d.js");
    case "../../data/banners/events/1.3.json":
      return import("../../chunks/1.3-2c2ef70c.js");
    case "../../data/banners/events/1.4.json":
      return import("../../chunks/1.4-bc55da34.js");
    case "../../data/banners/events/1.5.json":
      return import("../../chunks/1.5-f8e908c0.js");
    case "../../data/banners/events/1.6.json":
      return import("../../chunks/1.6-a02d993e.js");
    case "../../data/banners/events/2.0.json":
      return import("../../chunks/2.0-134166ed.js");
    case "../../data/banners/events/2.1.json":
      return import("../../chunks/2.1-8e52de73.js");
    case "../../data/banners/events/2.2.json":
      return import("../../chunks/2.2-213c80da.js");
    case "../../data/banners/events/2.3.json":
      return import("../../chunks/2.3-02e1baf0.js");
    case "../../data/banners/events/2.4.json":
      return import("../../chunks/2.4-d0708b1f.js");
    case "../../data/banners/events/2.5.json":
      return import("../../chunks/2.5-3a0e6b59.js");
    case "../../data/banners/events/2.6.json":
      return import("../../chunks/2.6-f5124a1b.js");
    case "../../data/banners/events/2.7.json":
      return import("../../chunks/2.7-ea0c4dbf.js");
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
const css$a = {
  code: "section.svelte-122wrer.svelte-122wrer{width:100%;height:100%;display:flex;flex-direction:column;background-image:url('/assets/images/background/constellation.webp');background-size:cover;color:var(--tertiary-color);font-size:0.97rem}h1.svelte-122wrer.svelte-122wrer{color:var(--tertiary-color)}h2.svelte-122wrer.svelte-122wrer{font-size:1.1rem;padding:0.2rem 2rem 0.2rem 6rem;margin-left:-5rem;margin-top:1rem;border-radius:40px;background-color:var(--tertiary-color);display:inline-block;position:relative;text-transform:capitalize;color:#383b40}h2.svelte-122wrer .gi-primo-star.svelte-122wrer{color:#ede5d8;position:absolute;right:0;top:50%;line-height:0;transform:translate(80%, -50%)}header.svelte-122wrer.svelte-122wrer{width:100%;display:flex;justify-content:space-between;align-items:center;padding:15px 2%}.mobile header.svelte-122wrer.svelte-122wrer{padding:5px 2%}button.svelte-122wrer.svelte-122wrer:no-button(.close){display:inline-flex;justify-content:center;align-items:center;width:35px;height:35px;color:rgba(0, 0, 0, 0.7);background-color:#fff;padding:0;line-height:0;border-radius:40px;transition:all 0.2s}button.svelte-122wrer.svelte-122wrer:hover{background-color:var(--tertiary-color)}.close.svelte-122wrer.svelte-122wrer{margin-left:auto}.body.svelte-122wrer.svelte-122wrer{display:flex;flex-direction:column;width:100%;height:100%}.filter.svelte-122wrer.svelte-122wrer{height:3rem;width:100%}.mobile .filter.svelte-122wrer.svelte-122wrer{height:2rem;margin-top:-0.5rem}.filter.svelte-122wrer .row.svelte-122wrer{width:100%;height:100%;display:flex;align-items:center;padding:0 2%}.search.svelte-122wrer.svelte-122wrer{position:relative}.search.svelte-122wrer input.svelte-122wrer{background-color:var(--tertiary-color);border-radius:2rem;padding:0.3rem 2rem 0.3rem 1rem}.search.svelte-122wrer button.svelte-122wrer{background-color:transparent;position:absolute;right:0.3rem;top:50%;transform:translateY(-50%)}.sort-selector.svelte-122wrer.svelte-122wrer,.search.svelte-122wrer input.svelte-122wrer{width:13rem;font-size:0.75rem}.sort-selector.svelte-122wrer.svelte-122wrer{color:#3a4156;margin:0 0.5rem;display:inline-block;position:relative;text-transform:capitalize}.selected-filter.svelte-122wrer.svelte-122wrer{background-color:var(--tertiary-color);padding:0.3rem 1rem;border-radius:10rem}.selected-filter.svelte-122wrer i.svelte-122wrer{display:inline-block;position:absolute;right:1rem}.filter-list.svelte-122wrer.svelte-122wrer{position:absolute;bottom:-30%;display:flex;flex-direction:column;width:100%;background-color:var(--tertiary-color);transform:translateY(100%);border-radius:0.3rem;padding:0.2rem 0;z-index:+1}.filter-list.svelte-122wrer a.svelte-122wrer{padding:0.2rem 1rem;text-decoration:none;color:#3a4156;transition:background 0.2s}.filter-list.svelte-122wrer a.selected.svelte-122wrer,.filter-list.svelte-122wrer a.svelte-122wrer:hover{background-color:rgb(231, 219, 199)}.filter.svelte-122wrer button.svelte-122wrer{width:1.7rem;height:1.7rem;font-size:1rem}.gi-exchange.svelte-122wrer.svelte-122wrer{transform:rotate(90deg)}.content.svelte-122wrer.svelte-122wrer{padding:1rem 2%;width:100%;height:100%;display:block}.item.svelte-122wrer.svelte-122wrer{display:inline-flex;flex-direction:column;width:60vh;max-width:46%;margin:0.5rem 0.5rem 1rem;text-align:center}.mobile .item.svelte-122wrer.svelte-122wrer{width:65vh}.banner.svelte-122wrer.svelte-122wrer{display:flex;justify-content:space-between}.item.svelte-122wrer img.svelte-122wrer{width:49.5%}.dual.svelte-122wrer.svelte-122wrer{width:50%;display:flex}.dual1.svelte-122wrer.svelte-122wrer{object-position:60%;width:40% !important}.dual2.svelte-122wrer.svelte-122wrer{object-position:100%;width:60% !important}.item.svelte-122wrer .name.svelte-122wrer{width:100%;padding:0.3rem;font-weight:400;font-size:0.97rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-transform:capitalize}",
  map: null
};
const PreviousBannerList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_patchVersion;
  let $$unsubscribe_bannerPhase;
  let $query, $$unsubscribe_query;
  $$unsubscribe_patchVersion = subscribe(patchVersion, (value) => value);
  $$unsubscribe_bannerPhase = subscribe(bannerPhase, (value) => value);
  $$unsubscribe_query = subscribe(query, (value) => $query = value);
  let allBanners = [];
  let dataToShow = [];
  let groupby = "version";
  let searchValue = $query || "";
  const checkAllBanner = async () => {
    const patchList = [];
    allPatch.forEach((patch) => {
      const json = __variableDynamicImportRuntime0__$2(`../../data/banners/events/${patch.toFixed(1)}.json`);
      patchList.push(json);
    });
    const promise = await Promise.all(patchList);
    const data2 = promise.map(({ data: data3, patch }) => {
      patch = patch.toFixed(1);
      data3 = data3.map(({ phase, banners }) => {
        let { events, weapons: weapons2 } = banners;
        return {
          rateup: [...events.rateup, ...weapons2.rateup],
          weapons: {
            name: weapons2.name,
            list: weapons2.featured
          },
          chars: events.item,
          patch,
          phase
        };
      });
      return [patch.toString(), data3];
    });
    allBanners = data2.reverse();
    if (searchValue.trim().length > 0)
      return handleSearch();
    dataToShow = allBanners;
    return data2;
  };
  checkAllBanner();
  const handleSearch = () => {
    groupby = "version";
    const query2 = searchValue.trim().toLocaleLowerCase();
    if (query2.length < 1)
      return dataToShow = allBanners;
    const check = (t) => t.replace(/_/g, "").replace(/-/g, " ").includes(query2);
    const newArr = allBanners.map(([a, b]) => {
      const filtered = b.filter(({ chars, weapons: weapons2, rateup }) => {
        const rateupChar = rateup.map((name) => check(name));
        if (rateupChar.includes(true))
          return true;
        if (Array.isArray(chars)) {
          const result2 = chars.map(({ character, name }) => check(character) || check(name));
          if (result2.includes(true))
            return true;
        } else {
          const result2 = check(chars.character) || check(chars.name);
          if (result2)
            return true;
        }
        const result = weapons2.list.map(({ name }) => check(name));
        if (result.includes(true))
          return true;
        return check(weapons2.name);
      });
      return [a, filtered];
    });
    dataToShow = newArr.filter(([, b]) => b.length > 0);
  };
  let content;
  onDestroy(() => query.set(""));
  $$result.css.add(css$a);
  $$unsubscribe_patchVersion();
  $$unsubscribe_bannerPhase();
  $$unsubscribe_query();
  return `${$$result.head += `${$$result.title = `<title>All Banners | ${escape(APP_TITLE)}</title>`, ""}`, ""}

<section class="${"svelte-122wrer"}"><header class="${"svelte-122wrer"}"><h1 class="${"svelte-122wrer"}">Previous Banner</h1>
		<button class="${"close svelte-122wrer"}"><i class="${"gi-close"}"></i></button></header>

	<div class="${"body svelte-122wrer"}"><div class="${"filter svelte-122wrer"}"><div class="${"row svelte-122wrer"}"><div class="${"search svelte-122wrer"}"><input type="${"text"}" name="${"q"}" id="${"q"}" placeholder="${"Find a Banner"}" title="${"Find by Character's or Weapon's Name (4star or 5star) or Banner Name"}" class="${"svelte-122wrer"}"${add_attribute("value", searchValue, 0)}>
					<button class="${"svelte-122wrer"}"><i class="${"gi-search"}"></i></button></div>
				<div class="${"sort-selector svelte-122wrer"}"><div class="${"selected-filter svelte-122wrer"}">Group / ${escape(groupby)}

						${`<i class="${"gi-caret-down svelte-122wrer"}"></i>`}</div>

					${``}</div>
				<button class="${"sort-button svelte-122wrer"}" title="${"Reverse Group"}"><i class="${"gi-exchange svelte-122wrer"}"></i></button></div></div>
		<div class="${"content svelte-122wrer"}"${add_attribute("this", content, 0)}><div id="${"content"}">${each(dataToShow, ([group, data2]) => {
    return `<div><div class="${"group-title"}"><h2 class="${"svelte-122wrer"}">${escape(groupby === "version" ? `Version ${group}` : getName(group))}
								<i class="${"gi-primo-star svelte-122wrer"}"></i>
							</h2></div>
						${each(data2, ({ patch, phase, chars, weapons: weapons2 }, i) => {
      return `<a href="${"/"}" class="${"item svelte-122wrer"}" title="${escape(Array.isArray(chars) ? getName(chars.map(({ character }) => character).join(", ")) : getName(chars.character)) + " & " + escape(getName(weapons2.list.map(({ name }) => name).join(", ")))}"><div class="${"banner svelte-122wrer"}">${Array.isArray(chars) ? `<div class="${["svelte-122wrer", chars.length > 1 ? "dual" : ""].join(" ").trim()}">${each(chars, ({ character, name }, i2) => {
        return `<img src="${"/assets/images/banner/" + escape(patch) + "/" + escape(name) + ".webp"}"${add_attribute("alt", getName(character), 0)}${add_attribute("style", chars.length > 1 ? "" : `width: 100%; height: 100%`, 0)} class="${"dual" + escape(i2 + 1) + " svelte-122wrer"}">`;
      })}
										</div>` : `<img src="${"/assets/images/banner/" + escape(patch) + "/" + escape(chars.name) + ".webp"}"${add_attribute("alt", getName(chars.name), 0)} class="${"svelte-122wrer"}">`}
									<img src="${"/assets/images/banner/" + escape(patch) + "/" + escape(weapons2.name) + ".webp"}"${add_attribute("alt", getName(weapons2.name), 0)} class="${"svelte-122wrer"}"></div>
								<h3 class="${"name svelte-122wrer"}">${Array.isArray(chars) ? `${escape(getName(chars.map(({ character }) => character).join(", ")))}` : `${escape(getName(chars.character))}`}
									&amp;
									${escape(getName(weapons2.list.map(({ name }) => name).join(", ")))}</h3>
							</a>`;
    })}
					</div>`;
  })}</div></div></div>
</section>`;
});
var Description_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: "span.svelte-bcfvsn{color:#cf5e47;text-transform:capitalize}span.invocation.svelte-bcfvsn{color:#cba885}span.starglitter.svelte-bcfvsn{color:#c37b4d}span.stardust.svelte-bcfvsn{color:#a256e1}span.hydro.svelte-bcfvsn{color:#06bbff}span.geo.svelte-bcfvsn{color:#f9aa02}span.pyro.svelte-bcfvsn{color:#fe6606}span.anemo.svelte-bcfvsn{color:#369396}span.electro.svelte-bcfvsn{color:#ca82fc}span.cryo.svelte-bcfvsn{color:#4682b4}p.svelte-bcfvsn{font-size:1.2rem;margin:1rem 0;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}h3.svelte-bcfvsn{padding:0.2rem 0.7rem;font-weight:400;color:#fff;background-color:#a28052;vertical-align:middle;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}",
  map: null
};
const Description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { bannerType } = $$props;
  let { bannerName = "" } = $$props;
  let { data: data2 = [] } = $$props;
  const item5Star = ["events", "weapons"].includes(bannerType) ? data2.find(({ rarity }) => rarity === 5).items : "";
  const item4Star = ["events", "weapons"].includes(bannerType) ? data2.find(({ rarity }) => rarity === 4).items : "";
  if ($$props.bannerType === void 0 && $$bindings.bannerType && bannerType !== void 0)
    $$bindings.bannerType(bannerType);
  if ($$props.bannerName === void 0 && $$bindings.bannerName && bannerName !== void 0)
    $$bindings.bannerName(bannerName);
  if ($$props.data === void 0 && $$bindings.data && data2 !== void 0)
    $$bindings.data(data2);
  $$result.css.add(css$9);
  return `${$$result.head += `${$$result.title = `<title>
		${escape(bannerName)} | ${escape(APP_TITLE)}
	</title>`, ""}`, ""}

${validate_component(Iklan, "Ads").$$render($$result, { type: "banner" }, {}, {})}

${bannerType === "beginner" ? `<h3 class="${"svelte-bcfvsn"}">No time limit (Closes after 20 wishes)</h3>` : `${["events", "weapons"].includes(bannerType) ? `<h3 class="${"svelte-bcfvsn"}">Limited Time Event</h3>` : `<h3 class="${"svelte-bcfvsn"}">Permanent</h3>`}`}

${bannerType === "beginner" ? `${each(data2[0].items, ({ name, title, vision }, x) => {
    return `<p class="${"svelte-bcfvsn"}">Beginners&#39; <span class="${escape(null_to_empty(vision)) + " svelte-bcfvsn"}">Wish</span> has no time limit and is aimed at Travelers who
			have recently landed in Teyvat. Non-promotional characters and weapons are available. <br>
			In Beginners&#39; Wish, 10-wish sets cost <span class="${"svelte-bcfvsn"}">20%</span> less Acquaint Fate, and your first
			10-wish set is guaranteedto include
			<span class="${escape(null_to_empty(vision)) + " svelte-bcfvsn"}">&quot;${escape(title)}&quot; ${escape(getName(name))} (${escape(vision)})
			</span>, and your second 10-wish set is guaranteed to include one <span class="${"svelte-bcfvsn"}">other </span> min.
			4-star character! Beginners&#39; Wish expires after <span class="${"svelte-bcfvsn"}">20 </span> attempts. After the wish expires,
			the page will disappear.
		</p>

		<p class="${"svelte-bcfvsn"}">\u3013Rules\u3013</p>
		<p class="${"svelte-bcfvsn"}">Base probability of winning 5-star character = <span class="${"svelte-bcfvsn"}">0.600%</span> <br>
			Base probability of winning 4-star character = <span class="${"svelte-bcfvsn"}">5.100%</span>; consolidated probability
			(incl. guarantee) =
			<span class="${"svelte-bcfvsn"}">13.000%</span>; guaranteed to win 4-star or above character at least once per
			<span class="${"svelte-bcfvsn"}">10</span>
			attempts 3-star weapons won in this wish come with
			<span class="${"stardust svelte-bcfvsn"}">Masterless Stardust</span> x15
		</p>

		<p class="${"svelte-bcfvsn"}">\u3013Duplicate Characters\u3013</p>
		<p class="${"svelte-bcfvsn"}">On obtaining a 5-star character that you already own (whether obtained in a wish, redeemed at
			the shop, or awarded by the game): The 2nd - 7th time you obtain the character, it will be
			converted into that character&#39;s <span class="${"stardust svelte-bcfvsn"}">Stella Fortuna</span> x1 and
			<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span>
			x10; from the 8th time onwards it will be converted into
			<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span> x25 On obtaining a 4-star character
			that you already own (whether obtained in a wish, redeemed at the shop, or awarded by the
			game): The 2nd - 7th time you obtain the character, it will be converted into that character&#39;s
			<span class="${"stardust svelte-bcfvsn"}">Stella Fortuna</span>
			x1 and <span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span> x2; from the 8th time onwards
			it will be converted into <span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span> x5
		</p>`;
  })}` : `${bannerType === "standard" ? `<p class="${"svelte-bcfvsn"}">Wanderlust <span class="${"electro svelte-bcfvsn"}">Invocation</span> is a standard wish with no time limit.
		Non-promotional characters and weapons are available. In this wish, <span class="${"svelte-bcfvsn"}">guaranteed</span> to win
		4-star or above item at least once per 10 attempts.
	</p>
	<p class="${"svelte-bcfvsn"}">\u3013Rules\u3013</p>
	<p class="${"svelte-bcfvsn"}">Base probability of winning 5-star item = <span class="${"svelte-bcfvsn"}">0.600%</span>; base probability of winning
		5-star character =
		<span class="${"svelte-bcfvsn"}">0.300%</span>, and base probability of winning 5-star weapon = <span class="${"svelte-bcfvsn"}">0.300%</span>;
		consolidated probability (incl. guarantee) of winning 5-star item = <span class="${"svelte-bcfvsn"}">1.600%</span>;
		guaranteed to win 5-star item at least once per <span class="${"svelte-bcfvsn"}">90</span> attempts. Base probability of
		winning 4-star item = <span class="${"svelte-bcfvsn"}">5.100%</span>; base probability of winning 4-star character =
		<span class="${"svelte-bcfvsn"}">2.550%</span>, and base probability of winning 4-star weapon = <span class="${"svelte-bcfvsn"}">2.550%</span>;
		consolidated probability (incl. guarantee) of winning 4-star item = <span class="${"svelte-bcfvsn"}">13.000%</span>;
		guaranteed to win 4-star or above item at least once per <span class="${"svelte-bcfvsn"}">10</span> attempts; probability
		of winning 4-star item through the guarantee = <span class="${"svelte-bcfvsn"}">99.400%</span>, and probability of winning
		5-star item through the guarantee = <span class="${"svelte-bcfvsn"}">0.600%</span>. 5-star weapons won in this wish
		include <span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span> x10; 4-star weapons include
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span>
		x2; 3-star weapons include
		<span class="${"stardust svelte-bcfvsn"}">Masterless Stardust</span> x15.
	</p>

	<p class="${"svelte-bcfvsn"}">\u3013Duplicate Characters\u3013</p>
	<p class="${"svelte-bcfvsn"}">On obtaining a 5-star character that you already own (whether obtained in a wish, redeemed at
		the shop, or awarded by the game): The 2nd - 7th time you obtain the character, it will be
		converted into that character&#39;s <span class="${"stardust svelte-bcfvsn"}">Stella Fortuna</span> x1 and
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span>
		x10; from the 8th time onwards it will be converted into
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span>
		x25. On obtaining a 4-star character that you already own (whether obtained in a wish, redeemed at
		the shop, or awarded by the game): The 2nd - 7th time you obtain the character, it will be converted
		into that character&#39;s <span class="${"stardust svelte-bcfvsn"}">Stella Fortuna </span> x1 and
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span>
		x2; from the 8th time onwards it will be converted into
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span> x5.
	</p>` : `${bannerType === "events" ? `<p class="${"svelte-bcfvsn"}">Event Wish - <span class="${escape(null_to_empty(item5Star[0].vision)) + " svelte-bcfvsn"}">${escape(bannerName.split(" ")[0])}</span>
		${escape(bannerName.split(" ").slice(1).join(" "))} is now available. During this event wish, drifting 5-star
		character
		<span class="${escape(null_to_empty(item5Star[0].vision)) + " svelte-bcfvsn"}">&quot;${escape(item5Star[0].title)}&quot; ${escape(item5Star[0].name)} (${escape(item5Star[0].vision)})
		</span>
		as well as 4-star characters
		${each(item4Star, ({ name, vision, title }, i) => {
    return `<span class="${escape(null_to_empty(vision)) + " svelte-bcfvsn"}">&quot;${escape(title)}&quot; ${escape(getName(name))} (${escape(vision)})</span>
			${i === 1 ? `and` : `,\xA0`}`;
  })}
		will get a <span class="${"svelte-bcfvsn"}">huge drop-rate boost! </span> <br>
		<span class="${"svelte-bcfvsn"}">\u203BIn most cases, drifting base probability of all characters and weapons is evenly distributed.
			If there is a boost or guarantee in effect, please refer to the corresponding rules.
		</span><br>
		\u203BIn most cases, drifting base probability of all characters and weapons is evenly distributed. If
		driftingre is a boost or guarantee in effect, please refer to drifting corresponding rules.
	</p>

	<br>
	<p class="${"svelte-bcfvsn"}">\u3013Rules\u3013</p>
	<p class="${"svelte-bcfvsn"}">5-Star Items</p>

	<p class="${"svelte-bcfvsn"}">For Event Wish - <span class="${escape(null_to_empty(item5Star[0].vision)) + " svelte-bcfvsn"}">${escape(bannerName.split(" ")[0])}</span>
		${escape(bannerName.split(" ").slice(1).join(" "))} : Base probability of winning 5-star character =
		<span class="${"svelte-bcfvsn"}">0.600% </span>; consolidated probability (incl. guarantee) =
		<span class="${"svelte-bcfvsn"}">1.600%</span>; guaranteed to win 5-star character at least once per <span class="${"svelte-bcfvsn"}">90</span>
		attempts. The first time you win a 5-star item in this event wish, driftingre is a
		<span class="${"svelte-bcfvsn"}">50%</span>
		chance it will be drifting promotional character
		<span class="${escape(null_to_empty(item5Star[0].vision)) + " svelte-bcfvsn"}">&quot;${escape(item5Star[0].title)}&quot; ${escape(item5Star[0].name)} (${escape(item5Star[0].vision)})
		</span>. If drifting first 5-star character you win in this event wish is not drifting
		promotional character, then the next 5-star character you win is <span class="${"svelte-bcfvsn"}">guaranteed</span> to be drifting
		promotional character.
	</p>

	<p class="${"svelte-bcfvsn"}">4-Star Items</p>
	<p class="${"svelte-bcfvsn"}">For Event Wish - <span class="${escape(null_to_empty(item5Star[0].vision)) + " svelte-bcfvsn"}">${escape(bannerName.split(" ")[0])}</span>
		${escape(bannerName.split(" ").slice(1).join(" "))} : Base probability of winning 4-star item =
		<span class="${"svelte-bcfvsn"}">5.100%</span>; consolidated probability (incl. guarantee) = <span class="${"svelte-bcfvsn"}">13.000%</span>;
		guaranteed to win 4-star or above item at least once per 10 attempts. The first time you win a
		4-star item in this event wish, driftingre is a <span class="${"svelte-bcfvsn"}">50%</span> chance it will be one of
		drifting featured characters
		${each(item4Star, ({ name, vision, title }, i) => {
    return `<span class="${escape(null_to_empty(vision)) + " svelte-bcfvsn"}">&quot;${escape(title)}&quot; ${escape(getName(name))} (${escape(vision)})</span>
			${i === 1 ? `and` : `,`}
		`;
  })}. If drifting first 4-star item you win in this event wish is not one of the featured
		characters, driftingn the next 4-star item you win is <span class="${"svelte-bcfvsn"}">guaranteed </span> to be a featured
		character.
	</p>

	<p class="${"svelte-bcfvsn"}">4-star weapons won in this wish come with <span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter
		</span>
		x2; 3-star weapons won in this wish come with
		<span class="${"stardust svelte-bcfvsn"}">Masterless Stardust</span> x15.
	</p>

	<br>
	<p class="${"svelte-bcfvsn"}">\u3013Duplicate Characters\u3013</p>
	<p class="${"svelte-bcfvsn"}">On obtaining a 5-star character that you already own (whedriftingr obtained in a wish, redeemed
		at drifting shop, or awarded by the game): The 2nd - 7th time you obtain drifting character, it
		will be converted into that character&#39;s <span class="${"stardust svelte-bcfvsn"}">Stella Fortuna</span>
		x1 and <span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span> x10; from drifting 8th time
		onwards it will be converted into <span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter </span> x25.
	</p>
	<p class="${"svelte-bcfvsn"}">On obtaining a 4-star character that you already own (whedrifting obtained in a wish, redeemed
		at drifting shop, or awarded by the game): The 2nd - 7th time you obtain drifting character, it
		will be converted into that character&#39;s <span class="${"stardust svelte-bcfvsn"}">Stella Fortuna</span> x1 and
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter </span>
		x2; from drifting 8th time onwards it will be converted into
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter </span> x5.
	</p>
	<p class="${"svelte-bcfvsn"}">\u203B This is a character event wish. The wish guarantee count is accumulated within character event
		wishes only and is independent of drifting guarantee counts of other types of wishes.
	</p>` : `${bannerType === "weapons" ? `<p class="${"svelte-bcfvsn"}">Event Wish &quot;<span class="${"svelte-bcfvsn"}">${escape(bannerName.split(" ")[0])}</span>
		${escape(bannerName.split(" ").slice(1).join(" "))}&quot; is now available. During this event wish,the
		event-exclusive 5-star weapon
		<span class="${"geo svelte-bcfvsn"}">${escape(getName(item5Star[0].name))} (${escape(item5Star[0].type)})</span>
		and the 5-star weapon
		<span class="${"pyro svelte-bcfvsn"}">${escape(getName(item5Star[1].name))} (${escape(item5Star[1].type)})</span>
		as well as the 4-star weapons
		<span class="${"stardust svelte-bcfvsn"}">${each(item4Star, ({ name, type }) => {
    return `${escape(getName(name))} (${escape(type)}),`;
  })}</span>
		will get a <span class="${"svelte-bcfvsn"}">huge drop-rate boost!</span> <br>
		<span class="${"svelte-bcfvsn"}">\u203B Of the above weapons, the event-exclusive weapon will not be available in the standard wish
			&quot;Wanderlust Invocation&quot;.
		</span></p>
	<br>

	<p class="${"svelte-bcfvsn"}">\u3013Rules\u3013</p>
	<p class="${"svelte-bcfvsn"}">5-Star Items</p>
	<p class="${"svelte-bcfvsn"}">For Event Wish &quot;<span class="${"svelte-bcfvsn"}">${escape(bannerName.split(" ")[0])}</span>
		${escape(bannerName.split(" ").slice(1).join(" "))}&quot;: Base probability of winning 5-star weapon =
		<span class="${"svelte-bcfvsn"}">0.700%</span>; consolidated probability (incl. guarantee) = <span class="${"svelte-bcfvsn"}">1.850%</span> ;
		guaranteed to win 5-star weapon at least once per <span class="${"svelte-bcfvsn"}">80</span> attempts. The first time you
		win a 5-star weapon in this event, there is a <span class="${"svelte-bcfvsn"}">75%</span> chance it will be one of the
		promotional weapons <span class="${"geo svelte-bcfvsn"}">${escape(getName(item5Star[0].name))} (${escape(item5Star[0].type)})</span>
		and
		<span class="${"geo svelte-bcfvsn"}">${escape(getName(item5Star[1].name))} (${escape(item5Star[1].type)})</span>. If the first
		5-star weapon you win in this event wish is not one of the promotional weapons, then the next
		5-star weapon you win is <span class="${"svelte-bcfvsn"}">guaranteed</span> to be a promotional weapon.
	</p>

	<p class="${"svelte-bcfvsn"}">4-Star Items</p>

	<p class="${"svelte-bcfvsn"}">For Event Wish &quot;<span class="${"svelte-bcfvsn"}">${escape(bannerName.split(" ")[0])}</span>
		${escape(bannerName.split(" ").slice(1).join(" "))}&quot;: Base probability of winning 4-star item =
		<span class="${"svelte-bcfvsn"}">6.000%</span>; base probability of winning 4-star character = <span class="${"svelte-bcfvsn"}">3.000%</span> , and
		base probability of winning 4-star weapon = <span class="${"svelte-bcfvsn"}">3.000%</span>; consolidated probability
		(incl. guarantee) of winning 4-star item = <span class="${"svelte-bcfvsn"}">14.500%</span>; guaranteed to win 4-star or
		above item at least once per 10 attempts; probability of winning 4-star item through the
		guarantee = 99.300%, and probability of winning 5-star item through the guarantee =
		<span class="${"svelte-bcfvsn"}">0.700% </span>
		The first time you win a 4-star item in this event wish, there is a <span class="${"svelte-bcfvsn"}">75%</span>
		chance that it will be one of the featured weapons
		<span class="${"stardust svelte-bcfvsn"}">${each(item4Star, ({ name, type }) => {
    return `${escape(getName(name))} (${escape(type)}),`;
  })}
		</span>. If the first 4-star item you win in this event wish is not one of the featured weapons,
		then the next 4-star item you win is <span class="${"svelte-bcfvsn"}">guaranteed</span> to be a featured weapon.
	</p>
	<p class="${"svelte-bcfvsn"}">5-star weapons won in this wish come with <span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter
		</span>
		x10; 4-star weapons won in this wish come with
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span>
		x2; 3-star weapons won in this wish come with
		<span class="${"stardust svelte-bcfvsn"}">Masterless Stardust </span> x15.
	</p>

	<br>
	<p class="${"svelte-bcfvsn"}">\u3013Duplicate Characters\u3013</p>
	<p class="${"svelte-bcfvsn"}">On obtaining a 4-star character that you already own (whether obtained in a wish, redeemed at
		the shop, or awarded by the game): The 2nd - 7th time you obtain the character, it will be
		converted into that character&#39;s <span class="${"stardust svelte-bcfvsn"}">Stella Fortuna </span> x1 and
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter </span>
		x2; from the 8th time onwards it will be converted into
		<span class="${"starglitter svelte-bcfvsn"}">Masterless Starglitter</span> x5.
	</p>

	<p class="${"svelte-bcfvsn"}">\u203B This is a weapon event wish. The wish guarantee count is accumulated within this event only
		and is independent of the guarantee counts of other wishes.
	</p>` : ``}`}`}`}

${validate_component(Iklan, "Ads").$$render($$result, { type: "banner" }, {}, {})}`;
});
var Details_svelte_svelte_type_style_lang = "";
function __variableDynamicImportRuntime1__$1(path) {
  switch (path) {
    case "../../data/banners/standard/1.json":
      return import("../../chunks/1-f8d41ce4.js");
    case "../../data/banners/standard/2.json":
      return import("../../chunks/2-ba4673b6.js");
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
function __variableDynamicImportRuntime0__$1(path) {
  switch (path) {
    case "../../data/banners/events/1.0.json":
      return import("../../chunks/1.0-b51db3df.js");
    case "../../data/banners/events/1.1.json":
      return import("../../chunks/1.1-e0f76d83.js");
    case "../../data/banners/events/1.2.json":
      return import("../../chunks/1.2-ce4d433d.js");
    case "../../data/banners/events/1.3.json":
      return import("../../chunks/1.3-2c2ef70c.js");
    case "../../data/banners/events/1.4.json":
      return import("../../chunks/1.4-bc55da34.js");
    case "../../data/banners/events/1.5.json":
      return import("../../chunks/1.5-f8e908c0.js");
    case "../../data/banners/events/1.6.json":
      return import("../../chunks/1.6-a02d993e.js");
    case "../../data/banners/events/2.0.json":
      return import("../../chunks/2.0-134166ed.js");
    case "../../data/banners/events/2.1.json":
      return import("../../chunks/2.1-8e52de73.js");
    case "../../data/banners/events/2.2.json":
      return import("../../chunks/2.2-213c80da.js");
    case "../../data/banners/events/2.3.json":
      return import("../../chunks/2.3-02e1baf0.js");
    case "../../data/banners/events/2.4.json":
      return import("../../chunks/2.4-d0708b1f.js");
    case "../../data/banners/events/2.5.json":
      return import("../../chunks/2.5-3a0e6b59.js");
    case "../../data/banners/events/2.6.json":
      return import("../../chunks/2.6-f5124a1b.js");
    case "../../data/banners/events/2.7.json":
      return import("../../chunks/2.7-ea0c4dbf.js");
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
const css$8 = {
  code: "span.svelte-18n986s.svelte-18n986s{color:#cf5e47}span.invocation.svelte-18n986s.svelte-18n986s{color:#cba885}span.starglitter.svelte-18n986s.svelte-18n986s{color:#c37b4d}span.stardust.svelte-18n986s.svelte-18n986s{color:#a256e1}span.hydro.svelte-18n986s.svelte-18n986s{color:#06bbff}span.geo.svelte-18n986s.svelte-18n986s{color:#f9aa02}span.pyro.svelte-18n986s.svelte-18n986s{color:#fe6606}span.anemo.svelte-18n986s.svelte-18n986s{color:#369396}span.electro.svelte-18n986s.svelte-18n986s{color:#ca82fc}span.cryo.svelte-18n986s.svelte-18n986s{color:#4682b4}.gi-arrow-up.svelte-18n986s.svelte-18n986s{font-size:1.2rem;vertical-align:middle;line-height:0;color:#51be51}section.svelte-18n986s.svelte-18n986s{background-color:#ebebeb;width:100%;height:100%;color:var(--text-color);padding-top:2rem}.header.svelte-18n986s.svelte-18n986s{display:block;background-color:rgb(20, 18, 15);width:100%;position:fixed;top:0;left:0;z-index:+10}.gi-reply.svelte-18n986s.svelte-18n986s{color:#dbd7d3;font-size:2.2rem;line-height:0;padding:0.3rem 1rem;display:inline-block}.content-details.svelte-18n986s.svelte-18n986s{padding:2rem 10% 1rem;width:100%;overflow-x:hidden}@media screen and (max-width: 780px){.content-details.svelte-18n986s.svelte-18n986s{padding:1.5rem 5% 0.5rem}}.gi-star.svelte-18n986s.svelte-18n986s{color:#feca33}h2.svelte-18n986s.svelte-18n986s,h3.svelte-18n986s.svelte-18n986s{vertical-align:middle;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}h1.svelte-18n986s.svelte-18n986s{font-size:1.7rem;text-align:left;background-color:#dadada;padding:0.5rem 5%;display:block;position:relative}.mobile h1.svelte-18n986s.svelte-18n986s{font-size:1.3rem}h1.svelte-18n986s.svelte-18n986s::before{content:'';display:block;position:absolute;width:0.8rem;height:80%;left:0;top:50%;transform:translateY(-50%);background-color:var(--text-color)}h2.svelte-18n986s.svelte-18n986s{font-size:1.5rem;font-weight:500;padding:1rem 0;margin:1.5rem 0 0.5rem;position:relative}.mobile h2.svelte-18n986s.svelte-18n986s{font-size:1.2rem;margin:0.5rem 0}h2.svelte-18n986s.svelte-18n986s::after{content:'';display:block;position:absolute;right:0;top:50%;transform:translateY(-50%);width:calc(100% - 17rem);height:0.1rem;background-color:#d1cfcc}h3.svelte-18n986s.svelte-18n986s{padding:0.2rem 0.7rem;font-weight:400;color:#fff;background-color:#a28052;display:flex;align-items:center}h3.svelte-18n986s span.svelte-18n986s{padding-left:2rem;color:var(--text-color)}h3.star5.svelte-18n986s.svelte-18n986s{background-color:#dbbba4}h3.star4.svelte-18n986s.svelte-18n986s{background-color:#b7abbf}h3.star3.svelte-18n986s.svelte-18n986s{background-color:#a5bacc}h4.svelte-18n986s.svelte-18n986s{color:#a28052;font-weight:500;font-size:larger}.character-card.svelte-18n986s.svelte-18n986s{background-color:#4d4d4d;width:30%;min-width:250px;max-width:320px;aspect-ratio:320/120;margin:1rem 0.5rem 0 0.5rem;position:relative;padding:1rem;display:inline-flex}.character-card.svelte-18n986s.svelte-18n986s::after{content:'';display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);border:0.1rem solid #6d6a63;width:calc(100% - 0.8rem);height:calc(100% - 0.8rem)}.mobile .character-card.svelte-18n986s.svelte-18n986s{min-width:unset}picture.svelte-18n986s.svelte-18n986s{height:100%;display:inline-block;aspect-ratio:1/1;background-size:cover;position:relative;overflow:hidden}img.svelte-18n986s.svelte-18n986s{width:100%;object-fit:cover;position:absolute;top:0;left:0}img.claymore.svelte-18n986s.svelte-18n986s{transform:rotate(18deg) scale(1.15) translateX(-0.7em)}img.bow.svelte-18n986s.svelte-18n986s{transform:rotate(10deg) scale(1.25) translate(-0.5em, 0em)}img.polearm.svelte-18n986s.svelte-18n986s{transform:rotate(10deg) scale(1.5) translate(-12%, 12%);height:200%}img.sword.svelte-18n986s.svelte-18n986s{transform:rotate(10deg) scale(1.2) translateY(-1em) translate(-0.2em, 0.5em)}.star5.svelte-18n986s picture.svelte-18n986s{background-image:url('/assets/images/utility/5star-bg.webp')}.star4.svelte-18n986s picture.svelte-18n986s{background-image:url('/assets/images/utility/4star-bg.webp')}picture.svelte-18n986s i.svelte-18n986s{position:absolute;z-index:+1;top:0;left:0;font-size:1.3rem}caption.svelte-18n986s.svelte-18n986s{color:#fff;padding:0.5rem 1rem;position:relative;display:inline-flex;align-items:flex-start;justify-content:stretch;text-align:left;text-transform:capitalize}caption.svelte-18n986s.svelte-18n986s::after{content:'';display:block;right:0;width:calc(100% - 1rem);height:0.1rem;top:70%;position:absolute;background-color:#fff}@media screen and (max-width: 600px){.character-card.svelte-18n986s.svelte-18n986s{min-width:calc(50% - 1rem)}}.element.svelte-18n986s.svelte-18n986s{background-image:linear-gradient(#fff, #fff);opacity:0.07;font-size:7em;display:inline-block;position:absolute;right:0;bottom:0;transform:translate(25%, 35%)}.table.svelte-18n986s.svelte-18n986s{padding:1rem 0 2rem;width:100%;font-size:0.9rem}.row.svelte-18n986s.svelte-18n986s{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;width:100%;border:0.2px solid #b5b2ae}.row.head.svelte-18n986s.svelte-18n986s{background-color:#dbd7d3}.body.svelte-18n986s .row.svelte-18n986s{border-top:0;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}.cell.svelte-18n986s.svelte-18n986s:nth-child(odd){width:calc(3 / 14 * 100%)}.cell.svelte-18n986s.svelte-18n986s:nth-child(even){width:calc(4 / 14 * 100%)}.cell.fluid.svelte-18n986s.svelte-18n986s{width:100%}.cell.svelte-18n986s.svelte-18n986s{display:inline-flex;justify-content:center;align-items:center;padding:1rem 0.5rem;height:100%;text-align:center;text-transform:capitalize;line-height:1.2rem;height:3.2rem}.head.svelte-18n986s .cell.svelte-18n986s{border:solid #b5b2ae;border-width:0 0.07rem}.body.svelte-18n986s .cell.svelte-18n986s{border:solid #b5b2ae;border-width:0 0.07rem 0.07rem 0;color:#a7865a}",
  map: null
};
const Details = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let banner;
  let $bannerActive, $$unsubscribe_bannerActive;
  let $bannerList, $$unsubscribe_bannerList;
  let $patchVersion, $$unsubscribe_patchVersion;
  let $bannerPhase, $$unsubscribe_bannerPhase;
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_patchVersion = subscribe(patchVersion, (value) => $patchVersion = value);
  $$unsubscribe_bannerPhase = subscribe(bannerPhase, (value) => $bannerPhase = value);
  let items = [];
  let drop3star = [];
  let drop4star = [];
  let drop5star = [];
  let bannerTitle;
  let featured;
  const Data = {
    async get(patch, phase, bannerType) {
      const { data: data2 } = await __variableDynamicImportRuntime0__$1(`../../data/banners/events/${patch}.json`);
      const { standardVersion, weapons: weapons2, events } = data2.find((d) => d.phase === phase).banners;
      const { standard } = await __variableDynamicImportRuntime1__$1(`../../data/banners/standard/${standardVersion}.json`);
      drop3star = getAllWeapons(3).map(({ name, type }) => ({ name, type }));
      this._stdDropChar5 = standard.characters.map((name) => ({ name, type: "character" }));
      drop4star = [...getAllChars(4), ...getAllWeapons(4)];
      this._std = ["amber", "kaeya", "lisa"];
      this._events = events;
      this._weapons = weapons2;
      this._standard = standard;
      this._bannerType = bannerType;
      this._phase = phase;
      this._patch = patch;
      if (bannerType === "beginner")
        return this._showBeginner();
      if (bannerType === "standard")
        return this._showStandard();
      if (bannerType === "events")
        return this._showEvents();
      if (bannerType === "weapons")
        return this._showWeapons();
    },
    _showBeginner() {
      const { character, title, vision } = get4StarChars.find(({ name }) => {
        return name === beginner.character;
      });
      const obj = {
        rarity: 4,
        items: [{ name: character, title, vision }]
      };
      items = [obj];
      bannerTitle = "Beginner Wish";
      drop5star = this._stdDropChar5;
      drop4star = drop4star.filter(({ limited }) => !limited).map(({ type, name }) => ({ name, type })).filter(({ name }) => !this._std.includes(name));
    },
    _showStandard() {
      const weapon5 = getAllWeapons(5).filter(({ limited }) => !limited);
      drop5star = [...this._stdDropChar5, ...weapon5];
      bannerTitle = "Wanderlust Invocation";
      drop4star = drop4star.filter(({ release }) => {
        if (!release)
          return true;
        const [v, phs] = release.split("-");
        if (parseFloat(this._patch) < parseFloat(v))
          return false;
        if (parseFloat(this._patch) === parseFloat(v) && this._phase <= parseInt(phs)) {
          return false;
        }
        return true;
      }).filter(({ limited }) => !limited).map(({ type, name }) => ({ name, type }));
    },
    _showEvents() {
      const { character } = $bannerList[$bannerActive];
      drop5star = this._stdDropChar5;
      drop5star.unshift({
        name: character.character,
        type: "character",
        rateup: true
      });
      bannerTitle = getName(character.name);
      const { name, vision, title } = getAllChars(5).find(({ name: name2 }) => {
        return name2 === character.character;
      });
      const rateUpchar = get4StarChars.filter(({ name: name2 }) => this._events.rateup.includes(name2)).map(({ name: name2, vision: vision2, title: title2 }) => ({ name: name2, vision: vision2, title: title2 }));
      items = [
        {
          rarity: 5,
          items: [{ name, title, vision }]
        },
        { rarity: 4, items: rateUpchar }
      ];
      featured = items[0].items;
      drop4star = drop4star.filter(({ name: name2 }) => !this._events.rateup.includes(name2)).filter(({ name: name2 }) => !this._std.includes(name2));
      const rateupDrop = rateUpchar.map(({ name: name2 }) => ({ name: name2, type: "character", rateup: true }));
      drop4star.unshift(...rateupDrop);
    },
    _showWeapons() {
      const weapon5 = this._weapons.featured.map(({ name, type }) => ({ name, type }));
      const weapons4 = getAllWeapons(4).filter(({ name }) => this._weapons.rateup.includes(name)).map(({ name, weaponType }) => ({ name, type: weaponType }));
      bannerTitle = getName(this._weapons.name);
      items = [{ rarity: 5, items: weapon5 }, { rarity: 4, items: weapons4 }];
      drop5star = getAllWeapons(5).filter(({ name, limited }) => {
        return !limited && !weapon5.map(({ name: name2 }) => name2).includes(name);
      }).map(({ name }) => ({ name, type: "weapon" }));
      drop5star.unshift(...weapon5.map(({ name }) => ({ name, type: "weapon", rateup: true })));
      drop4star = drop4star.filter(({ name }) => !this._events.rateup.includes(name)).filter(({ name }) => !this._std.includes(name));
      const rateupDrop = weapons4.map(({ name }) => ({ name, type: "weapon", rateup: true }));
      drop4star.unshift(...rateupDrop);
    }
  };
  let content;
  $$result.css.add(css$8);
  banner = $bannerList[$bannerActive].type;
  $$unsubscribe_bannerActive();
  $$unsubscribe_bannerList();
  $$unsubscribe_patchVersion();
  $$unsubscribe_bannerPhase();
  return `<section class="${"svelte-18n986s"}"${add_attribute("this", content, 0)}><div class="${"header svelte-18n986s"}"><button><i class="${"gi-reply svelte-18n986s"}"></i></button></div>

	<div class="${"content-details wish-result svelte-18n986s"}">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
			<div class="${"content-details svelte-18n986s"}">Waiting...</div>
		`;
    }
    return function(data2) {
      return `
			${banner === "beginner" ? `<h1 class="${"svelte-18n986s"}">Beginners&#39;s <span class="${"invocation svelte-18n986s"}">Wish</span></h1>` : `${["events", "weapons"].includes(banner) ? `<h1 class="${"svelte-18n986s"}">Event Wish &quot;<span class="${escape(null_to_empty(banner === "events" ? `${featured[0].vision}` : "")) + " svelte-18n986s"}">${escape(bannerTitle.split(" ")[0])}</span>
					${escape(bannerTitle.split(" ").slice(1).join(" "))}&quot;
				</h1>` : `${banner === "standard" ? `<h1 class="${"svelte-18n986s"}">Standard Wish &quot;Wanderlust <span class="${"electro svelte-18n986s"}">Invocation</span>&quot;</h1>` : ``}`}`}

			${["events", "weapons"].includes(banner) ? `<h2 class="${"svelte-18n986s"}">Increased Drop Rates</h2>

				<h3 class="${"star5 svelte-18n986s"}"><div class="${"star"}">${each(Array(5), (i) => {
        return `<i class="${"gi-star svelte-18n986s"}"></i>`;
      })}</div>
					<span class="${"svelte-18n986s"}">Percentage of 5-Star Item Drops: 50.000% </span></h3>

				${banner === "events" ? `<div class="${"character-card star5 svelte-18n986s"}"><picture class="${"svelte-18n986s"}"><i class="${"gi-" + escape(featured[0].vision) + " svelte-18n986s"}"></i>
							<img src="${"/assets/images/characters/profile/" + escape(featured[0].name) + ".webp"}"${add_attribute("alt", getName(featured[0].name), 0)} class="${"svelte-18n986s"}"></picture>
						<caption class="${"name svelte-18n986s"}">${escape(getName(featured[0].name))}</caption>
						<i class="${"gi-" + escape(featured[0].vision) + " element svelte-18n986s"}"></i></div>` : `${each(items[0].items, ({ name, type }) => {
        return `<div class="${"character-card star5 weapons svelte-18n986s"}"><picture class="${"svelte-18n986s"}"><img src="${"/assets/images/weapons/" + escape(type) + "/5star/" + escape(name) + ".webp"}"${add_attribute("alt", getName(name), 0)} class="${escape(null_to_empty(type)) + " svelte-18n986s"}"></picture>
							<caption class="${"name svelte-18n986s"}">${escape(getName(name))}</caption>
						</div>`;
      })}`}

				<div style="${"margin-top: 1rem;"}"></div>
				<h3 class="${"star4 svelte-18n986s"}"><div class="${"star"}">${each(Array(4), (i) => {
        return `<i class="${"gi-star svelte-18n986s"}"></i>`;
      })}</div>
					<i class="${"gi-star svelte-18n986s"}" style="${"color: transparent;"}"></i>
					<span class="${"svelte-18n986s"}">Percentage of 4-Star Item Drops: 50.000% </span></h3>

				${banner === "events" ? `${each(items[1].items, ({ name, vision }) => {
        return `<div class="${"character-card star4 svelte-18n986s"}"><picture class="${"svelte-18n986s"}"><i class="${"gi-" + escape(vision) + " svelte-18n986s"}"></i>
								<img src="${"/assets/images/characters/profile/" + escape(name) + ".webp"}"${add_attribute("alt", getName(name), 0)} class="${"svelte-18n986s"}"></picture>
							<caption class="${"name svelte-18n986s"}">${escape(getName(name))}</caption>
							<i class="${"gi-" + escape(vision) + " element svelte-18n986s"}"></i>
						</div>`;
      })}` : `${each(items[1].items, ({ name, type }) => {
        return `<div class="${"character-card star4 svelte-18n986s"}"><picture class="${"svelte-18n986s"}"><img src="${"/assets/images/weapons/" + escape(type) + "/4star/" + escape(name) + ".webp"}"${add_attribute("alt", getName(name), 0)} class="${escape(null_to_empty(type)) + " svelte-18n986s"}"></picture>
							<caption class="${"name svelte-18n986s"}">${escape(getName(name))}</caption>
						</div>`;
      })}`}` : ``}
			<h2 class="${"svelte-18n986s"}">Wish Details</h2>

			${validate_component(Description, "Description").$$render($$result, {
        bannerType: banner,
        data: items,
        bannerName: bannerTitle
      }, {}, {})}

			<br>
			<h4 class="${"svelte-18n986s"}">Item to wish for :</h4>
			<br>
			<h3 class="${"star5 svelte-18n986s"}"><div class="${"star"}">${each(Array(5), (i) => {
        return `<i class="${"gi-star svelte-18n986s"}"></i>`;
      })}</div>
				<span class="${"svelte-18n986s"}">Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%) </span></h3>
			<div class="${"table svelte-18n986s"}"><div><div class="${"row head svelte-18n986s"}"><div class="${"cell svelte-18n986s"}">Item Type</div>
						<div class="${"cell svelte-18n986s"}">Item Name</div>
						<div class="${"cell svelte-18n986s"}">Item Type</div>
						<div class="${"cell svelte-18n986s"}">Item Name</div></div>

					<div class="${"body svelte-18n986s"}"><div class="${"row svelte-18n986s"}">${each(drop5star, ({ name, type, rateup }) => {
        return `<div class="${"cell svelte-18n986s"}">${escape(type)}</div>
								<div class="${"cell svelte-18n986s"}">${escape(getName(name))}
									${rateup ? `<i class="${"gi-arrow-up svelte-18n986s"}"></i>` : ``}
								</div>`;
      })}</div></div></div></div>

			<h3 class="${"star4 svelte-18n986s"}"><div class="${"star"}">${each(Array(5), (z, i) => {
        return `<i class="${"gi-star svelte-18n986s"}"${add_attribute("style", i > 3 ? "color: transparent" : "", 0)}></i>`;
      })}</div>
				<span class="${"svelte-18n986s"}">Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%) </span></h3>
			<div class="${"table svelte-18n986s"}"><div><div class="${"row head svelte-18n986s"}"><div class="${"cell svelte-18n986s"}">Item Type</div>
						<div class="${"cell svelte-18n986s"}">Item Name</div>
						<div class="${"cell svelte-18n986s"}">Item Type</div>
						<div class="${"cell svelte-18n986s"}">Item Name</div></div>

					<div class="${"body svelte-18n986s"}"><div class="${"row svelte-18n986s"}">${each(drop4star, ({ name, type, rateup }) => {
        return `<div class="${"cell svelte-18n986s"}">${escape(type)}</div>
								<div class="${"cell svelte-18n986s"}">${escape(getName(name))}
									${rateup ? `<i class="${"gi-arrow-up svelte-18n986s"}"></i>` : ``}
								</div>`;
      })}</div></div></div></div>

			${validate_component(Iklan, "Ads").$$render($$result, { type: "banner" }, {}, {})}

			<h3 class="${"star3 svelte-18n986s"}"><div class="${"star"}">${each(Array(5), (x, i) => {
        return `<i class="${"gi-star svelte-18n986s"}"${add_attribute("style", i > 2 ? "color: transparent" : "", 0)}></i>`;
      })}</div>
				<span class="${"svelte-18n986s"}">Base Probability for 3-Star Item Drops: 94.300% (Incl. guarantee: 85.400%) </span></h3>
			<div class="${"table svelte-18n986s"}"><div><div class="${"row head svelte-18n986s"}"><div class="${"cell svelte-18n986s"}">Item Type</div>
						<div class="${"cell svelte-18n986s"}">Item Name</div>
						<div class="${"cell svelte-18n986s"}">Item Type</div>
						<div class="${"cell svelte-18n986s"}">Item Name</div></div>

					<div class="${"body svelte-18n986s"}"><div class="${"row svelte-18n986s"}">${each(drop3star, ({ name, type }) => {
        return `<div class="${"cell svelte-18n986s"}">${escape(type)}</div>
								<div class="${"cell svelte-18n986s"}">${escape(getName(name))}</div>`;
      })}</div></div></div></div>
		`;
    }();
  }(Data.get($patchVersion, $bannerPhase, banner))}</div>
</section>`;
});
var MainHistory_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".confirmation.svelte-fas1no.svelte-fas1no{display:flex;justify-content:center;align-items:center;width:100%;height:100%}a.svelte-fas1no.svelte-fas1no{margin:5px}.cell.svelte-fas1no a.svelte-fas1no{color:#dda04f}section.svelte-fas1no.svelte-fas1no{background-color:#ebebeb;width:100%;height:100%;color:#757575;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}.header.svelte-fas1no.svelte-fas1no{display:block;background-color:rgb(20, 18, 15);width:100%;position:sticky;top:0;left:0;z-index:+10}.gi-reply.svelte-fas1no.svelte-fas1no{color:#dbd7d3;font-size:2.2rem;line-height:0;padding:0.3rem 1rem;display:inline-block}.history-content.svelte-fas1no.svelte-fas1no{padding:20px 5% 10px;width:100%}.wish-type.svelte-fas1no.svelte-fas1no{display:flex;align-items:center;justify-content:center;width:100%}.wish-type.svelte-fas1no span.svelte-fas1no{padding:5px}.select-box.svelte-fas1no.svelte-fas1no{width:270px;max-width:100%;position:relative;margin:0 15px}.selected.svelte-fas1no i.svelte-fas1no{position:absolute;top:50%;right:1rem;font-size:2rem;transform:translateY(-50%)}.selected.svelte-fas1no.svelte-fas1no,.select-list.svelte-fas1no.svelte-fas1no{width:100%;border:0.15rem solid #b5b2ae;background-color:#dbd7d3;border-radius:0.25rem}.selected.svelte-fas1no.svelte-fas1no,.item.svelte-fas1no.svelte-fas1no{display:block;color:#757575;text-decoration:none;padding:6px 15px;transition:all 0.2s}.item.active.svelte-fas1no.svelte-fas1no,.item.svelte-fas1no.svelte-fas1no:hover{background-color:#efebe7}.select-list.svelte-fas1no.svelte-fas1no{position:absolute;z-index:+1;top:130%;left:50%;transform:translateX(-50%)}p.svelte-fas1no.svelte-fas1no{margin:20px 0}.table.svelte-fas1no.svelte-fas1no{width:100%;height:21.5rem}.row.svelte-fas1no.svelte-fas1no{display:flex;justify-content:stretch;align-items:center;width:100%;border:0.2px solid #b5b2ae;height:3rem}.row.head.svelte-fas1no.svelte-fas1no{background-color:#dbd7d3;font-weight:bold}.body.svelte-fas1no .row.svelte-fas1no{border-top:0}.cell0.svelte-fas1no.svelte-fas1no{width:calc(1 / 12 * 100%);border-right:0.2px solid #b5b2ae}.cell1.svelte-fas1no.svelte-fas1no{min-width:80px;width:calc(2 / 12 * 100%);border-right:0.2px solid #b5b2ae}.cell2.svelte-fas1no.svelte-fas1no{width:calc(4 / 12 * 100%);border-right:0.2px solid #b5b2ae;min-width:15rem}.cell3.svelte-fas1no.svelte-fas1no{width:calc(2.5 / 12 * 100%);border-right:0.2px solid #b5b2ae;min-width:12rem}.cell4.svelte-fas1no.svelte-fas1no{width:calc(2.5 / 12 * 100%);min-width:12rem}.cell.svelte-fas1no.svelte-fas1no{display:inline-flex;justify-content:center;align-items:center;padding:1rem 0.5rem;height:100%;text-align:center;text-transform:capitalize;line-height:1rem}.info.row.svelte-fas1no.svelte-fas1no{border:0;width:100%;justify-content:space-between;margin-bottom:5px}.gi-star.svelte-fas1no.svelte-fas1no{font-size:0.8em}.star4.svelte-fas1no.svelte-fas1no,.lighted.svelte-fas1no.svelte-fas1no{color:#a256e1}.star5.svelte-fas1no.svelte-fas1no,.reset.svelte-fas1no.svelte-fas1no{color:#bd6932}.reset.svelte-fas1no.svelte-fas1no{font-size:1em}.reset.svelte-fas1no.svelte-fas1no:hover{text-decoration:underline}.mobile .wish-type.svelte-fas1no.svelte-fas1no{font-size:0.9em}.pagination.svelte-fas1no.svelte-fas1no{display:flex;width:100%;margin:10px;text-align:center;justify-content:center}.pagination.svelte-fas1no button.svelte-fas1no,.pagination.svelte-fas1no span.svelte-fas1no{display:inline-flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:2px;margin:5px}.pagination.svelte-fas1no button.svelte-fas1no{background-color:#c3a280;color:#d7cbbd}.pagination.svelte-fas1no span.svelte-fas1no{background-color:#918981;color:#fff}@media screen and (max-width: 495px){.wish-type.svelte-fas1no.svelte-fas1no{flex-direction:column}section.svelte-fas1no.svelte-fas1no{font-size:1.2rem}}@media screen and (max-width: 900px){section.svelte-fas1no.svelte-fas1no{font-size:1.1rem}}",
  map: null
};
let itemPerPage = 6;
const MainHistory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let list;
  let banner;
  let pity5;
  let pity4;
  let $bannerActive, $$unsubscribe_bannerActive;
  let $bannerList, $$unsubscribe_bannerList;
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  let content;
  let activepage = 1;
  let showPopup = false;
  let data2 = [];
  let table;
  const readData = async () => {
    return [];
  };
  $$result.css.add(css$7);
  list = $bannerList.filter((item, i, arr) => i === arr.findIndex((v) => v.type === item.type));
  {
    if (list.findIndex(({ type }) => type === "beginner") < 0)
      list.unshift({ type: "beginner" });
  }
  banner = $bannerList.find((v, i) => i === $bannerActive).type;
  list.findIndex(({ type }) => type === banner.toLocaleLowerCase());
  pity5 = 0;
  pity4 = 0;
  $$unsubscribe_bannerActive();
  $$unsubscribe_bannerList();
  return `${$$result.head += `${$$result.title = `<title>
		${escape(getName(banner))} Wish | ${escape(APP_TITLE)}
	</title>`, ""}`, ""}

${validate_component(PopUp, "PopUp").$$render($$result, {
    show: showPopup,
    title: "Reset History ?"
  }, {}, {
    default: () => {
      return `<div class="${"confirmation svelte-fas1no"}"><p class="${"svelte-fas1no"}">It&#39;s also remove all Characters and Weapons related to <strong>${escape(banner === "events" ? "Character Event" : getName(banner))}</strong>
			Banner from your Inventory. <br>
			Are You Sure to Reset ?
		</p></div>`;
    }
  })}

${``}

<section class="${"svelte-fas1no"}"${add_attribute("this", content, 0)}><div class="${"header svelte-fas1no"}"><button><i class="${"gi-reply svelte-fas1no"}"></i></button></div>
	<div class="${"history-content svelte-fas1no"}"><div class="${"wish-type svelte-fas1no"}"><span class="${"svelte-fas1no"}">Select Wish Type: </span>
			<div class="${"select-box svelte-fas1no"}"><div class="${"selected svelte-fas1no"}">${escape(banner === "events" ? "Character Event" : getName(banner))} Wish

					<i class="${"gi-caret-" + escape("down") + " svelte-fas1no"}"></i></div>

				${``}</div></div>
		<p class="${"svelte-fas1no"}">We Never save your data on cloud storage. All data was stored to IndexedDB, it means the data
			is saved on your browser storage. It will never delete till you delete it manualy through
			delete/reset button or clear the browser data.
		</p>

		<div class="${"info row svelte-fas1no"}"><div class="${"cell svelte-fas1no"}">Current Pity : \xA0 <strong class="${"star5 svelte-fas1no"}">${escape(pity5)}</strong> \xA0 - \xA0
				<strong class="${"star4 svelte-fas1no"}">${escape(pity4)}</strong></div>
			<div class="${"cell svelte-fas1no"}">Total Pull : <span class="${"lighted svelte-fas1no"}"><strong>${escape(data2.length)}</strong></span> ~
				<span class="${"lighted svelte-fas1no"}"><strong>$${escape((data2.length * 160 / 60).toFixed(2))}</strong></span></div>
			<div class="${"cell svelte-fas1no"}"><button class="${"reset svelte-fas1no"}"><i class="${"gi-delete"}"></i> Reset</button></div></div>

		<div class="${"table svelte-fas1no"}"${add_attribute("this", table, 0)}><div style="${"min-width: max-content;"}"><div class="${"row head svelte-fas1no"}"><div class="${"cell cell0 svelte-fas1no"}">Pity</div>
					<div class="${"cell cell1 svelte-fas1no"}">Item Type</div>
					<div class="${"cell cell2 svelte-fas1no"}">Item Name</div>
					<div class="${"cell cell3 svelte-fas1no"}">Time Received</div>
					<div class="${"cell cell4 svelte-fas1no"}">Banner</div></div>

				<div class="${"body svelte-fas1no"}">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
						<div class="${"row svelte-fas1no"}" style="${"justify-content: center"}"><div class="${"cell svelte-fas1no"}">Waiting ...</div></div>
					`;
    }
    return function(ls) {
      return `
						${data2.length < 1 ? `<div class="${"row svelte-fas1no"}" style="${"justify-content: center"}"><div class="${"cell svelte-fas1no"}">No data available .</div></div>` : `${each(data2, ({ name, type, rarity, time, pity, bannerName }, i) => {
        return `${i > (activepage - 1) * itemPerPage - 1 && i < itemPerPage * activepage ? `<div class="${"row svelte-fas1no"}"><div class="${"cell cell0 star" + escape(rarity) + " svelte-fas1no"}">${escape(pity)}</div>
										<div class="${"cell cell1 svelte-fas1no"}">${escape(type)}</div>
										<div class="${"cell cell2 star" + escape(rarity) + " svelte-fas1no"}">${escape(getName(name))}
											${rarity > 3 ? `( ${escape(rarity)} <i class="${"gi-star svelte-fas1no"}"></i> )` : ``}</div>
										<div class="${"cell cell3 svelte-fas1no"}">${escape(time)}</div>
										<div class="${"cell cell4 svelte-fas1no"}">${bannerName ? `${["events", "weapons"].includes(banner) ? `<a href="${"/"}" class="${"svelte-fas1no"}">${escape(getName(bannerName))}
													</a>` : `${escape(getName(bannerName))}`}` : `Untrack`}</div>
									</div>` : ``}`;
      })}`}
					`;
    }();
  }(readData())}</div></div></div>

		<div class="${"pagination svelte-fas1no"}"><button class="${"prev svelte-fas1no"}"><i class="${"gi-angle-left"}"></i></button>
			<span class="${"active svelte-fas1no"}">${escape(activepage)}</span>
			<button class="${"next svelte-fas1no"}"><i class="${"gi-angle-right"}"></i></button></div></div>
</section>`;
});
var InventoryHeader_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".title.svelte-174874v{color:#d2c69c;text-transform:capitalize;display:flex;align-items:center;text-align:left}.mobile .title.svelte-174874v{font-size:small}.budget.svelte-174874v{text-align:right;display:flex;justify-content:flex-end;align-items:center;margin-left:auto}button.svelte-174874v:not(.close){display:inline-block;max-width:112px;height:25px;overflow:hidden;background-color:rgba(0, 0, 0, 0.3);border-radius:50px;color:#fff;vertical-align:middle;text-align:center;position:relative;margin:0 8px;padding:0 15px 0 30px}@media screen and (max-width: 900px){.title.svelte-174874v{font-size:small}button.svelte-174874v{height:20px;margin:0 3px}main:not(.mobile) .budget.svelte-174874v{flex-wrap:wrap}}@media screen and (max-width: 400px){button.svelte-174874v{max-width:80px}}",
  map: null
};
const InventoryHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $starglitter, $$unsubscribe_starglitter;
  let $stardust, $$unsubscribe_stardust;
  let $intertwined, $$unsubscribe_intertwined;
  let $acquaint, $$unsubscribe_acquaint;
  let $primogem, $$unsubscribe_primogem;
  let $genesis, $$unsubscribe_genesis;
  $$unsubscribe_starglitter = subscribe(starglitter, (value) => $starglitter = value);
  $$unsubscribe_stardust = subscribe(stardust, (value) => $stardust = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => $intertwined = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => $acquaint = value);
  $$unsubscribe_primogem = subscribe(primogem, (value) => $primogem = value);
  $$unsubscribe_genesis = subscribe(genesis, (value) => $genesis = value);
  let { activeItem = "" } = $$props;
  if ($$props.activeItem === void 0 && $$bindings.activeItem && activeItem !== void 0)
    $$bindings.activeItem(activeItem);
  $$result.css.add(css$6);
  $$unsubscribe_starglitter();
  $$unsubscribe_stardust();
  $$unsubscribe_intertwined();
  $$unsubscribe_acquaint();
  $$unsubscribe_primogem();
  $$unsubscribe_genesis();
  return `<h1 class="${"title svelte-174874v"}">Inventory / ${escape(activeItem)}s</h1>
<div class="${"budget svelte-174874v"}"><button class="${"starglitter svelte-174874v"}">${validate_component(Icon, "Icon").$$render($$result, {
    type: "starglitter",
    height: "80%",
    width: "auto",
    style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
  }, {}, {})}
		${escape($starglitter)}</button>
	<button class="${"stardust svelte-174874v"}">${validate_component(Icon, "Icon").$$render($$result, {
    type: "stardust",
    height: "80%",
    width: "auto",
    style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
  }, {}, {})}
		${escape($stardust)}</button>
	<button class="${"intertwined svelte-174874v"}">${validate_component(Icon, "Icon").$$render($$result, {
    height: "70%",
    width: "auto",
    style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);",
    type: "intertwined"
  }, {}, {})}
		${escape($intertwined)}</button>
	<button class="${"acquiant svelte-174874v"}">${validate_component(Icon, "Icon").$$render($$result, {
    height: "70%",
    width: "auto",
    style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);",
    type: "acquaint"
  }, {}, {})}
		${escape($acquaint)}</button>
	<button class="${"primogem svelte-174874v"}">${validate_component(Icon, "Icon").$$render($$result, {
    type: "primogem",
    height: "80%",
    width: "auto",
    style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
  }, {}, {})}
		${escape($primogem)}</button>
	<button class="${"genesis svelte-174874v"}">${validate_component(Icon, "Icon").$$render($$result, {
    type: "genesis",
    height: "80%",
    width: "auto",
    style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
  }, {}, {})}
		${escape($genesis)}</button></div>
<button class="${"close svelte-174874v"}"><i class="${"gi-close"}"></i>
</button>`;
});
var InventoryDetails_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".close.svelte-v5vv9h.svelte-v5vv9h{display:inline-flex;justify-content:center;align-items:center;width:35px;height:35px;color:rgba(0, 0, 0, 0.7);background-color:#fff;border:3.5px solid #abbcc6;padding:0;border-radius:100%;position:fixed;top:15px;right:3%;line-height:0;z-index:10}@media screen and (max-width: 900px){.close.svelte-v5vv9h.svelte-v5vv9h{width:2.5rem;height:2.5rem;margin:3px}}.mobile .close.svelte-v5vv9h.svelte-v5vv9h{width:2rem;height:2rem;top:0.3rem;right:2%}.wish-result.svelte-v5vv9h.svelte-v5vv9h{width:100vw;background-color:#fff;background-image:url('/assets/images/background/detailbg.webp');background-size:cover;background-position:center;position:fixed;top:0;left:0;z-index:+10}.container.svelte-v5vv9h.svelte-v5vv9h{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center}.share.svelte-v5vv9h.svelte-v5vv9h{position:absolute;bottom:5%;right:10%}.splatter.svelte-v5vv9h.svelte-v5vv9h{display:flex;justify-content:center;align-items:center;position:relative}.splash-art.svelte-v5vv9h.svelte-v5vv9h{height:120%}.splash-art.weapon.svelte-v5vv9h.svelte-v5vv9h{height:100%;width:100%;position:relative}.splash-art.weapon.svelte-v5vv9h img.svelte-v5vv9h{height:120%;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.bow.svelte-v5vv9h.svelte-v5vv9h{height:100%}.claymore.svelte-v5vv9h.svelte-v5vv9h{height:105% !important}.catalyst.svelte-v5vv9h.svelte-v5vv9h{height:45% !important}.polearm.svelte-v5vv9h.svelte-v5vv9h{top:65% !important;left:48% !important;height:130% !important}.info.svelte-v5vv9h.svelte-v5vv9h,.starfate.svelte-v5vv9h.svelte-v5vv9h{position:fixed;top:60%;z-index:10;text-transform:capitalize;display:flex;align-items:center;width:1100px;max-width:95%}.info.svelte-v5vv9h.svelte-v5vv9h{left:50%;transform:translate(-50%, -50%)}.mobile .info.svelte-v5vv9h.svelte-v5vv9h{max-width:83%}.info.svelte-v5vv9h i.elemen.svelte-v5vv9h,.vision.svelte-v5vv9h.svelte-v5vv9h{font-size:5.2em;margin-right:-7px;margin-top:-5px;-webkit-background-clip:text;-webkit-text-fill-color:transparent;position:relative;z-index:-2}.vision.svelte-v5vv9h.svelte-v5vv9h{width:4rem}.name.svelte-v5vv9h.svelte-v5vv9h{position:relative;z-index:+2;width:100%}.name.svelte-v5vv9h .text.svelte-v5vv9h{max-width:38%;font-size:2.5em;line-height:1.2em;color:#fff;-webkit-text-stroke:0.015em #000}.gi-star.svelte-v5vv9h.svelte-v5vv9h{color:#f7cf33;font-size:1.525em;display:inline-block}.detail.svelte-v5vv9h.svelte-v5vv9h,.uid.svelte-v5vv9h.svelte-v5vv9h{color:#fff;position:fixed;width:100%;bottom:0;left:0;padding:0.5rem 1rem;-webkit-text-stroke:#000 0.015rem}.detail.svelte-v5vv9h span.svelte-v5vv9h{display:block}span.count.svelte-v5vv9h.svelte-v5vv9h{font-size:larger}.uid.svelte-v5vv9h.svelte-v5vv9h{left:unset;right:0;width:fit-content;display:none}.preview.svelte-v5vv9h .uid.svelte-v5vv9h{display:unset}",
  map: null
};
const InventoryDetails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let splatterWidth;
  let splatterStyle;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $viewportWidth, $$unsubscribe_viewportWidth;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => $viewportWidth = value);
  let { show = false } = $$props;
  let { name = "" } = $$props;
  let render = false;
  let rarity = 0;
  let time = "";
  let type = "";
  let vision = "";
  let weaponType = "";
  let countInfo = 0;
  const getDetail = async (show2) => {
    if (!show2 && !name)
      return;
    const dt = await HistoryIDB.getByName(name);
    ({ time, vision, type, weaponType, rarity } = dt[0]);
    const count = dt.length;
    if (type === "weapon") {
      countInfo = `Refinement ${count > 5 ? `5 + ${count - 5} Extra` : count}`;
    } else {
      countInfo = `Constellation ${count > 7 ? `6 + ${count - 7} Extra` : count - 1}`;
    }
    render = show2;
  };
  createEventDispatcher();
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css$5);
  splatterWidth = $viewportHeight > $viewportWidth ? $viewportWidth : $viewportHeight;
  splatterStyle = `width: ${splatterWidth}px; height: ${splatterWidth}px`;
  {
    getDetail(show);
  }
  $$unsubscribe_viewportHeight();
  $$unsubscribe_viewportWidth();
  return `${render ? `<div class="${"wish-result svelte-v5vv9h"}" style="${"height: " + escape($viewportHeight) + "px"}"><div class="${"container svelte-v5vv9h"}"><button class="${"close svelte-v5vv9h"}"><i class="${"gi-close"}"></i></button>

			<div class="${"uid svelte-v5vv9h"}"></div>

			<div class="${"splatter svelte-v5vv9h"}"${add_attribute("style", splatterStyle, 0)}>${type === "weapon" ? `<div class="${"splash-art weapon " + escape(weaponType) + "-parent svelte-v5vv9h"}"><img src="${"/assets/images/weapons/" + escape(weaponType) + "/" + escape(rarity) + "star/" + escape(name) + ".webp"}"${add_attribute("alt", name, 0)} class="${escape(null_to_empty(weaponType)) + " svelte-v5vv9h"}"></div>` : `<img src="${"/assets/images/characters/splash-art/" + escape(rarity) + "star/" + escape(name) + ".webp"}"${add_attribute("alt", getName(name), 0)} class="${"splash-art svelte-v5vv9h"}">`}

				<div class="${"info svelte-v5vv9h"}">${vision ? `<img src="${"/assets/images/utility/icon-" + escape(vision) + ".svg"}" alt="${"Vision " + escape(vision)}" class="${"anim vision vision-" + escape(vision) + " svelte-v5vv9h"}">` : `<i class="${"anim elemen gi-" + escape(weaponType) + " svelte-v5vv9h"}"></i>`}
					<div class="${"name svelte-v5vv9h"}"><div class="${"text svelte-v5vv9h"}">${escape(getName(name))}</div>
						<div class="${"star"}">${each(Array(rarity), (_, i) => {
    return `<i class="${"gi-star svelte-v5vv9h"}"></i>`;
  })}</div></div></div></div>
			<div class="${"detail svelte-v5vv9h"}"><span class="${"count svelte-v5vv9h"}">${escape(countInfo)}</span>
				<span class="${"svelte-v5vv9h"}"><small>First Summoned at : </small> ${escape(time)}</span></div>
			<div class="${"share svelte-v5vv9h"}">${validate_component(ShareScreenshot, "Share").$$render($$result, {}, {}, {})}</div></div></div>` : ``}`;
});
var MainInventory_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "section.svelte-1skxq9a.svelte-1skxq9a{display:block;width:100%;height:100%;position:relative;background-color:#000}img.bg.svelte-1skxq9a.svelte-1skxq9a{display:block;width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;opacity:0;will-change:opacity;transition:opacity 6s ease}img.bg.active.svelte-1skxq9a.svelte-1skxq9a{opacity:1}.header.svelte-1skxq9a.svelte-1skxq9a{position:relative;width:100%;display:flex;padding:15px 2%;z-index:+2}.mobile .header.svelte-1skxq9a.svelte-1skxq9a{position:fixed;top:0;right:0;width:calc(100% - 65px);display:flex;justify-content:space-between;padding:5px 2%}.body.svelte-1skxq9a.svelte-1skxq9a{display:flex;flex-direction:column;width:100%;height:100%;position:relative;z-index:+1}.navigation.svelte-1skxq9a.svelte-1skxq9a{text-align:center;display:flex;justify-content:center;position:relative;z-index:10;width:100%}.navigation.svelte-1skxq9a nav.svelte-1skxq9a{width:80%;height:44px;margin-top:5px;border-width:0.1rem 0 !important;border:solid rgba(207, 186, 143, 0.5);display:flex;justify-content:center;background-image:linear-gradient(\n			to left,\n			rgba(0, 0, 0, 0),\n			rgba(0, 0, 0, 0.6),\n			rgba(0, 0, 0, 0.6),\n			rgba(0, 0, 0, 0)\n		)}nav.svelte-1skxq9a .nav-link.svelte-1skxq9a{height:44px;display:inline-flex;justify-content:center;align-items:center;color:#ede5d8;margin:0 15px;line-height:0;border-radius:100%;opacity:0.6;transition:all 0.2s}nav.svelte-1skxq9a .nav-link.active.svelte-1skxq9a{color:#fff;opacity:1}nav.svelte-1skxq9a .nav-link i.svelte-1skxq9a{font-size:1.5rem}.mobile .navigation.svelte-1skxq9a.svelte-1skxq9a{flex-direction:column;align-items:flex-end;width:70px;margin-top:0;height:100%;justify-content:flex-start;padding-top:0}.mobile .body.svelte-1skxq9a.svelte-1skxq9a{flex-direction:row}.mobile nav.svelte-1skxq9a.svelte-1skxq9a{display:block;height:100vh;background-color:#484f62;z-index:-1;text-align:center;border-width:0 0.1rem !important;width:40px;margin-top:0;padding-top:50px;background-image:none}.mobile nav.svelte-1skxq9a .nav-link.svelte-1skxq9a{margin:0;font-size:1.7rem;margin:5px 0;height:unset;position:relative;line-height:1rem;padding:0.3rem;opacity:unset;background-color:#3a4156}.mobile nav.svelte-1skxq9a .nav-link.active.svelte-1skxq9a{color:#3a4156;background-color:transparent}.mobile nav.svelte-1skxq9a .nav-link.svelte-1skxq9a::after{position:absolute;top:0;right:-0.2rem;content:'';display:block;width:1000%;height:100%;border-top-right-radius:40px;border-bottom-right-radius:40px;z-index:-1;transition:all 0.2s}.mobile nav.svelte-1skxq9a .nav-link.active.svelte-1skxq9a::after{background-color:#ede5d8}.body-content.svelte-1skxq9a.svelte-1skxq9a{display:flex;flex-direction:column;width:100%;height:100%}.container.svelte-1skxq9a.svelte-1skxq9a{height:calc(100% - 7.2rem);display:block;width:100%;padding:0 2%;margin-top:2px}.list-item.svelte-1skxq9a.svelte-1skxq9a{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;width:100%}.mobile .container.svelte-1skxq9a.svelte-1skxq9a{margin-top:45px;height:calc(100% - 85px)}.item.svelte-1skxq9a.svelte-1skxq9a{margin:0.5rem;will-change:auto;aspect-ratio:8.75 / 10;width:20vh;max-width:150px}.mobile .item.svelte-1skxq9a.svelte-1skxq9a{width:24vh}.filter.svelte-1skxq9a.svelte-1skxq9a{height:3rem;width:100%}.filter.svelte-1skxq9a .row.svelte-1skxq9a{width:100%;height:100%;display:flex;align-items:center;padding:0 2%}.sort-button.svelte-1skxq9a.svelte-1skxq9a{display:inline-flex;justify-content:center;align-items:center;width:2rem;height:2rem;line-height:1rem;color:#3a4156;background-color:#ede5d8;transform:rotate(90deg);font-size:1.2rem;border-radius:100%}.sort-selector.svelte-1skxq9a.svelte-1skxq9a{color:#3a4156;font-size:1rem;margin:0 0.5rem;display:inline-block;width:200px;max-width:35%;position:relative;text-transform:capitalize}.selected-order.svelte-1skxq9a.svelte-1skxq9a{background-color:#ede5d8;padding:0.05rem 1rem;border-radius:10px}.selected-order.svelte-1skxq9a i.svelte-1skxq9a{display:inline-block;position:absolute;right:1rem}.order-list.svelte-1skxq9a.svelte-1skxq9a{position:absolute;top:-30%;display:flex;flex-direction:column;width:100%;background-color:#ede5d8;transform:translateY(-100%);border-radius:0.3rem;padding:0.2rem 0}.order-list.svelte-1skxq9a a.svelte-1skxq9a{padding:0.2rem 1rem;text-decoration:none;color:#3a4156}.order-list.svelte-1skxq9a a.selected.svelte-1skxq9a{background-color:rgb(218, 202, 177)}.showAll.svelte-1skxq9a.svelte-1skxq9a{margin-left:0.5rem;color:var(--tertiary-color);text-transform:capitalize}label.svelte-1skxq9a.svelte-1skxq9a{cursor:inherit}.showAll.svelte-1skxq9a input+label i.svelte-1skxq9a{color:white;display:inline-block;padding:0.1rem 0.2rem 0.1rem 0.1rem;line-height:1rem;background-color:#fff}.showAll.svelte-1skxq9a input:checked+label i.svelte-1skxq9a{background-color:#06bbff}.showAll.svelte-1skxq9a input.svelte-1skxq9a{display:none}@media screen and (max-width: 900px){main:not(.mobile) .navigation.svelte-1skxq9a nav.svelte-1skxq9a{height:40px;width:100%}nav.svelte-1skxq9a .nav-link.svelte-1skxq9a{height:40px}.container.svelte-1skxq9a.svelte-1skxq9a{height:calc(100% - 9rem);margin-top:0}}@media screen and (max-width: 400px){.container.svelte-1skxq9a.svelte-1skxq9a{height:calc(100% - 10rem)}.item.svelte-1skxq9a.svelte-1skxq9a{width:14vh}}",
  map: null
};
const MainInventory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mobileMode, $$unsubscribe_mobileMode;
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  const bg = ["dendro", "anemo", "cryo", "hydro", "electro", "pyro", "geo"];
  let activeBgIndex = Math.floor(Math.random() * bg.length);
  setInterval(() => {
    activeBgIndex = activeBgIndex === bg.length - 1 ? 0 : activeBgIndex + 1;
  }, 6500);
  let activeItem = "character";
  let orderby = "rarity";
  let weapons$1 = [];
  let characters$1 = [];
  let dataToShow = [];
  let dataQty = 0;
  let content;
  let showAll = !!localConfig.get("showAllItems");
  const listWithRarity = (list, rarity) => {
    return list.map((l) => {
      l.rarity = rarity;
      return l;
    });
  };
  const allCharacters = characters.data.reduce((prev, { list, rarity }) => {
    return [...prev, ...listWithRarity(list, rarity)];
  }, []);
  const allWeapons = weapons.data.reduce((prev, { list, rarity }) => {
    return [...prev, ...listWithRarity(list, rarity)];
  }, []);
  const getTotalItem = (data2) => {
    dataQty = data2.map((v) => v.qty).reduce((a, b) => a + b, 0);
  };
  const proccessData = async (activeItem2, isShowAll = false) => {
    const data2 = activeItem2 === "character" ? characters$1 : weapons$1;
    const allData = activeItem2 === "character" ? allCharacters : allWeapons;
    const promise = await Promise.all(data2);
    const dataFromIDB = promise.sort((a, b) => b.rarity - a.rarity);
    getTotalItem(dataFromIDB);
    if (!isShowAll) {
      dataToShow = dataFromIDB.map((d) => {
        d.isOwned = true;
        return d;
      });
      return;
    }
    const mergeData = allData.map((d) => {
      const owned = dataFromIDB.find(({ name }) => d.name === name);
      d.type = activeItem2;
      if (!owned) {
        d.qty = 0;
        d.isOwned = false;
        return d;
      }
      const { qty } = owned;
      d.qty = qty;
      d.isOwned = true;
      return d;
    });
    dataToShow = mergeData;
    return;
  };
  let detailName = "";
  let showInventoryDetail = false;
  $$result.css.add(css$4);
  {
    proccessData(activeItem, showAll);
  }
  {
    localConfig.set("showAllItems", showAll);
  }
  $$unsubscribe_mobileMode();
  return `${$$result.head += `${$$result.title = `<title>Inventory | ${escape(APP_TITLE)}</title>`, ""}`, ""}

${validate_component(InventoryDetails, "InventoryDetails").$$render($$result, {
    show: showInventoryDetail,
    name: detailName
  }, {}, {})}

<section class="${"svelte-1skxq9a"}">${each(bg, (b, i) => {
    return `<img src="${"/assets/images/background/element-" + escape(b) + "-bg.webp"}" alt="${"Background"}" class="${["bg svelte-1skxq9a", activeBgIndex === i ? "active" : ""].join(" ").trim()}">`;
  })}

	<div class="${"header svelte-1skxq9a"}">${validate_component(InventoryHeader, "InventoryHeader").$$render($$result, { activeItem }, {}, {})}</div>
	<div class="${"body svelte-1skxq9a"}"><div class="${"navigation svelte-1skxq9a"}"><nav class="${"svelte-1skxq9a"}"><button class="${["nav-link svelte-1skxq9a", "active"].join(" ").trim()}"><i class="${"gi-character svelte-1skxq9a"}"></i>
					${escape($mobileMode ? "" : "Characters")}</button>
				<button class="${["nav-link svelte-1skxq9a", ""].join(" ").trim()}"><i class="${"gi-weapon svelte-1skxq9a"}"></i>
					${escape($mobileMode ? "" : "Weapons")}</button></nav></div>
		<div class="${"body-content svelte-1skxq9a"}"><div class="${"container svelte-1skxq9a"}"${add_attribute("this", content, 0)}><div class="${"list-item svelte-1skxq9a"}">${dataToShow.length < 1 ? `<span style="${"color: white; padding: 2rem; font-size: 1.2rem"}">No data Found </span>` : `${each(dataToShow, (d) => {
    return `<div class="${"item svelte-1skxq9a"}">${validate_component(InventoryItem, "InventoryItem").$$render($$result, {
      name: d.name,
      rarity: d.rarity,
      type: d.type,
      vision: d.vision,
      weaponType: d.weaponType,
      qty: d.qty,
      isOwned: d.isOwned
    }, {}, {})}
							</div>`;
  })}`}</div></div>
			<div class="${"filter svelte-1skxq9a"}"><div class="${"row svelte-1skxq9a"}"><button class="${"sort-button svelte-1skxq9a"}" title="${"Reverse Order"}"><i class="${"gi-exchange"}"></i></button>
					<div class="${"sort-selector svelte-1skxq9a"}"><div class="${"selected-order svelte-1skxq9a"}">Sort / ${escape(orderby)}

							${`<i class="${"gi-caret-down svelte-1skxq9a"}"></i>`}</div>

						${``}</div>
					<div class="${"showAll svelte-1skxq9a"}"><input type="${"checkbox"}" name="${"showAll"}" id="${"showAll"}" class="${"svelte-1skxq9a"}"${add_attribute("checked", showAll, 1)}>
						<label for="${"showAll"}" class="${"svelte-1skxq9a"}"><i class="${"svelte-1skxq9a"}">\u2714</i>
							Show All ${escape(activeItem)}s ( ${escape(dataQty)} Summoned )
						</label></div></div></div></div></div>
</section>`;
});
var ShopNavbar_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".navbar.svelte-14qj0gl.svelte-14qj0gl{width:280px;height:100%;display:block;background-color:rgba(75, 82, 101, 0.8);border-right:1px solid #d2c69c;border-left:1px solid #d2c69c;color:#d2c69c;margin-right:3%}.mobile .navbar.svelte-14qj0gl.svelte-14qj0gl{width:190px}.top.svelte-14qj0gl.svelte-14qj0gl{font-size:1.5rem;width:100%;height:80px;background-color:#3b4255;padding:0 20px 20px;display:flex;align-items:flex-end}.mobile .top.svelte-14qj0gl.svelte-14qj0gl{height:50px;font-size:1.2rem;padding:0 20px 10px;margin-bottom:-10px}.nav-item.svelte-14qj0gl.svelte-14qj0gl{margin-top:20px;display:flex;flex-direction:column;color:#f0e4d4}.link.svelte-14qj0gl.svelte-14qj0gl{position:relative;transition:all 0.2s;text-decoration:none;color:#ededed;padding:2px}.mobile .link.svelte-14qj0gl.svelte-14qj0gl{padding:1px}.link.svelte-14qj0gl:not(.active)>i.svelte-14qj0gl{display:none}.link.svelte-14qj0gl .border.svelte-14qj0gl{padding:0px 10px;border:2px solid transparent;display:flex !important;align-items:center}.mobile .link.svelte-14qj0gl .border.svelte-14qj0gl{padding:2px 7px}.border.svelte-14qj0gl i.svelte-14qj0gl{font-size:2rem;display:inline-block;margin-right:10px}.mobile .border.svelte-14qj0gl i.svelte-14qj0gl{font-size:1.4rem}.link.active.svelte-14qj0gl.svelte-14qj0gl,.link.svelte-14qj0gl.svelte-14qj0gl:hover{background-color:#ede5d8;color:#40475a;border-radius:2px}.link.active.svelte-14qj0gl>i.svelte-14qj0gl{position:absolute;top:50%;transform:translateY(-50%);color:#ede5d8}.gi-caret-up.svelte-14qj0gl.svelte-14qj0gl{left:-1.5rem;font-size:2rem;transform:translateY(-50%) rotate(90deg) !important}.mobile .gi-caret-up.svelte-14qj0gl.svelte-14qj0gl{left:-1rem;font-size:1rem}.link.active.svelte-14qj0gl .border.svelte-14qj0gl{display:block;border:2px solid #c1b198;border-radius:2px}.gi-primo-star.svelte-14qj0gl.svelte-14qj0gl{right:-1.3rem;font-size:1.3rem}.mobile .gi-primo-star.svelte-14qj0gl.svelte-14qj0gl{right:-1rem;font-size:1rem}@media screen and (max-width: 400px){.navbar.svelte-14qj0gl.svelte-14qj0gl{position:fixed;top:0;left:0;width:200px;background-color:rgba(75, 82, 101, 1);z-index:10}.bg.svelte-14qj0gl.svelte-14qj0gl{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(75, 82, 101, 0.8);z-index:8}}",
  map: null
};
const ShopNavbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show } = $$props;
  createEventDispatcher();
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  $$result.css.add(css$3);
  return `${show ? `<div class="${"bg svelte-14qj0gl"}"></div>
	<div class="${"navbar svelte-14qj0gl"}"><div class="${"top svelte-14qj0gl"}">Shop</div>
		<div class="${"nav-item svelte-14qj0gl"}"><div class="${"link svelte-14qj0gl"}"><div class="${"border svelte-14qj0gl"}"><i class="${"gi-recomended svelte-14qj0gl"}"></i> Recomended</div></div>
			<div class="${"link svelte-14qj0gl"}"><div class="${"border svelte-14qj0gl"}"><i class="${"gi-gift-shop svelte-14qj0gl"}"></i> Gift Shop</div></div>
			<a href="${"#paimon"}" class="${["link svelte-14qj0gl", ""].join(" ").trim()}"><i class="${"gi-primo-star svelte-14qj0gl"}"></i>
				<i class="${"gi-caret-up svelte-14qj0gl"}"></i>
				<div class="${"border svelte-14qj0gl"}"><i class="${"gi-paimon-bargains svelte-14qj0gl"}"></i> Paimon&#39;s Bargains</div></a>
			<a href="${"#genesis"}" class="${["link svelte-14qj0gl", "active"].join(" ").trim()}"><i class="${"gi-primo-star svelte-14qj0gl"}"></i>
				<i class="${"gi-caret-up svelte-14qj0gl"}"></i>
				<div class="${"border svelte-14qj0gl"}"><i class="${"gi-genesis svelte-14qj0gl"}"></i> Crystal Top-Up</div></a></div></div>` : ``}`;
});
var ShopHeader_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".toggle.svelte-1b5moq9.svelte-1b5moq9{display:inline-block;width:40px;height:40px;border:1px solid #d2c69c;margin-right:5px;position:relative}.toggle.svelte-1b5moq9 span.svelte-1b5moq9{display:block;width:60%;height:2px;top:50%;left:50%;position:absolute;transform:translate(-50%, -50%);background-color:#d2c69c}.toggle.svelte-1b5moq9 span.svelte-1b5moq9::after,.toggle.svelte-1b5moq9 span.svelte-1b5moq9::before{display:block;position:absolute;left:0;width:100%;height:2px;content:'';background-color:#d2c69c}.toggle.svelte-1b5moq9 span.svelte-1b5moq9::before{top:-300%}.toggle.svelte-1b5moq9 span.svelte-1b5moq9::after{bottom:-300%}.item-header.svelte-1b5moq9.svelte-1b5moq9{height:80px;display:flex;justify-content:space-between;align-items:center;color:#d2c69c;position:relative}.mobile .item-header.svelte-1b5moq9.svelte-1b5moq9{height:40px}.fates.svelte-1b5moq9.svelte-1b5moq9{display:flex;justify-content:flex-end;align-items:center}@media screen and (max-width: 500px){.item-header.svelte-1b5moq9.svelte-1b5moq9{flex-direction:column;justify-content:center}.info.svelte-1b5moq9.svelte-1b5moq9{width:100%}.fates.svelte-1b5moq9 .close.svelte-1b5moq9{position:absolute;top:20%;right:0}}",
  map: null
};
const ShopHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $primogem, $$unsubscribe_primogem;
  let $genesis, $$unsubscribe_genesis;
  let $stardust, $$unsubscribe_stardust;
  let $starglitter, $$unsubscribe_starglitter;
  $$unsubscribe_primogem = subscribe(primogem, (value) => $primogem = value);
  $$unsubscribe_genesis = subscribe(genesis, (value) => $genesis = value);
  $$unsubscribe_stardust = subscribe(stardust, (value) => $stardust = value);
  $$unsubscribe_starglitter = subscribe(starglitter, (value) => $starglitter = value);
  let { showNavbar = true } = $$props;
  let { showNavbarButton = true } = $$props;
  let { activeShop = "genesis" } = $$props;
  createEventDispatcher();
  if ($$props.showNavbar === void 0 && $$bindings.showNavbar && showNavbar !== void 0)
    $$bindings.showNavbar(showNavbar);
  if ($$props.showNavbarButton === void 0 && $$bindings.showNavbarButton && showNavbarButton !== void 0)
    $$bindings.showNavbarButton(showNavbarButton);
  if ($$props.activeShop === void 0 && $$bindings.activeShop && activeShop !== void 0)
    $$bindings.activeShop(activeShop);
  $$result.css.add(css$2);
  $$unsubscribe_primogem();
  $$unsubscribe_genesis();
  $$unsubscribe_stardust();
  $$unsubscribe_starglitter();
  return `<div class="${"item-header svelte-1b5moq9"}"><div class="${"info svelte-1b5moq9"}" style="${"display: flex; align-items: center"}">${showNavbarButton ? `<button class="${"toggle svelte-1b5moq9"}"><span class="${"svelte-1b5moq9"}"></span></button>` : ``}
		<span>All Items below will never resfreshes </span></div>
	<div class="${"fates svelte-1b5moq9"}">${activeShop === "genesis" ? `${validate_component(MyFund, "MyFund").$$render($$result, { type: "primogem" }, {}, {
    default: () => {
      return `${escape($primogem)}`;
    }
  })}
			${validate_component(MyFund, "MyFund").$$render($$result, { type: "genesis" }, {}, {
    default: () => {
      return `${escape($genesis)}`;
    }
  })}` : `${activeShop === "paimon-bargains" ? `${validate_component(MyFund, "MyFund").$$render($$result, { type: "stardust" }, {}, {
    default: () => {
      return `${escape($stardust)}`;
    }
  })}
			${validate_component(MyFund, "MyFund").$$render($$result, { type: "starglitter" }, {}, {
    default: () => {
      return `${escape($starglitter)}`;
    }
  })}
			${validate_component(MyFund, "MyFund").$$render($$result, { type: "primogem" }, {}, {
    default: () => {
      return `${escape($primogem)}`;
    }
  })}` : ``}`}

		<button class="${"close svelte-1b5moq9"}"><i class="${"gi-close"}"></i></button></div>
</div>`;
});
var PaymentPopup_svelte_svelte_type_style_lang = "";
var MainShop_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{width:100vw;display:block;position:relative;font-size:1rem;background-color:var(--text-color)}.mobile section.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{font-size:0.8rem}.bg.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{width:100vw;height:100%;object-fit:cover;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%) scale(1.1);filter:blur(10px);-webkit-filter:blur(10px);z-index:+1}section.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1::after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background-color:rgba(0, 0, 0, 0.2);z-index:-1}.container.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{display:flex;padding:0 3%;position:relative;z-index:+2;width:100%;height:100%}.mobile .container.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{padding:0 2%}.border.svelte-1cr8ba1 i.svelte-1cr8ba1.svelte-1cr8ba1{font-size:2rem;display:inline-block;margin-right:10px}.mobile .border.svelte-1cr8ba1 i.svelte-1cr8ba1.svelte-1cr8ba1{font-size:1.5rem}.gi-primo-star.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{right:-1.3rem;font-size:1.3rem}.mobile .gi-primo-star.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{right:-1rem;font-size:1rem}.items-container.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{width:100%}.nav-item-list.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{display:flex;border-top:1px solid #d2c69c;border-bottom:1px solid #d2c69c;width:fit-content;background-image:linear-gradient(\n			to right,\n			rgba(0, 0, 0, 0),\n			rgba(0, 0, 0, 0.5),\n			rgba(0, 0, 0, 0.5),\n			rgba(0, 0, 0, 0.5),\n			rgba(0, 0, 0, 0)\n		)}.nav-link-item.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{color:#d2c69c;position:relative;padding:0 3px;transition:all 0.2s}.nav-link-item.active.svelte-1cr8ba1 .border.svelte-1cr8ba1.svelte-1cr8ba1,.nav-link-item.svelte-1cr8ba1:hover .border.svelte-1cr8ba1.svelte-1cr8ba1{color:#40475a}.mobile .nav-link-item.svelte-1cr8ba1 .border.svelte-1cr8ba1.svelte-1cr8ba1{font-size:0.8rem;padding:3px 12px}.nav-link-item.svelte-1cr8ba1 .border.svelte-1cr8ba1.svelte-1cr8ba1{padding:5px 20px;border:2px solid transparent;position:relative;z-index:+1;border-radius:6px;transition:all 0.2s}.nav-link-item.active.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1::after,.nav-link-item.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1:hover::after{background-color:#ede5d8;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);content:'';display:block;width:100%;height:120%;border-radius:6px;transition:all 0.2s}.nav-link-item.active.svelte-1cr8ba1 .border.svelte-1cr8ba1.svelte-1cr8ba1{border:2px solid #c1b198}.nav-link-item.svelte-1cr8ba1 .border i.svelte-1cr8ba1.svelte-1cr8ba1{display:none}.nav-link-item.active.svelte-1cr8ba1 .border i.svelte-1cr8ba1.svelte-1cr8ba1{position:absolute;display:unset;top:50%;transform:translateY(-50%);font-size:0.7rem;color:#c1b198}.nav-link-item.active.svelte-1cr8ba1 .border i.left.svelte-1cr8ba1.svelte-1cr8ba1{left:0.1em;right:unset}.nav-link-item.active.svelte-1cr8ba1 .border i.right.svelte-1cr8ba1.svelte-1cr8ba1{right:0.1em;margin-right:0}.item-list.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{height:calc(100vh - 155px);margin:15px 0;overflow-y:auto}.mobile .item-list.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{height:calc(100vh - 90px);margin:5px 0 0;padding:0}.mobile .item-list.genesis.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{height:calc(100vh - 60px)}.list-body.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{display:flex;flex-wrap:wrap}.column.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{width:10vh;height:10vh;min-width:190px;min-height:190px;margin:0.4rem;display:block}button.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{transition:all 0.2s;transform:scale(1)}button.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1:not(.nav-link-item):active{transform:scale(0.95)}.genesis.svelte-1cr8ba1 .column.svelte-1cr8ba1 img.svelte-1cr8ba1,.genesis.svelte-1cr8ba1 .column.svelte-1cr8ba1 button.svelte-1cr8ba1{width:100%;transition:all 0.2s}.genesis.svelte-1cr8ba1 .column.svelte-1cr8ba1 button:hover img.svelte-1cr8ba1,.paimon-bargains.svelte-1cr8ba1 button.svelte-1cr8ba1.svelte-1cr8ba1:hover{filter:drop-shadow(0 0 5px #d2c69c)}.paimon-bargains.svelte-1cr8ba1 .content.svelte-1cr8ba1.svelte-1cr8ba1{width:100%;height:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;border-radius:0.5rem;overflow:hidden;text-align:center;background-color:#596982}.paimon-bargains.svelte-1cr8ba1 .content picture.svelte-1cr8ba1.svelte-1cr8ba1{height:100%;width:100%;display:flex;justify-content:center;margin-top:-10%;align-items:center;position:relative;background-image:url('/assets/images/utility/5star-bg.webp');background-size:cover;border-bottom-right-radius:1.4rem;overflow:hidden}.content.svelte-1cr8ba1 picture span.svelte-1cr8ba1.svelte-1cr8ba1{position:absolute;bottom:0;left:0;width:100%;color:#fff;transform:scale(0.9);-webkit-text-stroke:0.2px black;text-transform:capitalize}.paimon-bargains.svelte-1cr8ba1 .content .price.svelte-1cr8ba1.svelte-1cr8ba1{width:100%;height:20%;color:#fff;-webkit-text-stroke:0.02rem black;display:flex;align-items:center;justify-content:center}.toast.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);display:inline-block;padding:0.5rem 1rem;border-radius:0.5rem;background-color:rgba(173, 128, 65, 0.8);color:#fff;font-size:0.75rem}.popup-donate.svelte-1cr8ba1 .pop-item.svelte-1cr8ba1.svelte-1cr8ba1{display:flex;align-items:center;width:100%;margin:1rem 0}.popup-donate.svelte-1cr8ba1 .icon.svelte-1cr8ba1.svelte-1cr8ba1,.popup-donate.svelte-1cr8ba1 .copy.svelte-1cr8ba1.svelte-1cr8ba1{display:flex;height:100%;justify-content:center;align-items:center;margin:0.2rem}.popup-donate.svelte-1cr8ba1 img.svelte-1cr8ba1.svelte-1cr8ba1{height:3rem;margin:0}.address.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{padding:0 0 0 1rem;display:flex;flex-direction:column;text-align:left;width:100%}.address.svelte-1cr8ba1 span.svelte-1cr8ba1.svelte-1cr8ba1{font-size:0.8rem}.popup-donate.svelte-1cr8ba1 button.svelte-1cr8ba1.svelte-1cr8ba1{background-color:#383b40;color:#fff;transition:all 0.2s;border-radius:100%;width:3rem;height:3rem;display:flex;justify-content:center;align-items:center;font-size:1rem}.popup-donate.svelte-1cr8ba1 button.svelte-1cr8ba1.svelte-1cr8ba1:hover{background-color:#ccc;color:#000}.donate.svelte-1cr8ba1 .content.svelte-1cr8ba1.svelte-1cr8ba1{background-color:rgba(255, 255, 255, 0.8);height:100%;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:1rem;padding:1rem;text-align:center}.donate.svelte-1cr8ba1 .column.svelte-1cr8ba1.svelte-1cr8ba1,.paimon-bargains.svelte-1cr8ba1 .column.svelte-1cr8ba1.svelte-1cr8ba1{padding:0.4rem}.donate-icon.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{display:flex;flex-wrap:wrap;justify-content:center;align-items:center}.donate.svelte-1cr8ba1 img.svelte-1cr8ba1.svelte-1cr8ba1{height:1.5rem;margin:0.2rem 0.5rem}.donate.svelte-1cr8ba1 span.svelte-1cr8ba1.svelte-1cr8ba1{padding:0.5rem}@media screen and (max-width: 890px){.column.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{min-width:150px;min-height:150px}.mobile .column.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{min-width:130px;min-height:130px}}@media screen and (max-width: 400px){.list-body.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{justify-content:space-between}.column.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{min-width:100px;min-height:100px}.nav-link-item.svelte-1cr8ba1.svelte-1cr8ba1.svelte-1cr8ba1{font-size:0.8rem}}",
  map: null
};
const MainShop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $viewportWidth, $$unsubscribe_viewportWidth;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => $viewportWidth = value);
  const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let bg;
  let activeShop = "genesis";
  let activeFateShop = "starglitter";
  let showNavbar = true;
  let showNavbarButton = false;
  let columnWidth = "";
  let showExchangePopup = false;
  let itemToBuy;
  let showCryptoPopup = false;
  const genesisList = [
    { qty: 60, price: 0.99 },
    { qty: 300, price: 4.99 },
    { qty: 980, price: 14.99 },
    { qty: 1980, price: 29.99 },
    { qty: 3280, price: 49.99 },
    { qty: 6480, price: 99.99 }
  ];
  $$result.css.add(css$1);
  {
    if (!$mobileMode) {
      if ($viewportWidth < 745) {
        showNavbar = false;
        showNavbarButton = true;
      } else {
        showNavbar = true;
        showNavbarButton = false;
      }
    } else {
      showNavbar = true;
      showNavbarButton = false;
    }
  }
  {
    if ($viewportWidth < 400) {
      columnWidth = `width: ${44 / 100 * $viewportWidth}px; height:${44 / 100 * $viewportWidth}px`;
    }
  }
  {
    if ($mobileMode) {
      columnWidth = `width: ${37 / 100 * $viewportHeight - 0.1}px; height:${37 / 100 * $viewportHeight}px`;
    }
  }
  $$unsubscribe_viewportHeight();
  $$unsubscribe_mobileMode();
  $$unsubscribe_viewportWidth();
  return `${$$result.head += `${`${$$result.title = `<title>Buy Genesis Crystal | ${escape(APP_TITLE)}</title>`, ""}`}`, ""}


${``}



${``}



${validate_component(ExchangePopup, "ExchangePopup").$$render($$result, {
    show: showExchangePopup,
    fundType: activeFateShop,
    itemToBuy
  }, {}, {})}



${validate_component(PopUp, "PopUp").$$render($$result, {
    button: "confirm",
    show: showCryptoPopup,
    title: "Support With Crypto"
  }, {}, {
    default: () => {
      return `<div class="${"popup-donate svelte-1cr8ba1"}"><div class="${"pop-item svelte-1cr8ba1"}"><div class="${"icon svelte-1cr8ba1"}"><img src="${"/assets/images/utility/donate-ethereum.png"}" alt="${"Ethereum"}" class="${"svelte-1cr8ba1"}"></div>
			<div class="${"address svelte-1cr8ba1"}"><span class="${"svelte-1cr8ba1"}">Ethereum ( erc20 ) </span>
				<input type="${"text"}" value="${"0x4320025BAD621c03b906A84c531B10480A465184"}" disabled></div>
			<div class="${"copy svelte-1cr8ba1"}"><button class="${"svelte-1cr8ba1"}"><i class="${"gi-copy"}"></i></button></div></div>

		<div class="${"pop-item svelte-1cr8ba1"}"><div class="${"icon svelte-1cr8ba1"}"><img src="${"/assets/images/utility/donate-bnb.png"}" alt="${"Binance Coin"}" class="${"svelte-1cr8ba1"}"></div>
			<div class="${"address svelte-1cr8ba1"}"><span class="${"svelte-1cr8ba1"}">Binance Coin ( bep20 )</span>
				<input type="${"text"}" value="${"0x4320025BAD621c03b906A84c531B10480A465184"}" disabled></div>
			<div class="${"copy svelte-1cr8ba1"}"><button class="${"svelte-1cr8ba1"}"><i class="${"gi-copy"}"></i></button></div></div>

		<div class="${"pop-item svelte-1cr8ba1"}"><div class="${"icon svelte-1cr8ba1"}"><img src="${"/assets/images/utility/donate-solana.png"}" alt="${"Solana"}" class="${"svelte-1cr8ba1"}"></div>
			<div class="${"address svelte-1cr8ba1"}"><span class="${"svelte-1cr8ba1"}">Solana </span>
				<input type="${"text"}" value="${"4nFhLoPqpx71xPqgN2zhvoWtmgogzoDkEBzNKqjnpm2a"}" disabled></div>
			<div class="${"copy svelte-1cr8ba1"}"><button class="${"svelte-1cr8ba1"}"><i class="${"gi-copy"}"></i></button></div></div>

		${``}</div>`;
    }
  })}

<section style="${"height: " + escape($viewportHeight) + "px"}" class="${"svelte-1cr8ba1"}"><img class="${"bg svelte-1cr8ba1"}" src="${"/assets/images/background/bg" + escape(random(1, 16)) + ".webp"}" alt="${"background"}"${add_attribute("this", bg, 0)}>
	<div class="${"container svelte-1cr8ba1"}">${validate_component(ShopNavbar, "ShopNavbar").$$render($$result, { show: showNavbar }, {}, {})}
		<div class="${"items-container svelte-1cr8ba1"}">${validate_component(ShopHeader, "ShopHeader").$$render($$result, { activeShop, showNavbar, showNavbarButton }, {}, {})}

			<div class="${"item-body"}">${`<div class="${"item-list genesis svelte-1cr8ba1"}"><div class="${"list-body svelte-1cr8ba1"}">${each(genesisList, ({ qty }, i) => {
    return `<div class="${"column svelte-1cr8ba1"}"${add_attribute("style", columnWidth, 0)}><button class="${"content svelte-1cr8ba1"}"><img src="${"/assets/images/utility/genesis-" + escape(qty) + ".webp"}" alt="${"genesis " + escape(qty)}" class="${"svelte-1cr8ba1"}"></button>
								</div>`;
  })}</div></div>

					`}</div></div></div>
</section>`;
});
var Loader_svelte_svelte_type_style_lang = "";
const css = {
  code: ".loader.svelte-1zf9sv.svelte-1zf9sv{display:flex;justify-content:center;align-items:center;font-size:32px;color:#666666;width:100%;height:100vh;position:fixed;top:0;left:0;background-color:#fff;z-index:9999}.content.svelte-1zf9sv.svelte-1zf9sv{display:block;text-align:center}.text.svelte-1zf9sv.svelte-1zf9sv{font-size:1rem;height:1.5rem;position:absolute;left:50%;transform:translateX(-50%);font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}.text.connecting.svelte-1zf9sv.svelte-1zf9sv::after{content:'..';display:inline-block;animation:svelte-1zf9sv-dot 4s linear infinite}.progress.svelte-1zf9sv.svelte-1zf9sv{width:max-content;position:relative}.blend.svelte-1zf9sv.svelte-1zf9sv{mix-blend-mode:lighten;position:absolute;top:0;left:0;width:100%;height:100%}.rotate.svelte-1zf9sv.svelte-1zf9sv{position:fixed;width:100%;left:50%;bottom:20%;transform:translateX(-50%);display:flex;justify-content:center;align-items:center;flex-direction:column;color:#000}.rotate.svelte-1zf9sv span.svelte-1zf9sv{font-size:0.8rem;margin-top:1rem}.rotate.svelte-1zf9sv i.svelte-1zf9sv{animation:svelte-1zf9sv-rotatePhone 1s infinite alternate;transform-origin:center;line-height:1rem}.unfilled.svelte-1zf9sv.svelte-1zf9sv,.filled.svelte-1zf9sv.svelte-1zf9sv{display:block;position:absolute;top:0;left:0;height:100%}.unfilled.svelte-1zf9sv.svelte-1zf9sv{width:100%;background-color:#f7f7f7}.filled.svelte-1zf9sv.svelte-1zf9sv{background-color:#666666}@keyframes svelte-1zf9sv-dot{0%{content:''}33%{content:'.'}66%{content:'..'}100%{content:'...'}}@keyframes svelte-1zf9sv-rotatePhone{0%{transform:rotate(0deg)}100%{transform:rotate(-90deg)}}",
  map: null
};
const end = 110;
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLoaded, $$unsubscribe_isLoaded;
  let $isMobile, $$unsubscribe_isMobile;
  let $mobileMode, $$unsubscribe_mobileMode;
  $$unsubscribe_isLoaded = subscribe(isLoaded, (value) => $isLoaded = value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  let current = -1;
  const show = (progress, loaded) => {
    if (progress < end)
      return true;
    if (!loaded)
      return true;
    return false;
  };
  $$result.css.add(css);
  $$unsubscribe_isLoaded();
  $$unsubscribe_isMobile();
  $$unsubscribe_mobileMode();
  return `${show(current, $isLoaded) ? `<div class="${"loader svelte-1zf9sv"}"><div class="${"content svelte-1zf9sv"}"><div class="${"progress svelte-1zf9sv"}"><div class="${"icon"}"><i class="${"gi-pyro"}"></i>
					<i class="${"gi-hydro"}"></i>
					<i class="${"gi-anemo"}"></i>
					<i class="${"gi-electro"}"></i>
					<i class="${"gi-dendro"}"></i>
					<i class="${"gi-cryo"}"></i>
					<i class="${"gi-geo"}"></i></div>
				<div class="${"blend svelte-1zf9sv"}"><div class="${"unfilled svelte-1zf9sv"}"></div>
					<div class="${"filled animate svelte-1zf9sv"}" style="${"width:" + escape(current) + "%"}"></div></div></div>

			${`<div class="${"text connecting svelte-1zf9sv"}">Connecting</div>`}

			${$isMobile && !$mobileMode ? `<div class="${"rotate svelte-1zf9sv"}"><i class="${"gi-rotate-phone svelte-1zf9sv"}"></i>
					<span class="${"svelte-1zf9sv"}">Rotate for better experience </span></div>` : ``}</div></div>` : ``}`;
});
function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case "../lib/data/banners/standard/1.json":
      return import("../../chunks/1-f8d41ce4.js");
    case "../lib/data/banners/standard/2.json":
      return import("../../chunks/2-ba4673b6.js");
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case "../lib/data/banners/events/1.0.json":
      return import("../../chunks/1.0-b51db3df.js");
    case "../lib/data/banners/events/1.1.json":
      return import("../../chunks/1.1-e0f76d83.js");
    case "../lib/data/banners/events/1.2.json":
      return import("../../chunks/1.2-ce4d433d.js");
    case "../lib/data/banners/events/1.3.json":
      return import("../../chunks/1.3-2c2ef70c.js");
    case "../lib/data/banners/events/1.4.json":
      return import("../../chunks/1.4-bc55da34.js");
    case "../lib/data/banners/events/1.5.json":
      return import("../../chunks/1.5-f8e908c0.js");
    case "../lib/data/banners/events/1.6.json":
      return import("../../chunks/1.6-a02d993e.js");
    case "../lib/data/banners/events/2.0.json":
      return import("../../chunks/2.0-134166ed.js");
    case "../lib/data/banners/events/2.1.json":
      return import("../../chunks/2.1-8e52de73.js");
    case "../lib/data/banners/events/2.2.json":
      return import("../../chunks/2.2-213c80da.js");
    case "../lib/data/banners/events/2.3.json":
      return import("../../chunks/2.3-02e1baf0.js");
    case "../lib/data/banners/events/2.4.json":
      return import("../../chunks/2.4-d0708b1f.js");
    case "../lib/data/banners/events/2.5.json":
      return import("../../chunks/2.5-3a0e6b59.js");
    case "../lib/data/banners/events/2.6.json":
      return import("../../chunks/2.6-f5124a1b.js");
    case "../lib/data/banners/events/2.7.json":
      return import("../../chunks/2.7-ea0c4dbf.js");
    default:
      return new Promise(function(resolve, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
      });
  }
}
const prerender = true;
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let audioActive;
  let $pageActive, $$unsubscribe_pageActive;
  let $showBeginner, $$unsubscribe_showBeginner;
  let $bannerPhase, $$unsubscribe_bannerPhase;
  let $patchVersion, $$unsubscribe_patchVersion;
  let $bannerList, $$unsubscribe_bannerList;
  let $muted, $$unsubscribe_muted;
  let $backsound, $$unsubscribe_backsound;
  $$unsubscribe_pageActive = subscribe(pageActive, (value) => $pageActive = value);
  $$unsubscribe_showBeginner = subscribe(showBeginner, (value) => $showBeginner = value);
  $$unsubscribe_bannerPhase = subscribe(bannerPhase, (value) => $bannerPhase = value);
  $$unsubscribe_patchVersion = subscribe(patchVersion, (value) => $patchVersion = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_muted = subscribe(muted, (value) => $muted = value);
  $$unsubscribe_backsound = subscribe(backsound, (value) => $backsound = value);
  const beginnerBanner = beginner;
  let eventBanner;
  let weaponBanner;
  let standardBanner;
  let list = [];
  const showBeginnerCheck = (showBeginner2) => {
    if ($bannerList.length < 2)
      return;
    if (!showBeginner2) {
      return bannerList.update((bn) => {
        return bn.filter(({ type }) => type !== "beginner");
      });
    }
    return bannerList.update((bn) => {
      bn.unshift({
        type: "beginner",
        character: beginnerBanner
      });
      return bn;
    });
  };
  const updateBannerListToShow = (showBeginner2) => {
    list = showBeginner2 ? [
      {
        type: "beginner",
        character: beginnerBanner
      }
    ] : [];
    if (Array.isArray(eventBanner)) {
      eventBanner.forEach((bn) => list.push({ type: "events", character: bn }));
    } else
      list.push({ type: "events", character: eventBanner });
    list.push({ type: "weapons", weapons: weaponBanner });
    list.push({
      type: "standard",
      character: standardBanner
    });
    bannerList.set(list);
    isFatepointSystem.set(!!weaponBanner.fatepointsystem);
    pageActive.set("index");
    return isLoaded.set(true);
  };
  const switchBanner = async (patch, bannerPhase2) => {
    try {
      if (!patch)
        return;
      const { data: data2 } = await __variableDynamicImportRuntime0__(`../lib/data/banners/events/${patch}.json`);
      const { banners } = data2.find(({ phase }) => phase === bannerPhase2);
      const { events, weapons: weapons2, standardVersion } = banners;
      const { standard } = await __variableDynamicImportRuntime1__(`../lib/data/banners/standard/${standardVersion}.json`);
      eventBanner = events.item;
      weaponBanner = weapons2;
      standardBanner = standard.featured;
      return updateBannerListToShow($showBeginner);
    } catch (e) {
      console.error(`Can't Switch banner because it unavailable !`, e);
    }
  };
  audioActive = $backsound && $pageActive === "index" && !$muted;
  {
    if (audioActive)
      playSfx("wishBacksound");
  }
  {
    switchBanner($patchVersion, $bannerPhase);
  }
  {
    showBeginnerCheck($showBeginner);
  }
  $$unsubscribe_pageActive();
  $$unsubscribe_showBeginner();
  $$unsubscribe_bannerPhase();
  $$unsubscribe_patchVersion();
  $$unsubscribe_bannerList();
  $$unsubscribe_muted();
  $$unsubscribe_backsound();
  return `${$$result.head += `<meta name="${"title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-1h1jpr"><meta property="${"og:title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-1h1jpr"><meta property="${"twitter:title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-1h1jpr"><meta property="${"og:image"}" content="${escape(HOST) + "/screenshot/meta-picture.jpg"}" data-svelte="svelte-1h1jpr"><meta name="${"twitter:image:src"}" content="${escape(HOST) + "/screenshot/meta-picture.jpg"}" data-svelte="svelte-1h1jpr"><meta property="${"twitter:image"}" content="${escape(HOST) + "/assets/images/meta-picture.jpg"}" data-svelte="svelte-1h1jpr"><link rel="${"fluid-icon"}" href="${escape(HOST) + "/screenshot/meta-picture.jpg"}"${add_attribute("title", APP_TITLE, 0)} data-svelte="svelte-1h1jpr">`, ""}

${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}

${$pageActive === "index" ? `${validate_component(MainBanner, "MainBanner").$$render($$result, {}, {}, {})}` : ``}

${$pageActive === "previous-banner" ? `${validate_component(PreviousBannerList, "PreviousBannerList").$$render($$result, {}, {}, {})}` : ``}

${$pageActive === "details" ? `${validate_component(Details, "Details").$$render($$result, {}, {}, {})}` : ``}

${$pageActive === "history" ? `${validate_component(MainHistory, "History").$$render($$result, {}, {}, {})}` : ``}

${$pageActive === "inventory" ? `${validate_component(MainInventory, "Inventory").$$render($$result, {}, {}, {})}` : ``}

${$pageActive === "shop" ? `${validate_component(MainShop, "Shop").$$render($$result, {}, {}, {})}` : ``}`;
});
export { Routes as default, prerender };
