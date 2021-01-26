const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const adapters = input.split(/\n/g).map(num => parseInt(num));

const part1 = () => {
  const sorted = adapters.slice().sort((a, b) => a - b);
  const map = {};
  for (let i = 1; i < sorted.length; i++) {
    const diff = sorted[i] - sorted[i - 1];
    if (!map[diff]) map[diff] = 1;
    else map[diff]++;
  }
  map[sorted[0] - 0]++;
  map[3]++;
  const diff1 = map[1];
  const diff3 = map[3];
  console.log(diff1 * diff3);
};

const part2 = () => {
  const sorted = adapters.slice();
  sorted.push(0);
  sorted.sort((a, b) => a - b);
  const map = {};
  map[sorted.length - 1] = 1;
  const countWays = (i) => {
    let sum = 0;
    for (let j = 1; j <= 3; j++) {
      if (i+j >= sorted.length || sorted[i+j] - sorted[i] > 3) break;
      if (!map[i+j]) countWays(i+j);
      sum += map[i+j];
    }
    map[i] = sum;
  }
  countWays(0);
  console.log(map[0]);
};

part1();
part2();

