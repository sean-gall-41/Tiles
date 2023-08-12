const WIN_WIDTH = 700;
const WIN_HEIGHT = 700;

const NUM_ROWS = 20;
const NUM_COLS = 20;

const COLOR_PALETTES = {
  "forest_tones": ["#dad7cd","#a3b18a","#588157","#3a5a40","#344e41"],
  "blue_tiles": ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","390e0ef","#ade8f4","#caf0f8"],
  "pastel_rainbow": ["#f94144","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590","#277da1"]
};

// sometimes reverse gives a better initial state, othertimes not
const CHOSEN_PALETTE = COLOR_PALETTES["pastel_rainbow"].reverse();

let gridColors = Array(NUM_ROWS).fill().map(() => Array(NUM_COLS));
//let squareTransRates = 

let FRAME_RATE = 30; // 30Hz
let UPDATE_FREQ = 5.0; // 1Hz
let FR_UPDATE_FREQ_RATIO = Math.floor(FRAME_RATE / UPDATE_FREQ);
let NUM_TO_UPDATE = 1;
let SQUARE_SIZE = WIN_WIDTH / NUM_ROWS;

let saveFramesArr = [];

export {
  NUM_ROWS,
  NUM_COLS,
  CHOSEN_PALETTE,
  FRAME_RATE,
  UPDATE_FREQ,
  FR_UPDATE_FREQ_RATIO,
  NUM_TO_UPDATE,
  SQUARE_SIZE,
  gridColors
};
