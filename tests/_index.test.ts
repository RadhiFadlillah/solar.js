import { getJulianDay as jd } from '../src/_index';

test('julian day for utc time', () => {
	expect(jd(2000, 1, 1, 12, 0, 0, 0)).toBe(2451545.0);
	expect(jd(1999, 1, 1, 0, 0, 0, 0)).toBe(2451179.5);
	expect(jd(1987, 1, 27, 0, 0, 0, 0)).toBe(2446822.5);
	expect(jd(1987, 6, 19, 12, 0, 0, 0)).toBe(2446966.0);
	expect(jd(1988, 1, 27, 0, 0, 0, 0)).toBe(2447187.5);
	expect(jd(1988, 6, 19, 12, 0, 0, 0)).toBe(2447332.0);
	expect(jd(1900, 1, 1, 0, 0, 0, 0)).toBe(2415020.5);
	expect(jd(1600, 1, 1, 0, 0, 0, 0)).toBe(2305447.5);
	expect(jd(1600, 12, 31, 0, 0, 0, 0)).toBe(2305812.5);
	expect(jd(837, 4, 10, 7, 12, 0, 0)).toBe(2026871.8);
	expect(jd(-123, 12, 31, 0, 0, 0, 0)).toBe(1676496.5);
	expect(jd(-122, 1, 1, 0, 0, 0, 0)).toBe(1676497.5);
	expect(jd(-1000, 7, 12, 12, 0, 0, 0)).toBe(1356001.0);
	expect(jd(-1000, 2, 29, 0, 0, 0, 0)).toBe(1355866.5);
	expect(jd(-1001, 8, 17, 21, 36, 0, 0)).toBe(1355671.4);
	expect(jd(-4712, 1, 1, 12, 0, 0, 0)).toBe(0);
});
