export { FixedLengthArray } from "./types";
import { ArrayWithAtLeastLength, FixedLengthArray } from "./types";

/**
 * Scalar type, used instead of `number`.
 */
export type Scalar = number;
/**
 * Vector type, used instead of `Array<Scalar>`.
 */
export type Vector<L extends number = number> = FixedLengthArray<Scalar, L>;
/**
 * Vector type, used instead of `Array<Scalar>`.  
 * Any vector larger than `L` will be truncated accepted, but expect it to be threated as if it were `L` elements long.
 */
export type VectorWithMinLength<L extends number> = ArrayWithAtLeastLength<Scalar, L>;
/**
 * Readonly version of `Vector`.
 */
export type ReadonlyVector<L extends number = number> = Readonly<Vector<L>>;
/**
 * Readonly version of `VectorWithMinLength`.
*/
export type ReadonlyVectorWithMinLength<L extends number> = Readonly<VectorWithMinLength<L>>;
/**
 * Vector with two elements.
 */
export type Vector2D = Vector<2>;
/**
 * Vector with at least two elements.
 */
export type VectorAtLeast2D = VectorWithMinLength<2>;
/**
 * Vector with three elements.
 */
export type Vector3D = Vector<3>;
/**
 * Vector with at least three elements.
 */
export type VectorAtLeast3D = VectorWithMinLength<3>;
/**
 * Readonly version of `Vector2D`.
 */
export type ReadonlyVector2D = Readonly<Vector2D>;
/**
 * Readonly version of `VectorAtLeast2D`.
 */
export type ReadonlyVectorAtLeast2D = Readonly<VectorAtLeast2D>;
/**
 * Readonly version of `Vector3D`.
 */
export type ReadonlyVector3D = Readonly<Vector3D>;
/**
 * Readonly version of `VectorAtLeast3D`.
 */
export type ReadonlyVectorAtLeast3D = Readonly<VectorAtLeast3D>;
/**
 * A matrix type
 * @param M The number of rows.
 * @param N The number of columns.
 */
export type Matrix<M extends number = number, N extends number = number> = FixedLengthArray<Vector<N>, M>;
/**
 * A matrix type with at least `M` rows.
 */
export type MatrixWithMinRows<M extends number, N extends number> = ArrayWithAtLeastLength<Vector<N>, M>;
/**
 * A matrix type with at least `N` columns.
 */
export type MatrixWithMinColumns<M extends number, N extends number> = FixedLengthArray<VectorWithMinLength<N>, M>;
/**
 * A matrix type with at least `M` rows and `N` columns.
 */
export type MatrixWithMinRowsAndColumns<M extends number, N extends number> = ArrayWithAtLeastLength<VectorWithMinLength<N>, M>;
/**
 * Readonly version of `Matrix`.
 * @param M The number of rows.
 * @param N The number of columns.
 */
export type ReadonlyMatrix<M extends number = number, N extends number = number> = Readonly<FixedLengthArray<ReadonlyVector<N>, M>>;
/**
 * Readonly version of `MatrixWithMinRows`.
 */
export type ReadonlyMatrixWithMinRows<M extends number, N extends number> = Readonly<ArrayWithAtLeastLength<ReadonlyVector<N>, M>>;
/**
 * Readonly version of `MatrixWithMinColumns`.
 */
export type ReadonlyMatrixWithMinColumns<M extends number, N extends number> = Readonly<FixedLengthArray<ReadonlyVectorWithMinLength<N>, M>>;
/**
 * Readonly version of `MatrixWithMinRowsAndColumns`.
 */
export type ReadonlyMatrixWithMinRowsAndColumns<M extends number, N extends number> = Readonly<ArrayWithAtLeastLength<ReadonlyVectorWithMinLength<N>, M>>;
/**
 * A matrix with two rows and two columns.
 */
export type Matrix2D = Matrix<2, 2>;
/**
 * A matrix with at least two rows and two columns.
 */
export type MatrixAtLeast2D = MatrixWithMinRowsAndColumns<2, 2>;
/**
 * Readonly version of `Matrix2D`.
 */
export type ReadonlyMatrix2D = ReadonlyMatrix<2, 2>;
/**
 * Readonly version of `MatrixAtLeast2D`.
 */
export type ReadonlyMatrixAtLeast2D = ReadonlyMatrixWithMinRowsAndColumns<2, 2>;
/**
 * A matrix with three rows and three columns.
 */
export type Matrix3D = Matrix<3, 3>;
/**
 * A matrix with at least three rows and three columns.
 */
export type MatrixAtLeast3D = MatrixWithMinRowsAndColumns<3, 3>;
/**
 * Readonly version of `Matrix3D`. 
 */
export type ReadonlyMatrix3D = ReadonlyMatrix<3, 3>;
/**
 * Readonly version of `MatrixAtLeast3D`.
 */
export type ReadonlyMatrixAtLeast3D = ReadonlyMatrixWithMinRowsAndColumns<3, 3>;
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
     * Checks if a number is zero in the context of the numbers in context.  
     * Uses the compare mode to check if the number is zero.
     * @param a The number that should be considered zero
     * @param context Numbers in whose context a should be zero 
     * @returns Whether a is zero in the context of the numbers in context
     */
    static isZero(a: Scalar, context: Scalar[]): boolean {
        for (let i = 0; i < context.length; i++) {
            if (LowLevel.areTwoScalarsEqual((context[i] as Scalar), a + (context[i] as Scalar))) return true;
        }
        return false;
    }

    /**
     * Checks if a number is zero in the context of the numbers in context.  
     * Uses the compare mode to check if the number is zero.
     * @param a The number that should be considered zero
     * @param context Numbers in whose context a should be zero 
     * @returns Whether a is zero in the context of the numbers in context
     */
    public isZero(a: Scalar, context: Scalar[]): boolean {
        for (let i = 0; i < context.length; i++) {
            if (LowLevel.areTwoScalarsEqual((context[i] as Scalar), a + (context[i] as Scalar))) return true;
        }
        return false;
    }
    
    /**
     * Creates a function that checks if a number is zero in the context of the matrix.  
     * Does not use the compare mode, but uses the lowest possible number that can be created by dividing the smallest number in the matrix by the largest number in the matrix.
     * @param contextualMatrix Matrix with the context
     * @returns A function that checks if a number is zero in the context of the matrix
     * @time Function creation - O(N*M) - N is the number of rows in the matrix and M is the number of columns in the matrix
     * @time Returned function - O(1)
     */
    static isZeroInContextOfAMatrix(contextualMatrix: ReadonlyMatrix): (a: Scalar) => boolean {
        let logSquareSum = 0;
        let count = 0;
        for (let i = 0; i < contextualMatrix.length; i++) { // Looping through the matrix to calculate the RMS of logarithms of the numbers in the matrix
            const row = contextualMatrix[i] as Vector;
            for (let j = 0; j < row.length; j++) {
                const element = Math.abs(row[j] as Scalar);
                logSquareSum += Math.log10(element) ** 2;
                count++;
            }
        }
        const logarithmsRMS = Math.sqrt(logSquareSum / count);
        const lowestNonZeroLogarithm = logarithmsRMS - 12;
        return (a: Scalar) => {
            return Math.log10(Math.abs(a)) < lowestNonZeroLogarithm;
        }
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
    static addToUnchecked<L extends number>(original: Vector<L>, add: ReadonlyVectorWithMinLength<L>, length: number = original.length): Vector<L> {
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
    public addToUnchecked<L extends S = S>(original: Vector<L>, add: ReadonlyVectorWithMinLength<L>, length: number = original.length): Vector<L> {
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
    static addToManyUnchecked<L extends number>(original: Vector<L>, adds: Array<ReadonlyVectorWithMinLength<L>>, length: number = original.length): Vector<L> {
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
    public addToManyUnchecked<L extends S = S>(original: Vector<L>, adds: Array<ReadonlyVectorWithMinLength<L>>, length: number = original.length): Vector<L> {
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
    static addUnchecked<L extends number>(...vectors: [ReadonlyVector<L>, ...Array<ReadonlyVectorWithMinLength<L>>]): Vector<L> {
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
    public addUnchecked<L extends S = S>(...vectors: [ReadonlyVector<L>, ...Array<ReadonlyVectorWithMinLength<L>>]): Vector<L> {
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
    static subtractFromUnchecked<L extends number>(original: Vector<L>, subtract: ReadonlyVectorWithMinLength<L>, length: number = original.length): Vector<L> {
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
    public subtractFromUnchecked<L extends S = S>(original: Vector<L>, subtract: ReadonlyVectorWithMinLength<L>, length: number = original.length): Vector<L> {
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
    static hadamardProductInPlaceUnchecked<L extends number>(vector1: Vector<L>, vector2: ReadonlyVectorWithMinLength<L>): Vector<L> {
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
    public hadamardProductInPlaceUnchecked<L extends S = S>(vector1: Vector<L>, vector2: ReadonlyVectorWithMinLength<L>): Vector<L> {
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
     * @throws {Error} If the vectors are not of the same length
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
     * @throws {Error} If the vectors are not of the same length
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
    static vectorAverage<L extends number>(vectors: Readonly<[ReadonlyVector<L>, ...Array<ReadonlyVectorWithMinLength<L>>]>): Vector<L> {
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
    public vectorAverage<L extends S = S>(vectors: Readonly<[ReadonlyVector<L>, ...Array<ReadonlyVectorWithMinLength<L>>]>): Vector<L> {
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
     * Performs a matrix multiplication of two matrices.
     * @param m1 First matrix (L x M)
     * @param m2 Second matrix (M x N)
     * @see https://en.wikipedia.org/wiki/Matrix_multiplication
     * @returns A new matrix with the result of the multiplication (L x N)
     * @time O(LMN)
     * @throws {Error} If the matrices cannot be multiplied
     */
    static matrixMultiplication<L extends number = number, M extends number = number, N extends number = number>(m1: ReadonlyMatrix<L, M>, m2: ReadonlyMatrix<M, N>): Matrix<L, N> {
        if (m1[0]?.length !== m2.length) throw new Error("Cannot multiply matrices");
        const rv: Matrix = [];
        for (let i = 0; i < m1.length; i++) {
            rv[i] = [];
            for (let j = 0; j < (m2[0] as number[]).length; j++) {
                let sum = 0;
                for (let k = 0; k < m1[0].length; k++) {
                    sum += ((m1[i] as number[])[k] as number) * ((m2[k] as number[])[j] as number); // Casting can be done, as it only prevents accessing properties that are not defined, this function expects the input to be a valid matrix and just checks the length of the first rows
                }
                (rv[i] as number[])[j] = sum; // i-th element must exist as it is created in the first loop
            }
        }
        return rv as Matrix<L, N>;
    }

    /**
     * Performs a matrix multiplication of two matrices.
     * @param m1 First matrix (L x M)
     * @param m2 Second matrix (M x N)
     * @see https://en.wikipedia.org/wiki/Matrix_multiplication
     * @returns A new matrix with the result of the multiplication (L x N)
     * @time O(LMN)
     * @throws {Error} If the matrices cannot be multiplied
     */
    public matrixMultiplication<L extends number = number, M extends number = number, N extends number = number>(m1: ReadonlyMatrix<L, M>, m2: ReadonlyMatrix<M, N>): Matrix<L, N> {
        if (m1[0]?.length !== m2.length) throw new Error("Cannot multiply matrices");
        const rv: Matrix = [];
        for (let i = 0; i < m1.length; i++) {
            rv[i] = [];
            for (let j = 0; j < (m2[0] as Scalar[]).length; j++) {
                let sum = 0;
                for (let k = 0; k < m1[0].length; k++) {
                    sum += ((m1[i] as Scalar[])[k] as Scalar) * ((m2[k] as Scalar[])[j] as Scalar); // Casting can be done, as it only prevents accessing properties that are not defined, this function expects the input to be a valid matrix and just checks the length of the first rows
                }
                (rv[i] as Scalar[])[j] = sum; // i-th element must exist as it is created in the first loop
            }
        }
        return rv as Matrix<L, N>;
    }

    /**
     * Checks the equality of two matrices
     * @param m1 Matrix 1
     * @param m2 Matrix 2
     * @returns Whether the two matrices are equal
     * @time O(LM)
     */
    static areTwoMatricesEqual<L extends number = number, M extends number = number>(m1: ReadonlyMatrix<L, M>, m2: ReadonlyMatrix<L, M>): boolean {
        if (m1.length !== m2.length) return false;
        for (let i = 0; i < m1.length; i++) {
            if ((m1[i] as Scalar[]).length !== (m2[i] as Scalar[]).length) return false; // It is expected that the matrix is valid
            for (let j = 0; j < (m1[i] as Scalar[]).length; j++) {
                if (!LowLevel.areScalarsEqual((m1[i] as Scalar[])[j] as Scalar, (m2[i] as Scalar[])[j] as Scalar)) return false; // Can be casted as existence of these elements is checked above
            }
        }
        return true;
    }

    /**
     * Checks the equality of two matrices
     * @param m1 Matrix 1
     * @param m2 Matrix 2
     * @returns Whether the two matrices are equal
     * @time O(LM)
     */
    public areTwoMatricesEqual<L extends number = number, M extends number = number>(m1: ReadonlyMatrix<L, M>, m2: ReadonlyMatrix<L, M>): boolean {
        if (m1.length !== m2.length) return false;
        for (let i = 0; i < m1.length; i++) {
            if ((m1[i] as Scalar[]).length !== (m2[i] as Scalar[]).length) return false; // It is expected that the matrix is valid
            for (let j = 0; j < (m1[i] as Scalar[]).length; j++) {
                if (!this.areScalarsEqual((m1[i] as Scalar[])[j] as Scalar, (m2[i] as Scalar[])[j] as Scalar)) return false; // Can be casted as existence of these elements is checked above
            }
        }
        return true;
    }

    /**
     * Creates a new matrix with the same values as the input matrix
     * @param matrix The matrix to copy
     * @returns A copy of the matrix
     * @time O(LM)
     */
    static copyMatrix<L extends number = number, M extends number = number>(matrix: ReadonlyMatrix<L, M>): Matrix<L, M> {
        const rv: Matrix = [];
        for (let i = 0; i < matrix.length; i++) {
            rv[i] = [];
            for (let j = 0; j < (matrix[i] as Scalar[]).length; j++) {
                (rv[i] as Scalar[])[j] = (matrix[i] as Scalar[])[j] as Scalar; // Can be casted as existence of these elements is checked above
            }
        }
        return rv as Matrix<L, M>;
    }

    /**
     * Creates a new matrix with the same values as the input matrix
     * @param matrix The matrix to copy
     * @returns A copy of the matrix
     * @time O(LM)
     */
    public copyMatrix<L extends number = number, M extends number = number>(matrix: ReadonlyMatrix<L, M>): Matrix<L, M> {
        const rv: Matrix = [];
        for (let i = 0; i < matrix.length; i++) {
            rv[i] = [];
            for (let j = 0; j < (matrix[i] as Scalar[]).length; j++) {
                (rv[i] as Scalar[])[j] = (matrix[i] as Scalar[])[j] as Scalar; // Can be casted as existence of these elements is checked above
            }
        }
        return rv as Matrix<L, M>;
    }

    /**
     * Creates a new matrix with the same values as the input matrix multiplied by the scalar
     * @param matrix The matrix to multiply
     * @param scalar The scalar to multiply the matrix by
     * @returns A new matrix with the result of the multiplication
     * @time O(LM)
     */
    static multiplyMatrixByScalar<L extends number = number, M extends number = number>(matrix: ReadonlyMatrix<L, M>, scalar: Scalar): Matrix<L, M> {
        const rv: Matrix = [];
        for (let i = 0; i < matrix.length; i++) {
            rv[i] = [];
            for (let j = 0; j < (matrix[i] as Scalar[]).length; j++) {
                (rv[i] as Scalar[])[j] = ((matrix[i] as Scalar[])[j] as Scalar) * scalar; // Can be casted as existence of these elements is checked above
            }
        }
        return rv as Matrix<L, M>;
    }

    /**
     * Creates a new matrix with the same values as the input matrix multiplied by the scalar
     * @param matrix The matrix to multiply
     * @param scalar The scalar to multiply the matrix by
     * @returns A new matrix with the result of the multiplication
     * @time O(LM)
     */
    public multiplyMatrixByScalar<L extends number = number, M extends number = number>(matrix: ReadonlyMatrix<L, M>, scalar: Scalar): Matrix<L, M> {
        const rv: Matrix = [];
        for (let i = 0; i < matrix.length; i++) {
            rv[i] = [];
            for (let j = 0; j < (matrix[i] as Scalar[]).length; j++) {
                (rv[i] as Scalar[])[j] = ((matrix[i] as Scalar[])[j] as Scalar) * scalar; // Can be casted as existence of these elements is checked above
            }
        }
        return rv as Matrix<L, M>;
    }

    /**
     * Multiplies the input matrix by the scalar
     * @param matrix The matrix to multiply
     * @param scalar The scalar to multiply the matrix by
     * @returns The original matrix with the result of the multiplication
     * @time O(LM)
     */
    static multiplyMatrixByScalarInPlace<L extends number = number, M extends number = number>(matrix: ReadonlyMatrix<L, M>, scalar: Scalar): Matrix<L, M> {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < (matrix[i] as Scalar[]).length; j++) {
                (matrix[i] as Scalar[])[j] = ((matrix[i] as Scalar[])[j] as Scalar) * scalar; // Can be casted as existence of these elements is checked above
            }
        }
        return matrix as Matrix<L, M>;
    }

    /**
     * Multiplies the input matrix by the scalar
     * @param matrix The matrix to multiply
     * @param scalar The scalar to multiply the matrix by
     * @returns The original matrix with the result of the multiplication
     * @time O(LM)
     */
    public multiplyMatrixByScalarInPlace<L extends number = number, M extends number = number>(matrix: ReadonlyMatrix<L, M>, scalar: Scalar): Matrix<L, M> {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < (matrix[i] as Scalar[]).length; j++) {
                (matrix[i] as Scalar[])[j] = ((matrix[i] as Scalar[])[j] as Scalar) * scalar; // Can be casted as existence of these elements is checked above
            }
        }
        return matrix as Matrix<L, M>;
    }

    /**
     * Calculates the cosine of the angle between two vectors
     * @param v1 Vector 1
     * @param v2 Vector 2
     * @returns Cosine of the angle between the two vectors
     * @time O(L)
     */
    static cosineOfAngleBetweenVectors<L extends number = number>(v1: ReadonlyVector<L>, v2: ReadonlyVector<L>): Scalar {
        return LowLevel.dotProduct(v1, v2) / (LowLevel.magnitude(v1) * LowLevel.magnitude(v2));
    }

    /**
     * Calculates the cosine of the angle between two vectors
     * @param v1 Vector 1
     * @param v2 Vector 2
     * @returns Cosine of the angle between the two vectors
     * @time O(L)
     */
    public cosineOfAngleBetweenVectors<L extends S = S>(v1: ReadonlyVector<L>, v2: ReadonlyVector<L>): Scalar {
        return this.dotProduct(v1, v2) / (this.magnitude(v1) * this.magnitude(v2));
    }

    /**
     * Transforms a vector by a transformation matrix (matrix multiplication)
     * This function multiplies only by square matrices
     * @param matrix Transformation matrix (shape LxL)
     * @param vector Vector to transform (size L)
     * @returns Transformed vector (size L)
     * @time O(L^2)
     */
    static multiplyMatrixAndVector<L extends number>(matrix: ReadonlyMatrix<L, L>, vector: ReadonlyVector<L>): Vector<L> {
        const rv: Vector = [];
        for (let i = 0; i < matrix.length; i++) {
            rv[i] = 0;
            for (let j = 0; j < (matrix[i] as Scalar[]).length; j++) {
                rv[i] += ((matrix[i] as Scalar[])[j] as Scalar) * (vector[j] as Scalar);
            }
        }
        return rv as Vector<L>;
    }

    /**
     * Transforms a vector by a transformation matrix (matrix multiplication)
     * This function multiplies only by square matrices
     * @param matrix Transformation matrix (shape LxL)
     * @param vector Vector to transform (size L)
     * @returns Transformed vector (size L)
     * @time O(L^2)
     */
    public multiplyMatrixAndVector<L extends S = S>(matrix: ReadonlyMatrix<L, L>, vector: ReadonlyVector<L>): Vector<L> {
        const rv: Vector = [];
        for (let i = 0; i < matrix.length; i++) {
            rv[i] = 0;
            for (let j = 0; j < (matrix[i] as Scalar[]).length; j++) {
                rv[i] += ((matrix[i] as Scalar[])[j] as Scalar) * (vector[j] as Scalar);
            }
        }
        return rv as Vector<L>;
    }

    /**
     * Performs a linear combination of the input vectors
     * @param vectors Vectors to use for linear combination
     * @param coefficients Coefficients for each vector
     * @returns A new vector with the result of the linear combination
     * @time O(L*N) where N is the number of vectors
     */
    static linearCombination<L extends number = number>(vectors: ReadonlyVector<L>[], coefficients: Scalar[]): Vector<L> {
        const rv: Vector = [];
        for (let i = 0; i < (vectors[0] as ReadonlyVector<L>).length; i++) {
            rv[i] = 0;
            for (let j = 0; j < vectors.length; j++) {
                rv[i] += ((vectors[j] as ReadonlyVector<L>)[i] as Scalar) * (coefficients[j] as Scalar);
            }
        }
        return rv as Vector<L>;
    }

    /**
     * Performs a linear combination of the input vectors
     * @param vectors Vectors to use for linear combination
     * @param coefficients Coefficients for each vector
     * @returns A new vector with the result of the linear combination
     * @time O(L*N) where N is the number of vectors
     */
    public linearCombination<L extends S = S>(vectors: ReadonlyVector<L>[], coefficients: Scalar[]): Vector<L> {
        const rv: Vector = [];
        for (let i = 0; i < (vectors[0] as ReadonlyVector<L>).length; i++) {
            rv[i] = 0;
            for (let j = 0; j < vectors.length; j++) {
                rv[i] += ((vectors[j] as ReadonlyVector<L>)[i] as Scalar) * (coefficients[j] as Scalar);
            }
        }
        return rv as Vector<L>;
    }
    /**
     * Calculates the determinant of a 2 by 2 matrix
     * Larger matricies can be passed in, but only the first 2 rows and columns will be used
     * @param matrix The 2 by 2 matrix to calculate the determinant of
     * @returns The determinant of the matrix
     * @time O(1)
     */
    static determinant2D(matrix: ReadonlyMatrixAtLeast2D): Scalar {
        return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    }

    /**
     * Calculates the determinant of a 2 by 2 matrix
     * Larger matricies can be passed in, but only the first 2 rows and columns will be used
     * @param matrix The 2 by 2 matrix to calculate the determinant of
     * @returns The determinant of the matrix
     * @time O(1)
     */
    public determinant2D(matrix: ReadonlyMatrixAtLeast2D): Scalar {
        return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    }

    /**
     * Calculates the determinant of a 3 by 3 matrix
     * Larger matricies can be passed in, but only the first 3 rows and columns will be used
     * @param matrix The 3 by 3 matrix to calculate the determinant of
     * @returns The determinant of the matrix
     * @time O(1)
     */
    static determinant3D(matrix: ReadonlyMatrixAtLeast3D): Scalar {
        return (matrix[0][0] * matrix[1][1] * matrix[2][2]) +
            (matrix[0][1] * matrix[1][2] * matrix[2][0]) +
            (matrix[0][2] * matrix[1][0] * matrix[2][1]) -
            (matrix[0][2] * matrix[1][1] * matrix[2][0]) -
            (matrix[0][1] * matrix[1][0] * matrix[2][2]) -
            (matrix[0][0] * matrix[1][2] * matrix[2][1]);
    }

    /**
     * Calculates the determinant of a 3 by 3 matrix
     * Larger matricies can be passed in, but only the first 3 rows and columns will be used
     * @param matrix The 3 by 3 matrix to calculate the determinant of
     * @returns The determinant of the matrix
     * @time O(1)
     */
    public determinant3D(matrix: ReadonlyMatrixAtLeast3D): Scalar {
        return (matrix[0][0] * matrix[1][1] * matrix[2][2]) +
            (matrix[0][1] * matrix[1][2] * matrix[2][0]) +
            (matrix[0][2] * matrix[1][0] * matrix[2][1]) -
            (matrix[0][2] * matrix[1][1] * matrix[2][0]) -
            (matrix[0][1] * matrix[1][0] * matrix[2][2]) -
            (matrix[0][0] * matrix[1][2] * matrix[2][1]);
    }
    /**
     * Performs Gauss-Jordan elimination on the input matrix.  
     * The input matrix will be modified in place.
     * Input can be a singular or regular matrix.
     * @param matrix Matrix to eliminate
     * @returns The input matrix
     * @time O(N*M*min(N, M)) where N is the number of rows and M is the number of columns
     */
    static gaussJordanEliminationWithPartialPivotingInPlace<M extends number = number, N extends number = number>(matrix: Matrix<N, M>): Matrix<N, M> {
        const squareSize = Math.min(matrix.length, (matrix[0] as Vector<M>).length);
        const isZero = LowLevel.isZeroInContextOfAMatrix(matrix);
        for (let p = 0; p < squareSize; p++) { // Gauss part of Gauss-Jordan

            // Finding the largest absolute value
            let largestIndex: number = p;
            for (let i = p + 1; i < matrix.length; i++) {
                if (Math.abs((matrix[i] as Vector<M>)[p] as Scalar) > Math.abs((matrix[largestIndex] as Vector<M>)[p] as Scalar)) {
                    largestIndex = i;
                }
            }

            // Swapping the rows
            let tmp: Vector<M> = matrix[p] as Vector<M>;
            matrix[p] = matrix[largestIndex] as Vector<M>;
            matrix[largestIndex] = tmp;

            // Gaussian elimination
            const coefficient = (matrix[p] as Vector<M>)[p] as Scalar;
            if (isZero(coefficient)) { // If the coefficient is 0, we attempt to find a row above with 0 main diagonal coefficientand add it to this row
                for (let i = p - 1; i >= 0; i--) { // Lookup of the rows above
                    if (isZero((matrix[i] as Vector<M>)[i] as Scalar) && !isZero((matrix[i] as Vector<M>)[p] as Scalar)) { // If we find a row with 0 main diagonal coefficient, but that has a non-zero coefficient in the current column
                        for (let j = 0; j < (matrix[i] as Vector<M>).length; j++) { // We add this row to the current row
                            (matrix[p] as Vector<M>)[j] = ((matrix[i] as Vector<M>)[j] as Scalar) + ((matrix[p] as Vector<M>)[j] as Scalar);
                        }
                        for (let j = i + 1; i < p; i++) { // Becaue we added a row from higher up, we need to re-eliminte it for the current row
                            const coefficient = (matrix[p] as Vector<M>)[j] as Scalar;
                            for (let k = 0; k < (matrix[p] as Vector<M>).length; k++) { // We add this row to the current row multiplied by -coefficient
                                (matrix[p] as Vector<M>)[k] = ((matrix[p] as Vector<M>)[k] as Scalar) - ((matrix[j] as Vector<M>)[k] as Scalar) * coefficient;
                            }
                        }
                        break; // If we found such line, we can stop looking and continue with the elimination
                    }
                }
            }
            if (!isZero(coefficient)) { // If the coefficient is still 0, this row doesn't have a valid coefficient and we leave it in this form for now
                for (let i = p; i < (matrix[p] as Vector<M>).length; i++) { // We divide the whole row to have a 1 main diagonal coefficient
                    (matrix[p] as Vector<M>)[i] = ((matrix[p] as Vector<M>)[i] as Scalar) / coefficient;
                }
                for (let i = p + 1; i < matrix.length; i++) { // We can now eliminated all lower rows
                    const coefficient = (matrix[i] as Vector<M>)[p] as Scalar;
                    for (let j = 0; j < (matrix[i] as Vector<M>).length; j++) {
                        (matrix[i] as Vector<M>)[j] = ((matrix[i] as Vector<M>)[j] as Scalar) - ((matrix[p] as Vector<M>)[j] as Scalar) * coefficient;
                    }
                }
            }
        }

        for (let p = squareSize - 1; p >= 0; p--) { // Jordan part of Gauss-Jordan
            if ((matrix[p] as Vector<M>)[p] !== 0) { // If the coefficient is 0, this row cannot be used to eliminate any other rows
                for (let i = p - 1; i >= 0; i--) {
                    const coefficient = (matrix[i] as Vector<M>)[p] as Scalar;
                    for (let j = 0; j < (matrix[i] as Vector<M>).length; j++) {
                        (matrix[i] as Vector<M>)[j] = ((matrix[i] as Vector<M>)[j] as Scalar) - ((matrix[p] as Vector<M>)[j] as Scalar) * coefficient;
                    }
                }
            }
        }
        return matrix;
    }
}
