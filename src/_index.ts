export default function (args: {
	year: number;
	month: number;
	day: number;
	hour?: number;
	minute?: number;
	second?: number;
	timezone: number;
	latitude: number;
	longitude: number;
	elevation?: number;
	pressure?: number;
	temperature: number;
	surfaceSlope?: number;
	surfaceAzimuthRotation?: number;
	deltaT?: number;
}) {
	// If all time parts not defined, set to noon
	if (args.hour == null && args.minute == null && args.second == null) {
		args.hour = 12;
		args.minute = 0;
		args.second = 0;
	} else {
		args.hour ||= 0;
		args.minute ||= 0;
		args.second ||= 0;
	}

	// Set other args default value
	args.elevation ||= 0;
	args.pressure ||= 1_013.25;
	args.surfaceSlope ||= 0;
	args.surfaceAzimuthRotation ||= 0;
	args.deltaT ||= getDeltaT(args.year, args.month);

	// 3.1.1
}

/**
 * Calculates ΔT value using polynomial expressions derived from historical record and
 * direct observasions. Taken from https://eclipse.gsfc.nasa.gov/SEcat5/deltatpoly.html.
 *
 * @param year
 * @param month
 * @returns ΔT value
 */
function getDeltaT(year: number, month: number): number {
	const y = year + (month - 0.5) / 12;

	if (y >= -500 && y < 500) {
		const u = y / 100;
		return (
			10583.6 -
			1014.41 * u +
			33.78311 * u ** 2 -
			5.952053 * u ** 3 -
			0.1798452 * u ** 4 +
			0.022174192 * u ** 5 +
			0.0090316521 * u ** 6
		);
	}

	if (y >= 500 && y < 1600) {
		const u = (y - 1000) / 100;
		return (
			1574.2 -
			556.01 * u +
			71.23472 * u ** 2 +
			0.319781 * u ** 3 -
			0.8503463 * u ** 4 -
			0.005050998 * u ** 5 +
			0.0083572073 * u ** 6
		);
	}

	if (y >= 1600 && y < 1700) {
		const t = y - 1600;
		return 120 - 0.9808 * t - 0.01532 * t ** 2 + t ** 3 / 7129;
	}

	if (y >= 1700 && y < 1800) {
		const t = y - 1700;
		return (
			8.83 +
			0.1603 * t -
			0.0059285 * t ** 2 +
			0.00013336 * t ** 3 -
			t ** 4 / 1174000
		);
	}

	if (y >= 1800 && y < 1860) {
		const t = y - 1800;
		return (
			13.72 -
			0.332447 * t +
			0.0068612 * t ** 2 +
			0.0041116 * t ** 3 -
			0.00037436 * t ** 4 +
			0.0000121272 * t ** 5 -
			0.0000001699 * t ** 6 +
			0.000000000875 * t ** 7
		);
	}

	if (y >= 1860 && y < 1900) {
		const t = y - 1860;
		return (
			7.62 +
			0.5737 * t -
			0.251754 * t ** 2 +
			0.01680668 * t ** 3 -
			0.0004473624 * t ** 4 +
			t ** 5 / 233174
		);
	}

	if (y >= 1900 && y < 1920) {
		const t = y - 1900;
		return (
			-2.79 +
			1.494119 * t -
			0.0598939 * t ** 2 +
			0.0061966 * t ** 3 -
			0.000197 * t ** 4
		);
	}

	if (y >= 1920 && y < 1941) {
		const t = y - 1920;
		return 21.2 + 0.84493 * t - 0.0761 * t ** 2 + 0.0020936 * t ** 3;
	}

	if (y >= 1941 && y < 1961) {
		const t = y - 1950;
		return 29.07 + 0.407 * t - t ** 2 / 233 + t ** 3 / 2547;
	}

	if (y >= 1961 && y < 1986) {
		const t = y - 1975;
		return 45.45 + 1.067 * t - t ** 2 / 260 - t ** 3 / 718;
	}

	if (y >= 1986 && y < 2005) {
		const t = y - 2000;
		return (
			63.86 +
			0.3345 * t -
			0.060374 * t ** 2 +
			0.0017275 * t ** 3 +
			0.000651814 * t ** 4 +
			0.00002373599 * t ** 5
		);
	}

	if (y >= 2005 && y < 2050) {
		const t = y - 2000;
		return 62.92 + 0.32217 * t + 0.005589 * t ** 2;
	}

	if (y >= 2050 && y < 2150) {
		return -20 + 32 * ((y - 1820) / 100) ** 2 - 0.5628 * (2150 - y);
	}

	// At this point y < -500 or y >= 2150
	const u = (y - 1820) / 100;
	return -20 + 32 * u ** 2;
}

export function getJulianDay(
	year: number,
	month: number,
	day: number,
	hour: number = 0,
	minute: number = 0,
	second: number = 0,
	timezone: number = 0
): number {
	const Y = month > 2 ? year : year - 1;
	const M = month > 2 ? month : month + 12;
	const D =
		day +
		hour / 24 +
		minute / (24 * 60) +
		second / (24 * 60 * 60) -
		timezone / 24;
	const jd =
		Math.trunc(365.25 * (Y + 4716)) +
		Math.trunc(30.6001 * (M + 1)) +
		D -
		1524.5;

	if (jd >= 2299160) {
		const A = Math.trunc(Y / 100);
		return jd + 2 - A + Math.trunc(A / 4);
	} else {
		return jd;
	}
}
