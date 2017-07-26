Fractal = {

  //
  // FRACTAL PARAMETERS
  //

  type: "julia",
  setType: function(type) {
    this.type = type;
  },

  getType: function() {
    return this.type;
  },

  // size of the fractal grid to generate
  width: 800,
  height: 800,
  setDrawSize: function(width, height) {
    this.width = width;
    this.height = height;
  },

  getDrawSize: function() {
    return [this.width, this.height];
  },

  // range of fractal to draw
  realRangeMin: -1.5,
  realRangeMax: 1.5,
  setRealRange: function(min, max) {
    this.realRangeMin = min;
    this.realRangeMax = max;
  },

  getRealRange: function() {
    return [this.realRangeMin, this.realRangeMax];
  },

  imagRangeMin: -1.5,
  imagRangeMax: 1.5,
  setImagRange: function(min, max) {
    this.imagRangeMin = min;
    this.imagRangeMax = max;
  },

  getImagRange: function() {
    return [this.imagRangeMin, this.imagRangeMax];
  },

  // this is the additional component to use for julia sets
  add_component: [0, 0],
  setAdditionComponent: function(add_component) {
    this.add_component = add_component;
  },

  getAdditionComponent: function() {
    return this.add_component;
  },

  iterations: 100,
  setIterations: function(iterations) {
    this.iterations = iterations;
  },

  getIterations: function() {
    return this.iterations;
  },

  //
  // GRID GENERATION
  //

  // time taken to generate

  genTime: 0,
  getGenTime: function() {
    return this.genTime;
  },

  generateJuliaSet: function() {
    let grid = [];
    let xStep = (this.realRangeMax - this.realRangeMin) / this.width;
    let yStep = (this.imagRangeMax - this.imagRangeMin) / this.height;

    for (y = 0; y < this.height; y++) {
      let row = [];
      for (x = 0; x < this.width; x++) {
        // the imaginary component is calculated this way as y increases DOWN the screen
        let point = [this.realRangeMin + (xStep * x), this.imagRangeMax - (yStep * y)];
        row.push(iteratePoint(point, this.add_component, this.iterations));
      }
      grid.push(row);
    }
    return grid;
  },

  generateMandelbrotSet: function() {
    let grid = [];
    let xStep = (this.realRangeMax - this.realRangeMin) / this.width;
    let yStep = (this.imagRangeMax - this.imagRangeMin) / this.height;

    for (y = 0; y < this.height; y++) {
      let row = [];
      for (x = 0; x < this.width; x++) {
        // the imaginary component is calculated this way as y increases DOWN the screen
        let add_point = [this.realRangeMin + (xStep * x), this.imagRangeMax - (yStep * y)];
        row.push(iteratePoint([0, 0], add_point, this.iterations));
      }
      grid.push(row);
    }
    return grid;
  },

  generateFractal: function() {
    let dt = Date.now();
    let grid;
    if (this.type == "julia") {
      grid = this.generateJuliaSet();
    } else if (this.type == "mandelbrot") {
      grid = this.generateMandelbrotSet();
    }
    this.genTime = Date.now() - dt;
    return grid;
  }
}
