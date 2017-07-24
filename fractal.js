Fractal = {

  //
  // TYPE TO GENERATE
  //

  type: "julia",
  setType: function(type) {
    this.type = type;
  },

  //
  // RANGE (AREA OF FRACTAL TO GENERATE)
  //

  realRangeMin: -1.5,
  realRangeMax: 1.5,
  setRealRange: function(min, max) {
    this.realRangeMin = min;
    this.realRangeMax = max;
  },

  imagRangeMin: -1.5,
  imagRangeMax: 1.5,
  setImagRange: function(min, max) {
    this.imagRangeMin = min;
    this.imagRangeMax = max;
  },

  //
  // SIZE OF GRID TO GENERATE
  //

  width: 800,
  height: 800,
  setDrawSize: function(width, height) {
    this.width = width;
    this.height = height;
  },

  // generate the grid

  generateJuliaSet: function(add_component, maxIterations) {
    let grid = [];
    let xStep = (this.realRangeMax - this.realRangeMin) / this.width;
    let yStep = (this.imagRangeMax - this.imagRangeMin) / this.height;

    for (y = 0; y < this.height; y++) {
      let row = [];
      for (x = 0; x < this.width; x++) {
        // the imaginary component is calculated this way as y increases DOWN the screen
        let point = [this.realRangeMin + (xStep * x), this.imagRangeMax - (yStep * y)];
        row.push(iteratePoint(point, add_component, maxIterations));
      }
      grid.push(row);
    }
    return grid;
  },

  generateMandelbrotSet: function(maxIterations) {
    let grid = [];
    let xStep = (this.realRangeMax - this.realRangeMin) / this.width;
    let yStep = (this.imagRangeMax - this.imagRangeMin) / this.height;

    for (y = 0; y < this.height; y++) {
      let row = [];
      for (x = 0; x < this.width; x++) {
        // the imaginary component is calculated this way as y increases DOWN the screen
        let add_point = [this.realRangeMin + (xStep * x), this.imagRangeMax - (yStep * y)];
        row.push(iteratePoint([0, 0], add_point, maxIterations));
      }
      grid.push(row);
    }
    return grid;
  }
}
