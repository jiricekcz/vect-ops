import VectOps from "../src/index";

test("Scalar comparison", () => {
    expect(VectOps.areTwoScalarsEqual(0, 0)).toBe(true);
    expect(VectOps.areTwoScalarsEqual(1, 1)).toBe(true);
    expect(VectOps.areTwoScalarsEqual(1, 2)).toBe(false);
    expect(VectOps.areTwoScalarsEqual(1, 1.00000000000000001)).toBe(true);
    expect(VectOps.areTwoScalarsEqual(0.1 + 0.2, 0.3)).toBe(true);

    expect(VectOps.areScalarsEqual(1, 1)).toBe(true);
    expect(VectOps.areScalarsEqual(1, 2)).toBe(false);
    expect(VectOps.areScalarsEqual(1, 1.00000000000000001)).toBe(true);
    expect(VectOps.areScalarsEqual(0.1 + 0.2, 0.3)).toBe(true);
    expect(VectOps.areScalarsEqual(1, 1, 1)).toBe(true);
    expect(VectOps.areScalarsEqual(1, 1, 2)).toBe(false);
    expect(VectOps.areScalarsEqual(1, 1, 1.00000000000000001)).toBe(true);
    expect(VectOps.areScalarsEqual(0.1 + 0.2, 0.3, 0.3)).toBe(true);
    expect(VectOps.areScalarsEqual(1, 1, 1, 1)).toBe(true);
    expect(VectOps.areScalarsEqual(1, 1, 1, 2)).toBe(false);
    expect(VectOps.areScalarsEqual(1, 1, 1, 1.00000000000000001)).toBe(true);
});
test("Vector comparison", () => {
    const vectors: VectOps.Vector[] = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 3],
        [1, 1, 1.00000000000000001],
        [0.1 + 0.2, 0.3, 0.3],
        [0.3, 0.3, 0.1 + 0.2],
        [1, 1],
        [2, 1],
    ];

    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[0] as VectOps.Vector)).toBe(true);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[1] as VectOps.Vector)).toBe(true);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[2] as VectOps.Vector)).toBe(false);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[3] as VectOps.Vector)).toBe(true);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[4] as VectOps.Vector)).toBe(false);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[5] as VectOps.Vector)).toBe(false);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[6] as VectOps.Vector)).toBe(false);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[7] as VectOps.Vector)).toBe(false);

    expect(VectOps.areTwoVectorsEqual(vectors[6] as VectOps.Vector, vectors[0] as VectOps.Vector)).toBe(true);
    expect(VectOps.areTwoVectorsEqual(vectors[6] as VectOps.Vector, vectors[1] as VectOps.Vector)).toBe(true);
    expect(VectOps.areTwoVectorsEqual(vectors[6] as VectOps.Vector, vectors[2] as VectOps.Vector)).toBe(true);
    expect(VectOps.areTwoVectorsEqual(vectors[6] as VectOps.Vector, vectors[3] as VectOps.Vector)).toBe(true);

    expect(VectOps.areTwoVectorsEqual(vectors[1] as VectOps.Vector, vectors[2] as VectOps.Vector, 2)).toBe(true);
    expect(VectOps.areTwoVectorsEqual(vectors[4] as VectOps.Vector, vectors[5] as VectOps.Vector)).toBe(true);

    expect(VectOps.areVectorsEqual([vectors[0] as VectOps.Vector, vectors[0] as VectOps.Vector, vectors[1] as VectOps.Vector, vectors[3] as VectOps.Vector])).toBe(true);
    expect(VectOps.areVectorsEqual([vectors[6] as VectOps.Vector, vectors[0] as VectOps.Vector, vectors[1] as VectOps.Vector, vectors[3] as VectOps.Vector, vectors[2] as VectOps.Vector])).toBe(true);
    expect(VectOps.areVectorsEqual([vectors[0] as VectOps.Vector, vectors[1] as VectOps.Vector, vectors[3] as VectOps.Vector, vectors[2] as VectOps.Vector], 2)).toBe(true);
    expect(VectOps.areVectorsEqual([vectors[4] as VectOps.Vector, vectors[5] as VectOps.Vector])).toBe(true);
    expect(VectOps.areVectorsEqual([vectors[0] as VectOps.Vector, vectors[1] as VectOps.Vector, vectors[3] as VectOps.Vector, vectors[2] as VectOps.Vector])).toBe(false);
});

test("In place vector addition", () => {
    const vectors: VectOps.Vector[] = [
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

    VectOps.addToUnchecked(vectors[0] as VectOps.Vector, vectors[1] as VectOps.Vector);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[3] as VectOps.Vector)).toBe(true);

    VectOps.addToUnchecked(vectors[0] as VectOps.Vector, vectors[2] as VectOps.Vector);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[4] as VectOps.Vector)).toBe(true);

    VectOps.addToUnchecked(vectors[5] as VectOps.Vector, vectors[2] as VectOps.Vector);
    expect(VectOps.areTwoVectorsEqual(vectors[5] as VectOps.Vector, vectors[7] as VectOps.Vector)).toBe(true);

    VectOps.addTo(vectors[1] as VectOps.Vector, vectors[6] as VectOps.Vector);
    expect(VectOps.areTwoVectorsEqual(vectors[1] as VectOps.Vector, vectors[8] as VectOps.Vector)).toBe(true);
});

test("In place vector addition many", () => {
    const vectors: VectOps.Vector[] = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 3],
        [3, 3, 4],
        [3, 3, 5],
        [1, 1],
        [1, 1],
        [2, 2],
    ];

    VectOps.addToManyUnchecked(vectors[0] as VectOps.Vector, [vectors[1] as VectOps.Vector, vectors[2] as VectOps.Vector]);
    expect(VectOps.areTwoVectorsEqual(vectors[0] as VectOps.Vector, vectors[4] as VectOps.Vector)).toBe(true);

    VectOps.addToManyUnchecked(vectors[5] as VectOps.Vector, [vectors[2] as VectOps.Vector]);
    expect(VectOps.areTwoVectorsEqual(vectors[5] as VectOps.Vector, vectors[7] as VectOps.Vector)).toBe(true);

    VectOps.addToMany(vectors[1] as VectOps.Vector, [vectors[6] as VectOps.Vector, vectors[2] as VectOps.Vector]);
    expect(VectOps.areTwoVectorsEqual(vectors[1] as VectOps.Vector, vectors[3] as VectOps.Vector)).toBe(true);
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

    expect(VectOps.areTwoVectorsEqual(VectOps.add(vectors[0], vectors[0]), vectors[2])).toBe(true);
    expect(VectOps.areTwoVectorsEqual(VectOps.add(vectors[0], vectors[1]), vectors[7])).toBe(true);
    expect(VectOps.areTwoVectorsEqual(VectOps.add(vectors[4], vectors[1]), vectors[6])).toBe(true);
    expect(VectOps.areTwoVectorsEqual(VectOps.add(vectors[4], vectors[1]), vectors[5])).toBe(false);
    expect(VectOps.areTwoVectorsEqual(VectOps.add(vectors[0], vectors[1]), vectors[3])).toBe(false);
    expect(VectOps.areTwoVectorsEqual(VectOps.add(vectors[0], vectors[1]), vectors[4])).toBe(false);
    expect(VectOps.areTwoVectorsEqual(VectOps.add(vectors[4], vectors[4]), vectors[5])).toBe(true);

    expect(VectOps.areTwoVectorsEqual(VectOps.add(vectors[0], vectors[0], vectors[1]), vectors[8])).toBe(true);
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

    expect(VectOps.areTwoScalarsEqual(VectOps.magnitude(vectors[0]), Math.sqrt(3))).toBe(true);
    expect(VectOps.areTwoScalarsEqual(VectOps.magnitude(vectors[1]), Math.sqrt(12))).toBe(true);
    expect(VectOps.areTwoScalarsEqual(VectOps.magnitude(vectors[2]), Math.sqrt(27))).toBe(true);
    expect(VectOps.areTwoScalarsEqual(VectOps.magnitude(vectors[3]), Math.sqrt(2))).toBe(true);
    expect(VectOps.areTwoScalarsEqual(VectOps.magnitude(vectors[4]), Math.sqrt(8))).toBe(true);
    expect(VectOps.areTwoScalarsEqual(VectOps.magnitude(vectors[5]), Math.sqrt(18))).toBe(true);
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
        const copy = VectOps.copyVector(vector);
        expect(VectOps.areTwoVectorsEqual(vector, copy)).toBe(true);
    }

    for (const vector of vectors) {
        const copy = VectOps.copyVectorMany(vector, 4);
        for (const copyVector of copy) {
            expect(VectOps.areTwoVectorsEqual(vector, copyVector)).toBe(true);
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
        const copy = VectOps.copyVector(vector);
        VectOps.multiplyByScalarInPlace(copy, 2);
        expect(VectOps.areTwoVectorsEqual(copy, vector.map(v => 2*v))).toBe(true);
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
        const multiplied = VectOps.multiplyByScalar(vector, 2);
        expect(VectOps.areTwoVectorsEqual(multiplied, vector.map(v => 2*v))).toBe(true);
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
        const copy = VectOps.copyVector(vector);
        VectOps.normalizeInPlace(copy);
        expect(VectOps.areTwoScalarsEqual(VectOps.magnitude(copy), 1)).toBe(true);
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
        const copy = VectOps.copyVector(vector);
        VectOps.hadamardProductInPlace(copy, vector);
        expect(VectOps.areTwoVectorsEqual(copy, vector.map(v => v*v))).toBe(true);
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
        const hadamardProduct = VectOps.hadamardProduct(vector, vector);
        expect(VectOps.areTwoVectorsEqual(hadamardProduct, vector.map(v => v*v))).toBe(true);
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
        [[],[]],
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
        expect(VectOps.areTwoVectorsEquivalent(v1, v2)).toBe(true);
    }

    for (const [v1, v2] of nonEquivalentVectors) {
        expect(VectOps.areTwoVectorsEquivalent(v1, v2)).toBe(false);
    }
});