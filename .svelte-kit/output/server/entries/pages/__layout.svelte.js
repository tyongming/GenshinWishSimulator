import { g as getContext, c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as each, d as escape } from "../../chunks/index-437e72a6.js";
import { s as showDisclaimer, i as isMobile, b as bannerActive, a as bannerList, m as mobileMode, v as viewportHeight, c as isAcquaintUsed, H as HOST, K as KEYWORDS, D as DESCRIPTION } from "../../chunks/env-0d653bb5.js";
import "overlayscrollbars";
import { P as PopUp, I as Iklan } from "../../chunks/Iklan-e7ec31fa.js";
import "howler";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const data = [
  {
    date: "01-Sep-2021",
    description: [
      "<strong> Raiden Shogun and Kujou Sara </strong> Banner was here !",
      "<strong> Engulfing Lightning </strong> Weapon Banner has been added"
    ]
  },
  {
    date: "10-Sep-2021",
    description: [
      "Now you can <strong>wishing on previous banner</strong> by clicking <strong>(x)</strong> button on the top right of the page",
      "Now you can <strong>create screenshot and link to share</strong> when wishing"
    ]
  },
  {
    date: "21-Sep-2021",
    description: [
      "<strong> Sagonomia Kokomi </strong> is ready to pull !",
      "<strong> Everlasting Moonglow </strong> Weapon Banner has been added"
    ]
  },
  {
    date: "30-Sep-2021",
    description: [
      "Add more previous banner, <strong> Eula, Zhongli, Tartaglia/Childe, Albedo, Ganyu, Xiao, Hu Tao, Venti </strong> is ready to pull ! <br/> Click <strong>(x)</strong> button on the top right of the page to change the banner"
    ]
  },
  {
    date: "13-Oct-2021",
    description: [
      "<strong> Tartaglia </strong> is ready to pull !",
      "<strong> Polar Star </strong> Weapon Banner has been added"
    ]
  },
  {
    date: "2-Nov-2021",
    description: [
      "<strong> Hu Tao </strong> Character Banner has been added !",
      "<strong> Thoma </strong> is ready to pull !",
      "<strong> Staff of Homma </strong> & <strong>Elegy for The End</strong> Weapon Banner has been added"
    ]
  },
  {
    date: "24-Nov-2021",
    description: [
      "<strong> Albedo </strong> Banner was here !",
      "<strong> Eula </strong> Banner also here !",
      "<strong> Freedom Sworn & Song of Broken Pines </strong> Weapon Banner has been added"
    ]
  },
  {
    date: "08-Des-2021",
    description: [
      "<strong>Fixing Bugs</strong> of History.",
      'if you find any error, follow this steps to reset browser cache specialy only for WIsh Simulator Site . Open Inpect ELement ( CTRL + Shift i ) -> Application -> Storage -> Click on "Clear Site Data" Button',
      "Ignore the steps above if this is the first time you visit this site or if you already do reset"
    ]
  },
  {
    date: "14-Des-2021",
    description: [
      "<strong> Arrataki Itto </strong> character Banner is ready to pull",
      "<strong> Redhorn Stonethresher </strong> Weapon Banner has been added !"
    ]
  },
  {
    date: "29-Des-2021",
    description: [
      "Implement Epitomized Path System to Weapon Banner for patch 2.0 and above"
    ]
  },
  {
    date: "05-Jan-2022",
    description: [
      "Now you can pull <strong> Shenhe </strong> and <strong>Yunjin</strong> the Best Waifu!",
      "<strong>Calamity Queller</strong> Weapon Banner was added"
    ]
  },
  {
    date: "25-Jan-2022",
    description: [
      "<strong>Gong Xi Fa Cai</strong>. Wish you luck on Lantern Rite event",
      "<strong> Zhongli and Ganyu Rerun Banner </strong> Already out here !",
      "<strong> Vortex and Amos </strong> Weapon Rerun Banner is ready to pull too !"
    ]
  },
  {
    date: "11-Feb-2022",
    description: [
      "Now you can pull without worry about running out of fate, just activate the <b>Unlimited Fates Option</b> in Menu by clicking the <b>(?)</b> button on top of the page"
    ]
  },
  {
    date: "16-Feb-2022",
    description: [
      "Event Banner Updated, Now you can pull <strong> Yae Miko </strong> here !",
      "Yae Miko signature Weapon, <strong>Kagura's Verity</strong> is ready to pull too !",
      "Inventory Updated, Now You can show all Characters and Weapons both you already got or not"
    ]
  },
  {
    date: "08-Mar-2022",
    description: [
      "<strong> Raiden Shogun Rerun </strong> Banner was here !",
      "<strong> Sagonomia Kokomi </strong> is ready to pull too!",
      "Weapon Banner Updated, <b> Engulfing Lightning </b> and <b>Everlasting Moonglow</b> already added"
    ]
  },
  {
    date: "23-Mar-2022",
    featured: true,
    description: [
      "<strong>Due to high number of visitors</strong>, Our monthly bandwidth also increased. We need to upgrade the hosting plan to keep this app alive. So <strong>We'll show some ad on </strong> this app. <br/> We're sorry to you, actually we don't want to ruin your wishing experience. If you feel annoyed with ad, feel free to use Ad blocker, we will not forbit you"
    ]
  },
  {
    date: "28-Mar-2022",
    description: [
      "<strong> Kamisato Ayato </strong> Banner was here !",
      "<strong> Venti </strong> is ready to pull too!",
      "Weapon Banner Updated, <b> Haran Geppaku Futsu </b> and <b>Elegy for the End</b> already added"
    ]
  },
  {
    date: "17-Apr-2022",
    featured: true,
    description: [
      "<strong> Kamisato Ayaka Rerun </strong> Banner already out !",
      "Weapon Banner Updated, <b> Mistsplitter Reforged </b> and <b>The Unforged</b> was here too!"
    ]
  },
  {
    date: "20-Apr-2022",
    description: [
      "We recently had to <strong>migrate our server </strong> for other reasons, so the old wishing histories isn't being tracked on the new server, We apologize for the inconvenience. We hope it doesn't happen again in the future, so you can enjoy the simulator peacefully"
    ]
  },
  {
    date: "29-May-2022",
    featured: true,
    description: [
      "<strong> Yelan </strong> Banner already out !",
      "<strong> Xiao 3rd Rerun </strong> Banner was here !",
      "Weapon Banner Updated, <b> Aqua Simulacra </b> and <b>Primordial Jade Winged Spear</b> are ready to pull !"
    ]
  }
];
var Disclaimer_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-1ftsz7p.svelte-1ftsz7p{width:100%;padding:0 1.5rem 1rem}.credit.svelte-1ftsz7p.svelte-1ftsz7p{font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:0.9rem}.updates.svelte-1ftsz7p.svelte-1ftsz7p{text-align:left;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;background-color:#fff;font-size:0.97rem;height:8rem;padding:0 1rem;display:block;overflow:hidden}.updates.svelte-1ftsz7p span.svelte-1ftsz7p{font-weight:bold;color:#f7cf33;display:block;padding-top:0.5rem}.updates.svelte-1ftsz7p .tgl.svelte-1ftsz7p{color:#bd6932}.updates.svelte-1ftsz7p p.svelte-1ftsz7p{padding-left:1rem;position:relative;line-height:1rem;margin:0.5rem 0}.updates.svelte-1ftsz7p p.svelte-1ftsz7p::before{content:'*';display:inline-block;width:10px;line-height:0;font-size:1.3rem;padding-top:0.5rem;position:absolute;left:0;top:50%;transform:translateY(-50%)}.sp.svelte-1ftsz7p.svelte-1ftsz7p{font-size:0.97rem;padding:0.5rem 0 1rem}a.svelte-1ftsz7p.svelte-1ftsz7p:active{transform:scale(0.9);background-color:#fff;color:#000}",
  map: null
};
const Disclaimer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $showDisclaimer, $$unsubscribe_showDisclaimer;
  $$unsubscribe_showDisclaimer = subscribe(showDisclaimer, (value) => $showDisclaimer = value);
  let content;
  const updates = data.filter(({ featured }) => !!featured);
  $$result.css.add(css$1);
  $$unsubscribe_showDisclaimer();
  return `${validate_component(PopUp, "PopUp").$$render($$result, {
    show: $showDisclaimer,
    title: "Genshin Impact Wish Simulator",
    button: "confirm"
  }, {}, {
    default: () => {
      return `<section class="${"svelte-1ftsz7p"}"><p class="${"sp svelte-1ftsz7p"}">This is purely a fan made Application, enjoy it !</p>
		<div class="${"updates svelte-1ftsz7p"}"${add_attribute("this", content, 0)}>${each(updates.reverse(), ({ description, date }, i) => {
        return `<span class="${"svelte-1ftsz7p"}"><i class="${"tgl svelte-1ftsz7p"}">${escape(date)}</i>
					${i === 0 ? `( Latest Update )` : ``}</span>
				${each(description, (txt) => {
          return `<p class="${"svelte-1ftsz7p"}"><!-- HTML_TAG_START -->${txt}<!-- HTML_TAG_END --></p>`;
        })}`;
      })}
			<div style="${"height: .5rem"}"></div></div>
		
		<p class="${"credit svelte-1ftsz7p"}">All assets used in this site are owned by Mihoyo.</p>
		<div class="${"credit svelte-1ftsz7p"}" style="${"display:flex;justify-content:center;margin-top: 5px;margin-bottom: -8px;"}">Credit to\xA0<div class="${"credit svelte-1ftsz7p"}" style="${"text-decoration:underline;"}">AguzzTN54</div></div> <p><a href="${"https://github.com/AguzzTN54/Genshin-Impact-Wish-Simulator"}" target="${"_blank"}" style="${"color:purple;font-size: 12px;"}" class="${"svelte-1ftsz7p"}">Github</a></p></section>`;
    }
  })}`;
});
var app = "";
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import '../../node_modules/overlayscrollbars/css/OverlayScrollbars.css';.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle{background-color:#d2c69c;opacity:0.7}.os-theme-light > .os-scrollbar-vertical{width:8px}.os-theme-light > .os-scrollbar-horizontal{height:8px}main.svelte-1537kly.svelte-1537kly{display:block;width:100%;overflow:hidden}audio{visibility:hidden}.uid.svelte-1537kly.svelte-1537kly{display:block;position:fixed;bottom:0px;right:5px;z-index:998;color:#fff;text-shadow:0 0 1.5px rgba(0, 0, 0, 0.7);font-family:Roboto, sans-serif;pointer-events:none}.preview.svelte-1537kly .uid.svelte-1537kly{pointer-events:unset;right:unset;left:1rem;bottom:1rem}.logo.svelte-1537kly.svelte-1537kly{display:none}.preview.svelte-1537kly .logo.svelte-1537kly{display:block;width:30vh;max-width:30%;position:fixed;bottom:0px;right:5px}",
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let preview;
  let $$unsubscribe_isMobile;
  let $bannerActive, $$unsubscribe_bannerActive;
  let $bannerList, $$unsubscribe_bannerList;
  let $page, $$unsubscribe_page;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => value);
  $$unsubscribe_bannerActive = subscribe(bannerActive, (value) => $bannerActive = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$result.css.add(css);
  preview = $page.url.pathname.split("/")[1] === "screen";
  {
    if ($bannerList.length > 0) {
      const { type } = $bannerList[$bannerActive];
      isAcquaintUsed.set(type === "standard" || type === "beginner");
    }
  }
  $$unsubscribe_isMobile();
  $$unsubscribe_bannerActive();
  $$unsubscribe_bannerList();
  $$unsubscribe_page();
  $$unsubscribe_mobileMode();
  $$unsubscribe_viewportHeight();
  return `


${$$result.head += `<meta property="${"twitter:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-15qc3g3"><meta name="${"keywords"}"${add_attribute("content", KEYWORDS, 0)} data-svelte="svelte-15qc3g3"><meta name="${"description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-15qc3g3"><meta property="${"og:description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-15qc3g3"><meta property="${"og:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-15qc3g3"><meta property="${"twitter:description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-15qc3g3"><meta property="${"al:web:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-15qc3g3">${validate_component(Iklan, "Ads").$$render($$result, { head: true }, {}, {})}`, ""}

${!preview ? `${validate_component(Disclaimer, "Disclaimer").$$render($$result, {}, {}, {})}` : ``}

<main style="${"height: " + escape($viewportHeight ? `${$viewportHeight}px` : "100vh")}" class="${[
    "svelte-1537kly",
    ($mobileMode ? "mobile" : "") + " " + (preview ? "preview" : "")
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}
	<a href="${"/"}" class="${"uid svelte-1537kly"}" title="${"Try Your Luck by this Simulator"}"></a>

	<img src="${"/assets/images/utility/genshin-logo.webp"}" alt="${"genshin logo"}" class="${"logo svelte-1537kly"}">
</main>`;
});
export { _layout as default };
