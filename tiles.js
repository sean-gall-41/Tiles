import {
  WIN_WIDTH,
  WIN_HEIGHT,
  FRAME_RATE,
  num_rows,
  num_cols,
  square_size,
  chosen_palette,
  max_update_freq
} from './params.js';

import {
  getGaussRandNums,
  rowMaxColor,
  specialGridInitFunc,
  initGridColorsUniform,
  initGridColorsGauss,
  updateSquaresColors,
  updateSquaresColorsPoissRates
} from './utils.js';

// local mutable global. all of this is v hacky
let canvas;
let gridColors; // 1D array containing colors of every grid cell
let squareTransRates; // 1D array containing transition rates for each grid cell
let play = false;

const togglePlayBtn = document.getElementById('start-btn')
const resetBtn = document.getElementById('reset-btn')

window.setup = () => {
  canvas = createCanvas(WIN_WIDTH, WIN_HEIGHT);
  canvas.parent('canvas-container');
  gridColors = initGridColorsUniform(
    num_rows, num_cols, square_size, chosen_palette
  );
  squareTransRates = getGaussRandNums(
    max_update_freq / 32, max_update_freq / 4, num_rows * num_cols
  );
  frameRate(FRAME_RATE);
}

window.draw = () => {
  if (play) {
    updateSquaresColorsPoissRates(
      gridColors, squareTransRates, chosen_palette, -1, num_rows, num_cols, square_size
    );
  }
}

const onTogglePlay = () => {
  if (togglePlayBtn.textContent == "Start") {
    play = true;
    togglePlayBtn.textContent = "Stop";
  } else if (togglePlayBtn.textContent == "Stop") {
    play = false;
    togglePlayBtn.textContent = "Start";
  }
}

const onReset = () => {
  // only reset if we are paused
  if (!play) {
    window.setup();
  }
}

togglePlayBtn.addEventListener("click", onTogglePlay);
resetBtn.addEventListener("click", onReset);

