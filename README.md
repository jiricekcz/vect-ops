# Vect-ops

Library for vecotr operations written in JavaScript.

## Usage

```typescript
import VectOps from 'vect-ops';

console.log(VectOps.add([1, 2, 3], [4, 5, 6])); // [5, 7, 9]
console.log(VectOps.add([1, 2, 3], [-4, -5, -6])); // [-3, -3, -3]
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

