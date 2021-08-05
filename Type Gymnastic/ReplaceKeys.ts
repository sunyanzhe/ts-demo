// https://github.com/type-challenges/type-challenges/blob/master/questions/1130-medium-replacekeys/README.md

// Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing, A type takes three arguments.

/** example
 * type NodeA = {
 *   type: 'A'
 *   name: string
 *   flag: number
 * }
 *
 * type NodeB = {
 *   type: 'B'
 *   id: number
 *   flag: number
 * }
 *
 * type NodeC = {
 *   type: 'C'
 *   name: string
 *   flag: number
 * }
 * 
  type Nodes = NodeA | NodeB | NodeC

  type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

  type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
 */

type ReplaceKeys<T, U, Y> = T extends any
  ? {
    [K in keyof T]: K extends U
      ? K extends keyof Y
        ? Y[K]
        : never
      : T[K]
  }
  : never

  type ReplaceKeysNodeA = {
    type: 'A'
    name: string
    flag: number
  }
  
  type ReplaceKeysNodeB = {
    type: 'B'
    id: number
    flag: number
  }
  
  type ReplaceKeysNodeC = {
    type: 'C'
    name: string
    flag: number
  }
  
  
  type ReplaceKeysNodes = ReplaceKeysNodeA | ReplaceKeysNodeB | ReplaceKeysNodeC
  
  type ReplacedNodes = ReplaceKeys<ReplaceKeysNodes, 'name' | 'flag', {name: number, flag: string}> 
  // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} 
  // would replace name from string to number, replace flag from number to string.
  
  type ReplacedNotExistKeys = ReplaceKeys<ReplaceKeysNodes, 'name', {aa: number}>
  // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} 
  // would replace name to never