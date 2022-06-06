
import root from '__GENERATED__/root.svelte';
import { respond } from '/Users/user10/Downloads/Compressed/Genshin-Impact-Wish-Simulator-master/Genshin-Impact-Wish-Simulator-master/.svelte-kit/runtime/server/index.js';
import { set_paths, assets, base } from '/Users/user10/Downloads/Compressed/Genshin-Impact-Wish-Simulator-master/Genshin-Impact-Wish-Simulator-master/.svelte-kit/runtime/paths.js';
import { set_prerendering } from '/Users/user10/Downloads/Compressed/Genshin-Impact-Wish-Simulator-master/Genshin-Impact-Wish-Simulator-master/.svelte-kit/runtime/env.js';

const template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta\n\t\t\tname=\"viewport\"\n\t\t\tcontent=\"width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no\"\n\t\t/>\n\t\t<meta name=\"a.validate.02\" content=\"gc8Hcbkq-w-3WEWF_q38cMwWsDdHhE5icT8F\" />\n\t\t<meta name=\"exoclick-site-verification\" content=\"7bf76abca1eb5f5c5dac25be475c4803\" />\n\t\t<meta name=\"google-site-verification\" content=\"zn73VlG6JLf_oG3P8jQVbKGlDkQ9s6JcR6qZLzT2tVI\" />\n\n\t\t<meta property=\"profile:username\" content=\"Mantan\" />\n\t\t<meta property=\"og:type\" content=\"profile\" />\n\t\t<meta property=\"twitter:card\" content=\"summary_large_image\" />\n\t\t<meta name=\"robots\" content=\"index, follow\" />\n\t\t<meta name=\"language\" content=\"English, Indonesian\" />\n\t\t<meta name=\"author\" content=\"Mantan\" />\n\n\t\t<link rel=\"stylesheet\" href=\"/icons.css\" />\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\n\t\t<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\" />\n\t\t<link rel=\"mask-icon\" href=\"/safari-pinned-tab.svg\" color=\"#5bbad5\" />\n\t\t<meta name=\"msapplication-TileColor\" content=\"#da532c\" />\n\t\t<meta name=\"theme-color\" content=\"#ffffff\" />\n\t\t<meta name=\"color-scheme\" content=\"light dark\" />\n\t\t<link rel=\"manifest\" href=\"/manifest.json\" />\n\n\t\t" + head + "\n\n\t\t<!-- AD -->\n\t\t<script\n\t\t\tasync\n\t\t\tsrc=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874822310102113\"\n\t\t\tcrossorigin=\"anonymous\"\n\t\t></script>\n\n\t\t<script type=\"text/javascript\" src=\"https://wap4dollar.com/ad/pops/?id=jnf1abpn5a\"></script>\n\t\t<!-- AD -->\n\n\t\t<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-211756322-1\"></script>\n\t\t<script>\n\t\t\twindow.dataLayer = window.dataLayer || [];\n\t\t\tfunction gtag() {\n\t\t\t\tdataLayer.push(arguments);\n\t\t\t}\n\t\t\tgtag('js', new Date());\n\t\t\tgtag('config', 'UA-211756322-1');\n\t\t</script>\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\" class=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let read = null;

set_paths({"base":"","assets":""});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class Server {
	constructor(manifest) {
		this.options = {
			amp: false,
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			dev: false,
			floc: false,
			get_stack: error => String(error), // for security
			handle_error: (error, event) => {
				this.options.hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				});
				error.stack = this.options.get_stack(error);
			},
			hooks: null,
			hydrate: true,
			manifest,
			method_override: {"parameter":"_method","allowed":[]},
			paths: { base, assets },
			prefix: assets + '/_app/',
			prerender: true,
			read,
			root,
			service_worker: null,
			router: true,
			template,
			template_contains_nonce: false,
			trailing_slash: "never"
		};
	}

	async respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		if (!this.options.hooks) {
			const module = await import("..\\..\\src\\hooks.js");
			this.options.hooks = {
				getSession: module.getSession || (() => ({})),
				handle: module.handle || (({ event, resolve }) => resolve(event)),
				handleError: module.handleError || (({ error }) => console.error(error.stack)),
				externalFetch: module.externalFetch || fetch
			};
		}

		return respond(request, this.options, options);
	}
}
