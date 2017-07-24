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


    this.colors = [];
    this.genRandomColors();
  },

  genRandomColors: function() {
    for (i = 0; i < 255; i++) {
      this.colors.push([Utility.makeRandomComponent(0, 50), Utility.makeRandomComponent(100, 150), Utility.makeRandomComponent(200, 255)]);
    }
  },

  plotColor: function(imgData, x, y, color) {
    let index = (y * this.w + x) * 4;
    imgData[index] = color[0];
    imgData[index+1] = color[1];
    imgData[index+2] = color[2];
    imgData[index+3] = 255;
  },

  drawJulia: function(addition, iterations) {
    let grid = Fractal.generateJuliaSet(addition, iterations);
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
  }
}

DrawFractal.init();
Fractal.setRealRange(0.4, 0.5);
Fractal.setImagRange(0.3, 0.4);
DrawFractal.drawMandelbrot(255);
alert("done");
