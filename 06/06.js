const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const groups = input.split(/\n{2,}/g);

const part1 = () => {
  let sum = 0;
  for (const group of groups) {
    const answers = group.replace(/\s/g, "").split("");
    const set = new Set(answers);
    sum += set.size;
  }
  console.log(sum);
};

const part2 = () => {
  let sum = 0;
  for (const group of groups) {
    const members = group.split("\n");
    const map = {};
    for (const member of members) {
      for (let i = 0; i < member.length; i++) {
        if (!map[member[i]]) map[member[i]] = 1;
        else map[member[i]] += 1;
      }
    }
    let count = 0;
    Object.values(map).forEach(val => {
      if (val === members.length) count++;
    })
    sum += count;
  }
  console.log(sum);
};

part1();
part2();
