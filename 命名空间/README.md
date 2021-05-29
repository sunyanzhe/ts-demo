# 命名空间

## 介绍
任何使用`module`关键字来声明一个内部模块的地方都应该使用`namespace`关键字来替换。这就避免了让新的使用者被相似的名称所迷惑

## 第一步
实现一个字符串验证器

**所有的验证器都放在一个文件里**

```ts
interface StringValidator {
  isAcceptable(s: string): boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;

class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// Some samples to try
let strings = ['Hello', '98052', '101']

// Validators to use
let validators: { [s: string]: StringValidator; } = {}
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s);
    console.log(`'${ s }' ${ isMatch ? "matches" : "does not match" } '${ name }'.`)
  }
}
```

