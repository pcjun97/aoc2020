const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const numbers = input.split(/\n/g).map(num => parseInt(num));

const findBugNumber = () => {
  let bugNumber;
  for (let i = 25; i < numbers.length; i++) {
    const set = new Set(numbers.slice(i - 25, i));
    let isBugNumber = true;
    for (const j of set) {
      const diff = numbers[i] - j;
      if (numbers[i] !== diff && set.has(diff)) {
        isBugNumber = false;
        break;
      }
    }
    if (isBugNumber) {
      bugNumber = numbers[i];
      break;
    }
  }
  return bugNumber;
}

const part1 = () => {
  const bugNumber = findBugNumber();
  console.log(bugNumber);
};

const part2 = () => {
  const bugNumber = findBugNumber();
  let i = 0;
  let j = 1;
  let sum = numbers[i] + numbers[j];
  while (sum !== bugNumber) {
    if (sum < bugNumber) {
      j++;
      sum += numbers[j];
    } else {
      sum -= numbers[i];
      i++;
    }
  }
  let min = numbers[i];
  let max = numbers[i];
  for (let k = i; k <= j; k++) {
    if (numbers[k] > max) max = numbers[k];
    else if (numbers[k] < min) min = numbers[k];
  }
  const weakness = min + max;
  console.log(weakness);
};

part1();
part2();
