const BASE = 10000;
const GROWTH = 2500;

const HALF_GROWTH = 0.5 * GROWTH;

const REVERSE_PQ_PREFIX = -(BASE - 0.5 * GROWTH) / GROWTH;
const REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
const GROWTH_DIVIDES_2 = 2 / GROWTH;

/* LEVEL / EXP FUNCTIONS */
function getLevel(xp) {
	return Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * xp))
}

function getExactLevel(xp) {
	return getLevel(xp) + getPercentageToNextLevel(xp);
}

function getExpFromLevelToNext(level) {
	return GROWTH * (level - 1) + BASE;
}

function getTotalExpToLevel(level) {
	var lv = Math.floor(level), x0 = getTotalExpToFullLevel(lv);
	if (level == lv) return x0;
	return (getTotalExpToFullLevel(lv + 1) - x0) * (level % 1) + x0;
}

function getTotalExpToFullLevel(level) {
	return (HALF_GROWTH * (level - 2) + BASE) * (level - 1);
}

function getPercentageToNextLevel(xp) {
	var lv = getLevel(xp), x0 = getTotalExpToLevel(lv);
	return (xp - x0) / (getTotalExpToLevel(lv + 1) - x0);
}

/* UNIX TO DATE */

function getDateTimeFromTimestamp(unixTimeStamp) {
    var date = new Date(unixTimeStamp);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
  }

module.exports = {
	getLevel: (xp) => getLevel(xp),
	getExactLevel: (xp) => getExactLevel(xp),
	getExpFromLevelToNext: (level) => getExpFromLevelToNext(level),
	getTotalExpToLevel: (level) => getTotalExpToLevel(level),
	getTotalExpToFullLevel: (level) => getTotalExpToFullLevel(level),
	getPercentageToNextLevel: (xp) => getPercentageToNextLevel(xp),

	dateFromUnix: (unix) => getDateTimeFromTimestamp(unix)
}