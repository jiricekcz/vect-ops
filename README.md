# Vect-ops

VectOps is a pure JavaScript, no dependancy library for performant vector operations. VectOps provides functions with minimal runtime overhead.  
VectOps provides two APIs - A low level API and a high level API.  
Both APIs should be able to provide the same functionality with the main difference being the high level API uses runtime type checks and function overloads as well as TypeScript definitions, while the low level API relies only on compile time type checks (using TypeScript).  
Both APIs are provided as classes, that have all methods as both static methods and instance methods.  
The advantage of the instance methods is, that you can set the length of the vectors in the constructor and use the methods without providing the length as a type parameter. This is all TypeScript only, so it will not affect the runtime performance.

## Installation

```bash
npm i vect-ops
```

## Shared API

The shared API is shared between the low level API and the high level API and provided in the default export of the library.  
It consists mostly of types.

### Shared types

#### Utility types

```typescript

// A type that represents an array of type T with fixed length L
// This type is used at almost every place where length represented by a number is needed.
// The T parameter can be any type.
// The L parameter can only be a number strictly greater than 0 and lower than 1000.
// The L parameter can also be a generic number type, or a type union
// If you use a number literal larger than 1000, you will get a TypeScript recursion limit error.
type FixedLengthArray<T, L extends number>; 
```

#### Scalar type

```typescript
// A Scalar is a number
type Scalar;
```

#### Vector types

Vector types also have an *atLeast* alternative. This type is used in places, where a larger vector will not cause problems, but the later values will be ignored.
```typescript
// A Vector is a mutable array of Scalars of length L
type Vector<L extends number = number>;

// Vector with the length of at least L
type VectorWithMinLength<L extends number = number>;

// A ReadonlyVector is a readonly array of Scalars of length L
type ReadonlyVector<L extends number = number>;

// ReadonlyVector with the length of at least L
type ReadonlyVectorWithMinLength<L extends number = number>;

// A Vector2D is a mutable array of Scalars of length 2
type Vector2D;

// A vector of at least 2 elements
type VectorAtLeast2D;

// A ReadonlyVector2D is a readonly array of Scalars of length 2
type ReadonlyVector2D;

// A readonly vector of at least 2 elements
type ReadonlyVectorAtLeast2D;

// A Vector3D is a mutable array of Scalars of length 3
type Vector3D;

// A vector of at least 3 elements
type VectorAtLeast3D;

// A ReadonlyVector3D is a readonly array of Scalars of length 3
type ReadonlyVector3D;

// A readonly vector of at least 3 elements
type ReadonlyVectorAtLeast3D;

// Note that the Vector2D and Vector3D types are just aliases for Vector<2> and Vector<3>
```

#### Matrix types

Matrix types also have an *atLeast* alternative. This type is used in places, where a larger matrix will not cause problems, but the later values will be ignored.
```typescript
// A Matrix is a mutable array of Vectors of length M
// The matrix is represented as on the wiki page: https://en.wikipedia.org/wiki/Matrix_(mathematics)
// Elements of the matrix can be accessed using the matrix[row][column] syntax starting from 0.
type Matrix<M extends number = number, N extends number>;

// Matrix with the number of rows of at least M
// In other ways the same as Matrix
type MatrixWithMinRows<M extends number = number, N extends number>;

// Matrix with the number of columns of at least N
// In other ways the same as Matrix
type MatrixWithMinColumns<M extends number = number, N extends number>;

// Matrix with the number of rows and columns of at least M and N
// In other ways the same as Matrix
type MatrixWithMinRowsAndColumns<M extends number = number, N extends number>;

// A readonly version of the Matrix type
type ReadonlyMatrix<M extends number = number, N extends number>;

// A readonly version of the MatrixWithMinRows type
type ReadonlyMatrixWithMinRows<M extends number = number, N extends number>;

// A readonly version of the MatrixWithMinColumns type
type ReadonlyMatrixWithMinColumns<M extends number = number, N extends number>;

// A readonly version of the MatrixWithMinRowsAndColumns type
type ReadonlyMatrixWithMinRowsAndColumns<M extends number = number, N extends number>;

// A Matrix2D is a mutable array of length 2 of Vectors of length 2
type Matrix2D;

// A matrix of at least 2 rows and 2 columns
type MatrixAtLeast2D;

// Readonly version of the Matrix2D type
type ReadonlyMatrix2D;

// Readonly version of the MatrixAtLeast2D type
type ReadonlyMatrixAtLeast2D;

// A Matrix3D is a mutable array of length 3 of Vectors of length 3
type Matrix3D;  

// A matrix of at least 3 rows and 3 columns
type MatrixAtLeast3D;

// Readonly version of the Matrix3D type
type ReadonlyMatrix3D;

// Readonly version of the MatrixAtLeast3D type
type ReadonlyMatrixAtLeast3D;
```

## Low level API

The low level API is provided in the `LowLevel` export of the library. All functions, that depend on vector length are generic functions. If you use only one vector length, you can instantiate the class with the length as a type parameter.  
For additional type safety, you can provide the legth as a generic type parameter to the functions.

### Equality

VectOps provides functions to check mathematical equality of vectors and matricies.  
Two vectors are equal, if they have the same size and the same elements.
TWo matricies are equal, if they have the same size in both dimensions and the same elements.  
Two elements are compared using a float compare function, that you can customize.
```typescript
import { LowLevel as VectOps } from 'vect-ops';
// 14 significant digits is the default.
// This line is necessary only if you want to change the compare mode 
// or be extra explicit about the compare mode.
VectOps.compareMode = VectOps.COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS;

console.log(VectOps.areTwoVectorsEqual([1, 2, 3], [1, 2, 3])); // true

console.log(VectOps.areVectorsEqual([1, 2, 3], [1, 2, 3], [1, 2, 3])); // true

console.log(VectOps.areTwoMatricesEqual([[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]])); // true
```

### Copy
VectOps provides functions to copy vectors and matrices.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];

console.log(VectOps.copyVector(a)); // [1, 2, 3]
console.log(VectOps.copyVectorMany(a), 3); // [[1, 2, 3], [1, 2, 3], [1, 2, 3]]

console.log(VectOps.copyMatrix([[1, 2, 3], [4, 5, 6]])); // [[1, 2, 3], [4, 5, 6]]
```

### In place addition

VectOps provides functions to add vectors to another without creating a new vector.  
An *unchecked* variant is provided, that does not check the size of the vectors. It is not recommended to use the *uncheck* variant, because it can lead to ***NaN*** values in the vector. You can use the unchecked variant, if you are sure that the vectors have the same size.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [1, 1, 1];
const d = [1, 1, 2];


VectOps.addTo(a, b);
console.log(a); // [5, 7, 9]

VectOps.addToMany(b, [c, d]);
console.log(b); // [6, 7, 9]
```

### Addition

VectOps provides functions to add vectors creating another vector.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


console.log(VectOps.add([1, 2, 3], [4, 5, 6])); // [5, 7, 9]
console.log(VectOps.add([1, 2, 3], [-4, -5, -6], [3, 3, 3])); // [0, 0, 0]
```

### Magnitude

VectOps provides functions to compute the magnitude of a vector.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


console.log(VectOps.magnitude([3, 4])); // 5
```

### Multiplication by scalar in place

VectOps provides functions to multiply a vectors and matricies by a scalar in place.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];
const A = [[1, 2, 3], [4, 5, 6]];
const b = -1;

VectOps.multiplyByScalarInPlace(a, b);
VectOps.multiplyMatrixByScalarInPlace(A, b);
console.log(a); // [-1, -2, -3]
console.log(A); // [[-1, -2, -3], [-4, -5, -6]]
```

### Multiplication by scalar
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];
const A = [[1, 2, 3], [4, 5, 6]];

console.log(VectOps.multiplyByScalar(a, -1)); // [-1, -2, -3]
console.log(VectOps.multiplyMatrixByScalar(A, -1)); // [[-1, -2, -3], [-4, -5, -6]]
```

### Normalize in place

VectOps provides functions to normalize a vector in place.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [3, 4];

VectOps.normalizeInPlace(a);
console.log(a); // [0.6, 0.8]
```

### Normalize

VectOps provides functions to normalize a vector.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [3, 4];

console.log(VectOps.normalize(a)); // [0.6, 0.8]
```

### Hadamard product in place

VectOps provides functions to compute the Hadamard product of two vectors in place. [Hadamard product](https://en.wikipedia.org/wiki/Hadamard_product_(matrices)) is also known as the element-wise product.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];
const b = [4, 5, 6];

VectOps.hadamardProductInPlace(a, b);
console.log(a); // [4, 10, 18]
```

### Hadamard product

VectOps provides functions to compute the Hadamard product of two vectors. Hadamard product is also known as the element-wise product.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


console.log(VectOps.hadamardProduct([1, 2, 3], [4, 5, 6])); // [4, 10, 18]
```

### Vector equivalency

VectOps provides functions to check if two vectors are equivalent. Two vectors are equivalent, if they have the same dimension and the same direciton.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [1, 2, 3])); // true
console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [-1, -2, -3])); // true
console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [1, 2, 4])); // false
console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [1, 2])); // false
console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [2, 4, 6])); // true
```

### Dot product

VectOps provides functions to compute the dot product of two vectors.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


console.log(VectOps.dotProduct([1, 2, 3], [4, 5, 6])); // 32
console.log(VectOps.dotProduct([1, 2, 3], [-4, -5, -6])); // -32
console.log(VectOps.dotProduct([1, 2], [1, 2, 3])); // throws an error
```

### Magnitude squared

VectOps provides functions to compute the magnitude squared of a vector.   
This method is faster than computing the magnitude, because it does not need to compute the square root.  
It can be used to compare the magnitude of two vectors, without the need to compute the square root of the magnitude of both vectors.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [3, 4];
const b = [1, 2];

console.log(VectOps.magnitudeSquared(a)); // 25
console.log(VectOps.magnitudeSquared(b)); // 5
// because 25 > 5, the magnitude of a is greater than the magnitude of b
```

### Cross product 3D

VectOps provides functions to compute the cross product of two three dimensional vectors.  
This function only works on three dimensional vectors, as the cross product is only defined for three dimensional vectors.  
Providing a vector with a different dimension will result in undefined behavior.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];
const b = [4, 5, 6];

console.log(VectOps.crossProduct(a, b)); // [-3, 6, -3]
console.log(VectOps.crossProduct(b, a)); // [3, -6, 3]
```

### Triple product 3D

VectOps provides functions to compute the [triple product](https://en.wikipedia.org/wiki/Triple_product) of three three dimensional vectors.  
This function only works on three dimensional vectors, as the triple product is only defined for three dimensional vectors.  
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [7, 8, 9];

console.log(VectOps.scalarTripleProduct(a, b, c)); // 0
console.log(VectOps.vectorTripleProduct(a, b, c)); // [0, 0, 0]
```

### Vector Average

VectOps provides functions to compute the average of a list of vectors.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [7, 8, 9];

console.log(VectOps.vectorAverage([a, b, c])); // [4, 5, 6]
```

### Subtraction in place

VectOps provides functions to subtract one vector from another vector in place.
```typescript
import { LowLevel as VectOps } from 'vect-ops';


const a = [1, 2, 3];
const b = [4, 5, 6];

VectOps.subtractInPlace(a, b);
console.log(a); // [-3, -3, -3]
```

### Matrix multiplication

VectOps provides functions to multiply two matrices.
```typescript
import { LowLevel as VectOps } from 'vect-ops';

const A = [
    [1, 2, 3],
    [4, 5, 6],
] as const;
const B = [
    [1, 2],
    [4, 3],
    [5, 8],
] as const;

console.log(VectOps.matrixMultiplication(A, B)); // [[24, 32], [54, 71]]
```

### Angle between two vectors

VectOps provides functions to compute the angle between two vectors.
```typescript
import { LowLevel as VectOps } from 'vect-ops';

const a = [1, 0, 0];
const b = [0, 5, 0];

console.log(Math.acos(VectOps.cosineOfAngleBetweenTwoVectors(a, b))); // Math.PI / 2
```

### Matrix and vector multiplication

VectOps provides a function for linear transformation of a vector.
```typescript
import { LowLevel as VectOps } from 'vect-ops';

const A = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
] as const;
const b = [1, 2, 3];

console.log(VectOps.multiplyMatrixAndVector(A, b)); // [14, 32, 50]
```

### Linear combination

VectOps provides a function to compute the linear combination of a list of vectors.
```typescript
import { LowLevel as VectOps } from 'vect-ops';

const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [7, 8, 9];

console.log(VectOps.linearCombination([a, b, c], [1, 2, 3])); // [30, 36, 42]
```

### Determinant 2D

VectOps provides a function to compute the determinant of a 2x2 matrix. A larger matrix will be accepted, but only the first two rows and columns will be used.
```typescript
import { LowLevel as VectOps } from 'vect-ops';

const A = [
    [1, 2],
    [3, 4],
] as const;

console.log(VectOps.determinant2D(A)); // -2
```
## Requirements

- ES6 compatible environment

## When to use a JavaScript implementation?

### Pros

- Low overhead
Without FFI calls, or data transformation to be used with WebAssembly, the library has low overhead for function calls.
- Small size
The minified library is very likely smaller, than a compiled WebAssembly module.
- Cross platform
Because the library is written only with ES6 compatible language, so the library can be used in the browser, Node.js, or any other JavaScript environment, that supports ES6.

### Cons

- Performance
Beacuse the library is written in JavaScript, it has a lower performance than compiled modules, like WebAssembly.

### JavaScript vs WebAssembly

When to use JavaScript as opposed to WebAssembly?

#### JavaScript

You should use a JavaScript implementation over WebAssembly as long as you plan to make a lot of calls to the library. The functions of this library are very fast, so WebAssembly overhead is most likely not worth it.

#### WebAssembly

You should use WebAssembly over JavaScript, if you plan to make only a few calls to the library. This can occur, if you want to compute in a multi-dimensional space with a large number of dimensions. In this case, the overhead of WebAssembly might be worth it. You should perform your own benchmarks to find out, if the WebAssembly implementation you are comparing to is faster than this JavaScript implementation.

### JavaScript vs FFI

When to use JavaScript as opposed to FFI?  
This case is very similar to the JavaScript vs WebAssembly case with just an additional disadvantage of FFI calls - FFI calls can only be used in Node.js or other server environments, that support FFI calls.

### JavaScript vs Native

When to use JavaScript as opposed to native code?

#### JavaScript

You should use a JavaScript implementation over native code, if you plan to use the library in the browser. The browser does not support custom native code, so you have to use JavaScript.

#### Native

You should use native code over JavaScript, if you plan to use the library in a server environment. The native code will most likely be faster than the JavaScript implementation.

