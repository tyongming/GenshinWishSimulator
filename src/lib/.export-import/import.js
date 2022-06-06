import HistoryIDB from '$lib/store/historyIdb';
import charsDB from '$lib/setup/characters.json';
import weaponsDB from '$lib/setup/weapons.json';
import IDBdata from './old.json';

const { addHistory, clearIDB } = HistoryIDB;
const { rows } = IDBdata.data.data[0];

const getDatafromDB = (type, star) =>
	(type === 'weapon' ? weaponsDB : charsDB).data.find(({ rarity }) => rarity === star).list;

/**
 * restore old idb for debuging
 */
export const importAndReplace = async () => {
	await clearIDB();
	await rows.forEach(async (d) => await addHistory(d));
};

/**
 * Update data that already stored on IDB with new data
 */
const updateIDBfromVersion = {
	2.3: function () {
		rows.forEach(async (data) => {
			const { name, rarity, type } = data;
			const { vision, weaponType } = getDatafromDB(type, rarity).find((item) => item.name === name);
			if (vision) data.vision = vision;
			if (weaponType) data.weaponType = weaponType;
			await addHistory(data);
		});
	}
};

export const updateSite = (storageVersion) => {
	const vrs = storageVersion.split('.');
	const version = parseFloat(`${vrs[0]}.${vrs[1]}${vrs[2]}`);

	const update = updateIDBfromVersion[version];
	if (update) update();
};
