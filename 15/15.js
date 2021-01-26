const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const numbers = input.split(",").map(num => parseInt(num));

const countNum = (turn, starting) => {
  let map = new Map();
  for (let i = 0; i < starting.length; i++) map.set(starting[i], i + 1);
  let number;
  let nextNumber = 0;
  for (let i = starting.length + 1; i <= turn; i++) {
    number = nextNumber;
    if (!map.has(number)) nextNumber = 0;
    else nextNumber = i - map.get(number);
    map.set(number, i);
  }
  return number;
}

const part1 = () => {
  console.log(countNum(2020, numbers));
}

const part2 = () => {
  console.log(countNum(30000000, numbers));
}

part1();
part2();

