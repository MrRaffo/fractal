function testRandomComplex() {
  return [Math.floor((Math.random() * 100) - 50), Math.floor((Math.random() * 100) - 50)];
}

function testAdd() {
  for (i = 0; i < 10; i++) {
    let c1 = testRandomComplex();
    let c2 = testRandomComplex();
    console.log(c1 + " + " + c2 + " = " + complexAdd(c1, c2));
  }
}

function testMultiply() {
  for (i = 0; i < 10; i++) {
    let c1 = testRandomComplex();
    let c2 = testRandomComplex();
    console.log(c1 + " * " + c2 + " = " + complexMultiply(c1, c2));
  }
}

function testFunc(func, iterations) {
  for (i = 0; i < iterations; i++) {
    let c1 = testRandomComplex();
    let c2 = testRandomComplex();
    console.log("Test for " + func.name + " [" + c1 + "] [" + c2 + "]: " + func(c1, c2));
  }
}

/*
console.log("iteration: " + iteratePoint([0.5, 0.85], [0, 0], 20));
console.log("iteration: " + iteratePoint([0.85, 0.85], [-0.75, -0.25], 20));
console.log("square: " + complexSquare([0.85, 0.85], [0.85, 0.85]));

//testFunc(complexMultiply, 10);
console.log("known: " + complexMultiply([3, 4], [2, 5]));
console.log("known: " + complexMultiply([5, -4], [5, 4]));
console.log("known: " + complexMultiply([4, -3], [4, -3]));
console.log("known: " + complexSquare([0.5, 0.5]));

console.log("iteration: " + iteratePoint([0, -0.51], [0.25, 0.5], 20));
alert("ready");
grid = makeJuliaSet([0.25, 0.5], 20, 400);
console.log("done: " + grid.length + " " + grid[0].length);
*/
console.log("iteration: " + iteratePoint([0, 0], [0.25, 0.5], 3));
console.log("normalize: " + normalizeCoord(600, 400, 800));
