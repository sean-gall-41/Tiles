const WIN_WIDTH = 700;
const WIN_HEIGHT = 700;

const FRAME_RATE = 30; // 30Hz

const COLOR_PALETTES = {
  "forest_tones": ["#dad7cd","#a3b18a","#588157","#3a5a40","#344e41"],
  "blue_tiles": ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","390e0ef","#ade8f4","#caf0f8"],
  "pastel_rainbow": ["#f94144","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590","#277da1"],
  "high_contrast": ["#000000", "#14213D", "#FCA311", "#E4E4E4", "#FFFFFF"]
};

let numRows = 200;
let numCols = 200;
let squareSize = WIN_WIDTH / numRows;

let chosenPalette = COLOR_PALETTES["high_contrast"];
let maxUpdateFreq = 15.0;

let saveFramesArr = [];

export {
  WIN_WIDTH,
  WIN_HEIGHT,
  FRAME_RATE,
  numRows,
  numCols,
  squareSize,
  chosenPalette,
  maxUpdateFreq
};

