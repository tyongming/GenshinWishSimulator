import { n as noop, f as safe_not_equal } from "./index-437e72a6.js";
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
const beginner = {
  name: "beginner",
  character: "noelle",
  vision: "geo",
  buttonBoxPosition: {
    w: 100,
    t: 30
  }
};
const wishPhase = 1;
const allPatch = [
  1,
  1.1,
  1.2,
  1.3,
  1.4,
  1.5,
  1.6,
  2,
  2.1,
  2.2,
  2.3,
  2.4,
  2.5,
  2.6,
  2.7
];
const pageActive = writable("index");
const backsound = writable(false);
const muted = writable(false);
const isLoaded = writable(false);
const showDisclaimer = writable(true);
const patchVersion = writable(0);
const bannerPhase = writable(wishPhase);
const bannerActive = writable(0);
const showBeginner = writable(true);
const isFatepointSystem = writable(false);
const fatePoint = writable(0);
const showFatepointPopup = writable(false);
const selectedCourse = writable({});
const isAcquaintUsed = writable(true);
const viewportWidth = writable(0);
const viewportHeight = writable(0);
const isMobile = writable(false);
const mobileMode = writable(false);
const bannerList = writable([{ type: "beginner", character: beginner }]);
const genesis = writable(0);
const stardust = writable(0);
const starglitter = writable(0);
const primogem = writable(1600);
const intertwined = writable(0);
const acquaint = writable(0);
const unlimitedFates = writable(false);
const query = writable("");
const HOST = "http://domain.com";
const APP_TITLE = "Genshin Impact Wish Simulator";
const DESCRIPTION = "This is Description";
const KEYWORDS = "This is Keywords";
export { APP_TITLE as A, isLoaded as B, pageActive as C, DESCRIPTION as D, backsound as E, HOST as H, KEYWORDS as K, bannerList as a, bannerActive as b, isAcquaintUsed as c, showBeginner as d, selectedCourse as e, fatePoint as f, beginner as g, acquaint as h, isMobile as i, intertwined as j, genesis as k, stardust as l, mobileMode as m, starglitter as n, muted as o, primogem as p, patchVersion as q, bannerPhase as r, showDisclaimer as s, isFatepointSystem as t, unlimitedFates as u, viewportHeight as v, viewportWidth as w, showFatepointPopup as x, query as y, allPatch as z };
