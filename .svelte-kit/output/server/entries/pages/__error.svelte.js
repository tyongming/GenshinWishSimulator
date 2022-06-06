import { c as create_ssr_component, d as escape } from "../../chunks/index-437e72a6.js";
var __error_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-ky8fkm.svelte-ky8fkm{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center}.bg.svelte-ky8fkm.svelte-ky8fkm{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:110%;height:110%;object-fit:cover;filter:blur(5px)}.container.svelte-ky8fkm.svelte-ky8fkm{position:relative;z-index:+1;width:80%;height:70%;background-color:#ece6de;padding:2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.gi-primo-star.svelte-ky8fkm.svelte-ky8fkm{color:#fdf0ac;font-size:1.5rem;display:inline-block;position:absolute;filter:drop-shadow(0 0 7px rgba(227, 149, 48, 0.9))}.top-left.svelte-ky8fkm.svelte-ky8fkm{top:-0.8rem;left:-0.5rem;transform:rotate(-45deg)}.top-right.svelte-ky8fkm.svelte-ky8fkm{top:-0.8rem;right:-0.5rem;transform:rotate(45deg)}.bottom-left.svelte-ky8fkm.svelte-ky8fkm{bottom:-0.8rem;left:-0.5rem;transform:rotate(-135deg)}.bottom-right.svelte-ky8fkm.svelte-ky8fkm{bottom:-0.8rem;right:-0.5rem;transform:rotate(135deg)}.icon-bg.svelte-ky8fkm.svelte-ky8fkm{font-size:17em;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#e4dcce;z-index:-1}h1.svelte-ky8fkm.svelte-ky8fkm{font-size:2.5rem}h2.svelte-ky8fkm.svelte-ky8fkm{font-size:1.2rem;padding:0.6rem 0}p.svelte-ky8fkm.svelte-ky8fkm{font-size:1rem}a.svelte-ky8fkm.svelte-ky8fkm{border-radius:40px;color:white;background-color:#4a5265;display:inline-flex;align-items:center;justify-content:space-between;padding:5px 4rem 5px 5px;transition:all 0.2s;margin-top:3rem}a.svelte-ky8fkm i.svelte-ky8fkm{width:2rem;height:2rem;background-color:#353533;border-radius:100%;display:inline-flex;justify-content:center;align-items:center;font-size:1rem;margin-right:3rem;color:#ffc107}a.svelte-ky8fkm.svelte-ky8fkm:hover{background-color:rgb(51, 57, 71)}",
  map: null
};
function load({ error, status }) {
  return {
    props: {
      statusCode: status,
      message: error.message
    }
  };
}
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { statusCode } = $$props;
  let { message } = $$props;
  const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  if ($$props.statusCode === void 0 && $$bindings.statusCode && statusCode !== void 0)
    $$bindings.statusCode(statusCode);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Error ${escape(statusCode)}</title>`, ""}`, ""}

<section class="${"svelte-ky8fkm"}"><img class="${"bg svelte-ky8fkm"}" src="${"/assets/images/background/bg" + escape(random(1, 16)) + ".webp"}" alt="${"background"}">
	<div class="${"container svelte-ky8fkm"}"><i class="${"gi-primo-star top-left svelte-ky8fkm"}"></i>
		<i class="${"gi-primo-star top-right svelte-ky8fkm"}"></i>
		<i class="${"gi-primo-star bottom-left svelte-ky8fkm"}"></i>
		<i class="${"gi-primo-star bottom-right svelte-ky8fkm"}"></i>
		<i class="${"gi-inazuma icon-bg svelte-ky8fkm"}"></i>
		<h1 class="${"svelte-ky8fkm"}">Error ${escape(statusCode)}</h1>
		<h2 class="${"svelte-ky8fkm"}">${escape(message)}</h2>
		<p class="${"svelte-ky8fkm"}">We find some problem with the page you&#39;re looking for ..</p>
		<a href="${"/"}" class="${"svelte-ky8fkm"}"><i class="${"gi-reply svelte-ky8fkm"}"></i> Back To The Beginning .. </a></div>
</section>`;
});
export { _error as default, load };
