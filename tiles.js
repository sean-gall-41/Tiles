const NUM_ROWS = 20;
const NUM_COLS = 20;

const COLOR_PALETTES = {
  "forest_tones": ["#dad7cd","#a3b18a","#588157","#3a5a40","#344e41"],
  "blue_tiles": ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","390e0ef","#ade8f4","#caf0f8"],
  "pastel_rainbow": ["#f94144","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590","#277da1"]
};

const CHOSEN_PALETTE = COLOR_PALETTES["pastel_rainbow"].reverse();

let gridColors = Array(NUM_ROWS).fill().map(() => Array(NUM_COLS));

let FRAME_RATE = 30; // 30Hz
let UPDATE_FREQ = 0.5; // 1Hz
let FR_UPDATE_FREQ_RATIO = Math.floor(FRAME_RATE / UPDATE_FREQ);
let NUM_TO_UPDATE = 25;
let squareSize;

let saveFramesArr = [];

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandNumsWOReplacement(min, max, numToGet) {
  let count = numToGet;
  let delta = max - min;
  let item;
  let items = []
  while (count > 0) {
    item = Math.floor(Math.random() * delta) + min;
    if (!items.includes(item)) { // add item if not already gotten
      items.push(item);
      count--;
    }
  }
  return items;
}

function getRandomElementFromArrayExcluding(array, item) {
  const filteredArray = array.filter((element) => element !== item);
  if (filteredArray.length === 0) {
    return null; // Return null if the array has no elements other than the item
  }
  const randomIndex = getRandomNumberInRange(0, filteredArray.length - 1);
  return filteredArray[randomIndex];
}

function rowMaxColor(row, maxNumRows, paletteLength) {
  let a = 5;
  let b = 0.2;
  let argFunc = (input) => Math.pow(a * input, b)
  return Math.floor(argFunc(row) / argFunc(maxNumRows)* paletteLength);
}

function updateSquaresColors(palette, numToUpdate) {
  let transSqCoords = getRandNumsWOReplacement(0, NUM_ROWS * NUM_COLS - 1, numToUpdate)
                            .map(id => [Math.floor(id / NUM_ROWS), id % NUM_COLS]);

  let newSqColors = transSqCoords.map(coords => getRandomElementFromArrayExcluding(palette,                                                       gridColors[coords[0]][coords[1]]));

  transSqCoords.forEach((pair, id) => {
    gridColors[pair[0]][pair[1]] = newSqColors[id];
    fill(newSqColors[id]);
    let posY = pair[0] * squareSize;
    let posX = pair[1] * squareSize;
    rect(posX, posY, squareSize, squareSize);
  });
}

function setup() {
  createCanvas(700, 700);
  squareSize = width / NUM_ROWS;
  let squareColor;
  noStroke();
  // Draw the grid of squares
  for (let y = 0; y < NUM_ROWS; y++) {
    let posY = y * squareSize;
    let lenChooseFrom = rowMaxColor(y, NUM_ROWS, CHOSEN_PALETTE.length);
    //console.log(lenChooseFrom)
    for (let x = 0; x < NUM_COLS; x++) {
      let posX = x * squareSize;
      squareColor = CHOSEN_PALETTE[Math.floor(Math.random() * lenChooseFrom)];
      gridColors[y][x] = squareColor; // store initial colors
      fill(squareColor);
      rect(posX, posY, squareSize, squareSize);
    }
  }
  
  frameRate(FRAME_RATE);
}

// TODO: figure out wth p5.js does to save multiple images for animation
function draw() {
  if (frameCount % FR_UPDATE_FREQ_RATIO == 0) {
    updateSquaresColors(CHOSEN_PALETTE, NUM_TO_UPDATE);
    saveFramesArr.push({
      "ext": "png",
      "filename": `tiles_${frameCount}`,
      "imageData": 
    })
  }
}

function keyPressed() {
  if (key === 's') {
    saveFrames('tiles', 'png', 10, 22, (data) => {
      print(data);
    });
  }
}
