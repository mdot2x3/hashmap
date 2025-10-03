import { HashMap } from "./HashMap.js";

const test = HashMap();

// populate hash map up to full capacity (0.75)
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// report basic hash map data
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());

// overwrite current hash map buckets and verify
test.set("apple", "green");
test.set("dog", "black");
test.set("kite", "brown");
console.log(test.length());
console.log(test.entries());

// run tests with other methods
console.log(test.get("apple"));
console.log(test.get("elephant"));

console.log(test.has("ice cream"));
console.log(test.has("car"));

test.remove("lion");
console.log(test.length());
console.log(test.entries());

test.clear();
console.log(test.length());
console.log(test.entries());

test.set("car", "white");
console.log(test.length());
console.log(test.entries());

// make load levels exceed load factor, triggering capacity increase
test.set("moon", "silver");
console.log(test.length());
console.log(test.entries());
console.log(test.getCapacity());
console.log(test.bucketSizes());

// overwrite additional nodes
test.set("hat", "white");
test.set("ice cream", "purple");
test.set("jacket", "yellow");
console.log(test.length());
console.log(test.entries());

// run additional tests with other methods on expanded hash map
console.log(test.get("moon"));
console.log(test.get("elephant"));

console.log(test.has("ice cream"));
console.log(test.has("car"));

test.remove("lion");
console.log(test.length());
console.log(test.entries());

test.clear();
console.log(test.length());
console.log(test.entries());

test.set("car", "white");
console.log(test.length());
console.log(test.entries());
console.log(test.getCapacity());
console.log(test.bucketSizes());
