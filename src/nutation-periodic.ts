export type nutationPeriodicValue = {
	A: number;
	B: number;
	C: number;
	D: number;
	Y0: number;
	Y1: number;
	Y2: number;
	Y3: number;
	Y4: number;
};

export const nutationPeriodicTerms: nutationPeriodicValue[] = [
	{
		A: -171_996,
		B: -174.2,
		C: 92_025,
		D: 8.9,
		Y0: 0,
		Y1: 0,
		Y2: 0,
		Y3: 0,
		Y4: 1,
	},
	{ A: -13187, B: -1.6, C: 5736, D: -3.1, Y0: -2, Y1: 0, Y2: 0, Y3: 2, Y4: 2 },
	{ A: -2274, B: -0.2, C: 977, D: -0.5, Y0: 0, Y1: 0, Y2: 0, Y3: 2, Y4: 2 },
	{ A: 2062, B: 0.2, C: -895, D: 0.5, Y0: 0, Y1: 0, Y2: 0, Y3: 0, Y4: 2 },
	{ A: 1426, B: -3.4, C: 54, D: -0.1, Y0: 0, Y1: 1, Y2: 0, Y3: 0, Y4: 0 },
	{ A: 712, B: 0.1, C: -7, D: 0, Y0: 0, Y1: 0, Y2: 1, Y3: 0, Y4: 0 },
	{ A: -517, B: 1.2, C: 224, D: -0.6, Y0: -2, Y1: 1, Y2: 0, Y3: 2, Y4: 2 },
	{ A: -386, B: -0.4, C: 200, D: 0, Y0: 0, Y1: 0, Y2: 0, Y3: 2, Y4: 1 },
	{ A: -301, B: 0, C: 129, D: -0.1, Y0: 0, Y1: 0, Y2: 1, Y3: 2, Y4: 2 },
	{ A: 217, B: -0.5, C: -95, D: 0.3, Y0: -2, Y1: -1, Y2: 0, Y3: 2, Y4: 2 },
	{ A: -158, B: 0, C: 0, D: 0, Y0: -2, Y1: 0, Y2: 1, Y3: 0, Y4: 0 },
	{ A: 129, B: 0.1, C: -70, D: 0, Y0: -2, Y1: 0, Y2: 0, Y3: 2, Y4: 1 },
	{ A: 123, B: 0, C: -53, D: 0, Y0: 0, Y1: 0, Y2: -1, Y3: 2, Y4: 2 },
	{ A: 63, B: 0, C: 0, D: 0, Y0: 2, Y1: 0, Y2: 0, Y3: 0, Y4: 0 },
	{ A: 63, B: 0.1, C: -33, D: 0, Y0: 0, Y1: 0, Y2: 1, Y3: 0, Y4: 1 },
	{ A: -59, B: 0, C: 26, D: 0, Y0: 2, Y1: 0, Y2: -1, Y3: 2, Y4: 2 },
	{ A: -58, B: -0.1, C: 32, D: 0, Y0: 0, Y1: 0, Y2: -1, Y3: 0, Y4: 1 },
	{ A: -51, B: 0, C: 27, D: 0, Y0: 0, Y1: 0, Y2: 1, Y3: 2, Y4: 1 },
	{ A: 48, B: 0, C: 0, D: 0, Y0: -2, Y1: 0, Y2: 2, Y3: 0, Y4: 0 },
	{ A: 46, B: 0, C: -24, D: 0, Y0: 0, Y1: 0, Y2: -2, Y3: 2, Y4: 1 },
	{ A: -38, B: 0, C: 16, D: 0, Y0: 2, Y1: 0, Y2: 0, Y3: 2, Y4: 2 },
	{ A: -31, B: 0, C: 13, D: 0, Y0: 0, Y1: 0, Y2: 2, Y3: 2, Y4: 2 },
	{ A: 29, B: 0, C: 0, D: 0, Y0: 0, Y1: 0, Y2: 2, Y3: 0, Y4: 0 },
	{ A: 29, B: 0, C: -12, D: 0, Y0: -2, Y1: 0, Y2: 1, Y3: 2, Y4: 2 },
	{ A: 26, B: 0, C: 0, D: 0, Y0: 0, Y1: 0, Y2: 0, Y3: 2, Y4: 0 },
	{ A: -22, B: 0, C: 0, D: 0, Y0: -2, Y1: 0, Y2: 0, Y3: 2, Y4: 0 },
	{ A: 21, B: 0, C: -10, D: 0, Y0: 0, Y1: 0, Y2: -1, Y3: 2, Y4: 1 },
	{ A: 17, B: -0.1, C: 0, D: 0, Y0: 0, Y1: 2, Y2: 0, Y3: 0, Y4: 0 },
	{ A: 16, B: 0, C: -8, D: 0, Y0: 2, Y1: 0, Y2: -1, Y3: 0, Y4: 1 },
	{ A: -16, B: 0.1, C: 7, D: 0, Y0: -2, Y1: 2, Y2: 0, Y3: 2, Y4: 2 },
	{ A: -15, B: 0, C: 9, D: 0, Y0: 0, Y1: 1, Y2: 0, Y3: 0, Y4: 1 },
	{ A: -13, B: 0, C: 7, D: 0, Y0: -2, Y1: 0, Y2: 1, Y3: 0, Y4: 1 },
	{ A: -12, B: 0, C: 6, D: 0, Y0: 0, Y1: -1, Y2: 0, Y3: 0, Y4: 1 },
	{ A: 11, B: 0, C: 0, D: 0, Y0: 0, Y1: 0, Y2: 2, Y3: -2, Y4: 0 },
	{ A: -10, B: 0, C: 5, D: 0, Y0: 2, Y1: 0, Y2: -1, Y3: 2, Y4: 1 },
	{ A: -8, B: 0, C: 3, D: 0, Y0: 2, Y1: 0, Y2: 1, Y3: 2, Y4: 2 },
	{ A: 7, B: 0, C: -3, D: 0, Y0: 0, Y1: 1, Y2: 0, Y3: 2, Y4: 2 },
	{ A: -7, B: 0, C: 0, D: 0, Y0: -2, Y1: 1, Y2: 1, Y3: 0, Y4: 0 },
	{ A: -7, B: 0, C: 3, D: 0, Y0: 0, Y1: -1, Y2: 0, Y3: 2, Y4: 2 },
	{ A: -7, B: 0, C: 3, D: 0, Y0: 2, Y1: 0, Y2: 0, Y3: 2, Y4: 1 },
	{ A: 6, B: 0, C: 0, D: 0, Y0: 2, Y1: 0, Y2: 1, Y3: 0, Y4: 0 },
	{ A: 6, B: 0, C: -3, D: 0, Y0: -2, Y1: 0, Y2: 2, Y3: 2, Y4: 2 },
	{ A: 6, B: 0, C: -3, D: 0, Y0: -2, Y1: 0, Y2: 1, Y3: 2, Y4: 1 },
	{ A: -6, B: 0, C: 3, D: 0, Y0: 2, Y1: 0, Y2: -2, Y3: 0, Y4: 1 },
	{ A: -6, B: 0, C: 3, D: 0, Y0: 2, Y1: 0, Y2: 0, Y3: 0, Y4: 1 },
	{ A: 5, B: 0, C: 0, D: 0, Y0: 0, Y1: -1, Y2: 1, Y3: 0, Y4: 0 },
	{ A: -5, B: 0, C: 3, D: 0, Y0: -2, Y1: -1, Y2: 0, Y3: 2, Y4: 1 },
	{ A: -5, B: 0, C: 3, D: 0, Y0: -2, Y1: 0, Y2: 0, Y3: 0, Y4: 1 },
	{ A: -5, B: 0, C: 3, D: 0, Y0: 0, Y1: 0, Y2: 2, Y3: 2, Y4: 1 },
	{ A: 4, B: 0, C: 0, D: 0, Y0: -2, Y1: 0, Y2: 2, Y3: 0, Y4: 1 },
	{ A: 4, B: 0, C: 0, D: 0, Y0: -2, Y1: 1, Y2: 0, Y3: 2, Y4: 1 },
	{ A: 4, B: 0, C: 0, D: 0, Y0: 0, Y1: 0, Y2: 1, Y3: -2, Y4: 0 },
	{ A: -4, B: 0, C: 0, D: 0, Y0: -1, Y1: 0, Y2: 1, Y3: 0, Y4: 0 },
	{ A: -4, B: 0, C: 0, D: 0, Y0: -2, Y1: 1, Y2: 0, Y3: 0, Y4: 0 },
	{ A: -4, B: 0, C: 0, D: 0, Y0: 1, Y1: 0, Y2: 0, Y3: 0, Y4: 0 },
	{ A: 3, B: 0, C: 0, D: 0, Y0: 0, Y1: 0, Y2: 1, Y3: 2, Y4: 0 },
	{ A: -3, B: 0, C: 0, D: 0, Y0: 0, Y1: 0, Y2: -2, Y3: 2, Y4: 2 },
	{ A: -3, B: 0, C: 0, D: 0, Y0: -1, Y1: -1, Y2: 1, Y3: 0, Y4: 0 },
	{ A: -3, B: 0, C: 0, D: 0, Y0: 0, Y1: 1, Y2: 1, Y3: 0, Y4: 0 },
	{ A: -3, B: 0, C: 0, D: 0, Y0: 0, Y1: -1, Y2: 1, Y3: 2, Y4: 2 },
	{ A: -3, B: 0, C: 0, D: 0, Y0: 2, Y1: -1, Y2: -1, Y3: 2, Y4: 2 },
	{ A: -3, B: 0, C: 0, D: 0, Y0: 0, Y1: 0, Y2: 3, Y3: 2, Y4: 2 },
	{ A: -3, B: 0, C: 0, D: 0, Y0: 2, Y1: -1, Y2: 0, Y3: 2, Y4: 2 },
];
