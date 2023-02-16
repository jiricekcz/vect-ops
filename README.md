# Vect-ops

VectOps is a pure javascript library for performant vector operations. VectOps provides functions with minimal runtime overhead.s


## Installation

```bash
npm i vect-ops
```

## Types

### Vectors

VectOps provides a few types to represent vectors.  
Providing a type parameter to the vector types, you can specify the length of the vector and achieve additional type safety.  
If you use strongly typed vector lengths, you will be forced by TypeScript to manage the length of the vectors.

```typescript
import VectOps from 'vect-ops';

const a: VectOps.Vector = []; // A generic mutable vector
const b: VectOps.ReadonlyVector = []; // A generic readonly vector

const c: VectOps.Vector<2> = [1, 2]; // A fixed length mutable vectors
const d: VectOps.ReadonlyVector<2> = [1, 2]; // A fixed length readonly vector

// VectOps also provides a few predefined types for vectors with 2 and 3 elements.
const e: VectOps.Vector2D = [1, 2]; // A 2D mutable vector
const f: VectOps.ReadonlyVector2D = [1, 2]; // A 2D readonly vector

const g: VectOps.Vector3D = [1, 2, 3]; // A 3D mutable vector
const h: VectOps.ReadonlyVector3D = [1, 2, 3]; // A 3D readonly vector
```

## Functions

Many functions in VectOps are generics with a type parameter, that specifies the length of the vector.  
Typescript can infer some information from your calls, but if you want all the type safety, you should provide the type parameter.

### Equality

VectOps provides functions to check mathematical equality of vectors.  
Two vectors are equal, if they have the same size and the same elements.  
Two elements are compared using a float compare function, that you can customize.
```typescript
import VectOps from 'vect-ops';
// 14 significant digits is the default.
// This line is necessary only if you want to change the compare mode 
// or be extra explicit about the compare mode.
VectOps.compareMode = VectOps.COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS;

console.log(VectOps.areTwoVectorsEqual([1, 2, 3], [1, 2, 3])); // true

console.log(VectOps.areVectorsEqual([1, 2, 3], [1, 2, 3], [1, 2, 3])); // true
```

### Copy
VectOps provides functions to copy vectors.
```typescript
import VectOps from 'vect-ops';

const a = [1, 2, 3];

console.log(VectOps.copyVector(a)); // [1, 2, 3]
console.log(VectOps.copyVectorMany(a), 3); // [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
```

### In place addition

VectOps provides functions to add vectors to another without creating a new vector.  
An *uncheck* variant is provided, that does not check the size of the vectors. It is not recommended to use the *uncheck* variant, because it can lead to ***NaN*** values in the vector. You can use the unchecked variant, if you are sure that the vectors have the same size.
```typescript
import VectOps from 'vect-ops';

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
import VectOps from 'vect-ops';

console.log(VectOps.add([1, 2, 3], [4, 5, 6])); // [5, 7, 9]
console.log(VectOps.add([1, 2, 3], [-4, -5, -6], [3, 3, 3])); // [0, 0, 0]
```

### Magnitude

VectOps provides functions to compute the magnitude of a vector.
```typescript
import VectOps from 'vect-ops';

console.log(VectOps.magnitude([3, 4])); // 5
```

### Multiplication by scalar in place

VectOps provides functions to multiply a vector by a scalar in place.
```typescript
import VectOps from 'vect-ops';

const a = [1, 2, 3];
const b = -1;

VectOps.multiplyByScalarInPlace(a, b);
console.log(a); // [-1, -2, -3]
```

### Multiplication by scalar
```typescript
import VectOps from 'vect-ops';

const a = [1, 2, 3];

console.log(VectOps.multiplyByScalar(a, -1)); // [-1, -2, -3]
```

### Normalize in place

VectOps provides functions to normalize a vector in place.
```typescript
import VectOps from 'vect-ops';

const a = [3, 4];

VectOps.normalizeInPlace(a);
console.log(a); // [0.6, 0.8]
```

### Normalize

VectOps provides functions to normalize a vector.
```typescript
import VectOps from 'vect-ops';

const a = [3, 4];

console.log(VectOps.normalize(a)); // [0.6, 0.8]
```

### Hadamard product in place

VectOps provides functions to compute the Hadamard product of two vectors in place. Hadamard product is also known as the element-wise product.
```typescript
import VectOps from 'vect-ops';

const a = [1, 2, 3];
const b = [4, 5, 6];

VectOps.hadamardProductInPlace(a, b);
console.log(a); // [4, 10, 18]
```

### Hadamard product

VectOps provides functions to compute the Hadamard product of two vectors. Hadamard product is also known as the element-wise product.
```typescript
import VectOps from 'vect-ops';

console.log(VectOps.hadamardProduct([1, 2, 3], [4, 5, 6])); // [4, 10, 18]
```

### Vector equivalency

VectOps provides functions to check if two vectors are equivalent. Two vectors are equivalent, if they have the same dimension and the same direciton.
```typescript
import VectOps from 'vect-ops';

console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [1, 2, 3])); // true
console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [-1, -2, -3])); // true
console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [1, 2, 4])); // false
console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [1, 2])); // false
console.log(VectOps.areTwoVectorsEquivalent([1, 2, 3], [2, 4, 6])); // true
```

### Dot product

VectOps provides functions to compute the dot product of two vectors.
```typescript
import VectOps from 'vect-ops';

console.log(VectOps.dotProduct([1, 2, 3], [4, 5, 6])); // 32
console.log(VectOps.dotProduct([1, 2, 3], [-4, -5, -6])); // -32
console.log(VectOps.dotProduct([1, 2], [1, 2, 3])); // throws an error
```

### Magnitude squared

VectOps provides functions to compute the magnitude squared of a vector.   
This method is faster than computing the magnitude, because it does not need to compute the square root.  
It can be used to compare the magnitude of two vectors, without the need to compute the square root of the magnitude of both vectors.
```typescript
import VectOps from 'vect-ops';

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
import VectOps from 'vect-ops';

const a = [1, 2, 3];
const b = [4, 5, 6];

console.log(VectOps.crossProduct(a, b)); // [-3, 6, -3]
console.log(VectOps.crossProduct(b, a)); // [3, -6, 3]
```

### Triple product 3D

VectOps provides functions to compute the triple product of three three dimensional vectors.  
This function only works on three dimensional vectors, as the triple product is only defined for three dimensional vectors.  
```typescript
import VectOps from 'vect-ops';

const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [7, 8, 9];

console.log(VectOps.scalarTripleProduct(a, b, c));
console.log(VectOps.vectorTripleProduct(a, b, c));
```

### Vector Average

VectOps provides functions to compute the average of a list of vectors.
```typescript
import VectOps from 'vect-ops';

const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [7, 8, 9];

console.log(VectOps.vectorAverage([a, b, c])); // [4, 5, 6]
```

### Subtraction in place

VectOps provides functions to subtract one vector from another vector in place.
```typescript
import VectOps from 'vect-ops';

const a = [1, 2, 3];
const b = [4, 5, 6];

VectOps.subtractInPlace(a, b);
console.log(a); // [-3, -3, -3]
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

