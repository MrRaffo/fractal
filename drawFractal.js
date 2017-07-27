const MAX_REAL = 1.5;
const MAX_IMAG = 1.5;
const DEFAULT_ITERATIONS = 250;
const ZOOM_FACTOR = 1.1;

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

    this.screenCanvas.addEventListener("click", DrawFractal.centreOnPoint);

    Control.init();

    this.genRandomColors();
    //this.genRedscale();
  },

  genRandomColors: function() {
    this.colors = [];
    for (i = 0; i < 255; i++) {
      this.colors.push([Utility.makeRandomComponent(0, 50), Utility.makeRandomComponent(100, 150), Utility.makeRandomComponent(200, 255)]);
    }
  },

  genRedscale: function() {
    this.colors = [];
    for (i = 0; i < 255; i++) {
      this.colors.push([i, 0, 0]);
    }
  },

  genGrayscale: function() {
    this.colors = [];
    for (i = 0; i < 255; i++) {
      this.colors.push([i, i, i]);
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
  },

  curGrid: [],

  centreOnPoint: function(e) {
    let rect = DrawFractal.screenCanvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // calculate new range values:
    let realRange = Fractal.getRealRange();
    let imagRange = Fractal.getImagRange();

    // get new centre point in terms of ranges:
    let real_dx = ((x - rect.width / 2) / rect.width) * (realRange[1] - realRange[0]);
    Fractal.setRealRange(realRange[0] + real_dx, realRange[1] + real_dx);

    let imag_dy = ((y - rect.height / 2) / rect.height) * (imagRange[1] - imagRange[0]);
    Fractal.setImagRange(imagRange[0] - imag_dy, imagRange[1] - imag_dy);

    DrawFractal.drawFractal();
    Report.generate();

  },

  zoomIn: function() {
    let realRange = Fractal.getRealRange();
    let imagRange = Fractal.getImagRange();

    let centreRangeX = realRange[1] - realRange[0];
    let centrePointX = (realRange[1] + realRange[0]) / 2;
    let centre_x = centreRangeX / 2;
    let newRangeX = centreRangeX / ZOOM_FACTOR;
    let new_x1 = centrePointX - newRangeX / 2;
    let new_x2 = centrePointX + newRangeX / 2;

    let centreRangeY = imagRange[1] - imagRange[0];
    let centrePointY = (imagRange[1] + imagRange[0]) / 2;
    let centre_y = centreRangeY / 2;
    let newRangeY = centreRangeY / ZOOM_FACTOR;
    let new_y1 = centrePointY - newRangeY / 2;
    let new_y2 = centrePointY + newRangeY / 2;

    console.log(realRange);
    console.log([new_x1, new_x2]);

    Fractal.setRealRange(new_x1, new_x2);
    Fractal.setImagRange(new_y1, new_y2);
    DrawFractal.drawFractal();
    Report.generate();
  },

  zoomOut: function() {
    let realRange = Fractal.getRealRange();
    let imagRange = Fractal.getImagRange();

    let centreRangeX = realRange[1] - realRange[0];
    let centrePointX = (realRange[1] + realRange[0]) / 2;
    let centre_x = centreRangeX / 2;
    let newRangeX = centreRangeX * ZOOM_FACTOR;
    let new_x1 = centrePointX - newRangeX / 2;
    let new_x2 = centrePointX + newRangeX / 2;

    let centreRangeY = imagRange[1] - imagRange[0];
    let centrePointY = (imagRange[1] + imagRange[0]) / 2;
    let centre_y = centreRangeY / 2;
    let newRangeY = centreRangeY * ZOOM_FACTOR;
    let new_y1 = centrePointY - newRangeY / 2;
    let new_y2 = centrePointY + newRangeY / 2;

    console.log(realRange);
    console.log([new_x1, new_x2]);

    Fractal.setRealRange(new_x1, new_x2);
    Fractal.setImagRange(new_y1, new_y2);
    DrawFractal.drawFractal();
    Report.generate();
  },

  drawJulia: function() {
    this.curGrid = Fractal.generateJuliaSet();
    for (y = 0; y < this.curGrid.length; y++) {
      for (x = 0; x < this.curGrid[0].length; x++) {
        if (this.curGrid[y][x] == 0) {
          this.plotColor(this.plotImage.data, x, y, [0, 0, 0]);
        } else {
          this.plotColor(this.plotImage.data, x, y, this.colors[this.curGrid[y][x] % 255]);
        }
      }
    }
    this.plotCtx.putImageData(this.plotImage, 0, 0);
    this.screenCtx.drawImage(this.plotCanvas, 0, 0, this.w, this.h);
  },

  drawMandelbrot: function() {
    this.curGrid = Fractal.generateMandelbrotSet();
    for (y = 0; y < this.curGrid.length; y++) {
      for (x = 0; x < this.curGrid[0].length; x++) {
        if (this.curGrid[y][x] == 0) {
          this.plotColor(this.plotImage.data, x, y, [0, 0, 0]);
        } else {
          this.plotColor(this.plotImage.data, x, y, this.colors[this.curGrid[y][x] % 255]);
        }
      }
    }
    this.plotCtx.putImageData(this.plotImage, 0, 0);
    this.screenCtx.drawImage(this.plotCanvas, 0, 0, this.w, this.h);
  },

  drawFractal: function() {
    this.curGrid = Fractal.generateFractal();
    for (y = 0; y < this.curGrid.length; y++) {
      for (x = 0; x < this.curGrid[0].length; x++) {
        if (this.curGrid[y][x] == 0) {
          this.plotColor(this.plotImage.data, x, y, [0, 0, 0]);
        } else {
          this.plotColor(this.plotImage.data, x, y, this.colors[this.curGrid[y][x] % 255]);
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
