function make2DArray(cols, rows){
  let arr = new Array(cols);
  for(let i = 0; i< arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

function getNextGrid(grid){
  let next = make2DArray(cols, rows);

  for(let i=0; i<cols; i++){
    for(let j=0; j<rows; j++){
      if( i==0 || i==cols-1 || j==0 || j==rows-1){
        next[i][j] = grid[i][j];
      } else {
        let liveneighbours = countLiveNeighbours(i, j, grid);
        if(grid[i][j] == 0){
          if(liveneighbours == 3) next[i][j] = 1;
          else next[i][j] = 0; 
        }
        else if(liveneighbours < 2 || liveneighbours > 3){
          next[i][j] = 0;
        }
        else next[i][j] = 1;
      }
    }
  }
  return next;
}

function countLiveNeighbours(i, j, grid){
  let sum = 0;
  for(let m=-1; m<=1; m++){
    for(let n=-1; n<=1; n++){
      sum += grid[i+m][j+n];
    }
  }
  return sum;
}

let grid;
let newgrid;
let cols;
let rows;
let resolution = 40;

function setup() {
  createCanvas(800, 800);
  cols = width/resolution;
  rows = height/resolution;
  grid = make2DArray(cols, rows);
  for(let i=0; i<cols; i++){
    for(let j=0; j<rows; j++){
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  frameRate(10);
  for(let i=0; i<cols; i++){
    for(let j=0; j<rows; j++){
      if(grid[i][j] == 1){
        fill(255);
        rect(i*resolution, j*resolution, resolution-1, resolution-1);
      }
    }
  }
  grid = getNextGrid(grid);
}
