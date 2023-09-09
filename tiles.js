import {
  WIN_WIDTH,
  WIN_HEIGHT,
  FRAME_RATE,
  numRows,
  numCols,
  squareSize,
  chosenPalette,
  maxUpdateFreq
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
    numRows, numCols, squareSize, chosenPalette
  );
  squareTransRates = getGaussRandNums(
    maxUpdateFreq / 32, maxUpdateFreq / 4, numRows * numCols
  );
  frameRate(FRAME_RATE);
}

window.draw = () => {
  if (play) {
    updateSquaresColorsPoissRates(
      gridColors, squareTransRates, chosenPalette, -1, numRows, numCols, squareSize
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

