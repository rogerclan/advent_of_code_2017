/*
As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?

Your puzzle answer was 369601.
*/ 

const input = 368078;

const gridSize = Math.floor(Math.sqrt(input));

let grid = [];

// setup the grid
for(let i = 0; i < gridSize; i++) {
  grid.push(new Array(gridSize));
}

/**
 * getCellValue
 * Gets value of cell
 * Defaults to 0
 * @param {number} row 
 * @param {number} col 
 * @returns {number}
 */
function getCellValue (row, col) {
  let cell =  grid[row][col];
  return (cell && !isNaN(parseInt(cell, 10))) ? parseInt(cell, 10) : 0;
}

/**
 * setCellValue
 * Sum the values of all elements that are
 * touching current grid index
 * @param {number} row 
 * @param {number} col
 * @return {void}
 */
function setCellValue (row, col) {
  let total = 0;

  for(let r = -1; r < 2; r++) {
    for(let c = -1; c < 2; c++) {
      if(r===0 && c===0) continue;
      total += getCellValue(row + r, col + c);
    }
  }

  grid[row][col] = total;

}

// set center of grid
let initPos = Math.floor(gridSize / 2);
// assign 1 the inital value at center
grid[initPos][initPos] = 1;

let index = {
    x: initPos,
    y: initPos
  }
let maxRight = initPos;
let maxLeft = initPos;
let maxBottom = initPos;
let maxTop = initPos;
let direction = 'right';


for(let i = 0; i < input; i++) {
  if (direction === 'right') {
    index.x++;
    setCellValue(index.y, index.x);

    if(index.x > maxRight) {
      direction = 'up';
      maxRight = index.x
    }
  }else if (direction === 'up') {
    index.y--;
    setCellValue(index.y, index.x);

    if(index.y < maxTop) {
      direction = 'left';
      maxTop = index.y
    }
  }else if (direction === 'left') {
    index.x--;
    setCellValue(index.y, index.x);

    if(index.x < maxLeft) {
      direction = 'down';
      maxLeft = index.x
    }
  }else {
    // direction was down
    index.y++;
    setCellValue(index.y, index.x);

    if(index.y > maxBottom) {
      direction = 'right';
      maxBottom = index.y
    }
  }

  //If the value of the cell is greater than
  // inital input we have our answer 
  if (grid[index.y][index.x] > input) {
    console.log(`The first value to exceed ${input} was ${grid[index.y][index.x]}`);
    break;
  }
}