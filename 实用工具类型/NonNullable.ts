type ExNonn = NonNullable<string | undefined | number> // string | number
type ExNonn2 = NonNullable < undefined > // never

// 手写

type MyNonNullable<T> = T extends undefined | null ? never : T

type ExNonn3 = MyNonNullable < undefined > // never
