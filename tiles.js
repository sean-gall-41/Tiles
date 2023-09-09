import {
  WIN_WIDTH,
  WIN_HEIGHT,
  FRAME_RATE,
  COLOR_PALETTES,
  userParams,
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

const initUserParams = (params) => {
  const numRowsVal = Number(document.getElementById('row-param').value);
  const paletteParamVal = document.getElementById('palette-param').value;
  const maxUpdateFreqVal = Number(document.getElementById('max-update-freq-param').value);
  const transMuVal = Number(document.getElementById('trans-mu-param').value);
  const transSigVal = Number(document.getElementById('trans-sigma-param').value);

  if (numRowsVal > 0) {
    params['num-rows'] = numRowsVal;
  } else {
    console.log('number of rows specified is not greater than zero!');
    return;
  }
  params['num-cols'] = params['num-rows'];
  params['square-size'] = WIN_WIDTH / params['num-rows'];
  if (paletteParamVal in COLOR_PALETTES) {
    params['chosen-palette'] = COLOR_PALETTES[paletteParamVal];
  } else {
    console.log('Palette Selected does not exist within existing palettes!');
    return;
  }
  if (maxUpdateFreqVal > 0.0 || maxUpdateFreqVal <= 15.0) {
    params['max-update-val'] = maxUpdateFreqVal;
  } else {
    console.log('maximum update frequency must be in range (0, 15]');
    return;
  }
  if (transMuVal > 0 && transMuVal < maxUpdateFreqVal) {
    params['mu-trans-rate'] = transMuVal;
  } else {
    console.log('mean cell transition rate must be greater than zero and less than max rate!');
    return;
  }
  if (transSigVal > 0 && transSigVal < maxUpdateFreqVal) {
    params['sigma-trans-rate'] = transSigVal;
  } else {
    console.log('std dev of cell transition rate must be greater than zero and less than max rate!');
    return;
  }
};

window.setup = () => {
  initUserParams(userParams);
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

