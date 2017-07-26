const MAX_REAL = 1.5;
const MAX_IMAG = 1.5;
const DEFAULT_ITERATIONS = 250;

DrawFractal = {

  init: function() {
    this.screenCanvas = document.getElementById("screenCanvas");
    this.screenCtx = this.screenCanvas.getContext('2d');
    this.w = this.screenCanvas.width;
    this.h = this.screenCanvas.height;

    Fractal.setDrawSize(this.w, this.h);

    // create a canvas to render to
    this.plotCanvas = document.createElement("canvas");
    this.plotCanvas.width = this.w;
    this.plotCanvas.height = this.h;
    this.plotCtx = this.plotCanvas.getContext('2d');
    this.plotImage = this.plotCtx.createImageData(this.w, this.h);

    this.drawButton = document.getElementById("drawSetButton");
    this.drawButton.addEventListener("click", DrawFractal.drawButtonClick);

    Control.init();

    this.genRandomColors();
  },

  genRandomColors: function() {
    this.colors = [];
    for (i = 0; i < 255; i++) {
      this.colors.push([Utility.makeRandomComponent(0, 50), Utility.makeRandomComponent(100, 150), Utility.makeRandomComponent(200, 255)]);
    }
  },

  genColors: function() {
    this.colors = [];
    for (i = 0; i < 255; i++) {
      this.colors.push([i, 0, 0]);
    }
  },

  plotColor: function(imgData, x, y, color) {
    let index = (y * this.w + x) * 4;
    imgData[index] = color[0];
    imgData[index+1] = color[1];
    imgData[index+2] = color[2];
    imgData[index+3] = 255;
  },

  drawButtonClick: function() {

    // read parameters
    let real = Number(document.getElementById("realVal").value);
    let imag = Number(document.getElementById("imagVal").value);
    let iter = Number(document.getElementById("iterVal").value);
    let scale = Number(document.getElementById("scaleVal").value);
    let type = document.getElementById("fractalType").value;


    // set parameters
    Fractal.setType(type);
    Fractal.setIterations(iter);
    Fractal.setAdditionComponent([real, imag]);

    // draw the fractal
    DrawFractal.drawFractal();

    // generate the report
    Report.generate();
    //Report.show();
  },

  drawJulia: function() {
    let grid = Fractal.generateJuliaSet();
    for (y = 0; y < grid.length; y++) {
      for (x = 0; x < grid[0].length; x++) {
        if (grid[y][x] == 0) {
          this.plotColor(this.plotImage.data, x, y, [0, 0, 0]);
        } else {
          this.plotColor(this.plotImage.data, x, y, this.colors[grid[y][x] % 255]);
        }
      }
    }
    this.plotCtx.putImageData(this.plotImage, 0, 0);
    this.screenCtx.drawImage(this.plotCanvas, 0, 0, this.w, this.h);
  },

  drawMandelbrot: function() {
    let grid = Fractal.generateMandelbrotSet();
    for (y = 0; y < grid.length; y++) {
      for (x = 0; x < grid[0].length; x++) {
        if (grid[y][x] == 0) {
          this.plotColor(this.plotImage.data, x, y, [0, 0, 0]);
        } else {
          this.plotColor(this.plotImage.data, x, y, this.colors[grid[y][x] % 255]);
        }
      }
    }
    this.plotCtx.putImageData(this.plotImage, 0, 0);
    this.screenCtx.drawImage(this.plotCanvas, 0, 0, this.w, this.h);
  },

  drawFractal: function() {
    let grid = Fractal.generateFractal();
    for (y = 0; y < grid.length; y++) {
      for (x = 0; x < grid[0].length; x++) {
        if (grid[y][x] == 0) {
          this.plotColor(this.plotImage.data, x, y, [0, 0, 0]);
        } else {
          this.plotColor(this.plotImage.data, x, y, this.colors[grid[y][x] % 255]);
        }
      }
    }
    this.plotCtx.putImageData(this.plotImage, 0, 0);
    this.screenCtx.drawImage(this.plotCanvas, 0, 0, this.w, this.h);
  }
}



DrawFractal.init();
//Fractal.setRealRange(-1.27, -1.268);
//Fractal.setImagRange(0.044, 0.046);
DrawFractal.drawJulia();
