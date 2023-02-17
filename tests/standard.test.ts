import { LowLevel, Vector } from "../src/index";

test("Scalar comparison", () => {
    expect(LowLevel.areTwoScalarsEqual(0, 0)).toBe(true);
    expect(LowLevel.areTwoScalarsEqual(1, 1)).toBe(true);
    expect(LowLevel.areTwoScalarsEqual(1, 2)).toBe(false);
    expect(LowLevel.areTwoScalarsEqual(1, 1.00000000000000001)).toBe(true);
    expect(LowLevel.areTwoScalarsEqual(0.1 + 0.2, 0.3)).toBe(true);

    expect(LowLevel.areScalarsEqual(1, 1)).toBe(true);
    expect(LowLevel.areScalarsEqual(1, 2)).toBe(false);
    expect(LowLevel.areScalarsEqual(1, 1.00000000000000001)).toBe(true);
    expect(LowLevel.areScalarsEqual(0.1 + 0.2, 0.3)).toBe(true);
    expect(LowLevel.areScalarsEqual(1, 1, 1)).toBe(true);
    expect(LowLevel.areScalarsEqual(1, 1, 2)).toBe(false);
    expect(LowLevel.areScalarsEqual(1, 1, 1.00000000000000001)).toBe(true);
    expect(LowLevel.areScalarsEqual(0.1 + 0.2, 0.3, 0.3)).toBe(true);
    expect(LowLevel.areScalarsEqual(1, 1, 1, 1)).toBe(true);
    expect(LowLevel.areScalarsEqual(1, 1, 1, 2)).toBe(false);
    expect(LowLevel.areScalarsEqual(1, 1, 1, 1.00000000000000001)).toBe(true);
});
test("Vector comparison", () => {
    const vectors: Vector[] = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 3],
        [1, 1, 1.00000000000000001],
        [0.1 + 0.2, 0.3, 0.3],
        [0.3, 0.3, 0.1 + 0.2],
        [1, 1],
        [2, 1],
    ];

    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[0] as Vector)).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[1] as Vector)).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[2] as Vector)).toBe(false);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[3] as Vector)).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[4] as Vector)).toBe(false);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[5] as Vector)).toBe(false);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[6] as Vector)).toBe(false);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[7] as Vector)).toBe(false);

    expect(LowLevel.areTwoVectorsEqual(vectors[6] as Vector, vectors[0] as Vector)).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(vectors[6] as Vector, vectors[1] as Vector)).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(vectors[6] as Vector, vectors[2] as Vector)).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(vectors[6] as Vector, vectors[3] as Vector)).toBe(true);

    expect(LowLevel.areTwoVectorsEqual(vectors[1] as Vector, vectors[2] as Vector, 2)).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(vectors[4] as Vector, vectors[5] as Vector)).toBe(true);

    expect(LowLevel.areVectorsEqual([vectors[0] as Vector, vectors[0] as Vector, vectors[1] as Vector, vectors[3] as Vector])).toBe(true);
    expect(LowLevel.areVectorsEqual([vectors[6] as Vector, vectors[0] as Vector, vectors[1] as Vector, vectors[3] as Vector, vectors[2] as Vector])).toBe(true);
    expect(LowLevel.areVectorsEqual([vectors[0] as Vector, vectors[1] as Vector, vectors[3] as Vector, vectors[2] as Vector], 2)).toBe(true);
    expect(LowLevel.areVectorsEqual([vectors[4] as Vector, vectors[5] as Vector])).toBe(true);
    expect(LowLevel.areVectorsEqual([vectors[0] as Vector, vectors[1] as Vector, vectors[3] as Vector, vectors[2] as Vector])).toBe(false);
});

test("In place vector addition", () => {
    const vectors: Vector[] = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 3],
        [2, 2, 2],
        [3, 3, 5],
        [1, 1],
        [1, 1],
        [2, 2],
        [2, 2, 1],
    ];

    LowLevel.addToUnchecked(vectors[0] as Vector, vectors[1] as Vector);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[3] as Vector)).toBe(true);

    LowLevel.addToUnchecked(vectors[0] as Vector, vectors[2] as Vector);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[4] as Vector)).toBe(true);

    LowLevel.addToUnchecked(vectors[5] as Vector, vectors[2] as Vector);
    expect(LowLevel.areTwoVectorsEqual(vectors[5] as Vector, vectors[7] as Vector)).toBe(true);

    LowLevel.addTo(vectors[1] as Vector, vectors[6] as Vector);
    expect(LowLevel.areTwoVectorsEqual(vectors[1] as Vector, vectors[8] as Vector)).toBe(true);
});

test("In place vector addition many", () => {
    const vectors: Vector[] = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 3],
        [3, 3, 4],
        [3, 3, 5],
        [1, 1],
        [1, 1],
        [2, 2],
    ];

    LowLevel.addToManyUnchecked(vectors[0] as Vector, [vectors[1] as Vector, vectors[2] as Vector]);
    expect(LowLevel.areTwoVectorsEqual(vectors[0] as Vector, vectors[4] as Vector)).toBe(true);

    LowLevel.addToManyUnchecked(vectors[5] as Vector, [vectors[2] as Vector]);
    expect(LowLevel.areTwoVectorsEqual(vectors[5] as Vector, vectors[7] as Vector)).toBe(true);

    LowLevel.addToMany(vectors[1] as Vector, [vectors[6] as Vector, vectors[2] as Vector]);
    expect(LowLevel.areTwoVectorsEqual(vectors[1] as Vector, vectors[3] as Vector)).toBe(true);
});

test("Vector addition", () => {
    const vectors = [
        [1, 1, 1],
        [2, 2, 1],
        [2, 2, 2],
        [3, 3, 5],
        [1, 1],
        [2, 2],
        [3, 3, 1],
        [3, 3, 2],
        [4, 4, 3],
    ] as const;

    expect(LowLevel.areTwoVectorsEqual(LowLevel.add(vectors[0], vectors[0]), vectors[2])).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(LowLevel.add(vectors[0], vectors[1]), vectors[7])).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(LowLevel.add(vectors[4], vectors[1]), vectors[6])).toBe(true);
    expect(LowLevel.areTwoVectorsEqual(LowLevel.add(vectors[4], vectors[1]), vectors[5])).toBe(false);
    expect(LowLevel.areTwoVectorsEqual(LowLevel.add(vectors[0], vectors[1]), vectors[3])).toBe(false);
    expect(LowLevel.areTwoVectorsEqual(LowLevel.add(vectors[0], vectors[1]), vectors[4])).toBe(false);
    expect(LowLevel.areTwoVectorsEqual(LowLevel.add(vectors[4], vectors[4]), vectors[5])).toBe(true);

    expect(LowLevel.areTwoVectorsEqual(LowLevel.add(vectors[0], vectors[0], vectors[1]), vectors[8])).toBe(true);
});

test("magnitude", () => {
    const vectors = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [1, 1],
        [2, 2],
        [3, 3],
    ] as const;

    expect(LowLevel.areTwoScalarsEqual(LowLevel.magnitude(vectors[0]), Math.sqrt(3))).toBe(true);
    expect(LowLevel.areTwoScalarsEqual(LowLevel.magnitude(vectors[1]), Math.sqrt(12))).toBe(true);
    expect(LowLevel.areTwoScalarsEqual(LowLevel.magnitude(vectors[2]), Math.sqrt(27))).toBe(true);
    expect(LowLevel.areTwoScalarsEqual(LowLevel.magnitude(vectors[3]), Math.sqrt(2))).toBe(true);
    expect(LowLevel.areTwoScalarsEqual(LowLevel.magnitude(vectors[4]), Math.sqrt(8))).toBe(true);
    expect(LowLevel.areTwoScalarsEqual(LowLevel.magnitude(vectors[5]), Math.sqrt(18))).toBe(true);
});

test("copy", () => {
    const vectors = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [1, 1],
        [2, 2],
        [3, 3],
    ] as const;

    for (const vector of vectors) {
        const copy = LowLevel.copyVector(vector);
        expect(LowLevel.areTwoVectorsEqual(vector, copy)).toBe(true);
    }

    for (const vector of vectors) {
        const copy = LowLevel.copyVectorMany(vector, 4);
        for (const copyVector of copy) {
            expect(LowLevel.areTwoVectorsEqual(vector, copyVector)).toBe(true);
        }
    }
});

test("scalar multiplication in place", () => {
    const vectors = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [1, 1],
        [2, 2],
        [3, 3],
    ] as const;

    for (const vector of vectors) {
        const copy = LowLevel.copyVector(vector);
        LowLevel.multiplyByScalarInPlace(copy, 2);
        expect(LowLevel.areTwoVectorsEqual(copy, vector.map(v => 2 * v))).toBe(true);
    }
});

test("scalar multiplication", () => {
    const vectors = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [1, 1],
        [2, 2],
        [3, 3],
    ] as const;

    for (const vector of vectors) {
        const multiplied = LowLevel.multiplyByScalar(vector, 2);
        expect(LowLevel.areTwoVectorsEqual(multiplied, vector.map(v => 2 * v))).toBe(true);
    }
});

test("normalization in place", () => {
    const vectors = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [1, 1],
        [2, 2],
        [3, 3],
    ] as const;

    for (const vector of vectors) {
        const copy = LowLevel.copyVector(vector);
        LowLevel.normalizeInPlace(copy);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.magnitude(copy), 1)).toBe(true);
    }
});

test("hadamard product in place", () => {
    const vectors = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [1, 1],
        [2, 2],
        [3, 3],
    ] as const;

    for (const vector of vectors) {
        const copy = LowLevel.copyVector(vector);
        LowLevel.hadamardProductInPlace(copy, vector);
        expect(LowLevel.areTwoVectorsEqual(copy, vector.map(v => v * v))).toBe(true);
    }
});

test("hadamard product", () => {
    const vectors = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [1, 1],
        [2, 2],
        [3, 3],
    ] as const;

    for (const vector of vectors) {
        const hadamardProduct = LowLevel.hadamardProduct(vector, vector);
        expect(LowLevel.areTwoVectorsEqual(hadamardProduct, vector.map(v => v * v))).toBe(true);
    }
});

test("vector equvalence", () => {
    const equivalentVectors = [
        [[1, 1, 1], [1, 1, 1]],
        [[0, 0, 0], [0, 0, 0]],
        [[-1, -1, -1], [-1, -1, -1]],
        [[1, 2, 3], [2, 4, 6]],
        [[0, 1, 2], [0, 2, 4]],
        [[1, 2, 3], [-2, -4, -6]],
        [[], []],
        [[1], [2]],
        [[1, 2], [2, 4]],
        [[0, 0, 3], [0, 0, 6]],
    ] as const;

    const nonEquivalentVectors = [
        [[1, 1, 1], [1, 1, 2]],
        [[0, 0, 0], [0, 0, 1]],
        [[-1, -1, -1], [-1, -1, -2]],
        [[1, 2, 3], [2, 4, 7]],
        [[0, 1, 2], [0, 2, 5]],
        [[1, 2, 3], [-2, -4, -7]],
        [[], [1]],
        [[1], []],
        [[1, 2], [2, 4, 6]],
        [[0, 0, 3], [0, 0, 6, 9]],
        [[0, 0, 0, 0], [0, 0, 0]]
    ] as const;

    for (const [v1, v2] of equivalentVectors) {
        expect(LowLevel.areTwoVectorsEquivalent(v1, v2)).toBe(true);
    }

    for (const [v1, v2] of nonEquivalentVectors) {
        expect(LowLevel.areTwoVectorsEquivalent(v1, v2)).toBe(false);
    }
});

test("scalar product (dot product)", () => {
    const vectors = [
        [[1, 1, 1], [1, 1, 1], 3],
        [[0, 0, 0], [0, 0, 0], 0],
        [[-1, -1, -1], [-1, -1, -1], 3],
        [[1, 2, 3], [2, 4, 6], 28],
        [[0, 1, 2], [1, 2, 4], 10],
        [[1, 2, 3], [-2, -4, -6], -28],
    ] as const;

    for (const [v1, v2, expected] of vectors) {
        expect(LowLevel.areTwoScalarsEqual(LowLevel.dotProduct(v1, v2), expected)).toBe(true);
    };

    expect(() => LowLevel.dotProduct([1, 2], [1, 2, 3])).toThrow();
});

test("magnitude squared", () => {
    const vectors = [
        [[1, 1, 1], 3],
        [[0, 0, 0], 0],
        [[-1, -1, -1], 3],
        [[1, 2, 3], 14],
        [[0, 1, 2], 5],
        [[1, 2, 3], 14],
    ] as const;

    for (const [v, expected] of vectors) {
        expect(LowLevel.areTwoScalarsEqual(LowLevel.magnitudeSquared(v), expected)).toBe(true);
    }
});

test("cross product", () => {
    const vectors = [
        [[1, 1, 1], [1, 1, 1], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[-1, -1, -1], [-1, -1, -1], [0, 0, 0]],
        [[1, 2, 3], [2, 4, 6], [0, 0, 0]],
        [[0, 1, 2], [1, 2, 4], [0, 2, -1]],
        [[1, 2, 3], [-2, -4, -6], [0, 0, 0]],
    ] as const;

    for (const [v1, v2, expected] of vectors) {
        expect(LowLevel.areTwoVectorsEqual(LowLevel.crossProduct(v1, v2), expected)).toBe(true);
    };

    for (const [v1, v2, v3] of vectors) {
        const vp = LowLevel.crossProduct(v1, v2);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.dotProduct(vp, v1), 0)).toBe(true);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.dotProduct(vp, v2), 0)).toBe(true);

        const vp2 = LowLevel.crossProduct(v2, v3);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.dotProduct(vp2, v2), 0)).toBe(true);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.dotProduct(vp2, v3), 0)).toBe(true);

        const vp3 = LowLevel.crossProduct(v3, v1);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.dotProduct(vp3, v3), 0)).toBe(true);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.dotProduct(vp3, v1), 0)).toBe(true);
    }
});

test("vector triple product", () => {
    const vectors = [
        [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
        [[1, 2, 3], [2, 4, 6], [3, 6, 9]],
        [[0, 1, 2], [1, 2, 4], [2, 4, 8]],
        [[1, 2, 3], [-2, -4, -6], [3, 6, 9]],
    ] as const;

    for (const [v1, v2, v3] of vectors) {
        expect(LowLevel.areTwoScalarsEqual(LowLevel.scalarTripleProduct(v1, v2, v3), LowLevel.dotProduct(v1, LowLevel.crossProduct(v2, v3)))).toBe(true);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.scalarTripleProduct(v2, v3, v1), LowLevel.dotProduct(v2, LowLevel.crossProduct(v3, v1)))).toBe(true);
        expect(LowLevel.areTwoScalarsEqual(LowLevel.scalarTripleProduct(v3, v1, v2), LowLevel.dotProduct(v3, LowLevel.crossProduct(v1, v2)))).toBe(true);
    }
});

test("scalar triple product", () => {
    const vectors = [
        [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
        [[1, 2, 3], [2, 4, 6], [3, 6, 9]],
        [[0, 1, 2], [1, 2, 4], [2, 4, 8]],
        [[1, 2, 3], [-2, -4, -6], [3, 6, 9]],
    ] as const;

    for (const [v1, v2, v3] of vectors) {
        expect(LowLevel.areTwoVectorsEqual(LowLevel.vectorTripleProduct(v1, v2, v3), LowLevel.crossProduct(v1, LowLevel.crossProduct(v2, v3)))).toBe(true);
        expect(LowLevel.areTwoVectorsEqual(LowLevel.vectorTripleProduct(v2, v3, v1), LowLevel.crossProduct(v2, LowLevel.crossProduct(v3, v1)))).toBe(true);
        expect(LowLevel.areTwoVectorsEqual(LowLevel.vectorTripleProduct(v3, v1, v2), LowLevel.crossProduct(v3, LowLevel.crossProduct(v1, v2)))).toBe(true);
    }
});

test("vector average", () => {
    const vectors = [
        [[[1, 1, 1], [1, 1, 1], [1, 1, 1]], [1, 1, 1]],
        [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [0, 0, 0]],
        [[[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]], [-1, -1, -1]],
        [[[1, 2, 3], [2, 4, 6], [3, 6, 9]], [2, 4, 6]],
        [[[0, 1, 2], [1, 2, 4], [2, 4, 8]], [1, 7 / 3, 14 / 3]],
        [[[1, 2, 3], [-2, -4, -6], [3, 6, 9]], [2 / 3, 4 / 3, 2]]
    ] as const;


    for (const [vects, average] of vectors) {
        expect(LowLevel.areTwoVectorsEqual(LowLevel.vectorAverage(vects), average)).toBe(true);
    }

});

test("subtraction in place", () => {
    const vectors = [
        [[1, 1, 1], [1, 1, 1], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[-1, -1, -1], [-1, -1, -1], [0, 0, 0]],
        [[1, 2, 3], [2, 4, 6], [-1, -2, -3]],
        [[0, 1, 2], [1, 2, 4], [-1, -1, -2]],
        [[1, 2, 3], [-2, -4, -6], [3, 6, 9]],
    ] as const;

    for (const [v1, v2, expected] of vectors) {
        const v1Copy = [...v1];
        LowLevel.subtractFrom(v1Copy, v2);
        expect(LowLevel.areTwoVectorsEqual(v1Copy, expected)).toBe(true);
    }
});

test("matrix equality", () => {
    const m1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ] as const;
    const m2 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ] as const;
    const m3 = [
        [1, 2, 3],
        [4, 5, 6],
    ] as const;
    const m4 = [
        [1, 2, 3],
        [3, 5, 6],
        [7, 8, 9],
    ] as const;
    const m5 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 10],
    ] as const;

    expect(LowLevel.areTwoMatricesEqual(m1, m2)).toBe(true);
    expect(LowLevel.areTwoMatricesEqual(m1, m3)).toBe(false);
    expect(LowLevel.areTwoMatricesEqual(m1, m4)).toBe(false);
    expect(LowLevel.areTwoMatricesEqual(m1, m5)).toBe(false);
    expect(LowLevel.areTwoMatricesEqual(m2, m5)).toBe(false);
    expect(LowLevel.areTwoMatricesEqual(m3, m4)).toBe(false);
    expect(LowLevel.areTwoMatricesEqual(m3, m5)).toBe(false);
    expect(LowLevel.areTwoMatricesEqual(m4, m5)).toBe(false);
});

test("matrix multiplication", () => {
    const M1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ] as const;
    const M2 = [
        [1, 2, 3],
        [4, 3, 6],
        [5, 8, 9],
    ] as const;
    const M3 = [
        [1, 2, 3],
        [4, 5, 6],
    ] as const;
    const M4 = [
        [1, 2],
        [4, 3],
        [5, 8],
    ] as const;

    const M1M2 = [
        [24, 32, 42],
        [54, 71, 96],
        [84, 110, 150],
    ] as const;
    const M2M1 = [
        [30, 36, 42],
        [58, 71, 84],
        [100, 122, 144]
    ] as const;
    const M3M4 = [
        [24, 32],
        [54, 71]
    ]


    expect(LowLevel.areTwoMatricesEqual(LowLevel.matrixMultiplication(M1, M2), M1M2)).toBe(true);
    expect(LowLevel.areTwoMatricesEqual(LowLevel.matrixMultiplication(M2, M1), M2M1)).toBe(true);
    expect(LowLevel.areTwoMatricesEqual(LowLevel.matrixMultiplication(M3, M4), M3M4)).toBe(true);

})

test("copy matrix", () => {
    const M1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ] as const;

    const M1Copy = LowLevel.copyMatrix(M1);
    expect(LowLevel.areTwoMatricesEqual(M1, M1Copy)).toBe(true);
});