/**
 * Wrapper for Math.sin function to make it accept degrees value instead of radians.
 *
 * @param degrees
 * @returns sin value
 */
export function sin(degrees: number): number {
	const radians = (degrees * Math.PI) / 180;
	return Math.sin(radians);
}

/**
 * Wrapper for Math.cos function to make it accept degrees value instead of radians.
 *
 * @param degrees
 * @returns cos value
 */
export function cos(degrees: number): number {
	const radians = (degrees * Math.PI) / 180;
	return Math.cos(radians);
}

/**
 * Wrapper for Math.tan function to make it accept degrees value instead of radians.
 *
 * @param degrees
 * @returns tan value
 */
export function tan(degrees: number): number {
	const radians = (degrees * Math.PI) / 180;
	return Math.tan(radians);
}
