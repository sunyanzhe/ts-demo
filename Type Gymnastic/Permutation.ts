// https://github.com/type-challenges/type-challenges/blob/master/questions/296-medium-permutation/README.md
// Implement permutation type that transforms union types into the array that includes permutations of unions.
// type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

type perm<T, K = T> = T extends [never] 
  ? []
  : K extends any
    ? [K, Exclude<T, K>]
    : []
  