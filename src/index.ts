namespace VectOps {

    export type Scalar = number;
    export type Vector = Array<Scalar>;
    export type Matrix = Array<Vector>;

    export const COMPARE_MODES = {
        STRICT_EQUALITY: (a: Scalar, b: Scalar) => a === b,
        EQUALITY: (a: Scalar, b: Scalar) => a == b,
        FLOAT_EQUALITY_15_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) < Math.min(Math.abs(a), Math.abs(b)) * 1e-15,
        FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) < Math.min(Math.abs(a), Math.abs(b)) * 1e-14,
        FLOAT_EQUALITY_12_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) < Math.min(Math.abs(a), Math.abs(b)) * 1e-12,
        FLOAT_EQUALITY_10_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) < Math.min(Math.abs(a), Math.abs(b)) * 1e-10,
        FLOAT_EQUALITY_9_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) < Math.min(Math.abs(a), Math.abs(b)) * 1e-9,
        FLOAT_EQUALITY_6_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) < Math.min(Math.abs(a), Math.abs(b)) * 1e-6,
        FLOAT_EQUALITY_15_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) < 1e-15,
        FLOAT_EQUALITY_12_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) < 1e-12,
        FLOAT_EQUALITY_10_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) < 1e-10,
        FLOAT_EQUALITY_9_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) < 1e-9,
        FLOAT_EQUALITY_6_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) < 1e-6,
    } as const;

    
    export let compareMode: (a: Scalar, b: Scalar) => boolean = COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS;
    /**
     * Adds one vector to another.  
     * This method ***modifies*** the *original* (first parameter) vector.  
     * Requires the second vector to be at least as long as the first or `length` to be set to a number smaller than the length of both vecotrs. Numbers after will be ignored. If second vector is shorter, it is undefined behavior.  
     * Is faster than `addTo` because it doesn't have to check for undefined values.
     * @param original The original vector
     * @param add The vector to add to the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     */
    export function addToUnchecked(original: Vector, add: Vector, length: number = original.length): Vector {
        for (let i = 0; i < length; i++) {
            original[i] += add[i] as Scalar;
        }
        return original;
    }

    /**
     * Adds one vector to another.  
     * This method ***modifies*** the *original* (first parameter) vector.
     * If the second vector is shorter, it will be padded with zeros.
     * Is slower than `addToUnchecked` because it has to check for undefined values.
     * @param original The original vector
     * @param add The vector to add to the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     */
    export function addTo(original: Vector, add: Vector, length: number = original.length): Vector {
        for (let i = 0; i < length; i++) {
            original[i] += add[i] ?? 0;
        }
        return original;
    }

    export function areEqualOnLength(vectors: Array<Vector>, compareLength: number = vectors[0]?.length ?? 0): boolean {
        if (compareLength === 0) return true;
        if (vectors.length < 2) return true;
        for (let i = 1; i < vectors.length; i++) {

        }
    }
};

export default VectOps;