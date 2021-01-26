const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const lines = input.split("\n");

const part1 = () => {
  let validCount = 0;
  for (let line of lines) {
    const [minmax, _letter, password] = line.split(" ");
    const [min, max] = minmax.split("-");
    const letter = _letter[0];
    let letterCount = 0;
    for (let i = 0; i < password.length; i++) {
      if (password[i] === letter) letterCount++;
    }
    if (letterCount >= min && letterCount <= max) validCount++;
  }
  console.log(validCount);
};

const part2 = () => {
  let validCount = 0;
  for (let line of lines) {
    const [position, _letter, password] = line.split(" ");
    const [first, second] = position.split("-").map(p => parseInt(p) - 1);
    const letter = _letter[0];
    if (first < 0 || first >= password.length || second < 0 || second >= password.length)
      continue;
    if (password[first] === letter && password[second] === letter)
      continue;
    if (password[first] === letter || password[second] === letter)
      validCount++;
  }
  console.log(validCount);

};

part1();
part2();

