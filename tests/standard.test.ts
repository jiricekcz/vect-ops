import { Raw } from "../src/index";

test("Scalar comparison", () => {
    expect(Raw.areTwoScalarsEqual(0, 0)).toBe(true);
    expect(Raw.areTwoScalarsEqual(1, 1)).toBe(true);
    expect(Raw.areTwoScalarsEqual(1, 2)).toBe(false);
    expect(Raw.areTwoScalarsEqual(1, 1.00000000000000001)).toBe(true);
    expect(Raw.areTwoScalarsEqual(0.1 + 0.2, 0.3)).toBe(true);

    expect(Raw.areScalarsEqual(1, 1)).toBe(true);
    expect(Raw.areScalarsEqual(1, 2)).toBe(false);
    expect(Raw.areScalarsEqual(1, 1.00000000000000001)).toBe(true);
    expect(Raw.areScalarsEqual(0.1 + 0.2, 0.3)).toBe(true);
    expect(Raw.areScalarsEqual(1, 1, 1)).toBe(true);
    expect(Raw.areScalarsEqual(1, 1, 2)).toBe(false);
    expect(Raw.areScalarsEqual(1, 1, 1.00000000000000001)).toBe(true);
    expect(Raw.areScalarsEqual(0.1 + 0.2, 0.3, 0.3)).toBe(true);
    expect(Raw.areScalarsEqual(1, 1, 1, 1)).toBe(true);
    expect(Raw.areScalarsEqual(1, 1, 1, 2)).toBe(false);
    expect(Raw.areScalarsEqual(1, 1, 1, 1.00000000000000001)).toBe(true);
});
test("Vector comparison", () => {
    const vectors: Raw.Vector[] = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 3],
        [1, 1, 1.00000000000000001],
        [0.1 + 0.2, 0.3, 0.3],
        [0.3, 0.3, 0.1 + 0.2],
        [1, 1],
        [2, 1],
    ];

    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[0] as Raw.Vector)).toBe(true);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[1] as Raw.Vector)).toBe(true);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[2] as Raw.Vector)).toBe(false);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[3] as Raw.Vector)).toBe(true);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[4] as Raw.Vector)).toBe(false);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[5] as Raw.Vector)).toBe(false);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[6] as Raw.Vector)).toBe(false);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[7] as Raw.Vector)).toBe(false);

    expect(Raw.areTwoVectorsEqual(vectors[6] as Raw.Vector, vectors[0] as Raw.Vector)).toBe(true);
    expect(Raw.areTwoVectorsEqual(vectors[6] as Raw.Vector, vectors[1] as Raw.Vector)).toBe(true);
    expect(Raw.areTwoVectorsEqual(vectors[6] as Raw.Vector, vectors[2] as Raw.Vector)).toBe(true);
    expect(Raw.areTwoVectorsEqual(vectors[6] as Raw.Vector, vectors[3] as Raw.Vector)).toBe(true);

    expect(Raw.areTwoVectorsEqual(vectors[1] as Raw.Vector, vectors[2] as Raw.Vector, 2)).toBe(true);
    expect(Raw.areTwoVectorsEqual(vectors[4] as Raw.Vector, vectors[5] as Raw.Vector)).toBe(true);

    expect(Raw.areVectorsEqual([vectors[0] as Raw.Vector, vectors[0] as Raw.Vector, vectors[1] as Raw.Vector, vectors[3] as Raw.Vector])).toBe(true);
    expect(Raw.areVectorsEqual([vectors[6] as Raw.Vector, vectors[0] as Raw.Vector, vectors[1] as Raw.Vector, vectors[3] as Raw.Vector, vectors[2] as Raw.Vector])).toBe(true);
    expect(Raw.areVectorsEqual([vectors[0] as Raw.Vector, vectors[1] as Raw.Vector, vectors[3] as Raw.Vector, vectors[2] as Raw.Vector], 2)).toBe(true);
    expect(Raw.areVectorsEqual([vectors[4] as Raw.Vector, vectors[5] as Raw.Vector])).toBe(true);
    expect(Raw.areVectorsEqual([vectors[0] as Raw.Vector, vectors[1] as Raw.Vector, vectors[3] as Raw.Vector, vectors[2] as Raw.Vector])).toBe(false);
});

test("In place vector addition", () => {
    const vectors: Raw.Vector[] = [
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

    Raw.addToUnchecked(vectors[0] as Raw.Vector, vectors[1] as Raw.Vector);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[3] as Raw.Vector)).toBe(true);

    Raw.addToUnchecked(vectors[0] as Raw.Vector, vectors[2] as Raw.Vector);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[4] as Raw.Vector)).toBe(true);

    Raw.addToUnchecked(vectors[5] as Raw.Vector, vectors[2] as Raw.Vector);
    expect(Raw.areTwoVectorsEqual(vectors[5] as Raw.Vector, vectors[7] as Raw.Vector)).toBe(true);

    Raw.addTo(vectors[1] as Raw.Vector, vectors[6] as Raw.Vector);
    expect(Raw.areTwoVectorsEqual(vectors[1] as Raw.Vector, vectors[8] as Raw.Vector)).toBe(true);
});

test("In place vector addition many", () => {
    const vectors: Raw.Vector[] = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 3],
        [3, 3, 4],
        [3, 3, 5],
        [1, 1],
        [1, 1],
        [2, 2],
    ];

    Raw.addToManyUnchecked(vectors[0] as Raw.Vector, [vectors[1] as Raw.Vector, vectors[2] as Raw.Vector]);
    expect(Raw.areTwoVectorsEqual(vectors[0] as Raw.Vector, vectors[4] as Raw.Vector)).toBe(true);

    Raw.addToManyUnchecked(vectors[5] as Raw.Vector, [vectors[2] as Raw.Vector]);
    expect(Raw.areTwoVectorsEqual(vectors[5] as Raw.Vector, vectors[7] as Raw.Vector)).toBe(true);

    Raw.addToMany(vectors[1] as Raw.Vector, [vectors[6] as Raw.Vector, vectors[2] as Raw.Vector]);
    expect(Raw.areTwoVectorsEqual(vectors[1] as Raw.Vector, vectors[3] as Raw.Vector)).toBe(true);
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

    expect(Raw.areTwoVectorsEqual(Raw.add(vectors[0], vectors[0]), vectors[2])).toBe(true);
    expect(Raw.areTwoVectorsEqual(Raw.add(vectors[0], vectors[1]), vectors[7])).toBe(true);
    expect(Raw.areTwoVectorsEqual(Raw.add(vectors[4], vectors[1]), vectors[6])).toBe(true);
    expect(Raw.areTwoVectorsEqual(Raw.add(vectors[4], vectors[1]), vectors[5])).toBe(false);
    expect(Raw.areTwoVectorsEqual(Raw.add(vectors[0], vectors[1]), vectors[3])).toBe(false);
    expect(Raw.areTwoVectorsEqual(Raw.add(vectors[0], vectors[1]), vectors[4])).toBe(false);
    expect(Raw.areTwoVectorsEqual(Raw.add(vectors[4], vectors[4]), vectors[5])).toBe(true);

    expect(Raw.areTwoVectorsEqual(Raw.add(vectors[0], vectors[0], vectors[1]), vectors[8])).toBe(true);
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

    expect(Raw.areTwoScalarsEqual(Raw.magnitude(vectors[0]), Math.sqrt(3))).toBe(true);
    expect(Raw.areTwoScalarsEqual(Raw.magnitude(vectors[1]), Math.sqrt(12))).toBe(true);
    expect(Raw.areTwoScalarsEqual(Raw.magnitude(vectors[2]), Math.sqrt(27))).toBe(true);
    expect(Raw.areTwoScalarsEqual(Raw.magnitude(vectors[3]), Math.sqrt(2))).toBe(true);
    expect(Raw.areTwoScalarsEqual(Raw.magnitude(vectors[4]), Math.sqrt(8))).toBe(true);
    expect(Raw.areTwoScalarsEqual(Raw.magnitude(vectors[5]), Math.sqrt(18))).toBe(true);
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
        const copy = Raw.copyVector(vector);
        expect(Raw.areTwoVectorsEqual(vector, copy)).toBe(true);
    }

    for (const vector of vectors) {
        const copy = Raw.copyVectorMany(vector, 4);
        for (const copyVector of copy) {
            expect(Raw.areTwoVectorsEqual(vector, copyVector)).toBe(true);
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
        const copy = Raw.copyVector(vector);
        Raw.multiplyByScalarInPlace(copy, 2);
        expect(Raw.areTwoVectorsEqual(copy, vector.map(v => 2 * v))).toBe(true);
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
        const multiplied = Raw.multiplyByScalar(vector, 2);
        expect(Raw.areTwoVectorsEqual(multiplied, vector.map(v => 2 * v))).toBe(true);
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
        const copy = Raw.copyVector(vector);
        Raw.normalizeInPlace(copy);
        expect(Raw.areTwoScalarsEqual(Raw.magnitude(copy), 1)).toBe(true);
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
        const copy = Raw.copyVector(vector);
        Raw.hadamardProductInPlace(copy, vector);
        expect(Raw.areTwoVectorsEqual(copy, vector.map(v => v * v))).toBe(true);
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
        const hadamardProduct = Raw.hadamardProduct(vector, vector);
        expect(Raw.areTwoVectorsEqual(hadamardProduct, vector.map(v => v * v))).toBe(true);
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
        expect(Raw.areTwoVectorsEquivalent(v1, v2)).toBe(true);
    }

    for (const [v1, v2] of nonEquivalentVectors) {
        expect(Raw.areTwoVectorsEquivalent(v1, v2)).toBe(false);
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
        expect(Raw.areTwoScalarsEqual(Raw.dotProduct(v1, v2), expected)).toBe(true);
    };

    expect(() => Raw.dotProduct([1, 2], [1, 2, 3])).toThrow();
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
        expect(Raw.areTwoScalarsEqual(Raw.magnitudeSquared(v), expected)).toBe(true);
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
        expect(Raw.areTwoVectorsEqual(Raw.crossProduct(v1, v2), expected)).toBe(true);
    };

    for (const [v1, v2, v3] of vectors) {
        const vp = Raw.crossProduct(v1, v2);
        expect(Raw.areTwoScalarsEqual(Raw.dotProduct(vp, v1), 0)).toBe(true);
        expect(Raw.areTwoScalarsEqual(Raw.dotProduct(vp, v2), 0)).toBe(true);

        const vp2 = Raw.crossProduct(v2, v3);
        expect(Raw.areTwoScalarsEqual(Raw.dotProduct(vp2, v2), 0)).toBe(true);
        expect(Raw.areTwoScalarsEqual(Raw.dotProduct(vp2, v3), 0)).toBe(true);

        const vp3 = Raw.crossProduct(v3, v1);
        expect(Raw.areTwoScalarsEqual(Raw.dotProduct(vp3, v3), 0)).toBe(true);
        expect(Raw.areTwoScalarsEqual(Raw.dotProduct(vp3, v1), 0)).toBe(true);
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
        expect(Raw.areTwoScalarsEqual(Raw.scalarTripleProduct(v1, v2, v3), Raw.dotProduct(v1, Raw.crossProduct(v2, v3)))).toBe(true);
        expect(Raw.areTwoScalarsEqual(Raw.scalarTripleProduct(v2, v3, v1), Raw.dotProduct(v2, Raw.crossProduct(v3, v1)))).toBe(true);
        expect(Raw.areTwoScalarsEqual(Raw.scalarTripleProduct(v3, v1, v2), Raw.dotProduct(v3, Raw.crossProduct(v1, v2)))).toBe(true);
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
        expect(Raw.areTwoVectorsEqual(Raw.vectorTripleProduct(v1, v2, v3), Raw.crossProduct(v1, Raw.crossProduct(v2, v3)))).toBe(true);
        expect(Raw.areTwoVectorsEqual(Raw.vectorTripleProduct(v2, v3, v1), Raw.crossProduct(v2, Raw.crossProduct(v3, v1)))).toBe(true);
        expect(Raw.areTwoVectorsEqual(Raw.vectorTripleProduct(v3, v1, v2), Raw.crossProduct(v3, Raw.crossProduct(v1, v2)))).toBe(true);
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
        expect(Raw.areTwoVectorsEqual(Raw.vectorAverage(vects), average)).toBe(true);
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
        Raw.subtractFrom(v1Copy, v2);
        expect(Raw.areTwoVectorsEqual(v1Copy, expected)).toBe(true);
    }
})