const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const program = input.split(/\n/);

const applyMask = (value, mask) => {
  let result = 0;
  for (let i = 0; i < mask.length; i++) {
    const bitmask = mask[mask.length - 1 - i];
    const bit = value % 2;
    if (bitmask === "X") result += bit * Math.pow(2, i);
    else if (bitmask === "1") result += Math.pow(2, i);
    value = Math.floor(value / 2);
  }
  return result;
}

const calcAddr = (addr, index, bitmask) => {
  const front = addr - (addr % Math.pow(2, index + 1));
  const back = addr % Math.pow(2, index);
  addr = front + (bitmask * Math.pow(2, index)) + back;
  return addr;
}

const writeMemory = (val, addr, mask, mem, index) => {
  if (index === mask.length) {
    mem[addr] = val;
  } else if (mask[mask.length - 1 - index] === "1") {
    writeMemory(val, calcAddr(addr, index, 1), mask, mem, index + 1);
  } else if (mask[mask.length - 1 - index] === "0") {
    writeMemory(val, addr, mask, mem, index + 1);
  } else {
    writeMemory(val, calcAddr(addr, index, 1), mask, mem, index + 1);
    writeMemory(val, calcAddr(addr, index, 0), mask, mem, index + 1);
  }
}

const part1 = () => {
  let mem = {};
  let mask = "";
  for (const ins of program) {
    const [operation, value] = ins.split(" = ")
    if (operation === "mask") {
      mask = value;
    } else {
      const i = operation.substring(4, operation.length - 1);
      mem[i] = applyMask(parseInt(value), mask);
    }
  }
  let sum = 0;
  for (const key in mem) sum += mem[key];
  console.log(sum);
};

const part2 = () => {
  let mem = {};
  let mask = "";
  for (const ins of program) {
    const [operation, value] = ins.split(" = ");
    if (operation === "mask") {
      mask = value;
    } else {
      const addr = operation.substring(4, operation.length - 1);
      writeMemory(parseInt(value), parseInt(addr), mask, mem, 0);
    }
  }
  let sum = 0;
  for (const key in mem) sum += mem[key];
  console.log(sum);
};

part1();
part2();
