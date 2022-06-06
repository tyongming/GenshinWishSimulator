import weaponsDB from '$lib/data/weapons.json';
import charsDB from '$lib/data/characters.json';

const rand = (array) => array[Math.floor(Math.random() * array.length)];

const getAllChars = (star) =>
	charsDB.data
		.find(({ rarity }) => rarity === star)
		.list.map((arr) => {
			arr.type = 'character';
			arr.rarity = star;
			return arr;
		});

const getAllWeapons = (star) =>
	weaponsDB.data
		.find(({ rarity }) => rarity === star)
		.list.map((arr) => {
			arr.type = 'weapon';
			arr.rarity = star;
			return arr;
		});

const standardWeapons = (star) => getAllWeapons(star).filter(({ limited }) => !limited);
const standardChars5Star = (chars) => getAllChars(5).filter(({ name }) => chars.includes(name));

const get4StarChars = getAllChars(4).filter(({ name }) => {
	return !charsDB.onlyStandard.includes(name);
});

const filterCharByReleased = (charlist, version = null, phase = null) => {
	return charlist.filter(({ release }) => {
		if (!release) return true;
		const [v, phs] = release.split('-');
		if (parseFloat(version) < parseFloat(v)) return false;
		if (parseFloat(version) === parseFloat(v) && phase <= parseInt(phs)) return false;
		return true;
	});
};

const get3StarItem = () => rand(standardWeapons(3));
const get4StarItem = (bannerToRoll = 'allExcludeStandard', version = null, phase = null) => {
	const itemType = rand(['weap', 'char']);

	// show standard character exclude starter character ( amber, kaeya, lisa )
	let charList = get4StarChars;

	// Show All standard chars exlude new character
	if (bannerToRoll === 'standard') charList = getAllChars(4);

	// show standard item exclude starter and new character
	if (bannerToRoll === 'limited') charList = get4StarChars;

	const items = itemType === 'weap' ? standardWeapons(4) : charList;
	const filtered = filterCharByReleased(items, version, phase);
	return rand(filtered);
};

const getStandard5StarItem = ({ exclude }) => {
	const itemType = rand(['weap', 'char']);
	const items = itemType === 'weap' ? standardWeapons(5) : standardChars5Star(exclude);
	return rand(items);
};

export {
	rand,
	getAllChars,
	getAllWeapons,
	get3StarItem,
	get4StarItem,
	get4StarChars,
	getStandard5StarItem,
	standardWeapons,
	standardChars5Star
};
