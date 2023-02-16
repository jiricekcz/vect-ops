export { FixedLengthArray } from "./types";
import { FixedLengthArray } from "./types";

/**
 * Scalar type, used instead of `number`.
 */
export type Scalar = number;
/**
 * Vector type, used instead of `Array<Scalar>`.
 */
export type Vector<L extends number = number> = FixedLengthArray<Scalar, L>;
/**
 * Readonly version of `Vector`.
 */
export type ReadonlyVector<L extends number = number> = Readonly<Vector<L>>;
/**
 * Vector with two elements.
 */
export type Vector2D = Vector<2>;
/**
 * Vector with three elements.
 */
export type Vector3D = Vector<3>;
/**
 * Readonly version of `Vector2D`.
 */
export type ReadonlyVector2D = Readonly<Vector2D>;
/**
 * Readonly version of `Vector3D`.
 */
export type ReadonlyVector3D = Readonly<Vector3D>;
/**
 * A matrix type 
 * @param M The number of rows.
 * @param N The number of columns.
 */
export type Matrix<M extends number = number, N extends number = number> = FixedLengthArray<Vector<N>, M>;

/**
 * Readonly version of `Matrix`.
 * @param M The number of rows.
 * @param N The number of columns.
 */
export type ReadonlyMatrix<M extends number = number, N extends number = number> = Readonly<FixedLengthArray<ReadonlyVector<N>, M>>;

/**
 * Compare modes, used to compare Scalars.
 * Necessary because of floating point errors.
 */
export const COMPARE_MODES = {
    /**
     * Strict equality, `===`.
     */
    STRICT_EQUALITY: (a: Scalar, b: Scalar) => a === b,
    /**
     * Loose equality, `==`.
     * NOTE: There should never be a reason to use this. This can change the result as opposed to `STRICT_EQUALITY` only if the operands are of different types, which is never done by the library by design, as it significantly reduces performance.
     */
    EQUALITY: (a: Scalar, b: Scalar) => a == b,
    /**
     * Floating point equality, with 15 significant digits.
     */
    FLOAT_EQUALITY_15_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-15,
    /**
     * Floating point equality, with 14 significant digits.
     */
    FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-14,
    /**
     * Floating point equality, with 12 significant digits.
     */
    FLOAT_EQUALITY_12_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-12,
    /**
     * Floating point equality, with 10 significant digits.
     */
    FLOAT_EQUALITY_10_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-10,
    /**
     * Floating point equality, with 9 significant digits.
     */
    FLOAT_EQUALITY_9_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-9,
    /**
     * Floating point equality, with 6 significant digits.
     */
    FLOAT_EQUALITY_6_SIGNIFICANT_DIGITS: (a: Scalar, b: Scalar) => Math.abs(a - b) <= Math.min(Math.abs(a), Math.abs(b)) * 1e-6,
    /**
     * Floating point equality, with 15 decimal places.
     */
    FLOAT_EQUALITY_15_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-15,
    /**
     * Floating point equality, with 12 decimal places.
     */
    FLOAT_EQUALITY_12_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-12,
    /**
     * Floating point equality, with 10 decimal places.
     */
    FLOAT_EQUALITY_10_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-10,
    /**
     * Floating point equality, with 9 decimal places.
     */
    FLOAT_EQUALITY_9_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-9,
    /**
     * Floating point equality, with 6 decimal places.
     */
    FLOAT_EQUALITY_6_DECIMAL_PLACES: (a: Scalar, b: Scalar) => Math.abs(a - b) <= 1e-6,
} as const;

export class LowLevel<S extends number> {

    /**
     * Change this variable to change the compare mode.
     * Defaults to `COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS`
     * Compare mode influences, how floats are compared.
     */
    static compareMode: (a: Scalar, b: Scalar) => boolean = COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS;

    /**
     * Change this variable to change the compare mode.
     * Defaults to `COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS`
     * Compare mode influences, how floats are compared.
     */
    public compareMode: (a: Scalar, b: Scalar) => boolean = COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS;

    /**
     * Compares two scalars using the compare mode.
     * Slighly optimized version of `areScalarEqual` for only two scalars.
     * @param a Scalar to compare
     * @param b Scalar to compare
     * @returns Whether the two scalars meet the requirements of the compare mode to be considered equal.
     * @time O(1) - is expected to be, but depends on the compare mode.
     */
    static areTwoScalarsEqual(a: Scalar, b: Scalar): boolean {
        return LowLevel.compareMode(a, b);
    }

    /**
     * Compares two scalars using the compare mode.
     * Slighly optimized version of `areScalarEqual` for only two scalars.
     * @param a Scalar to compare
     * @param b Scalar to compare
     * @returns Whether the two scalars meet the requirements of the compare mode to be considered equal.
     * @time O(1) - is expected to be, but depends on the compare mode.
     */
    public areTwoScalarsEqual(a: Scalar, b: Scalar): boolean {
        return this.compareMode(a, b);
    }

    /**
     * Compares scalars using the compare mode.
     * @param scalars Scalars to compare
     * @returns Whether the two scalars meet the requirements of the compare mode to be considered equal.
     */
    static areScalarsEqual(...scalars: Array<Scalar>): boolean {
        for (let i = 1; i < scalars.length; i++) {
            if (!LowLevel.areTwoScalarsEqual(scalars[i - 1] as Scalar, scalars[i] as Scalar)) return false;
        }
        return true;
    }

    /**
     * Compares scalars using the compare mode.
     * @param scalars Scalars to compare
     * @returns Whether the two scalars meet the requirements of the compare mode to be considered equal.
     */
    public areScalarsEqual(...scalars: Array<Scalar>): boolean {
        for (let i = 1; i < scalars.length; i++) {
            if (!this.areTwoScalarsEqual(scalars[i - 1] as Scalar, scalars[i] as Scalar)) return false;
        }
        return true;
    }

    /**
     * Compares two vector in the first `onLength` numbers using the compare mode.
     * @param a First vector
     * @param b Second vector
     * @param onLength Length of the vectors to compare. Defaults to the length of the first vector.
     * @returns If the two vectors are equal on the first `onLength` numbers.
     * @time O(n) - n is the length of the vectors
     */
    static areTwoVectorsEqual<L extends number>(a: ReadonlyVector<L>, b: ReadonlyVector<L>, onLength: number = a.length): boolean {
        for (let i = 0; i < onLength; i++) {
            if (!LowLevel.areTwoScalarsEqual(a[i] as Scalar, b[i] as Scalar)) return false;
        }
        return true;
    }

    /**
     * Compares two vector in the first `onLength` numbers using the compare mode.
     * @param a First vector
     * @param b Second vector
     * @param onLength Length of the vectors to compare. Defaults to the length of the first vector.
     * @returns If the two vectors are equal on the first `onLength` numbers.
     * @time O(n) - n is the length of the vectors
     */
    public areTwoVectorsEqual<L extends S = S>(a: ReadonlyVector<L>, b: ReadonlyVector<L>, onLength: number = a.length): boolean {
        for (let i = 0; i < onLength; i++) {
            if (!this.areTwoScalarsEqual(a[i] as Scalar, b[i] as Scalar)) return false;
        }
        return true;
    }

    /**
     * Compares vectors using the compare mode.
     * @param vectors Array of vectors to compare
     * @param onLength Length of the vectors to compare. Defaults to the length of the first vector.
     * @returns If the vectors are equal on the first `onLength` numbers.
     * @time O(n * m) - n is the number of vectors, m is the length of the vectors
     */
    static areVectorsEqual<L extends number>(vectors: Array<ReadonlyVector<L>>, onLength: number = vectors[0]?.length as number): boolean {
        for (let i = 1; i < vectors.length; i++) {
            for (let j = 0; j < onLength; j++) {
                if (!LowLevel.areTwoScalarsEqual((vectors[i] as Vector)[j] as Scalar, (vectors[i - 1] as Vector)[j] as Scalar)) return false;
            }
        }
        return true;
    }

    /**
     * Compares vectors using the compare mode.
     * @param vectors Array of vectors to compare
     * @param onLength Length of the vectors to compare. Defaults to the length of the first vector.
     * @returns If the vectors are equal on the first `onLength` numbers.
     * @time O(n * m) - n is the number of vectors, m is the length of the vectors
     */
    public areVectorsEqual<L extends S = S>(vectors: Array<ReadonlyVector<L>>, onLength: number = vectors[0]?.length as number): boolean {
        for (let i = 1; i < vectors.length; i++) {
            for (let j = 0; j < onLength; j++) {
                if (!this.areTwoScalarsEqual((vectors[i] as Vector)[j] as Scalar, (vectors[i - 1] as Vector)[j] as Scalar)) return false;
            }
        }
        return true;
    }

    /**
     * Adds one vector to another.
     * This method ***modifies*** the *original* (first parameter) vector.
     * Requires the second vector to be at least as long as the first or `length` to be set to a number smaller than the length of both vectors. Numbers after will be ignored. If second vector is shorter, it is undefined behavior.
     * Is faster than `addTo` because it doesn't have to check for undefined values.
     * @param original The original vector
     * @param add The vector to add to the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n) - n is the length provided
     */
    static addToUnchecked<L extends number>(original: Vector<L>, add: ReadonlyVector<L>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            original[i] += add[i] as Scalar;
        }
        return original;
    }

    /**
     * Adds one vector to another.
     * This method ***modifies*** the *original* (first parameter) vector.
     * Requires the second vector to be at least as long as the first or `length` to be set to a number smaller than the length of both vectors. Numbers after will be ignored. If second vector is shorter, it is undefined behavior.
     * Is faster than `addTo` because it doesn't have to check for undefined values.
     * @param original The original vector
     * @param add The vector to add to the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n) - n is the length provided
     */
    public addToUnchecked<L extends S = S>(original: Vector<L>, add: ReadonlyVector<L>, length: number = original.length): Vector<L> {
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
     * @time O(n) - n is the length provided
     */
    static addTo<L extends number>(original: Vector<L>, add: ReadonlyVector<L>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            original[i] += add[i] ?? 0;
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
     * @time O(n) - n is the length provided
     */
    public addTo<L extends S = S>(original: Vector<L>, add: ReadonlyVector<L>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            original[i] += add[i] ?? 0;
        }
        return original;
    }

    /**
     * Adds multiple vectors to one.
     * This method ***modifies*** the *original* (first parameter) vector.
     * Requires the second vectors to be at least as long as the first or `length` to be set to a number smaller than the length of all vectors. Numbers after will be ignored. If second vectors are shorter, it is undefined behavior.
     * Is faster than `addTo` because it doesn't have to check for undefined values.
     * @param original The original vector
     * @param adds The vectors to add to the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n * m) - n is the length provided, m is the number of vectors
     */
    static addToManyUnchecked<L extends number>(original: Vector<L>, adds: Array<ReadonlyVector<L>>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < adds.length; j++) {
                original[i] += (adds[j] as ReadonlyVector)[i] as Scalar;
            }
        }
        return original;
    }

    /**
     * Adds multiple vectors to one.
     * This method ***modifies*** the *original* (first parameter) vector.
     * Requires the second vectors to be at least as long as the first or `length` to be set to a number smaller than the length of all vectors. Numbers after will be ignored. If second vectors are shorter, it is undefined behavior.
     * Is faster than `addTo` because it doesn't have to check for undefined values.
     * @param original The original vector
     * @param adds The vectors to add to the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n * m) - n is the length provided, m is the number of vectors
     */
    public addToManyUnchecked<L extends S = S>(original: Vector<L>, adds: Array<ReadonlyVector<L>>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < adds.length; j++) {
                original[i] += (adds[j] as ReadonlyVector)[i] as Scalar;
            }
        }
        return original;
    }

    /**
     * Adds multiple vectors to one.
     * This method ***modifies*** the *original* (first parameter) vector.
     * If the second vectors are shorter, they will be padded with zeros.
     * @param original The original vector
     * @param adds The vectors to add to the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n * m) - n is the length provided, m is the number of vectors
     */
    static addToMany<L extends number>(original: Vector<L>, adds: Array<ReadonlyVector<L>>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < adds.length; j++) {
                original[i] += (adds[j] as ReadonlyVector)[i] ?? 0;
            }
        }
        return original;
    }
    /**
         * Adds multiple vectors to one.
         * This method ***modifies*** the *original* (first parameter) vector.
         * If the second vectors are shorter, they will be padded with zeros.
         * @param original The original vector
         * @param adds The vectors to add to the original
         * @param length The length of the vectors. Defaults to the length of the original vector.
         * @returns The original vector
         * @time O(n * m) - n is the length provided, m is the number of vectors
         */
    public addToMany<L extends S = S>(original: Vector<L>, adds: Array<ReadonlyVector<L>>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < adds.length; j++) {
                original[i] += (adds[j] as ReadonlyVector)[i] ?? 0;
            }
        }
        return original;
    }

    /**
     * Adds multiple vectors together.
     * Requires the vectors to be at least as long as the first. If vectors are shorter, it is undefined behavior.
     * @param vectors The vectors to add
     * @returns The sum of the vectors as a new vector of the same length as the first vector
     * @time O(n * m) - n is the length of the first vector, m is the number of vectors
     */
    static addUnchecked<L extends number>(...vectors: Array<ReadonlyVector<L>>): Vector<L> {
        if (vectors.length === 0) return [] as Vector<L>;
        const vectLength = (vectors[0] as ReadonlyVector).length;
        const result = [];
        for (let i = 0; i < vectLength; i++) {
            result[i] = 0;
            for (let j = 0; j < vectors.length; j++) {
                result[i] += (vectors[j] as ReadonlyVector)[i] as Scalar;
            }
        }
        return result as Vector<L>;
    }
    /**
     * Adds multiple vectors together.
     * Requires the vectors to be at least as long as the first. If vectors are shorter, it is undefined behavior.
     * @param vectors The vectors to add
     * @returns The sum of the vectors as a new vector of the same length as the first vector
     * @time O(n * m) - n is the length of the first vector, m is the number of vectors
     */
    public addUnchecked<L extends S = S>(...vectors: Array<ReadonlyVector<L>>): Vector<L> {
        if (vectors.length === 0) return [] as Vector<L>;
        const vectLength = (vectors[0] as ReadonlyVector).length;
        const result = [];
        for (let i = 0; i < vectLength; i++) {
            result[i] = 0;
            for (let j = 0; j < vectors.length; j++) {
                result[i] += (vectors[j] as ReadonlyVector)[i] as Scalar;
            }
        }
        return result as Vector<L>;
    }

    /**
     * Adds multiple vectors together, padding shorter vectors with zeros, when needed.
     * @param vectors The vectors to add
     * @returns The sum of the vectors as a new vector of the same length as the longest vector
     * @time O(n * m) - n is the length of the longest vector, m is the number of vectors
     */
    static add<L extends number>(...vectors: Array<ReadonlyVector<L>>): Vector<L> {
        const result: Vector = [];
        for (let i = 0; i < vectors.length; i++) {
            for (let j = 0; j < (vectors[i] as ReadonlyVector).length; j++) {
                result[j] = (result[j] ?? 0) + ((vectors[i] as ReadonlyVector)[j] ?? 0);
            }
        }
        return result as Vector<L>;
    }

    /**
     * Adds multiple vectors together, padding shorter vectors with zeros, when needed.
     * @param vectors The vectors to add
     * @returns The sum of the vectors as a new vector of the same length as the longest vector
     * @time O(n * m) - n is the length of the longest vector, m is the number of vectors
     */
    public add<L extends S = S>(...vectors: Array<ReadonlyVector<L>>): Vector<L> {
        const result: Vector = [];
        for (let i = 0; i < vectors.length; i++) {
            for (let j = 0; j < (vectors[i] as ReadonlyVector).length; j++) {
                result[j] = (result[j] ?? 0) + ((vectors[i] as ReadonlyVector)[j] ?? 0);
            }
        }
        return result as Vector<L>;
    }

    /**
     * Subtracts one vector to another.
     * This method ***modifies*** the *original* (first parameter) vector.
     * Requires the second vector to be at least as long as the first or `length` to be set to a number smaller than the length of both vectors. Numbers after will be ignored. If second vector is shorter, it is undefined behavior.
     * Is faster than `subtractFrom` because it doesn't have to check for undefined values.
     * @param original The original vector
     * @param subtract The vector to subtract from the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n) - n is the length provided
     */
    static subtractFromUnchecked<L extends number>(original: Vector<L>, subtract: ReadonlyVector<L>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            original[i] -= subtract[i] as Scalar;
        }
        return original;
    }
    /**
     * Subtracts one vector to another.
     * This method ***modifies*** the *original* (first parameter) vector.
     * Requires the second vector to be at least as long as the first or `length` to be set to a number smaller than the length of both vectors. Numbers after will be ignored. If second vector is shorter, it is undefined behavior.
     * Is faster than `subtractFrom` because it doesn't have to check for undefined values.
     * @param original The original vector
     * @param subtract The vector to subtract from the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n) - n is the length provided
     */
    public subtractFromUnchecked<L extends S = S>(original: Vector<L>, subtract: ReadonlyVector<L>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            original[i] -= subtract[i] as Scalar;
        }
        return original;
    }

    /**
     * Subtracts one vector from another.
     * This method ***modifies*** the *original* (first parameter) vector.
     * If the second vector is shorter, it will be padded with zeros.
     * Is slower than `subtractFromUnckecked` because it has to check for undefined values.
     * @param original The original vector
     * @param subtract The vector to subtract from the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n) - n is the length provided
     */
    static subtractFrom<L extends number>(original: Vector<L>, subtract: ReadonlyVector<L>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            original[i] -= subtract[i] ?? 0;
        }
        return original;
    }

    /**
     * Subtracts one vector from another.
     * This method ***modifies*** the *original* (first parameter) vector.
     * If the second vector is shorter, it will be padded with zeros.
     * Is slower than `subtractFromUnckecked` because it has to check for undefined values.
     * @param original The original vector
     * @param subtract The vector to subtract from the original
     * @param length The length of the vectors. Defaults to the length of the original vector.
     * @returns The original vector
     * @time O(n) - n is the length provided
     */
    public subtractFrom<L extends S = S>(original: Vector<L>, subtract: ReadonlyVector<L>, length: number = original.length): Vector<L> {
        for (let i = 0; i < length; i++) {
            original[i] -= subtract[i] ?? 0;
        }
        return original;
    }

    /**
     * Computes the magnitude of a vector.
     * @param vector The vector to get the magnitude of
     * @returns Magnitude of the vector
     * @time O(n) - n is the length of the vector
     */
    static magnitude(vector: ReadonlyVector): Scalar {
        let sum = 0;
        for (let i = 0; i < vector.length; i++) {
            sum += (vector[i] as Scalar) ** 2;
        }
        return Math.sqrt(sum);
    }

    /**
     * Computes the magnitude of a vector.
     * @param vector The vector to get the magnitude of
     * @returns Magnitude of the vector
     * @time O(n) - n is the length of the vector
     */
    public magnitude(vector: ReadonlyVector): Scalar {
        let sum = 0;
        for (let i = 0; i < vector.length; i++) {
            sum += (vector[i] as Scalar) ** 2;
        }
        return Math.sqrt(sum);
    }

    /**
     * Creates a copy of a vector.
     * @param vector The vector to copy
     * @returns The copy of a vector
     * @time O(n) - n is the length of the vector
     */
    static copyVector<L extends number>(vector: ReadonlyVector<L>): Vector<L> {
        const result = [];
        for (let i = 0; i < vector.length; i++) {
            result[i] = vector[i] as Scalar;
        }
        return result as Vector<L>;
    }

    /**
     * Creates a copy of a vector.
     * @param vector The vector to copy
     * @returns The copy of a vector
     * @time O(n) - n is the length of the vector
     */
    public copyVector<L extends S = S>(vector: ReadonlyVector<L>): Vector<L> {
        const result = [];
        for (let i = 0; i < vector.length; i++) {
            result[i] = vector[i] as Scalar;
        }
        return result as Vector<L>;
    }

    /**
     * Copies a vector multiple times.
     * @param vector The vector to copy
     * @param count Amount of copies to create
     * @returns The copies of a vector in an array
     * @time O(n * m) - n is the length of the vector, m is the count
     */
    static copyVectorMany<C extends number, L extends number>(vector: ReadonlyVector<L>, count: C): FixedLengthArray<Vector<L>, C> {
        const result = [];
        for (let i = 0; i < count; i++) {
            result[i] = LowLevel.copyVector(vector);
        }
        return result as FixedLengthArray<Vector<L>, C>;
    }
    /**
     * Copies a vector multiple times.
     * @param vector The vector to copy
     * @param count Amount of copies to create
     * @returns The copies of a vector in an array
     * @time O(n * m) - n is the length of the vector, m is the count
     */
    public copyVectorMany<C extends number, L extends S = S>(vector: ReadonlyVector<L>, count: C): FixedLengthArray<Vector<L>, C> {
        const result = [];
        for (let i = 0; i < count; i++) {
            result[i] = this.copyVector(vector);
        }
        return result as FixedLengthArray<Vector<L>, C>;
    }

    /**
     * Multiplies a vector by a scalar in place.
     * @param vector The vector to multiply
     * @param scalar The scalar to multiply by
     * @returns The original vector
     * @time O(n) - n is the length of the vector
     */
    static multiplyByScalarInPlace<L extends number>(vector: Vector, scalar: Scalar): Vector<L> {
        for (let i = 0; i < vector.length; i++) {
            vector[i] *= scalar;
        }
        return vector as Vector<L>;
    }

    /**
     * Multiplies a vector by a scalar in place.
     * @param vector The vector to multiply
     * @param scalar The scalar to multiply by
     * @returns The original vector
     * @time O(n) - n is the length of the vector
     */
    public multiplyByScalarInPlace<L extends S = S>(vector: Vector, scalar: Scalar): Vector<L> {
        for (let i = 0; i < vector.length; i++) {
            vector[i] *= scalar;
        }
        return vector as Vector<L>;
    }

    /**
     * Multiplies a vector by a scalar into a new vector.
     * @param vector The vector to multiply
     * @param scalar The scalar to multiply by
     * @returns The multiplied vector
     * @time O(n) - n is the length of the vector
     */
    static multiplyByScalar<L extends number>(vector: ReadonlyVector<L>, scalar: Scalar): Vector<L> {
        const result = [];
        for (let i = 0; i < vector.length; i++) {
            result[i] = (vector[i] as Scalar) * scalar;
        }
        return result as Vector<L>;
    }

    /**
     * Multiplies a vector by a scalar into a new vector.
     * @param vector The vector to multiply
     * @param scalar The scalar to multiply by
     * @returns The multiplied vector
     * @time O(n) - n is the length of the vector
     */
    public multiplyByScalar<L extends S = S>(vector: ReadonlyVector<L>, scalar: Scalar): Vector<L> {
        const result = [];
        for (let i = 0; i < vector.length; i++) {
            result[i] = (vector[i] as Scalar) * scalar;
        }
        return result as Vector<L>;
    }

    /**
     * Normalizes a vector in place.
     * @param vector Vector to normalize
     * @returns The original vector
     * @time O(n) - n is the length of the vector
     */
    static normalizeInPlace<L extends number>(vector: Vector<L>): Vector<L> {
        return LowLevel.multiplyByScalarInPlace(vector, 1 / LowLevel.magnitude(vector));
    }

    /**
     * Normalizes a vector in place.
     * @param vector Vector to normalize
     * @returns The original vector
     * @time O(n) - n is the length of the vector
     */
    public normalizeInPlace<L extends S = S>(vector: Vector<L>): Vector<L> {
        return this.multiplyByScalarInPlace(vector, 1 / this.magnitude(vector));
    }

    /**
     * Normalizes a vector into a new vector.
     * @param vector Vector to normalize
     * @returns The normalized vector
     * @time O(n) - n is the length of the vector
     */
    static normalize<L extends number>(vector: ReadonlyVector<L>): Vector<L> {
        return LowLevel.multiplyByScalar(vector, 1 / LowLevel.magnitude(vector));
    }

    /**
     * Normalizes a vector into a new vector.
     * @param vector Vector to normalize
     * @returns The normalized vector
     * @time O(n) - n is the length of the vector
     */
    public normalize<L extends S = S>(vector: ReadonlyVector<L>): Vector<L> {
        return this.multiplyByScalar(vector, 1 / this.magnitude(vector));
    }

    /**
     * Computes the Hadamard product (element-wise product) of two vectors in place.
     * The second vector is assumed to be at least as long as the first vector.
     * @param vector1 The first vector
     * @param vector2 The second vector
     * @returns The original first vector
     * @time O(n) - n is the length of the first vector
     */
    static hadamardProductInPlaceUnchecked<L extends number>(vector1: Vector<L>, vector2: ReadonlyVector<L>): Vector<L> {
        for (let i = 0; i < vector1.length; i++) {
            vector1[i] *= vector2[i] as Scalar;
        }
        return vector1;
    }

    /**
     * Computes the Hadamard product (element-wise product) of two vectors in place.
     * The second vector is assumed to be at least as long as the first vector.
     * @param vector1 The first vector
     * @param vector2 The second vector
     * @returns The original first vector
     * @time O(n) - n is the length of the first vector
     */
    public hadamardProductInPlaceUnchecked<L extends S = S>(vector1: Vector<L>, vector2: ReadonlyVector<L>): Vector<L> {
        for (let i = 0; i < vector1.length; i++) {
            vector1[i] *= vector2[i] as Scalar;
        }
        return vector1;
    }

    /**
     * Computes the Hadamard product (element-wise product) of two vectors into a new vector.
     * Both vectors are assumed to be at least as long as the length parameter, which defaults to the length of the first vector.
     * @param vector1 Vector one
     * @param vector2 Vector two
     * @param length Length of th result vector
     * @returns A new vector with the Hadamard product of the two vectors
     * @time O(n) - n is the length provided
     */
    static hadamardProductUnchecked<L extends number>(vector1: ReadonlyVector<L>, vector2: ReadonlyVector<L>, length: number = vector1.length): Vector<L> {
        const result = [];
        for (let i = 0; i < length; i++) {
            result[i] = (vector1[i] as Scalar) * (vector2[i] as Scalar);
        }
        return result as Vector<L>;
    }

    /**
     * Computes the Hadamard product (element-wise product) of two vectors into a new vector.
     * Both vectors are assumed to be at least as long as the length parameter, which defaults to the length of the first vector.
     * @param vector1 Vector one
     * @param vector2 Vector two
     * @param length Length of th result vector
     * @returns A new vector with the Hadamard product of the two vectors
     * @time O(n) - n is the length provided
     */
    public hadamardProductUnchecked<L extends S = S>(vector1: ReadonlyVector<L>, vector2: ReadonlyVector<L>, length: number = vector1.length): Vector<L> {
        const result = [];
        for (let i = 0; i < length; i++) {
            result[i] = (vector1[i] as Scalar) * (vector2[i] as Scalar);
        }
        return result as Vector<L>;
    }

    /**
     * Computes the Hadamard product (element-wise product) of two vectors in place.
     * If the second vector is shorter than the first vector, the missing values are assumed to be 0.
     * @param vector1 The first vector
     * @param vector2 The second vector
     * @returns The first vector
     * @time O(n) - n is the length of the first vector
     */
    static hadamardProductInPlace<L extends number>(vector1: Vector<L>, vector2: ReadonlyVector<L>): Vector<L> {
        for (let i = 0; i < vector1.length; i++) {
            vector1[i] *= vector2[i] ?? 0;
        }
        return vector1;
    }

    /**
     * Computes the Hadamard product (element-wise product) of two vectors in place.
     * If the second vector is shorter than the first vector, the missing values are assumed to be 0.
     * @param vector1 The first vector
     * @param vector2 The second vector
     * @returns The first vector
     * @time O(n) - n is the length of the first vector
     */
    public hadamardProductInPlace<L extends S = S>(vector1: Vector<L>, vector2: ReadonlyVector<L>): Vector<L> {
        for (let i = 0; i < vector1.length; i++) {
            vector1[i] *= vector2[i] ?? 0;
        }
        return vector1;
    }

    /**
     * Computes the Hadamard product (element-wise product) of two vector.
     * If the second vector is shorter than the first vector, the missing values are assumed to be 0.
     * @param vector1 The first vector
     * @param vector2 The second vector
     * @param length Length of the result vector
     * @returns A new vector with the Hadamard product of the two vectors and the given length
     * @time O(n) - n is the length of the result vector
     */
    static hadamardProduct<L extends number>(vector1: ReadonlyVector<L>, vector2: ReadonlyVector<L>, length: number = vector1.length): Vector<L> {
        const result = [];
        for (let i = 0; i < length; i++) {
            result[i] = (vector1[i] ?? 0) * (vector2[i] ?? 0);
        }
        return result as Vector<L>;
    }

    /**
     * Computes the Hadamard product (element-wise product) of two vector.
     * If the second vector is shorter than the first vector, the missing values are assumed to be 0.
     * @param vector1 The first vector
     * @param vector2 The second vector
     * @param length Length of the result vector
     * @returns A new vector with the Hadamard product of the two vectors and the given length
     * @time O(n) - n is the length of the result vector
     */
    public hadamardProduct<L extends S = S>(vector1: ReadonlyVector<L>, vector2: ReadonlyVector<L>, length: number = vector1.length): Vector<L> {
        const result = [];
        for (let i = 0; i < length; i++) {
            result[i] = (vector1[i] ?? 0) * (vector2[i] ?? 0);
        }
        return result as Vector<L>;
    }

    /**
     * Checks, if two vectors have the same direction
     * @param vector1 First vector
     * @param vector2 Second vector
     * @returns If the vectors are equivalent
     * @time O(n) - n is the length of the vectors
     */
    static areTwoVectorsEquivalent(vector1: ReadonlyVector, vector2: ReadonlyVector): boolean {
        if (vector1.length !== vector2.length) return false; // If the vectors are not the same length, they are not equivalent
        if (vector1.length === 0) return true; // If the vectors are empty, they are equivalent
        let coefficient: number | undefined = undefined; // The coefficient that the second vector is multiplied by to get the first vector
        for (var i = 0; i < vector1.length; i++) {
            if (vector1[i] === 0 && vector2[i] === 0) continue; // If both values are 0, they cannot yield a coefficient
            if (vector1[i] === 0 || vector2[i] === 0) return false; // If one value is 0 and the other is not, vectors are not equivalent
            coefficient = (vector1[i] as Scalar) / (vector2[i] as Scalar); // If both values are not 0, they can yield a coefficient
            break; // When a coefficient is found, stop looking
        }
        if (coefficient === undefined) return true; // If no coefficient was found and the function didn't return earlier, the vectors are both zero vectors and are equivalent
        for (; i < vector1.length; i++) {
            if (!LowLevel.areTwoScalarsEqual(coefficient * (vector2[i] as Scalar), vector1[i] as Scalar)) return false; // If the coefficient is not correct, the vectors are not equivalent
        }
        return true; // If all values are correct, the vectors are equivalent
    }

    /**
     * Checks, if two vectors have the same direction
     * @param vector1 First vector
     * @param vector2 Second vector
     * @returns If the vectors are equivalent
     * @time O(n) - n is the length of the vectors
     */
    public areTwoVectorsEquivalent(vector1: ReadonlyVector, vector2: ReadonlyVector): boolean {
        if (vector1.length !== vector2.length) return false; // If the vectors are not the same length, they are not equivalent
        if (vector1.length === 0) return true; // If the vectors are empty, they are equivalent
        let coefficient: number | undefined = undefined; // The coefficient that the second vector is multiplied by to get the first vector
        for (var i = 0; i < vector1.length; i++) {
            if (vector1[i] === 0 && vector2[i] === 0) continue; // If both values are 0, they cannot yield a coefficient
            if (vector1[i] === 0 || vector2[i] === 0) return false; // If one value is 0 and the other is not, vectors are not equivalent
            coefficient = (vector1[i] as Scalar) / (vector2[i] as Scalar); // If both values are not 0, they can yield a coefficient
            break; // When a coefficient is found, stop looking
        }
        if (coefficient === undefined) return true; // If no coefficient was found and the function didn't return earlier, the vectors are both zero vectors and are equivalent
        for (; i < vector1.length; i++) {
            if (!this.areTwoScalarsEqual(coefficient * (vector2[i] as Scalar), vector1[i] as Scalar)) return false; // If the coefficient is not correct, the vectors are not equivalent
        }
        return true; // If all values are correct, the vectors are equivalent
    }
    /**
     * Computes the dot product of two vectors.
     * @param vector1 First vector
     * @param vector2 Second vector
     * @returns The dot product of the two vectors
     * @time O(n) - n is the length of the vectors
     * @throws If the vectors are not of the same length
     */
    static dotProduct<L extends number>(vector1: ReadonlyVector<L>, vector2: ReadonlyVector<L>): Scalar {
        if (vector1.length !== vector2.length) throw new Error("Vectors must be of the same length");
        let result = 0;
        for (let i = 0; i < vector1.length; i++) {
            result += (vector1[i] as Scalar) * (vector2[i] as Scalar);
        }
        return result;
    }

    /**
     * Computes the dot product of two vectors.
     * @param vector1 First vector
     * @param vector2 Second vector
     * @returns The dot product of the two vectors
     * @time O(n) - n is the length of the vectors
     * @throws If the vectors are not of the same length
     */
    public dotProduct<L extends S = S>(vector1: ReadonlyVector<L>, vector2: ReadonlyVector<L>): Scalar {
        if (vector1.length !== vector2.length) throw new Error("Vectors must be of the same length");
        let result = 0;
        for (let i = 0; i < vector1.length; i++) {
            result += (vector1[i] as Scalar) * (vector2[i] as Scalar);
        }
        return result;
    }

    /**
     * Computes the squared magnitude of a vector.
     * This is faster than computing the magnitude. Good for comparing magnitudes.
     * @param vector The vector
     * @returns The squared magnitude of the vector
     * @time O(n) - n is the length of the vector
     */
    static magnitudeSquared(vector: ReadonlyVector): Scalar {
        let result = 0;
        for (let i = 0; i < vector.length; i++) {
            result += (vector[i] as Scalar) ** 2;
        }
        return result;
    }

    /**
     * Computes the squared magnitude of a vector.
     * This is faster than computing the magnitude. Good for comparing magnitudes.
     * @param vector The vector
     * @returns The squared magnitude of the vector
     * @time O(n) - n is the length of the vector
     */
    public magnitudeSquared(vector: ReadonlyVector): Scalar {
        let result = 0;
        for (let i = 0; i < vector.length; i++) {
            result += (vector[i] as Scalar) ** 2;
        }
        return result;
    }

    /**
     * Computes the cross product of two vectors.
     * @param vector1 First vector
     * @param vector2 Second vector
     * @returns A new vector with the cross product of the two vectors
     * @time O(1)
     */
    static crossProduct(vector1: ReadonlyVector3D, vector2: ReadonlyVector3D): Vector3D {
        return [vector1[1] * vector2[2] - vector1[2] * vector2[1], vector1[2] * vector2[0] - vector1[0] * vector2[2], vector1[0] * vector2[1] - vector1[1] * vector2[0]]; // [Cross product formula](https://en.wikipedia.org/wiki/Cross_product)
    }

    /**
     * Computes the cross product of two vectors.
     * @param vector1 First vector
     * @param vector2 Second vector
     * @returns A new vector with the cross product of the two vectors
     * @time O(1)
     */
    public crossProduct(vector1: ReadonlyVector3D, vector2: ReadonlyVector3D): Vector3D {
        return [vector1[1] * vector2[2] - vector1[2] * vector2[1], vector1[2] * vector2[0] - vector1[0] * vector2[2], vector1[0] * vector2[1] - vector1[1] * vector2[0]]; // [Cross product formula](https://en.wikipedia.org/wiki/Cross_product)
    }

    /**
     * Computes the scalar triple product of two vectors.
     * @param vector1 First vector
     * @param vector2 Second vector
     * @param vector3 Third vector
     * @returns v1 • (v2 x v3)
     * @time O(1)
     */
    static scalarTripleProduct(vector1: ReadonlyVector3D, vector2: ReadonlyVector3D, vector3: ReadonlyVector3D): Scalar {
        return (vector2[1] * vector3[2] - vector2[2] * vector3[1]) * vector1[0] + (vector2[2] * vector3[0] - vector2[0] * vector3[2]) * vector1[1] + (vector2[0] * vector3[1] - vector2[1] * vector3[0]) * vector1[2];
    }
    /**
     * Computes the scalar triple product of two vectors.
     * @param vector1 First vector
     * @param vector2 Second vector
     * @param vector3 Third vector
     * @returns v1 • (v2 x v3)
     * @time O(1)
     */
    public scalarTripleProduct(vector1: ReadonlyVector3D, vector2: ReadonlyVector3D, vector3: ReadonlyVector3D): Scalar {
        return (vector2[1] * vector3[2] - vector2[2] * vector3[1]) * vector1[0] + (vector2[2] * vector3[0] - vector2[0] * vector3[2]) * vector1[1] + (vector2[0] * vector3[1] - vector2[1] * vector3[0]) * vector1[2];
    }

    /**
     * Computes the vector triple product of two vectors.
     * @param vector1 First vector
     * @param vector2 Second vector
     * @param vector3 Third vector
     * @returns v1 x (v2 x v3)
     * @time O(1)
     */
    static vectorTripleProduct(vector1: ReadonlyVector3D, vector2: ReadonlyVector3D, vector3: ReadonlyVector3D): Vector3D {
        return LowLevel.crossProduct(vector1, LowLevel.crossProduct(vector2, vector3));
    }

    /**
     * Computes the vector triple product of two vectors.
     * @param vector1 First vector
     * @param vector2 Second vector
     * @param vector3 Third vector
     * @returns v1 x (v2 x v3)
     * @time O(1)
     */
    public vectorTripleProduct(vector1: ReadonlyVector3D, vector2: ReadonlyVector3D, vector3: ReadonlyVector3D): Vector3D {
        return this.crossProduct(vector1, this.crossProduct(vector2, vector3));
    }


    /**
     * Computes the average of a list of vectors.
     * @param vectors The vectors
     * @returns A new vector with the average of the vectors and the length of the first vector
     * @time O(n) - n is the length of the vectors
     */
    static vectorAverage<L extends number>(vectors: Readonly<Array<ReadonlyVector<L>>>): Vector<L> {
        const rv: Vector = [];
        if (vectors[0] === undefined) return rv as Vector<L>;
        for (let i = 0; i < vectors[0].length; i++) {
            let sum = 0;
            for (const vector of vectors) {
                sum += vector[i] as Scalar;
            }
            rv[i] = sum / vectors.length;
        }
        return rv as Vector<L>;
    }
    /**
     * Computes the average of a list of vectors.
     * @param vectors The vectors
     * @returns A new vector with the average of the vectors and the length of the first vector
     * @time O(n) - n is the length of the vectors
     */
    public vectorAverage<L extends S = S>(vectors: Readonly<Array<ReadonlyVector<L>>>): Vector<L> {
        const rv: Vector = [];
        if (vectors[0] === undefined) return rv as Vector<L>;
        for (let i = 0; i < vectors[0].length; i++) {
            let sum = 0;
            for (const vector of vectors) {
                sum += vector[i] as Scalar;
            }
            rv[i] = sum / vectors.length;
        }
        return rv as Vector<L>;
    }
}
