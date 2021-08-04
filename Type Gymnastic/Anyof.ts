// https://github.com/type-challenges/type-challenges/blob/master/questions/949-medium-anyof/README.md

// Implement Python liked any function in the type system. 
// A type takes the Array and returns true if any element of the Array is true. 
// If the Array is empty, return false.


// example

// type Sample1 = AnyOf<[1, "", false, [], {}]>; // expected to be true.
// type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.

type AnyOf<T extends readonly any[]> = T[number] extends Falsy ? false : true

type Falsy = '' | 0 | [] | false | {[key: string]: never}


// example
type AnyOfSample1 = AnyOf<[1, "", false, [], {}]>; // expected to be true.
type AnyOfSample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.