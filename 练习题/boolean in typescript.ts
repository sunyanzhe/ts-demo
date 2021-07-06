type CheckUserId<
  Properties extends {},
  AddUserId extends boolean
> = 
  AddUserId extends true
  ? Properties & { userId: string }
  : Properties & { userId?: string }

declare function mutate<P, A extends boolean = false>
  (props: CheckUserId<P, A>, AddUserId?: A): void
