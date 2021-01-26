const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const [rulesRaw, messagesRaw] = input.split(/\n\n/g);

const rules = rulesRaw.split("\n").reduce((map, rule) => {
  const [index, desc] = rule.split(": ");
  if (desc[0] === "\"") map.set(parseInt(index), [[desc[1]]]) 
  else map.set(parseInt(index), desc.split(" | ").map(d => d.split(" ").map(i => parseInt(i))));
  return map;
}, new Map());
const messages = messagesRaw.split("\n");

const matchRule = (i, j, k, r, table) => {
  const list = rules.get(r);
  for (const rule of list) {
    if (rule.length === 2
      && table.get(j).get(k).has(rule[0])
      && table.get(k + 1).get(i).has(rule[1])) {
      return true;
    } else if (rule.length === 1 && rules.has(rule[0]) && matchRule(i, j, k, rule[0], table)) {
      return true;
    }
  }
  return false;
}

const matchTerminal = (m, r) => {
  if (r === m) return true
  else if (rules.has(r)) {
    const list = rules.get(r);
    for (const rule of list) {
      if (rule.length === 1 && matchTerminal(m, rule[0])) return true;
    }
  } else return false;
}

const cyk = (message) => {
  const table = new Map();
  for (let i = 0; i < message.length; i++) {
    const map = new Map();
    for (let j = i; j < message.length; j++) {
      map.set(j, new Set());
    }
    table.set(i, map);
  }
  for (let i = 0; i < message.length; i++) {
    rules.forEach((list, r) => {
      for (const rule of list) {
        if (rule.length === 1 && matchTerminal(message[i], rule[0])) {
          table.get(i).get(i).add(r);
        }
      }
    })
    for (let j = i - 1; j >= 0; j--) {
      for (let k = j; k < i; k++) {
        for (const r of rules.keys()) {
          if (matchRule(i, j, k, r, table))
            table.get(j).get(i).add(r);
        }
      }
    }
  }
  return table.get(0).get(message.length - 1).has(0);
}

const part1 = () => {
  let sum = 0;
  for (const message of messages) {
    if (cyk(message)) sum++;
  }
  console.log(sum);
};

const part2 = () => {
  let max = 0;
  for (const k of rules.keys()) {
    if (k > max) max = k;
  }
  let sum = 0;
  for (const message of messages) {
    if (cyk(message)) sum++;
  }
  console.log(sum);
};

part1();
part2();

