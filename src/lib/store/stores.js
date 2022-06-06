import { writable } from 'svelte/store';
import { beginner } from '$lib/data/banners/beginner.json';
import { wishPhase } from '$lib/setup/wish-setup.json';

const pageActive = writable('index');
const backsound = writable(false);
const muted = writable(false);
const isLoaded = writable(false);
const showDisclaimer = writable(true);

// Banner
const patchVersion = writable(0);
const bannerPhase = writable(wishPhase);
const bannerActive = writable(0);
const showBeginner = writable(true);

const isFatepointSystem = writable(false);
const fatePoint = writable(0);
const showFatepointPopup = writable(false);
const selectedCourse = writable({});
const fatepointCounterActive = writable(false);

const isAcquaintUsed = writable(true);

// viewport
const viewportWidth = writable(0);
const viewportHeight = writable(0);

// Mobile Detect
const isMobile = writable(false);
const mobileMode = writable(false);

// Wish
const bannerList = writable([{ type: 'beginner', character: beginner }]);

const genesis = writable(0);
const stardust = writable(0);
const starglitter = writable(0);
const primogem = writable(1600);

const intertwined = writable(0);
const acquaint = writable(0);
const unlimitedFates = writable(false);

const query = writable('');

export {
	pageActive,
	patchVersion,
	bannerPhase,
	bannerActive,
	isFatepointSystem,
	fatePoint,
	showFatepointPopup,
	fatepointCounterActive,
	selectedCourse,
	isLoaded,
	backsound,
	muted,
	showDisclaimer,
	viewportWidth,
	viewportHeight,
	isMobile,
	mobileMode,
	showBeginner,
	bannerList,
	genesis,
	stardust,
	starglitter,
	primogem,
	intertwined,
	acquaint,
	unlimitedFates,
	isAcquaintUsed,
	query
};
