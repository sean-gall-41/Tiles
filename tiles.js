import {
  WIN_WIDTH,
  WIN_HEIGHT,
  NUM_ROWS,
  NUM_COLS,
  CHOSEN_PALETTE,
  FRAME_RATE,
  UPDATE_FREQ,
  FR_UPDATE_FREQ_RATIO,
  NUM_TO_UPDATE,
  SQUARE_SIZE,
} from './globals.js';

import {
  rowMaxColor,
  specialGridInitFunc,
  initGridUniform,
  initGridGauss,
  updateSquaresColors
} from './utils.js';

// local mutable global. all of this is v hacky
let gridColors;

window.setup = () => {
  createCanvas(WIN_WIDTH, WIN_HEIGHT);
  gridColors = initGridUniform(
    NUM_ROWS, NUM_COLS, SQUARE_SIZE, CHOSEN_PALETTE
  )
  frameRate(FRAME_RATE);
}

// TODO: figure out wth p5.js does to save multiple images for animation
window.draw = () => {
  if (frameCount % FR_UPDATE_FREQ_RATIO == 0) {
    updateSquaresColors(
      gridColors, CHOSEN_PALETTE, NUM_TO_UPDATE, NUM_ROWS, NUM_COLS, SQUARE_SIZE
    );
    //saveFramesArr.push({
    //  "ext": "png",
    //  "filename": `tiles_${frameCount}`,
    //  "imageData": 
    //})
  }
}

//function keyPressed() {
//  if (key === 's') {
//    saveFrames('tiles', 'png', 10, 22, (data) => {
//      print(data);
//    });
//  }
//}
