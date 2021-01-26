const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const instructions = input.split(/\n/g);

const checkLoop = (index, read, loop) => {
  if (loop[index] === null) {
    if (read[index]) {
      loop[index] = true;
    } else {
      read[index] = true;

      const [operation, argument] = instructions[index].split(" ");
      if (index === instructions.length - 1 && (operation !== "jmp" || parseInt(argument) === 1)) {
        loop[index] = false;
      } else{ 
        let i = index;
        if (operation === "jmp") {
          i += parseInt(argument);
        } else {
          i++;
        }
        loop[index] = checkLoop(i, read, loop);
      }
    }
  }
  return loop[index];
}

const part1 = () => {
  let read = new Array(instructions.length);
  read.fill(false);


  let i = 0;
  let acc = 0;
  while(!read[i]) {
    read[i] = true;

    const [operation, argument] = instructions[i].split(" ");
    if (operation === "acc") {
      acc += parseInt(argument);
      i++;
    } else if (operation === "jmp") {
      i += parseInt(argument);
    } else {
      i++;
    }
  }

  console.log(acc)
}

const part2 = () => {
  let loop = new Array(instructions.length);
  loop.fill(null);
  for (let i = 0; i < loop.length; i++) {
    if (loop[i] === null) {
      let read = new Array(instructions.length);
      read.fill(false);
      loop[i] = checkLoop(i, read, loop);
    }
  }

  let i = 0;
  let acc = 0;
  let changed = false;
  while(i < instructions.length) {
    const [operation, argument] = instructions[i].split(" ");
    if (operation === "acc") {
      acc += parseInt(argument);
      i++;
    } else if (operation === "jmp") {
      if (!changed && !loop[i + 1]) {
        changed = true;
        i++;
      } else {
        i += parseInt(argument);  
      }
    } else {
      if (!changed && !loop[i + parseInt(argument)]) {
        changed = true;
        i += parseInt(argument);
      } else {
        i++;
      }
    }
  }
  console.log(acc);
}

part1();
part2();
