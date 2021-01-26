const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const map = input.split("\n");

const treeChecker = (a, b) => {
  let treeCount = 0;
  let x = a;
  let y = b;
  const width = map[0].length;
  const height = map.length;
  while (y < height) {
    if (map[y][x] === "#") treeCount++;
    x = (x + a) % width;
    y = y + b;
  }
  return treeCount;
}

const part1 = () => {
  let treeCount = treeChecker(3, 1);
  console.log(treeCount);
};

const part2 = () => {
  const checks = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ]
  let product = 1;
  for (const check of checks) {
    product = product * treeChecker(check[0], check[1]);
  }
  console.log(product);
};

part1();
part2();

