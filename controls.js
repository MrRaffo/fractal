const SLIDER_STEP = 0.01;
const MAX_VAL = 1.5;

Control = {

  init: function() {

    this.realSlider = document.getElementById("realVal");
    this.imagSlider = document.getElementById("imagVal");
    this.scaleSlider = document.getElementById("scaleVal");
    this.iterSlider = document.getElementById("iterVal");

    // reset the slider values if the page has been refreshed
    this.realSlider.value = "0";
    this.imagSlider.value = "0";
    this.scaleSlider.value = "0";
    this.iterSlider.value = "250";

    // add code for the slider buttons
    this.realStepMinusButton = document.getElementById("realStepMinus");
    this.realStepMinusButton.addEventListener("click", Control.realStepMinus);

    this.realStepPlusButton = document.getElementById("realStepPlus");
    this.realStepPlusButton.addEventListener("click", Control.realStepPlus);

    this.imagStepMinusButton = document.getElementById("imagStepMinus");
    this.imagStepMinusButton.addEventListener("click", Control.imagStepMinus);

    this.imagStepPlusButton = document.getElementById("imagStepPlus");
    this.imagStepPlusButton.addEventListener("click", Control.imagStepPlus);

    this.scaleStepMinusButton = document.getElementById("scaleStepMinus");
    this.scaleStepMinusButton.addEventListener("click", Control.scaleStepMinus);

    this.scaleStepPlusButton = document.getElementById("scaleStepPlus");
    this.scaleStepPlusButton.addEventListener("click", Control.scaleStepPlus);

    this.iterStepMinusButton = document.getElementById("iterStepMinus");
    this.iterStepMinusButton.addEventListener("click", Control.iterStepMinus);

    this.iterStepPlusButton = document.getElementById("iterStepPlus");
    this.iterStepPlusButton.addEventListener("click", Control.iterStepPlus);

    this.zoomInButton = document.getElementById("zoomInButton");
    this.zoomInButton.addEventListener("click", DrawFractal.zoomIn);

    this.zoomOutButton = document.getElementById("zoomOutButton");
    this.zoomOutButton.addEventListener("click", DrawFractal.zoomOut);

  },

  // CONTROL FUNCTIONS

  // TODO - the problem with += cases is that slider.value is a STRING

  realStepMinus: function() {
    Control.realSlider.value -= SLIDER_STEP;
    if (Control.realSlider.value < -MAX_VAL) {
      Control.realSlider.value = MAX_VAL;
    }
  },

  realStepPlus: function() {
    Control.realSlider.value += SLIDER_STEP;
    if (Control.realSlider.value > MAX_VAL) {
      Control.realSlider.value = MAX_VAL;
    }
  },

  imagStepMinus: function() {
    Control.imagSlider.value -= SLIDER_STEP;
    if (Control.imagSlider.value < -MAX_VAL) {
      Control.imagSlider.value = MAX_VAL;
    }
  },

  imagStepPlus: function() {
    Control.imagSlider.value += SLIDER_STEP;
    if (Control.imagSlider.value > MAX_VAL) {;
      Control.imagSlider.value = MAX_VAL;
    }
  },

  iterStepMinus: function() {
    Control.iterSlider.value -= 10;
    if (Control.iterSlider.value < 0) {
      Control.iterSlider.value = 0;
    }
  },

  iterStepPlus: function() {
    Control.iterSlider.value += 10;
    if (Control.iterSlider.value > 2000) {;
      Control.iterSlider.value = 2000;
    }
  },

  scaleStepMinus: function() {
    // TODO
  },

  scaleStepPlus: function() {
    // TODO
  }
}
