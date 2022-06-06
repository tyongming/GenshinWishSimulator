export { matchers } from './client-matchers.js';

export const components = [
	() => import("..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\..\\src\\routes\\__error.svelte"),
	() => import("..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\src\\routes\\screen\\chars.svelte"),
	() => import("..\\..\\src\\routes\\screen\\wishlist.svelte")
];

export const dictionary = {
	"": [[0, 2], [1]],
	"screen/chars": [[0, 3], [1]],
	"screen/wishlist": [[0, 4], [1]]
};