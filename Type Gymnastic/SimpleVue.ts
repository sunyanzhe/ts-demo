declare function SimpleVue<D, C, M,>(
  options: {
    data: () => D,
    computed: C,
    methods: M
  } & ThisType<D & GetComputedReturn<C> & M>
): any

type GetComputedReturn<C> = C extends Record<string, (...args: any[]) => any> 
  ? {
      [K in keyof C]: ReturnType<C[K]>
    }
  : never