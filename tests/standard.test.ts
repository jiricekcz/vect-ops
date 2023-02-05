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
