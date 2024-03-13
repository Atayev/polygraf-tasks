type User = {
  name: string,
  age: number,
  banned: boolean,
  status: "online" | "invisible" | "away" | "offline" | "dnd"
}

type Example = {
  creation_date: string; //datestring
  id: `${string}-${string}-${string}-${string}` //uuid
  like_count: number,
  author: User
}



/**
 * The following function has been implemented naively, with the widest types
 * The input params don't have any intellisense/autocomplete, and the function allows invalid imputs
 * Improve the function's type signature. Points are awarded for:
 * - autocompletion
 * - narrowness of types
 * - correctness of types and hence how good the build-time guarantees are
 * - readability
 * - extendability of relevant types
 */


type Params = {
  [key:string] : string | number | boolean
}

function setValue<T extends keyof Params>(key:T,value:Params[T]): boolean{

  let mockStorage:Params ={}

  mockStorage[key] = value
  console.log(`Set ${key} to ${value}`) //imagine this writes to something like LocalStorage or URLSearchParams
  return key in mockStorage
}





setValue("nonexistent", 1231)
setValue("like_count", "morbillion")





/**
 * The following function should receive a list of allowed states and the initial state
 * Yet the current implementation doesn't check if the initial state is one of the allowed states
 * 
 * This is a bonus question, and you don't need to successfully complete it, but points will be made
 * for your approach to solving this problem, even if you don't succeed. While it is possible, solving it is not trivial
 * in current versions of Typescript, but TS has added a utility type that trivially solves it on the day of making this excercize 
 */


type NoInfer<T> = T & { [K in keyof T]: T[K] }


function bonus<T extends string>(allowed_states:Array<T>,initial: NoInfer<T>){
  console.log(allowed_states,initial)
}

bonus(["foo","bar"],"invalid")
bonus(["foo","bar"],"bar")