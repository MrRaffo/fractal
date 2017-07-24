function complexAdd(complex1, complex2) {
  return [complex1[0] + complex2[0], complex1[1] + complex2[1]];
}

function complexMultiply(complex1, complex2) {
  let real = complex1[0] * complex2[0] - complex1[1] * complex2[1];
  let imag = complex1[1] * complex2[0] + complex1[0] * complex2[1];
  return [real, imag];
}

function complexSquare(complex) {
  return [complex[0]*complex[0] - complex[1]*complex[1], 2 * complex[0] * complex[1]];
}

function juliaFunction(complex, addition) {
  return complexAdd(complexSquare(complex), addition);
};

// returns true if res is beyond limit
function checkLimit(res, limit) {
  if ((res[0] * res[0] + res[1] * res[1]) > (limit * limit)) {
    return true;
  } else {
    return false;
  }
}

// convert [x, y] to values within -1.5 to 1.5 based on the size of the grid
function normalizeCoord(x, y, gridSize) {
  let newX = ((x - gridSize / 2) / gridSize) * 3;
  let newY = -((y - gridSize / 2) / gridSize) * 3;
  return [newX, newY];
}

function iteratePoint(complex, addition, maxIterations) {
  let result = false;
  for (i = 1; i <= maxIterations; i++) {
    complex = juliaFunction(complex, addition);
    if (checkLimit(complex, 2)) {
      return i;
    }
  }
  return 0;
}

// return a grid (gridSize x gridSize) where each member is the number of iterations it took
// for the number to escape, 0 if it doesn't
function makeJuliaSet(addition, maxIterations, gridSize) {
  let grid = [];
  for (y = 0; y < gridSize; y++) {
    let row = [];
    for (x = 0; x < gridSize; x++) {
      let complex = normalizeCoord(x, y, gridSize);
      row.push(iteratePoint(complex, addition, maxIterations));
    }
    grid.push(row);
  }
  return grid;
}

// return a grid between the given ranges of the julia set (from [min, min i] to [max, max i])
function makeJuliaSubset(addition, maxIterations, gridSize, min, max) {
  let grid = [];
  let step = (max - min) / gridSize;
  for (y = 0; y < gridSize; y++) {
    let row = [];
    for (x = 0; x < gridSize; x++) {
      let point = [min + step * x, max - (step * y)];   // remember y increases downwards on screen
      row.push(iteratePoint(point, addition, maxIterations));
    }
    grid.push(row);
  }
  return grid;
}

function juliaIterate(complex, addition, limit, maxIterations) {
  let res = juliaFunction(complex, addition);
  for (i = 0; i < maxIterations; i++) {
    if (checkLimit(res, limit)) {
      return [false, i];
    } else {
      res = juliaFunction(res, addition);
    }
  }
  return [true, maxIterations];
}
