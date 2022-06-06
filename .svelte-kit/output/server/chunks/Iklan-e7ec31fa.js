import { c as create_ssr_component, a as subscribe, h as createEventDispatcher, d as escape, b as add_attribute } from "./index-437e72a6.js";
import "overlayscrollbars";
import "howler";
import { v as viewportHeight } from "./env-0d653bb5.js";
var PopUp_svelte_svelte_type_style_lang = "";
const css = {
  code: ".popup.svelte-16bm29m.svelte-16bm29m{position:fixed;top:0;left:0;width:100vw;background-color:rgba(0, 0, 0, 0.5);z-index:997;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(2px)}.popup-content.svelte-16bm29m.svelte-16bm29m{width:35rem;max-width:90%;background-color:#ece6de;padding:8px;text-align:center;color:#383b40;position:relative;zoom:120%}.mobile .popup-content.svelte-16bm29m.svelte-16bm29m{max-width:100vh}.container.svelte-16bm29m.svelte-16bm29m{width:100%;height:100%;border:2px solid #ddd5c8}.gi-primo-star.svelte-16bm29m.svelte-16bm29m{color:#fdf0ac;font-size:1.5rem;display:inline-block;position:absolute;filter:drop-shadow(0 0 7px rgba(227, 149, 48, 0.9))}.top-left.svelte-16bm29m.svelte-16bm29m{top:-0.8rem;left:-0.5rem;transform:rotate(-45deg)}.top-right.svelte-16bm29m.svelte-16bm29m{top:-0.8rem;right:-0.5rem;transform:rotate(45deg)}.bottom-left.svelte-16bm29m.svelte-16bm29m{bottom:-0.8rem;left:-0.5rem;transform:rotate(-135deg)}.bottom-right.svelte-16bm29m.svelte-16bm29m{bottom:-0.8rem;right:-0.5rem;transform:rotate(135deg)}.bg.svelte-16bm29m.svelte-16bm29m{font-size:17em;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#e4dcce}.pop-header.svelte-16bm29m.svelte-16bm29m{font-size:1.2rem;margin:0.4rem 7%;padding-bottom:0.4rem;border-bottom:0.2rem solid #ddd5c8;position:relative;z-index:+1}.pop-body.svelte-16bm29m.svelte-16bm29m{height:15rem;max-height:45vh;position:relative;z-index:+1;font-size:1.2rem;display:flex;justify-content:center}.pop-body.large.svelte-16bm29m.svelte-16bm29m{height:25rem;max-height:70vh}.pop-footer.svelte-16bm29m.svelte-16bm29m{display:flex;padding:0.7rem 0;justify-content:space-around;position:relative;z-index:+1}.pop-footer.svelte-16bm29m.svelte-16bm29m::before{width:80%;content:'';display:block;border-top:0.2rem solid #ddd5c8;position:absolute;top:0;left:50%;transform:translateX(-50%)}.pop-footer.svelte-16bm29m button.svelte-16bm29m{border-radius:40px;color:white;background-color:#4a5265;display:inline-flex;align-items:center;justify-content:space-between;padding:0.2em 2.5em 0.3em 0.1em;transition:all 0.2s}.pop-footer.svelte-16bm29m button i.svelte-16bm29m{width:1.7rem;height:1.7rem;background-color:#353533;border-radius:100%;display:inline-flex;justify-content:center;align-items:center;font-size:0.8rem;margin-right:1.5rem}.pop-footer.svelte-16bm29m button.svelte-16bm29m:hover{background-color:rgb(51, 57, 71)}.gi-times.svelte-16bm29m.svelte-16bm29m{color:#3f9ad1}.gi-circle-o.svelte-16bm29m.svelte-16bm29m{color:#ffc107}",
  map: null
};
const PopUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $viewportHeight, $$unsubscribe_viewportHeight;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  let { show = false } = $$props;
  let { title = "" } = $$props;
  let { confirm = true } = $$props;
  let { button = "all" } = $$props;
  let { sfx = true } = $$props;
  let content;
  createEventDispatcher();
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.confirm === void 0 && $$bindings.confirm && confirm !== void 0)
    $$bindings.confirm(confirm);
  if ($$props.button === void 0 && $$bindings.button && button !== void 0)
    $$bindings.button(button);
  if ($$props.sfx === void 0 && $$bindings.sfx && sfx !== void 0)
    $$bindings.sfx(sfx);
  $$result.css.add(css);
  $$unsubscribe_viewportHeight();
  return `${show ? `<div class="${"popup svelte-16bm29m"}" style="${"height: " + escape($viewportHeight) + "px;"}"><div class="${"popup-content svelte-16bm29m"}"><i class="${"gi-primo-star top-left svelte-16bm29m"}"></i>
			<i class="${"gi-primo-star top-right svelte-16bm29m"}"></i>
			<i class="${"gi-primo-star bottom-left svelte-16bm29m"}"></i>
			<i class="${"gi-primo-star bottom-right svelte-16bm29m"}"></i>
			<i class="${"gi-inazuma bg svelte-16bm29m"}"></i>
			<div class="${"container svelte-16bm29m"}">${title ? `<h1 class="${"pop-header svelte-16bm29m"}">${escape(title)}</h1>` : ``}
				<div class="${["pop-body svelte-16bm29m", !title && !confirm ? "large" : ""].join(" ").trim()}"${add_attribute("this", content, 0)}>${slots.default ? slots.default({}) : ``}</div>

				${confirm ? `<div class="${"pop-footer svelte-16bm29m"}">${["cancel", "all"].indexOf(button) > -1 ? `<button class="${"cancel svelte-16bm29m"}"><i class="${"gi-times svelte-16bm29m"}"></i>
								<span>Cancel </span></button>` : ``}
						${["confirm", "all"].indexOf(button) > -1 ? `<button class="${"confirm svelte-16bm29m"}"><i class="${"gi-circle-o svelte-16bm29m"}"></i>
								<span>Confirm </span></button>` : ``}</div>` : ``}</div></div></div>` : ``}`;
});
const Iklan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "" } = $$props;
  let { head = false } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.head === void 0 && $$bindings.head && head !== void 0)
    $$bindings.head(head);
  return `${type === "banner" ? `<ins class="${"adsbygoogle"}" style="${"display:block"}" data-ad-client="${"ca-pub-1874822310102113"}" data-ad-slot="${"6827309798"}" data-ad-format="${"auto"}" data-full-width-responsive="${"true"}"></ins>` : ``}

${head ? `<script data-cfasync="${"false"}" type="${"text/javascript"}" data-adel="${"atag"}" src="${"//acacdn.com/script/atg.js"}" czid="${"v1xd6wvvpe"}"><\/script>` : ``}`;
});
export { Iklan as I, PopUp as P };
