interface SearchFunc {
  (source: string, subString: string): boolean
}

// let mySearch: SearchFunc

// mySearch = function(a, b) {
//   let result = a.search(b)  
//   return result > -1
// }
const mySearch: SearchFunc = function(a, b) {
  return a.search(b) > -1
}

interface SearchObj {
  search(source: string, subString: string): boolean;
  name: string
}

let searchobj = {
  name: 'a',
  search(a, b) {return a.search(b) > -1}
}