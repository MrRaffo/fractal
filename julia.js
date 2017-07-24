Julia = {

  init: function(size) {
    this.w = size;
    this.h = size;
    this.size = size;

    this.screenCanvas = document.getElementById("screenCanvas");
    this.screenCtx = this.screenCanvas.getContext('2d');

    this.plotCanvas = document.createElement("canvas");
    this.plotCanvas.width = size;
    this.plotCanvas.height = size;
    this.plotCtx = this.plotCanvas.getContext('2d');
    this.img = this.plotCtx.createImageData(this.w, this.h);

    this.button = document.getElementById("drawSetButton");
    this.button.addEventListener("click", Julia.buttonClick);

    this.colors = [];
    this.genRandomColors();

    this.buttonClick();
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

  buttonClick: function() {
    let real = document.getElementById("realVal").value;
    let imag = document.getElementById("imagVal").value;

    real = real / 1500;
    imag = imag / 1500;

    Julia.drawSet([real, imag], 255);
  },

  drawSet: function(addition, iterations) {

    let grid = makeJuliaSet(addition, iterations, this.size);
    let component = Math.floor(255 / iterations);

    for (y = 0; y < grid.length; y++) {
      for (x = 0; x < grid[0].length; x++) {
        if (grid[y][x] == 0) {
          this.plotColor(this.img.data, x, y, [0, 0, 0]);
        } else {
          this.plotColor(this.img.data, x, y, this.colors[grid[y][x] % 255]);
        }
      }
    }
    this.plotCtx.putImageData(this.img, 0, 0);
    this.screenCtx.drawImage(this.plotCanvas, 0, 0, this.w, this.h);
  },

  detail: 1,

  animation: function() {
    let real = Math.sin(this.detail/1000);
    let imag = Math.cos(this.detail/1000);
    Julia.drawSet([real, imag], 255);
    this.detail++;
    requestAnimationFrame(Julia.animation);
  },

  printGrid: function(grid) {
    for (y = 0; y < grid[0].length; y++) {
      console.log(grid[400][y]);
    }
  }
}

Julia.init(800);
//Julia.drawSet([0.25, 0.5], 255);
//Julia.animation();
