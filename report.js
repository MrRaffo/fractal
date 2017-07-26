const TEXT_Y_START = 32;
const TEXT_Y_SPACE = 20;

Report = {

  canvas: document.getElementById("statCanvas"),
  ctx: document.getElementById("statCanvas").getContext('2d'),

  generate: function() {
    let type = Fractal.getType();
    let realRange = Fractal.getRealRange();
    let imagRange = Fractal.getImagRange();
    let add_comp = Fractal.getAdditionComponent();
    let iterations = Fractal.getIterations();
    let drawSize = Fractal.getDrawSize();
    let drawTime = Fractal.getGenTime();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this.ctx.fillStyle = 'rgb(255, 0, 0)';
    //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "16px courier";
    this.ctx.strokeStyle = 'rgb(255, 255, 255)';

    // write out the stats for the last draw
    this.ctx.strokeText("Type: " + type, 0, TEXT_Y_START);
    this.ctx.strokeText("Range shown:", 0, TEXT_Y_START + TEXT_Y_SPACE * 2);
    this.ctx.strokeText(" " + realRange[0] + " to " + realRange[1] + " (real axis)", 0, TEXT_Y_START + TEXT_Y_SPACE * 3);
    this.ctx.strokeText(" " + imagRange[0] + " to " + imagRange[1] + " (imaginary axis)", 0, TEXT_Y_START + TEXT_Y_SPACE * 4);
    this.ctx.strokeText("Add. Component (Julia only):", 0, TEXT_Y_START + TEXT_Y_SPACE * 6);
    this.ctx.strokeText(" (" + add_comp[0] + ", " + add_comp[1] + "i)", 0, TEXT_Y_START + TEXT_Y_SPACE * 7);
    this.ctx.strokeText("Iterations: " + iterations, 0, TEXT_Y_START + TEXT_Y_SPACE * 9);
    this.ctx.strokeText("Image Size: " + drawSize[0] + "px x " + drawSize[1] + "px", 0, TEXT_Y_START + TEXT_Y_SPACE * 11);
    this.ctx.strokeText("Time to generate: " + drawTime + "ms", 0, TEXT_Y_START + TEXT_Y_SPACE * 12);
  }
}
