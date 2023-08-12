import {
  NUM_ROWS,
  NUM_COLS,
  CHOSEN_PALETTE,
  FRAME_RATE,
  UPDATE_FREQ,
  FR_UPDATE_FREQ_RATIO,
  NUM_TO_UPDATE,
  SQUARE_SIZE
} from './globals.js';

/*
  * returns a random number in the range [min, max)
  */
function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
  * generate a random variable according to a gaussian dist
  */
function generateGaussian(mu, sigma) {
  let u1, u2;
  do {
    u1 = Math.random();
    u2 = Math.random();
  } while (u1 == 0); // ensure u1 is not zero to avoid log issues

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * sigma + mu;
}

/*
  * return a random, gaussian distributed number in a range [start, end)
  *
  */
function getGaussRandNumInRange(start, end, mu, sigma) {
  let num;
  do {
    num = generateGaussian(mu, sigma);
  } while (num < start || num >= end);
  return num;
}

/*
  * returns numToGet random integers in the range [min, max)
  * without replacement
  */
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

/*
  * Get an element at random from array, without considering item,
  * if item exists in array
  */
function getRandomElementFromArrayExcluding(array, item) {
  const filteredArray = array.filter((element) => element !== item);
  if (filteredArray.length === 0) {
    return null; // Return null if the array has no elements other than the item
  }
  const randomIndex = getRandomNumberInRange(0, filteredArray.length - 1);
  return filteredArray[randomIndex];
}

/*
  * uses argFunc to determine what the largest value in the (ordered)
  * palette should be for a given row. Used in updateSquareColors
  */
function rowMaxColor(row, maxNumRows, paletteLength) {
  let a = 5;
  let b = 0.2;
  let argFunc = (input) => Math.pow(a * input, b);
  return Math.floor(argFunc(row) / argFunc(maxNumRows) * paletteLength);
}

function specialGridInitFunc(
  numRows, numCols, squareSize, chosenPalette) {
  let squareColor;
  let gridColors = Array(NUM_ROWS).fill().map(() => Array(NUM_COLS));
  noStroke();
  // Draw the grid of squares
  for (let y = 0; y < numRows; y++) {
    let posY = y * squareSize;
    let lenChooseFrom = rowMaxColor(y, numRows, chosenPalette.length);
    for (let x = 0; x < numCols; x++) {
      let posX = x * squareSize;
      squareColor = chosenPalette[Math.floor(Math.random() * lenChooseFrom)];
      gridColors[y][x] = squareColor; // store initial colors
      fill(squareColor);
      rect(posX, posY, squareSize, squareSize);
    }
  }
  return gridColors;
}

function initGridUniform(
  numRows, numCols, squareSize, chosenPalette) {
  let squareColor;
  let gridColors = Array(NUM_ROWS).fill().map(() => Array(NUM_COLS));
  noStroke();
  // Draw the grid of squares
  for (let y = 0; y < numRows; y++) {
    let posY = y * squareSize;
    for (let x = 0; x < numCols; x++) {
      let posX = x * squareSize;

      let num = getRandomNumberInRange(0, chosenPalette.length - 1);
      squareColor = chosenPalette[num];
      gridColors[y][x] = squareColor; // store initial colors
      fill(squareColor);
      rect(posX, posY, squareSize, squareSize);
    }
  }
  return gridColors;
}

function initGridGauss(
  numRows, numCols, squareSize, chosenPalette) {
  let mu = Math.floor(chosenPalette.length / 2);
  let sigma = mu / 2;
  let squareColor;
  let gridColors = Array(NUM_ROWS).fill().map(() => Array(NUM_COLS));
  noStroke();
  // Draw the grid of squares
  for (let y = 0; y < numRows; y++) {
    let posY = y * squareSize;
    for (let x = 0; x < numCols; x++) {
      let posX = x * squareSize;
      let num = Math.floor(getGaussRandNumInRange(0, chosenPalette.length, mu, sigma));
      squareColor = chosenPalette[num];
      gridColors[y][x] = squareColor; // store initial colors
      fill(squareColor);
      rect(posX, posY, squareSize, squareSize);
    }
  }
  return gridColors;

}
/*
  * updates squares in the global array gridColors using palette
  * Yes, I'm violating the single purpose principle because I'm also drawing the updated
  * colors to the screen
  */
function updateSquaresColors(
  gridColors, palette, numToUpdate, numRows, numCols, squareSize
) {
  let transSqCoords = getRandNumsWOReplacement(0, numRows * numCols - 1, numToUpdate)
                            .map(id => [Math.floor(id / numRows), id % numCols]);

  let newSqColors = transSqCoords.map(
    coords => getRandomElementFromArrayExcluding(palette, gridColors[coords[0]][coords[1]])
  );

  transSqCoords.forEach((pair, id) => {
    gridColors[pair[0]][pair[1]] = newSqColors[id];
    fill(newSqColors[id]);
    let posY = pair[0] * squareSize;
    let posX = pair[1] * squareSize;
    rect(posX, posY, squareSize, squareSize);
  });
}

export {
  rowMaxColor,
  specialGridInitFunc,
  initGridUniform,
  initGridGauss,
  updateSquaresColors
};

