const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const seats = input.split("\n");

const calcPosition = (seat) => {
  let x = 0;
  let y = 0;
  for (let i = 0; i < 7; i++) {
    if (seat[i] === "B") y += Math.pow(2, 6 - i);
  }
  for (let i = 7; i < 10; i++) {
    if (seat[i] === "R") x += Math.pow(2, 9 - i);
  }
  return [x, y];
}

const calcSeatID = (x, y) => y * 8 + x;

const part1 = () => {
  let maxSeatID = 0;
  for (const seat of seats) {
    const position = calcPosition(seat);
    const seatID = calcSeatID(position[0], position[1]);
    if (seatID > maxSeatID) maxSeatID = seatID;
  }
  console.log(maxSeatID);
}; 

const part2 = () => {
  let mySeatID = null;
  let seatIDs = seats.map(seat => {
    const position = calcPosition(seat);
    const seatID = calcSeatID(position[0], position[1])
    return seatID;
  });
  const set = new Set(seatIDs);
  for (const seatID of set) {
    if (!set.has(seatID + 1) && set.has(seatID + 2)) {
      mySeatID = seatID + 1;
      break;
    }
  }
  console.log(mySeatID);
}; 

part1();
part2();
