import { c as create_ssr_component, b as add_attribute, a as subscribe, v as validate_component, d as escape } from "./index-437e72a6.js";
import "html-to-image";
import "file-saver";
import { v as viewportHeight } from "./env-0d653bb5.js";
import "howler";
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "" } = $$props;
  let { width = "20px" } = $$props;
  let { height = "auto" } = $$props;
  let { style = "" } = $$props;
  const pic = {
    acquaint: "/assets/images/utility/acquaint-fate.webp",
    intertwined: "/assets/images/utility/intertwined-fate.webp",
    stardust: "/assets/images/utility/masterless-stardust.webp",
    starglitter: "/assets/images/utility/masterless-starglitter.webp",
    primogem: "/assets/images/utility/primogem.webp",
    genesis: "/assets/images/utility/genesis.webp"
  };
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `<img${add_attribute("src", pic[type], 0)}${add_attribute("alt", type, 0)}${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}${add_attribute("style", style, 0)}>`;
});
var ShareScreenshot_svelte_svelte_type_style_lang = "";
const css = {
  code: ".shr.svelte-5td1sr span.svelte-5td1sr{display:inline-flex;align-items:center;-webkit-text-stroke:0.02rem #000}button.svelte-5td1sr.svelte-5td1sr:not(.close){background-color:#d9d2c8;color:#000;border-radius:30px;font-size:0.8rem;padding:0.3rem 2rem;margin-left:10px;transition:all 0.2s}button.svelte-5td1sr.svelte-5td1sr:not(.close, .save):active{transform:scale(0.9)}button.svelte-5td1sr.svelte-5td1sr:active,button.svelte-5td1sr.svelte-5td1sr:hover{background-color:#fff}.screenshot.svelte-5td1sr.svelte-5td1sr{width:100vw;position:fixed;z-index:998;top:0;left:0;display:flex;justify-content:center;align-items:center;background-color:rgba(0, 0, 0, 0.45);backdrop-filter:blur(2px)}.screenshot.svelte-5td1sr.svelte-5td1sr::after{content:'';display:block;width:100%;height:100%;position:fixed;top:0;left:0;background-color:#fff;pointer-events:none;animation:svelte-5td1sr-flash forwards 1s}.screenshot.svelte-5td1sr picture.svelte-5td1sr{width:80%;max-height:80%;display:flex;justify-content:center;align-items:center;position:relative;animation:svelte-5td1sr-scale forwards 0.6s;box-shadow:0 0 3px rgba(255, 255, 255, 0.8)}.screenshot.svelte-5td1sr img.svelte-5td1sr{max-height:100%;max-width:100%}.screenshot.svelte-5td1sr button.svelte-5td1sr{padding:0;display:inline-flex;justify-content:center;align-items:center;line-height:0}.letshare.svelte-5td1sr button.svelte-5td1sr{color:rgba(0, 0, 0, 0.7);background-color:#fff;padding:0;border-radius:100%;font-size:1rem;z-index:10}.letshare.svelte-5td1sr button.svelte-5td1sr{aspect-ratio:1 / 1;width:2.2rem;display:inline-flex;justify-content:center;align-items:center;line-height:0;margin:0 0.2rem;font-size:1.3rem !important}.divider.svelte-5td1sr.svelte-5td1sr{background-color:#fff;height:1.7rem;width:0.1rem;display:inline-block;margin:0 0.6rem}.toast.svelte-5td1sr.svelte-5td1sr{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);display:inline-block;padding:0.5rem 1rem;border-radius:0.5rem;background-color:rgba(173, 128, 65, 0.8);color:#fff;font-size:0.75rem}.close.svelte-5td1sr.svelte-5td1sr{position:fixed;top:15px;right:3%}.mobile .close.svelte-5td1sr.svelte-5td1sr{top:0.3rem;right:2%}.mobile .letshare.svelte-5td1sr.svelte-5td1sr{transform:scale(0.8) translate(10%, -120%)}.letshare.svelte-5td1sr.svelte-5td1sr{position:absolute;top:0;right:0;width:100%;transform:translate(0, -120%);display:flex;align-items:center;justify-content:flex-end}.copy.svelte-5td1sr.svelte-5td1sr{display:inline-flex;align-items:center}.copy.svelte-5td1sr span.svelte-5td1sr{font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;display:inline-block;width:12rem;max-width:50vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.progress.svelte-5td1sr.svelte-5td1sr{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);background-color:var(--text-color);color:var(--tertiary-color);padding:2rem;border:1px solid var(--tertiary-color);border-radius:0.5rem}.progress.svelte-5td1sr .row.svelte-5td1sr{display:flex;align-items:center;justify-content:center}.loading.svelte-5td1sr.svelte-5td1sr{border:0.2rem solid #f3f3f3;border-top:0.2rem solid var(--text-color);border-radius:50%;width:2rem;height:2rem;margin-right:1rem;animation:svelte-5td1sr-spin 1s linear infinite}@keyframes svelte-5td1sr-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes svelte-5td1sr-flash{0%{opacity:1}100%{opacity:0}}@keyframes svelte-5td1sr-scale{0%{transform:scale(1.1)}100%{transform:scale(1)}}",
  map: null
};
const ShareScreenshot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_viewportHeight;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => value);
  let { encodedData = "" } = $$props;
  let { page = "" } = $$props;
  if ($$props.encodedData === void 0 && $$bindings.encodedData && encodedData !== void 0)
    $$bindings.encodedData(encodedData);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  $$result.css.add(css);
  $$unsubscribe_viewportHeight();
  return `

${``}

${``}

<div class="${"shr svelte-5td1sr"}">${page ? `<span class="${"svelte-5td1sr"}">Reward for first share : 16000
			${validate_component(Icon, "Icon").$$render($$result, {
    type: "primogem",
    width: "18px",
    style: "margin-left: .5rem"
  }, {}, {})}</span>` : ``}
	<button class="${"svelte-5td1sr"}">${escape(page ? "Share" : "Save")}</button>
</div>`;
});
const positionToStyle = (position) => {
  if (!position)
    return "";
  const cssProps = ["width", "height", "top", "bottom", "left", "right"];
  const keyToChange = ["w", "h", "t", "b", "l", "r"];
  const style = Object.keys(position).map((key) => {
    const index = keyToChange.findIndex((v) => v === key);
    const css2 = key.replace(key, cssProps[index]);
    return `${css2}:${position[key]}%`;
  });
  return style.join(";");
};
var WishListResult_svelte_svelte_type_style_lang = "";
export { Icon as I, ShareScreenshot as S, positionToStyle as p };
