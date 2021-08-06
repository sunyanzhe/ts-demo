// https://github.com/type-challenges/type-challenges/blob/master/questions/1367-medium-remove-index-signature/README.md

// Implement RemoveIndexSignature<T> , exclude the index signature from object types.

// example
/**
 * type Foo = {
 *   [key: string]: any;
 *   foo(): void;
 * }
 *
 * type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
 */

type FilterIndexSignature<T> = string extends T 
  ? never
  : number extends T
    ? never
    : T

type RemoveindexSignature<T> = {
  [k in keyof T as FilterIndexSignature<k>]: T[k]
}

type RemoveindexSignatureFoo = {
  [key: string]: any;
  foo(): void;
}

type RemoveindexSignatureBar = {
  [key: number]: any;
  bar(): void;
}

type RemoveindexSignatureBaz = {
  bar(): void;
  baz: string
}

type RemoveindexSignatureCase1 = RemoveindexSignature<RemoveindexSignatureFoo>
type RemoveindexSignatureCase2 = RemoveindexSignature<RemoveindexSignatureBar>
type RemoveindexSignatureCase3 = RemoveindexSignature<RemoveindexSignatureBaz>