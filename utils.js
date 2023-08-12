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

/*
  * returns a random number in the range [min, max)
  */
function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
export function rowMaxColor(row, maxNumRows, paletteLength) {
  let a = 5;
  let b = 0.2;
  let argFunc = (input) => Math.pow(a * input, b);
  return Math.floor(argFunc(row) / argFunc(maxNumRows) * paletteLength);
}

/*
  * updates squares in the global array gridColors using palette
  * Yes, I'm violating the single purpose principle because I'm also drawing the updated
  * colors to the screen
  */
export function updateSquaresColors(
  palette, numToUpdate, numRows, numCols, squareSize
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

