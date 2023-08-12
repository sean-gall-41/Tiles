import {
  NUM_ROWS,
  NUM_COLS,
  CHOSEN_PALETTE,
  FRAME_RATE,
  UPDATE_FREQ,
  FR_UPDATE_FREQ_RATIO,
  NUM_TO_UPDATE,
  SQUARE_SIZE,
  gridColors
} from './globals.js'

import {
  rowMaxColor,
  updateSquaresColors
} from './utils.js'

window.setup = () => {
  createCanvas(700, 700);
  let squareColor;
  noStroke();
  // Draw the grid of squares
  for (let y = 0; y < NUM_ROWS; y++) {
    let posY = y * SQUARE_SIZE;
    let lenChooseFrom = rowMaxColor(y, NUM_ROWS, CHOSEN_PALETTE.length);
    for (let x = 0; x < NUM_COLS; x++) {
      let posX = x * SQUARE_SIZE;
      squareColor = CHOSEN_PALETTE[Math.floor(Math.random() * lenChooseFrom)];
      gridColors[y][x] = squareColor; // store initial colors
      fill(squareColor);
      rect(posX, posY, SQUARE_SIZE, SQUARE_SIZE);
    }
  }
  
  frameRate(FRAME_RATE);
}

// TODO: figure out wth p5.js does to save multiple images for animation
window.draw = () => {
  if (frameCount % FR_UPDATE_FREQ_RATIO == 0) {
    updateSquaresColors(
      CHOSEN_PALETTE, NUM_TO_UPDATE, NUM_ROWS, NUM_COLS, SQUARE_SIZE
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
