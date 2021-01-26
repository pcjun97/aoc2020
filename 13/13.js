const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const notes = input.split(/\n/);

const timestamp = parseInt(notes[0]);
const budIDs = notes[1].split(",").map(id => id === "x" ? null : parseInt(id));

const moduloInverse = (a, n) => {
  let t = 0n;
  let tNew = 1n;
  let r = n;
  let rNew = a;
  while (rNew > 0n) {
    const q = r / rNew;
    [t, tNew] = [tNew, t - q * tNew];
    [r, rNew] = [rNew, r - q * rNew];
  }
  if (t < 0n) t += n;
  return t;
};

const crt = (num, rem) => {
  let prod = 1n;
  for (const n of num) prod *= n;

  let result = 0n;
  for (let i = 0; i < num.length; i++) {
    const pp = prod / num[i];
    const inv = moduloInverse(pp, num[i]);
    result += rem[i] * inv * pp;
  }
  return result % prod;
};

const part1 = () => {
  let earliestBusID;
  let minWait = Number.MAX_VALUE;
  for (const id of budIDs) {
    if (id !== null) {
      const wait = id - (timestamp % id);
      if (wait < minWait) {
        earliestBusID = id;
        minWait = wait;
      }
    }
  }
  console.log(earliestBusID * minWait);
};

const part2 = () => {
  let num = [];
  let rem = [];
  for (let i = 0; i < budIDs.length; i++) {
    const id = budIDs[i];
    if (id !== null) {
      num.push(BigInt(id));
      rem.push(BigInt(((-i % id) + id) % id));
    }
  }
  const ans = crt(num, rem);
  console.log(ans);
  console.log(num, rem)
};

part1();
part2();

