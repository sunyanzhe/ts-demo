const actions = ["CREATE", "READ", "UPDATE", "DELETE"] as const

function execute(action: string) {
  if (actions.includes(action)) {

  }
}

function includes<T extends U, U>(arrs: ReadonlyArray<T>, action: U): action is T {
  return arrs.includes(U as T)
}