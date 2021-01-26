const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const numbers = input.split("\n").map(text => parseInt(text.trim()));

const part1 = () => {
  const set = new Set();
  for (const num of numbers) {
    const diff = 2020 - num;
    if (set.has(diff)) {
      console.log(num * diff);
      break;
    } else {
      set.add(num);
    }
  }
}

const part2 = () => {
  const map = {};
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    const diff = 2020 - num;
    if (map.hasOwnProperty(diff)) {
      console.log(num * map[diff][0] * map[diff][1]);
      break;
    } else {
      for (let j = 0; j < i; j++) {
        map[numbers[i] + numbers[j]] = [numbers[i], numbers[j]];
      }
    }
  }
}

part1();
part2();
