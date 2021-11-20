import type { earthPeriodicValue } from './earth-periodic';
import type { nutationPeriodicValue } from './nutation-periodic';
import {
	earthPeriodicL0,
	earthPeriodicL1,
	earthPeriodicL2,
	earthPeriodicL3,
	earthPeriodicL4,
	earthPeriodicL5,
	earthPeriodicB0,
	earthPeriodicB1,
	earthPeriodicR0,
	earthPeriodicR1,
	earthPeriodicR2,
	earthPeriodicR3,
	earthPeriodicR4,
} from './earth-periodic';
import { nutationPeriodicTerms } from './nutation-periodic';

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

	// =========================================================================
	// 1. CALCULATE THE JULIAN AND JULIAN EPHEMERIS DAY, CENTURY, AND MILLENNIUM
	// =========================================================================

	// 1.1 Calculate the Julian Day (JD)
	const jd = getJulianDay(
		args.year,
		args.month,
		args.day,
		args.hour,
		args.minute,
		args.second,
		args.timezone
	);

	// 1.2. Calculate the Julian Ephemeris Day (JDE)
	const jde = jd + args.deltaT / 86_400;

	// 1.3. Calculate the Julian century (JC) and the Julian Ephemeris Century (JCE)
	// for the 2000 standard epoch
	const jc = (jd - 2_451_545) / 36_525;
	const jce = (jde - 2_451_545) / 36_525;

	// 1.4. Calculate the Julian Ephemeris Millennium (JME) for the 2000 standard epoch
	const jme = jce / 10;

	// ====================================================================================
	// 2. CALCULATE EARTH HELIOCENTRIC LONGITUDE, LATITUDE, AND RADIUS VECTOR (L, B, AND R)
	// ====================================================================================

	// 2.1. Calculate the terms L0, L1, L2, L3, L4, and L5 (in radians)
	const l0 = getEarthPeriodic(earthPeriodicL0, jme);
	const l1 = getEarthPeriodic(earthPeriodicL1, jme);
	const l2 = getEarthPeriodic(earthPeriodicL2, jme);
	const l3 = getEarthPeriodic(earthPeriodicL3, jme);
	const l4 = getEarthPeriodic(earthPeriodicL4, jme);
	const l5 = getEarthPeriodic(earthPeriodicL5, jme);

	// 2.2. Calculate the Earth heliocentric longitude (L in radians), convert it to
	// degrees then limit its value to between 0 and 360.
	let l =
		(l0 +
			l1 * jme +
			l2 * jme ** 2 +
			l3 * jme ** 3 +
			l4 * jme ** 4 +
			l5 * jme ** 5) /
		10 ** 8;

	l = (l * 180) / Math.PI;
	l = limitDegrees(l);

	// 2.3. Calculate the terms B0 and B1 (in radians)
	const b0 = getEarthPeriodic(earthPeriodicB0, jme);
	const b1 = getEarthPeriodic(earthPeriodicB1, jme);

	// 2.4. Calculate the Earth heliocentric latitude (B in radians), convert it to
	// degrees then limit its value to between 0 and 360.
	let b = (b0 + b1 * jme) / 10 ** 8;
	b = (b * 180) / Math.PI;
	b = limitDegrees(b);

	// 2.5. Calculate the terms R0, R1, R2, R3, and R4 (in Astronomical Units, AU)
	const r0 = getEarthPeriodic(earthPeriodicR0, jme);
	const r1 = getEarthPeriodic(earthPeriodicR1, jme);
	const r2 = getEarthPeriodic(earthPeriodicR2, jme);
	const r3 = getEarthPeriodic(earthPeriodicR3, jme);
	const r4 = getEarthPeriodic(earthPeriodicR4, jme);

	// 2.6. Calculate the Earth radius vector (R in Astronomical Units)
	const r =
		(r0 + r1 * jme + r2 * jme ** 2 + r3 * jme ** 3 + r4 * jme ** 4) / 10 ** 8;

	// ==================================================
	// 3. CALCULATE THE GEOCENTRIC LONGITUDE AND LATITUDE (Θ AND Β)
	// ==================================================

	// 3.1. Calculate the geocentric longitude, Θ (in degrees)
	const theta = limitDegrees(l + 180);

	// 3.2. Calculate the geocentric latitude, β (in degrees)
	const beta = -b;

	// ================================================================
	// 4. CALCULATE THE NUTATION IN LONGITUDE AND OBLIQUITY (ΔΨ AND ΔΕ)
	// ================================================================

	// 4.1. Calculate the mean elongation of the moon from the sun, X0 (in degrees)
	const x0 =
		297.85036 + 445_267.11148 * jce - 0.0019142 * jce ** 2 + jce ** 3 / 189_474;

	// 4.2. Calculate the mean anomaly of the sun (Earth), X1 (in degrees)
	const x1 =
		357.52772 + 35_999.05034 * jce - 0.0001603 * jce ** 2 - jce ** 3 / 300_000;

	// 4.3. Calculate the mean anomaly of the moon, X2 (in degrees)
	const x2 =
		134.96298 + 477_198.867398 * jce + 0.0086972 * jce ** 2 + jce ** 3 / 56_250;

	// 4.4. Calculate the moon's argument of latitude, X3 (in degrees)
	const x3 =
		93.27191 + 483_202.017538 * jce - 0.0036825 * jce ** 2 + jce ** 3 / 327_270;

	// 4.5. Calculate the longitude of the ascending node of the moon’s mean orbit on
	// the ecliptic, measured from the mean equinox of the date, X4 (in degrees)
	const x4 =
		125.04452 - 1934.136261 * jce + 0.0020708 * jce ** 2 + jce ** 3 / 450_000;

	// 4.6. Calculate the nutation longitude and obliquity (both in degrees)
	let deltaPsi: number = 0;
	let deltaEpsilon: number = 0;

	nutationPeriodicTerms.forEach((v) => {
		const sumXY = x0 * v.Y0 + x1 * v.Y1 + x2 * v.Y2 + x3 * v.Y3 + x4 * v.Y4;
		deltaPsi += (v.A + v.B * jce) * Math.sin(sumXY);
		deltaEpsilon += (v.C + v.D * jce) * Math.sin(sumXY);
	});

	deltaPsi = deltaPsi / 36_000_000;
	deltaEpsilon = deltaEpsilon / 36_000_000;
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

/**
 * Calculate Julian Days from given parameters.
 *
 * @param year
 * @param month
 * @param day
 * @param hour - default to 0
 * @param minute - default to 0
 * @param second - default to 0
 * @param timezone - in hours, default to 0
 * @returns Julian Days
 */
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

/**
 * Calculate earth periodic terms value for B.
 *
 * @param constants - array of values for earth periodic constants
 * @param jme - value of Julian Ephemeris Millennium
 * @returns L value in radians
 */
export function getEarthPeriodic(
	constants: earthPeriodicValue[],
	jme: number
): number {
	return constants
		.map((v) => v.A * Math.cos(v.B + v.C * jme))
		.reduce((acc, v) => acc + v);
}

/**
 * Limit range of degrees to between 0 and 360.
 *
 * @param value - the original degrees
 * @returns the limited degrees
 */
export function limitDegrees(value: number): number {
	const a = value / 360;
	const f = Math.abs(a - Math.trunc(a));
	return value >= 0 ? 360 * f : 360 - 360 * f;
}
