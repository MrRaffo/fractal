const MAX_REAL = 1.5;
const MAX_IMAG = 1.5;

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

    this.colors = [];
    this.genRandomColors();
  },

  genRandomColors: function() {
    for (i = 0; i < 255; i++) {
      this.colors.push([Utility.makeRandomComponent(0, 50), Utility.makeRandomComponent(100, 150), Utility.makeRandomComponent(200, 255)]);
    }
  },

  genColors: function() {
    for (i = 0; i < 255; i++) {
      this.colors.push([i, i, 255-i]);
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
    let real = Number(document.getElementById("realVal").value);
    let imag = Number(document.getElementById("imagVal").value);
    let scale = document.getElementById("scaleVal").value;

    let type = document.getElementById("fractalType").value;
    Fractal.setType(type);

    Fractal.setAdditionComponent([real, imag]);

    DrawFractal.drawFractal(255);
    console.log(Fractal.getRealRange());
  },

  drawJulia: function(iterations) {
    let grid = Fractal.generateJuliaSet(iterations);
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

  drawMandelbrot: function(iterations) {
    let grid = Fractal.generateMandelbrotSet(iterations);
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

  drawFractal: function(iterations) {
    let grid = Fractal.generateFractal(iterations);
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
Fractal.setRealRange(-1.5, 1.5);
Fractal.setImagRange(-1.5, 1.5);
//Fractal.setAdditionComponent([0.25, 0.5]);
DrawFractal.drawJulia(200);
