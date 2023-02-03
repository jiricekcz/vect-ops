namespace VectOps {
    export type Scalar = number;
    export type Vector = Array<Scalar>;
    export type Matrix = Array<Vector>;
    export type ReadonlyVector = Readonly<Vector>;
    export type ReadonlyMatrix = Readonly<Matrix>;

    export const COMPARE_MODES = {
        STRICT_EQUALITY: (a: Scalar, b: Scalar) => a === b,
        EQUALITY: (a: Scalar, b: Scalar) => a == b,
        FLOAT_EQUALITY_15_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-15,
        FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-14,
        FLOAT_EQUALITY_12_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-12,
        FLOAT_EQUALITY_10_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-10,
        FLOAT_EQUALITY_9_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-9,
        FLOAT_EQUALITY_6_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-6,
        FLOAT_EQUALITY_15_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-15,
        FLOAT_EQUALITY_12_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-12,
        FLOAT_EQUALITY_10_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-10,
        FLOAT_EQUALITY_9_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-9,
        FLOAT_EQUALITY_6_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-6,
    } as const;

    /**
     * Change this variable to change the compare mode.
     * Defaults to `COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS`
     * Compare mode influences, how floats are compared.
     */
    export const compareMode: (a: Scalar, b: Scalar) => boolean = COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS;

    /**
     * Compares two scalars using the compare mode.
     * Slighly optimized version of `areScalarEqual` for only two scalars.
     * @param a Scalar to compare
     * @param b Scalar to compare
     * @returns Whether the two scalars meet the requirements of the compare mode to be considered equal.
     */
    export function areTwoScalarsEqual(a: Scalar, b: Scalar): boolean {
        return compareMode(a, b);
    }

    /**
     * Compares scalars using the compare mode.
     * @param scalars Scalars to compare
     * @returns Whether the two scalars meet the requirements of the compare mode to be considered equal.
     */
    export function areScalarsEqual(...scalars: Array<Scalar>): boolean {
        for (let i = 1; i < scalars.length; i++) {
            if (!areTwoScalarsEqual(scalars[i - 1] as Scalar, scalars[i] as Scalar)) return false;
        }
        return true;
    }

    /**
     * Compares two vector in the first `onLength` numbers using the compare mode.
     * @param a First vector
     * @param b Second vector
     * @param onLength Length of the vectors to compare. Defaults to the length of the first vector.
     * @returns If the two vectors are equal on the first `onLength` numbers.
     */
    export function areTwoVectorsEqual(a: ReadonlyVector, b: ReadonlyVector, onLength: number = a.length): boolean {
        for (let i = 0; i < onLength; i++) {
            if (!areTwoScalarsEqual(a[i] as Scalar, b[i] as Scalar)) return false;
        }
        return true;
    }

    /**
     * Compares vectors using the compare mode.
     * @param vectors Array of vectors to compare
     * @param onLength Length of the vectors to compare. Defaults to the length of the first vector.
     * @returns If the vectors are equal on the first `onLength` numbers.
     */
    export function areVectorsEqual(vectors: Array<ReadonlyVector>, onLength: number = vectors[0]?.length as number): boolean {
        for (let i = 1; i < vectors.length; i++) {
            for (let j = 0; j < onLength; j++) {
                if (!areTwoScalarsEqual((vectors[i] as Vector)[j] as Scalar, (vectors[i - 1] as Vector)[j] as Scalar)) return false;
            }
        }
        return true;
    }

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
    export function addToUnchecked(original: Vector, add: ReadonlyVector, length: number = original.length): Vector {
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
    export function addTo(original: Vector, add: ReadonlyVector, length: number = original.length): Vector {
        for (let i = 0; i < length; i++) {
            original[i] += add[i] ?? 0;
        }
        return original;
    }
}

export default VectOps;
