import {
  WIN_WIDTH,
  WIN_HEIGHT,
  NUM_ROWS,
  NUM_COLS,
  CHOSEN_PALETTE,
  FRAME_RATE,
  UPDATE_FREQ,
  MAX_UPDATE_FREQ,
  FR_UPDATE_FREQ_RATIO,
  NUM_TO_UPDATE,
  SQUARE_SIZE
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
    NUM_ROWS, NUM_COLS, SQUARE_SIZE, CHOSEN_PALETTE
  );
  squareTransRates = getGaussRandNums(
    MAX_UPDATE_FREQ / 32, MAX_UPDATE_FREQ / 4, NUM_ROWS * NUM_COLS
  );
  frameRate(FRAME_RATE);
}

window.draw = () => {
  if (play) {
    updateSquaresColorsPoissRates(
      gridColors, squareTransRates, CHOSEN_PALETTE, -1, NUM_ROWS, NUM_COLS, SQUARE_SIZE
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

