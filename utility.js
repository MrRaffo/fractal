Utility = {

  makeRGB: function(r, g, b) {
    return 'rgb(' + (r & 255) + ', ' + (g & 255) + ', ' + (b & 255) + ')';
  },

  makeRGBA: function(r, g, b, a) {
    return 'rgb(' + (r & 255) + ', ' + (g & 255) + ', ' + (b & 255) + ', ' + (a & 255) + ')';
  },

  makeRandomComponent: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min) & 255;
  },

  makeRandomColor: function() {
    let r = Math.floor(Math.random() * 255) & 255;
    let g = Math.floor(Math.random() * 255) & 255;
    let b = Math.floor(Math.random() * 255) & 255;
    return Utility.makeRGB(r, g, b);
  }
}
