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
const numRowsElem = document.getElementById('row-param');
const paletteParamElem = document.getElementById('palette-param');
const maxUpdateFreqElem = document.getElementById('max-update-freq-param');
const transMuElem = document.getElementById('trans-mu-param');
const transSigElem = document.getElementById('trans-sigma-param');

const initUserParams = (params) => {
  const numRowsVal = Number(numRowsElem.value);
  const paletteParamVal = paletteParamElem.value;
  const maxUpdateFreqVal = Number(maxUpdateFreqElem.value);
  const transMuVal = Number(transMuElem.value);
  const transSigVal = Number(transSigElem.value);

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
    params['max-update-rate'] = maxUpdateFreqVal;
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

const updateUserParams = (event) => {
  const targetId = event.target.id;
  const updateValue = event.target.value;
  switch (targetId) {
    case 'row-param':
      userParams['num-rows'] = Number(updateValue);
      userParams['num-cols'] = userParams['num-rows'];
      userParams['square-size'] = WIN_WIDTH / userParams['num-rows'];
      gridColors = initGridColorsUniform(
        userParams['num-rows'], userParams['num-cols'], userParams['square-size'],
        userParams['chosen-palette']);
      break;
    case 'palette-param':
      userParams['chosen-palette'] = COLOR_PALETTES[updateValue];
      gridColors = initGridColorsUniform(
        userParams['num-rows'], userParams['num-cols'], userParams['square-size'],
        userParams['chosen-palette']);
      break;
    case 'max-update-freq-param':
      userParams['max-update-rate'] = updateValue;
      break;
    case 'trans-mu-param':
      userParams['mu-trans-rate'] = Number(updateValue);
      squareTransRates = getGaussRandNums(
        userParams['mu-trans-rate'], userParams['sigma-trans-rate'],
        userParams['num-rows'] * userParams['num-cols']
      );
      break;
    case 'trans-sigma-param':
      userParams['sigma-trans-rate'] = Number(updateValue);
      squareTransRates = getGaussRandNums(
        userParams['mu-trans-rate'], userParams['sigma-trans-rate'],
        userParams['num-rows'] * userParams['num-cols']
      );
      break;
    default:
      console.log("something went horribly wrong in update userparams")
  }
};

window.setup = () => {
  initUserParams(userParams);
  console.log(userParams);
  canvas = createCanvas(WIN_WIDTH, WIN_HEIGHT);
  canvas.parent('canvas-container');
  gridColors = initGridColorsUniform(
    userParams['num-rows'], userParams['num-cols'], userParams['square-size'],
    userParams['chosen-palette']);
  squareTransRates = getGaussRandNums(
    userParams['mu-trans-rate'], userParams['sigma-trans-rate'],
    userParams['num-rows'] * userParams['num-cols']
  );
  frameRate(FRAME_RATE);
}

window.draw = () => {
  if (play) {
    updateSquaresColorsPoissRates(
      gridColors, squareTransRates, userParams['chosen-palette'],
      -1, userParams['num-rows'], userParams['num-cols'], userParams['square-size'] 
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

numRowsElem.addEventListener("change", updateUserParams);
paletteParamElem.addEventListener("change", updateUserParams);
maxUpdateFreqElem.addEventListener("change", updateUserParams);
transMuElem.addEventListener("change", updateUserParams);
transSigElem.addEventListener("change", updateUserParams);

