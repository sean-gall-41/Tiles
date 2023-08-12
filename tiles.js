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
  SQUARE_SIZE,
} from './globals.js';

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
let gridColors;
let squareTransRates;

window.setup = () => {
  createCanvas(WIN_WIDTH, WIN_HEIGHT);
 
  gridColors = initGridColorsUniform(
    NUM_ROWS, NUM_COLS, SQUARE_SIZE, CHOSEN_PALETTE
  );
  squareTransRates = getGaussRandNums(
    MAX_UPDATE_FREQ / 32, MAX_UPDATE_FREQ / 4, NUM_ROWS * NUM_COLS
  );
  frameRate(FRAME_RATE);
}

// TODO: figure out wth p5.js does to save multiple images for animation
window.draw = () => {
  updateSquaresColorsPoissRates(
    gridColors, squareTransRates, CHOSEN_PALETTE, -1, NUM_ROWS, NUM_COLS, SQUARE_SIZE
  );
  //if (frameCount % FR_UPDATE_FREQ_RATIO == 0) {
  //  updateSquaresColors(
  //    gridColors, CHOSEN_PALETTE, NUM_TO_UPDATE, NUM_ROWS, NUM_COLS, SQUARE_SIZE
  //  );
  //}
}

