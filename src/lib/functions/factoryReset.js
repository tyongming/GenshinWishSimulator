import {
	acquaint,
	genesis,
	intertwined,
	primogem,
	stardust,
	starglitter,
	showBeginner,
	unlimitedFates,
	bannerPhase,
	patchVersion,
	selectedCourse,
	muted
} from '$lib/store/stores';
import HistoryIDB from '$lib/store/historyIdb';
import { wishPhase, version } from '$lib/setup/wish-setup.json';

const { clearIDB } = HistoryIDB;
const factoryReset = async () => {
	localStorage.clear();
	localStorage.setItem('primogem', 1600);

	await clearIDB();

	acquaint.set(0);
	genesis.set(0);
	intertwined.set(0);
	primogem.set(1600);
	stardust.set(0);
	starglitter.set(0);

	selectedCourse.set({});

	showBeginner.set(true);
	bannerPhase.set(wishPhase);
	patchVersion.set(version);

	// Setting
	unlimitedFates.set(false);
	muted.set(false);
};

export default factoryReset;
