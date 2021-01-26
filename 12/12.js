const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const instructions = input.split(/\n/);

const turnShip = (initialDirection, turnDirection, turnDegree) => {
  turnDegree = (turnDegree / 90) % 4;
  if (turnDirection === "L") turnDegree = 4 - turnDegree; 
  const newDirection = (initialDirection + turnDegree) % 4;
  return newDirection;
}

const part1 = () => {
  let direction = 1;
  let position = [0, 0];
  for (const ins of instructions) {
    switch(ins[0]) {
      case "N":
        position[1] += parseInt(ins.substring(1));
        break;

      case "S":
        position[1] -= parseInt(ins.substring(1));
        break;

      case "E":
        position[0] += parseInt(ins.substring(1));
        break;

      case "W":
        position[0] -= parseInt(ins.substring(1));
        break;

      case "L":
        direction = turnShip(direction, "L", parseInt(ins.substring(1)));
        break;

      case "R":
        direction = turnShip(direction, "R", parseInt(ins.substring(1)));
        break;

      case "F":
        if (direction < 2) position[1 - direction % 2] += parseInt(ins.substring(1))
        else position[1 - direction % 2] -= parseInt(ins.substring(1))
        break;
    }
  }
  const manhattanDistance = Math.abs(position[0]) + Math.abs(position[1]);
  console.log(manhattanDistance)
};

const part2 = () => {
  let position = [0, 0];
  let waypoint = [10, 1];

  for (const ins of instructions) {
    switch(ins[0]) {
      case "N":
        waypoint[1] += parseInt(ins.substring(1));
        break;

      case "S":
        waypoint[1] -= parseInt(ins.substring(1));
        break;

      case "E":
        waypoint[0] += parseInt(ins.substring(1));
        break;

      case "W":
        waypoint[0] -= parseInt(ins.substring(1));
        break;

      case "L":
        for (let i = 0; i < parseInt(ins.substring(1)) / 90; i++)
          waypoint = [0 - waypoint[1], waypoint[0]]
        break;

      case "R":
        for (let i = 0; i < parseInt(ins.substring(1)) / 90; i++)
          waypoint = [waypoint[1], 0 - waypoint[0]]
        break;

      case "F":
        position[0] += waypoint[0] * parseInt(ins.substring(1));
        position[1] += waypoint[1] * parseInt(ins.substring(1));
        break;
    }
  }
  const manhattanDistance = Math.abs(position[0]) + Math.abs(position[1]);
  console.log(manhattanDistance)
};

part1();
part2();
