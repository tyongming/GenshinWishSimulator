import { c as create_ssr_component, h as createEventDispatcher, b as add_attribute, e as each, v as validate_component, d as escape } from "../../../chunks/index-437e72a6.js";
import { A as APP_TITLE } from "../../../chunks/env-0d653bb5.js";
import "overlayscrollbars";
import "howler";
import { S as ShareScreenshot, p as positionToStyle, I as Icon } from "../../../chunks/WishListResult.svelte_svelte_type_style_lang-554a645a.js";
import "html-to-image";
import "file-saver";
const css$1 = {
  code: ".scroll.svelte-fb3c0c.svelte-fb3c0c{width:100%;height:100%;display:block}.container.svelte-fb3c0c.svelte-fb3c0c{width:100% !important;height:100%;display:flex;justify-content:center;align-items:center}.container.animate.svelte-fb3c0c.svelte-fb3c0c::after{content:'';display:block;width:100%;height:100%;position:fixed;top:0;left:0;background-color:#fff;opacity:1;animation:svelte-fb3c0c-reveal forwards 1s 1;pointer-events:none}.close.svelte-fb3c0c.svelte-fb3c0c{position:fixed;top:15px;right:3%;z-index:10;opacity:0;animation:svelte-fb3c0c-fadeIn forwards 1s 1}.mobile .close.svelte-fb3c0c.svelte-fb3c0c{top:0.3rem;right:2%}.wishlist.svelte-fb3c0c.svelte-fb3c0c,.shadows.svelte-fb3c0c.svelte-fb3c0c{display:block;height:55vh;max-height:430px;min-height:300px;width:100%;padding:0 20px;white-space:nowrap;text-align:center}.mobile .wishlist.svelte-fb3c0c.svelte-fb3c0c,.mobile .shadows.svelte-fb3c0c.svelte-fb3c0c{min-height:70vh}.mobile .wishlist.svelte-fb3c0c.svelte-fb3c0c,.mobile .shadows.svelte-fb3c0c.svelte-fb3c0c{max-height:72.5vh}.item.svelte-fb3c0c.svelte-fb3c0c,.shadow.svelte-fb3c0c.svelte-fb3c0c{height:100%;aspect-ratio:1/4.5;border-radius:100%;filter:drop-shadow(0px 0px 6px rgb(101, 187, 246));position:relative}.item.svelte-fb3c0c.svelte-fb3c0c{transition:all 0.2s;will-change:transform}.item.svelte-fb3c0c.svelte-fb3c0c:hover,.item.hover.svelte-fb3c0c.svelte-fb3c0c{transform:scale(1.04)}.item.svelte-fb3c0c:hover .cover.svelte-fb3c0c,.item.hover.svelte-fb3c0c .cover.svelte-fb3c0c{background-color:rgba(0, 0, 0, 0)}.shadow5.svelte-fb3c0c.svelte-fb3c0c,.shadow4.svelte-fb3c0c.svelte-fb3c0c,.item.star4.svelte-fb3c0c.svelte-fb3c0c,.item.star5.svelte-fb3c0c.svelte-fb3c0c{filter:unset}.item-box.svelte-fb3c0c.svelte-fb3c0c{height:100%;display:inline-block}.shadows.svelte-fb3c0c.svelte-fb3c0c{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:-1}.item-box.animate.svelte-fb3c0c.svelte-fb3c0c,.shadow.animate.svelte-fb3c0c.svelte-fb3c0c{opacity:0;animation:svelte-fb3c0c-wishReveal forwards 0.4s 1;pointer-events:none}.shadow.svelte-fb3c0c.svelte-fb3c0c{display:inline-block;height:100%;border-radius:100%}.shadow.svelte-fb3c0c span.svelte-fb3c0c{position:absolute;left:50%;bottom:-5%;color:#fff;transform:translateX(-50%);font-size:small;-webkit-text-stroke:0.3px #000}.mobile .shadow.svelte-fb3c0c span.svelte-fb3c0c{font-size:0.6rem}.shadow.shadow5.svelte-fb3c0c.svelte-fb3c0c{box-shadow:0 0 4rem rgba(255, 255, 255, 0.5), 0 0 1rem rgb(249, 170, 2),\n			0 0 1.4rem rgb(249, 170, 2), 0 0 2rem rgb(249, 121, 2);background-color:rgb(249, 170, 2);filter:unset}.star5.svelte-fb3c0c .item-body.svelte-fb3c0c{background-image:linear-gradient(\n			to bottom,\n			rgb(249, 170, 2),\n			rgb(255, 255, 255),\n			rgb(249, 170, 2)\n		)}.shadow.shadow4.svelte-fb3c0c.svelte-fb3c0c{box-shadow:0 0 4rem rgba(255, 255, 255, 0.6), 0 0 1rem rgb(138, 3, 161),\n			0 0 1.4rem rgb(217, 0, 255), 0 0 2rem rgb(29, 4, 255);background-color:rgb(185, 18, 214)}.star4.svelte-fb3c0c .item-body.svelte-fb3c0c{background-image:linear-gradient(\n			to bottom,\n			rgb(196, 77, 218),\n			rgb(255, 255, 255),\n			rgb(196, 77, 218)\n		)}.new.svelte-fb3c0c.svelte-fb3c0c{position:absolute;z-index:10;display:block;top:3%;left:80%;transform:translateX(-50%);padding:0 0.4rem;border-radius:4px 0 4px 0;color:#fffa66;background-color:#c3882a;border:1px solid #fffa66;font-size:0.7rem}.cover.svelte-fb3c0c.svelte-fb3c0c{display:block;position:absolute;left:0;top:0;height:100%;width:100%;transition:all 0.2s;background-color:rgba(0, 0, 0, 0.2)}.item-body.svelte-fb3c0c.svelte-fb3c0c{height:100%;clip-path:url(#wishframe);margin:0 0.5px;display:flex;justify-content:center;align-items:center;background-image:linear-gradient(to bottom, #aac8f1, #fff, #aac8f1)}.item-content.svelte-fb3c0c.svelte-fb3c0c{width:97%;height:99%;clip-path:url(#wishframe);background-image:linear-gradient(\n			to bottom,\n			rgb(82, 107, 129),\n			rgb(187, 197, 172),\n			rgb(82, 107, 129)\n		)}.pic.svelte-fb3c0c.svelte-fb3c0c{width:100%;height:100%;position:relative;overflow:hidden}.pic.svelte-fb3c0c.svelte-fb3c0c::after{content:'';display:block;position:absolute;bottom:0;left:0;width:100%;height:50%;background-image:linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))}.pic.svelte-fb3c0c img.wishpic.svelte-fb3c0c{position:absolute;top:75%;left:50%;transform:translate(-50%, -50%);height:180%}.weapon.svelte-fb3c0c .pic img.wishpic.svelte-fb3c0c{top:50%;height:100%;filter:drop-shadow(0.2rem 0.2rem 0.05rem rgb(0, 0, 0))}.pic.svelte-fb3c0c>.wishpic.catalyst-item.svelte-fb3c0c{height:35% !important}.stella.svelte-fb3c0c.svelte-fb3c0c{margin-top:10%}.stella.svelte-fb3c0c.svelte-fb3c0c,.masterless.svelte-fb3c0c.svelte-fb3c0c{width:70%;border-radius:10%;overflow:hidden;display:block;position:relative;margin-left:auto;margin-right:auto;box-shadow:0 0 7px rgba(255, 255, 255, 0.7), 0 0 14px rgba(255, 255, 255, 0.5),\n			0 0 21px rgba(255, 255, 255, 0.2), 0 0 42px rgba(255, 255, 255, 1)}.stella.svelte-fb3c0c.svelte-fb3c0c::after,.masterless.svelte-fb3c0c span.svelte-fb3c0c{width:100%;font-size:0.6rem;content:'1';display:block;position:absolute;left:0;bottom:0;color:#fff;text-align:center;background-color:rgba(0, 0, 0, 0.5)}.stella.svelte-fb3c0c img.svelte-fb3c0c,.masterless.svelte-fb3c0c img.svelte-fb3c0c{width:80%;height:auto}.stella5.svelte-fb3c0c.svelte-fb3c0c,.starglitter.svelte-fb3c0c.svelte-fb3c0c{background-image:linear-gradient(to top, #ca8937, #a47853)}.stella4.svelte-fb3c0c.svelte-fb3c0c{background-image:linear-gradient(to top, #a47ab9, #7e78a9)}.info.svelte-fb3c0c.svelte-fb3c0c{position:absolute;bottom:10%;text-align:center;width:100%;z-index:10}.info.svelte-fb3c0c .gi-star.svelte-fb3c0c{color:#f7cf33;display:inline-block;font-size:0.8rem}.gi-primo-star.svelte-fb3c0c.svelte-fb3c0c{color:#fff;position:absolute;left:50%;transform:translateX(-50%)}.primo1.svelte-fb3c0c.svelte-fb3c0c{top:3%;font-size:0.5rem}.primo2.svelte-fb3c0c.svelte-fb3c0c{top:10%;font-size:1.3rem}.primo3.svelte-fb3c0c.svelte-fb3c0c{top:20%;font-size:0.5rem}.share.svelte-fb3c0c.svelte-fb3c0c{display:flex;width:100%;text-align:right;justify-content:flex-end;align-items:center;position:absolute;bottom:5%;right:8%;color:#fff;font-size:0.8rem}.share.svelte-fb3c0c span.svelte-fb3c0c{display:flex;align-items:center}@keyframes svelte-fb3c0c-wishReveal{0%{transform:translateX(150%)}100%{transform:translateX(0);opacity:1}}@keyframes svelte-fb3c0c-reveal{20%{opacity:1}99%{opacity:0}100%{opacity:0}}@keyframes svelte-fb3c0c-fadeIn{0%{opacity:0}100%{opacity:1}}",
  map: null
};
const WishListResult = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { preview = false } = $$props;
  let { previewlist = [] } = $$props;
  let { list = [] } = $$props;
  const sortByType = (a, b) => {
    if (a.type > b.type)
      return 1;
    if (b.type > a.type)
      return -1;
    return 0;
  };
  const sortByName = (a, b) => {
    if (a.name > b.name)
      return 1;
    if (a.name < b.name)
      return -1;
    return 0;
  };
  let sortedWish = [];
  const getList = (preview2, previewlist2) => {
    if (preview2) {
      sortedWish = previewlist2;
      return;
    }
    const item = (star) => list.filter(({ rarity }) => rarity === star).sort(sortByName).sort((a, b) => b.isNew - a.isNew).sort(sortByType);
    const threeStar = list.filter(({ rarity }) => rarity === 3);
    sortedWish = [...item(5), ...item(4), ...threeStar];
  };
  let container;
  let encoded;
  createEventDispatcher();
  if ($$props.preview === void 0 && $$bindings.preview && preview !== void 0)
    $$bindings.preview(preview);
  if ($$props.previewlist === void 0 && $$bindings.previewlist && previewlist !== void 0)
    $$bindings.previewlist(previewlist);
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  $$result.css.add(css$1);
  {
    getList(preview, previewlist);
  }
  return `<svg viewBox="${"0 0 302.22 1333.94"}" height="${"0"}" width="${"0"}" style="${"position: absolute;"}"><clipPath id="${"wishframe"}" transform="${"scale(0.003308 0.00074965)"}" clipPathUnits="${"objectBoundingBox"}"><path d="${"M0.01 168.12l0 -9.64c4.32,-21.34 12,-32.33 25.46,-25.58 -2.35,-10.3 -1.53,-26.06 5.79,-25.96 19.18,0.25 29.95,-3.14 40.24,-13.16 -4.5,-66.43 51.39,-54.26 79.61,-93.78l0 0c28.22,39.52 84.1,27.34 79.61,93.78 10.29,10.02 21.06,13.41 40.24,13.16 7.32,-0.1 8.13,15.66 5.79,25.96 13.46,-6.75 21.14,4.24 25.46,25.58l0 9.64 0.01 0 0 1004.21 -0.01 0 0 3.13c-4.32,21.34 -12,32.33 -25.46,25.58 2.35,10.3 1.53,26.06 -5.79,25.96 -19.18,-0.25 -29.95,3.14 -40.24,13.16 4.5,66.43 -51.39,54.26 -79.61,93.78l0 0c-28.22,-39.52 -84.1,-27.34 -79.61,-93.78 -10.29,-10.02 -21.06,-13.41 -40.24,-13.16 -7.32,0.1 -8.13,-15.66 -5.79,-25.96 -13.46,6.75 -21.14,-4.24 -25.46,-25.58l0 -3.13 -0.01 0 0 -1004.21 0.01 0z"}"></path></clipPath></svg>

${!preview ? `<button class="${"close svelte-fb3c0c"}"><i class="${"gi-close"}"></i></button>` : ``}

<div class="${"scroll svelte-fb3c0c"}"${add_attribute("this", container, 0)}><div class="${["container svelte-fb3c0c", !preview ? "animate" : ""].join(" ").trim()}"><div class="${"wishlist svelte-fb3c0c"}">${each(sortedWish, ({ name, rarity, weaponType, type, vision, wishBoxPosition, stelaFortuna, isNew, fateType, fateQty }, i) => {
    return `<div class="${["item-box svelte-fb3c0c", !preview ? "animate" : ""].join(" ").trim()}" style="${"animation-delay: " + escape(0.5 + i * 0.1) + "s"}"><div id="${"wish" + escape(i)}" class="${"item star" + escape(rarity) + " " + escape(type) + " svelte-fb3c0c"}">${isNew ? `<div class="${"new svelte-fb3c0c"}">new</div>` : ``}
						<div class="${"item-body svelte-fb3c0c"}"><div class="${"item-content svelte-fb3c0c"}"><i class="${"gi-primo-star primo1 svelte-fb3c0c"}"></i>
								<i class="${"gi-primo-star primo2 svelte-fb3c0c"}"></i>
								<i class="${"gi-primo-star primo3 svelte-fb3c0c"}"></i>
								<div class="${"pic svelte-fb3c0c"}">${type === "weapon" ? `<img src="${"/assets/images/weapons/" + escape(weaponType) + "/" + escape(rarity) + "star/" + escape(name) + ".webp"}"${add_attribute("alt", name, 0)} class="${"wishpic " + escape(weaponType) + "-item svelte-fb3c0c"}"${add_attribute("style", positionToStyle(wishBoxPosition), 0)}>` : `<img src="${"/assets/images/characters/splash-art/" + escape(rarity) + "star/" + escape(name) + ".webp"}"${add_attribute("alt", name, 0)} class="${"wishpic svelte-fb3c0c"}"${add_attribute("style", positionToStyle(wishBoxPosition), 0)}>`}

									<div class="${"info svelte-fb3c0c"}">${type === "weapon" ? `<img src="${"/assets/images/utility/" + escape(weaponType) + "-white.svg"}" alt="${escape(weaponType) + " icon"}" style="${"width: 60%; height: auto"}" class="${"svelte-fb3c0c"}">` : `${isNew ? `<img src="${"/assets/images/utility/icon-" + escape(vision) + ".svg"}" alt="${"Vision " + escape(vision)}" class="${"vision-" + escape(vision) + " svelte-fb3c0c"}" style="${"width: 60%; height: auto"}">` : ``}`}

										${isNew && type === "character" || type === "weapon" ? `<div class="${"star"}">${each(Array(rarity), (_, i2) => {
      return `<div class="${"i gi-star svelte-fb3c0c"}"></div>`;
    })}
											</div>` : ``}

										${type === "character" && fateType ? `<div class="${"masterless " + escape(fateType) + " svelte-fb3c0c"}">${validate_component(Icon, "Icon").$$render($$result, { type: fateType, width: "80%" }, {}, {})}
												<span class="${"svelte-fb3c0c"}">${escape(fateQty)}</span>
											</div>` : ``}

										${stelaFortuna ? `<div class="${"stella stella" + escape(rarity) + " svelte-fb3c0c"}"><img src="${"/assets/images/utility/stella-fortuna-" + escape(rarity) + "star.webp"}" alt="${"Stella Formula"}" class="${"svelte-fb3c0c"}">
											</div>` : ``}</div>

									${type === "character" && fateType ? `<div class="${"cover svelte-fb3c0c"}"></div>` : ``}
								</div></div>
						</div></div>
				</div>`;
  })}</div>
		<div class="${"shadows svelte-fb3c0c"}">${each(sortedWish, ({ rarity, type, fateType }, i) => {
    return `<div class="${[
      "shadow shadow" + escape(rarity) + " svelte-fb3c0c",
      !preview ? "animate" : ""
    ].join(" ").trim()}" style="${"animation-delay: " + escape(0.5 + i * 0.1) + "s"}">${fateType && type === "character" ? `<span class="${"svelte-fb3c0c"}">Convertion </span>` : ``}
				</div>`;
  })}</div></div></div>

${!preview ? `<div class="${"share svelte-fb3c0c"}">${validate_component(ShareScreenshot, "Share").$$render($$result, { encodedData: encoded, page: "wishlist" }, {}, {})}</div>` : ``}`;
});
var wishlist_svelte_svelte_type_style_lang = "";
const css = {
  code: ".wish-result.svelte-1iff8h4{width:100vw;height:100vh;background-image:url('/assets/images/background/splash-background.webp');background-size:cover}.error.svelte-1iff8h4{width:100vw;height:100vh;display:flex;background-color:#fff;justify-content:center;align-items:center}",
  map: null
};
const prerender = true;
const Wishlist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title = "No Name";
  let metaTitle = APP_TITLE;
  let wishlist = [];
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Wish Result for ${escape(title)} et al | ${escape(APP_TITLE)}</title>`, ""}<meta name="${"title"}"${add_attribute("content", metaTitle, 0)} data-svelte="svelte-1grr43y"><meta property="${"og:title"}"${add_attribute("content", metaTitle, 0)} data-svelte="svelte-1grr43y"><meta property="${"twitter:title"}"${add_attribute("content", metaTitle, 0)} data-svelte="svelte-1grr43y">`, ""}

${`<div class="${"wish-result svelte-1iff8h4"}">${validate_component(WishListResult, "WishListResult").$$render($$result, { preview: true, previewlist: wishlist }, {}, {})}</div>`}`;
});
export { Wishlist as default, prerender };
