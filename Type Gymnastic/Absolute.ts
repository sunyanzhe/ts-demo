// https://github.com/type-challenges/type-challenges/blob/master/questions/529-medium-absolute/README.md

// Implement the Absolute type. A type that take string, number or bigint. The output should be a positive number string

/**
 * type Test = -100;
 * type Result = Absolute<Test>; // expected to be "100"
 */


type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}` ? R : `${T}`
