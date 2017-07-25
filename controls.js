const SLIDER_STEP = 0.01;
const MAX_VAL = 1.5;

Control = {

  init: function() {


    this.realSlider = document.getElementById("realVal");
    this.imagSlider = document.getElementById("imagVal");
    this.scaleSlider = document.getElementById("scaleVal");

    // reset the slider values if the page has been refreshed
    this.realSlider.value = "0";
    this.imagSlider.value = "0";
    this.scaleSlider.value = "0";

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

  },

  // CONTROL FUNCTIONS
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
    if (Control.imagSlider.value > MAX_VAL) {
      Control.imagSlider.value = MAX_VAL;
    }
  },

  scaleStepMinus: function() {
    // TODO
  },

  scaleStepPlus: function() {
    // TODO
  }
}
