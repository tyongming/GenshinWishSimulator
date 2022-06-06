import { c as create_ssr_component, a as subscribe, d as escape, b as add_attribute } from "../../../chunks/index-437e72a6.js";
import { A as APP_TITLE, v as viewportHeight, w as viewportWidth } from "../../../chunks/env-0d653bb5.js";
import { g as getName } from "../../../chunks/nameText-77619b29.js";
var chars_svelte_svelte_type_style_lang = "";
const css = {
  code: ".error.svelte-13l2ppu.svelte-13l2ppu{width:100vw;height:100vh;display:flex;background-color:#fff;justify-content:center;align-items:center}.wish-result.svelte-13l2ppu.svelte-13l2ppu{width:100vw;height:100vh;background-color:#fff;background-image:url('/assets/images/background/splash-background.webp');background-size:cover}.container.svelte-13l2ppu.svelte-13l2ppu{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center}.splatter.svelte-13l2ppu.svelte-13l2ppu{display:flex;justify-content:center;align-items:center;position:relative}.splash-art.svelte-13l2ppu.svelte-13l2ppu{height:120%}.info.svelte-13l2ppu.svelte-13l2ppu,.starfate.svelte-13l2ppu.svelte-13l2ppu{position:fixed;top:60%;z-index:10;text-transform:capitalize;display:flex;align-items:center;width:1100px;max-width:95%}.info.svelte-13l2ppu.svelte-13l2ppu{left:50%;transform:translate(-50%, -50%)}.mobile .info.svelte-13l2ppu.svelte-13l2ppu{max-width:83%}.info.svelte-13l2ppu i.elemen.svelte-13l2ppu{font-size:5.2em;margin-right:-7px;margin-top:-5px;-webkit-background-clip:text;-webkit-text-fill-color:transparent;position:relative;z-index:-2}.name.svelte-13l2ppu.svelte-13l2ppu{position:relative;z-index:+2;width:100%}.name.svelte-13l2ppu .text.svelte-13l2ppu{max-width:38%;font-size:2.5em;line-height:1.2em;color:#fff;-webkit-text-stroke:0.015em #000}.gi-star.svelte-13l2ppu.svelte-13l2ppu{color:#f7cf33;font-size:1.525em;display:inline-block}.bonus.svelte-13l2ppu.svelte-13l2ppu{position:absolute;display:flex;bottom:-25vh;left:50%;transform:translateX(-50%)}.stella.svelte-13l2ppu.svelte-13l2ppu,.bonus.svelte-13l2ppu .masterless.svelte-13l2ppu{width:3.5rem;border-radius:10%;overflow:hidden;display:block;text-align:center;position:relative;margin-left:0.5rem;margin-right:0.5rem;padding-bottom:0.5rem;box-shadow:0 0 7px rgba(255, 255, 255, 0.5), 0 0 14px rgba(255, 255, 255, 0.3),\n			0 0 30px rgba(255, 255, 255, 0.2)}.stella.svelte-13l2ppu.svelte-13l2ppu::after,.bonus.svelte-13l2ppu .masterless span.svelte-13l2ppu{width:100%;font-size:0.6rem;content:'1';display:block;position:absolute;left:0;bottom:0;color:#fff;text-align:center;background-color:rgba(0, 0, 0, 0.5)}.stella.svelte-13l2ppu img.svelte-13l2ppu,.bonus.svelte-13l2ppu .masterless img.svelte-13l2ppu{width:80%;height:auto}.stella5.svelte-13l2ppu.svelte-13l2ppu,.bonus.svelte-13l2ppu .starglitter.svelte-13l2ppu{background-image:linear-gradient(to top, #ca8937, #a47853)}.stella4.svelte-13l2ppu.svelte-13l2ppu{background-image:linear-gradient(to top, #a47ab9, #7e78a9)}",
  map: null
};
const prerender = true;
const Chars = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let $$unsubscribe_viewportHeight;
  let $$unsubscribe_viewportWidth;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => value);
  let data = {
    rarity: 0,
    name: "No Name",
    stelaFortuna: false,
    fateType: "",
    fateQty: 0,
    vision: ""
  };
  $$result.css.add(css);
  title = getName(data.name);
  $$unsubscribe_viewportHeight();
  $$unsubscribe_viewportWidth();
  return `${$$result.head += `${$$result.title = `<title>${escape(title)} | ${escape(APP_TITLE)}</title>`, ""}<meta name="${"title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-rrwvzc"><meta property="${"og:title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-rrwvzc"><meta property="${"twitter:title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-rrwvzc">`, ""}

${`<div class="${"wish-result svelte-13l2ppu"}"><div class="${"container svelte-13l2ppu"}">${``}</div></div>`}`;
});
export { Chars as default, prerender };
