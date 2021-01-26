const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const seats = input.split(/\n/).map(row => row.split(""));

const cloneSeats = seats => {
  let clonedSeats = [];
  for (let i = 0; i < seats.length; i++) {
    clonedSeats[i] = [];
    for (let j = 0; j < seats[i].length; j++) {
      clonedSeats[i][j] = seats[i][j];
    }
  }
  return clonedSeats;
}

const getAdjacentCount1 = (x, y, seats) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      if (y + j < 0 || y + j >= seats.length || x + i < 0 || x + i > seats[y + j].length) continue;
      if (seats[y + j][x + i] === "#") count++;
    }
  }
  return count;
} 

const getAdjacentCount2 = (x, y, seats) => {
  let count = 0;
  for (let k = -1; k <= 1; k++) {
    for (let l = -1; l <= 1; l++) {
      if (k === 0 && l === 0) continue;
      for (let i = x + k, j = y + l; i >= 0 && i < seats.length && j >= 0 && j < seats[i].length; i += k, j += l) {
        if (seats[i][j] === "#") count++;
        if (seats[i][j] !== ".") break;
      }
    }
  }
  return count;
} 

const part1 = () => {
  let currSeats = cloneSeats(seats);
  let nextSeats = cloneSeats(seats);
  while (true) {
    let changed = false;
    for (let j = 0; j < currSeats.length; j++) {
      for (let i = 0; i < currSeats[j].length; i++) {
        if (currSeats[j][i] === ".") continue;
        const adjacentCount = getAdjacentCount1(i, j, currSeats);
        if (currSeats[j][i] === "L") {
          if (adjacentCount === 0) {
            changed = true;
            nextSeats[j][i] = "#";
          } else {
            nextSeats[j][i] = "L";
          }
        } else if (currSeats[j][i] === "#") {
          if (adjacentCount >= 4) {
            nextSeats[j][i] = "L";
            changed = true;
          } else {
            nextSeats[j][i] = "#";
          }
        }
      }
    }
    let tmp = currSeats;
    currSeats = nextSeats;
    nextSeats = tmp;
    if (!changed) break;
  }
  let occupiedCount = 0;
  for (let i = 0; i < currSeats.length; i++) {
    for (let j = 0; j < currSeats[i].length; j++) {
      if (currSeats[i][j] === "#") occupiedCount++;
    }
  }
  console.log(occupiedCount);
};

const part2 = () => {
  let currSeats = cloneSeats(seats);
  let nextSeats = cloneSeats(seats);

  let changed = true;
  while (changed) {
    changed = false;
    
    for (let i = 0; i < currSeats.length; i++) {
      for (let j = 0; j < currSeats[i].length; j++) {
        if (currSeats[i][j] === ".") continue;
        const adjacentCount = getAdjacentCount2(i, j, currSeats);
        if (currSeats[i][j] === "#") {
          if (adjacentCount >= 5) {
            nextSeats[i][j] = "L";
            changed = true;
          } else {
            nextSeats[i][j] = "#";
          }
        }
        if (currSeats[i][j] === "L") {
          if (adjacentCount === 0) {
            nextSeats[i][j] = "#";
            changed = true;
          } else {
            nextSeats[i][j] = "L";
          }
        }
      }
    }
    let tmp = currSeats;
    currSeats = nextSeats;
    nextSeats = tmp;
  }
  let occupiedCount = 0;
  for (let i = 0; i < currSeats.length; i++) {
    for (let j = 0; j < currSeats[i].length; j++) {
      if (currSeats[i][j] === "#") occupiedCount++;
    }
  }
  console.log(occupiedCount);
};

part1();
part2();

