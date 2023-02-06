# Vect-ops

Library for vecotr operations written in JavaScript.

## Usage

```typescript
import VectOps from 'vect-ops';

console.log(VectOps.add([1, 2, 3], [4, 5, 6])); // [5, 7, 9]
console.log(VectOps.add([1, 2, 3], [-4, -5, -6])); // [-3, -3, -3]
```

### Equality

VectOps provides functions to check mathematical equality of vectors.  
Two vectors are equal, if they have the same size and the same elements.  
Two elements are compared using a float compare function, that you can customize.
```typescript
import VectOps from 'vect-ops';

VectOps.compareMode = VectOps.COMPARE_MODES.FLOAT_EQUALITY_14_SIGNIFICANT_DIGITS; // 14 significant digits is the default, so this line is necessary only if you want to change the compare mode or be extra explicit about the compare mode.

console.log(VectOps.areTwoVectorsEqual([1, 2, 3], [1, 2, 3])); // true

console.log(VectOps.areVectorsEqual([1, 2, 3], [1, 2, 3], [1, 2, 3])); // true
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

