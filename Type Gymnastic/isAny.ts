type isAny<T> = boolean extends (any extends T ? true : false) ? false : true

type isAnyTest1 = isAny<boolean>
type isAnyTest2 = isAny<any>