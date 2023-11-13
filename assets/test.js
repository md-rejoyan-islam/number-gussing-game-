let iterable = "Hello World!";

// Symbol.iterator is a function that returns an iterator
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next().value);

console.log("iter");
console.log(iterator.next());

// console.log(iterator.next()); ==> undefined={}

let names = ["a", "b", "c"];

// custom iterator
function customIterator(arr) {
  let i = 0;

  return {
    next: function () {
      return i < arr.length ? { value: arr[i++], done: false } : { done: true };
    },
  };
}

let members = customIterator(names);
console.log(members.next());

// generator function
function* generatorFunction() {
  console.log("this will be executed first");
  yield "hello";
  console.log("i will be printed after the pause");
  yield "world";
}

const generatorObject = generatorFunction();
console.log(generatorObject.next().value);
console.log(generatorObject.next().value);
console.log(generatorObject.next().value);
