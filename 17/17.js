const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const initial = input.split(/\n/);

const createCube = (coordinate, active, cubes) => {
  let cube;
  let ref = cubes;
  for (let i = 0; i < coordinate.length; i++) {
    if (i === coordinate.length - 1) {
      ref[coordinate[i]] = {
        coordinate,
        active
      };
      cube = ref[coordinate[i]];
    } else {
      if (!ref.hasOwnProperty(coordinate[i])) ref[coordinate[i]] = {};
      ref = ref[coordinate[i]];
    }
  }
  return cube;
}

const getCube = (coordinate, cubes) => {
  let cube;
  let ref = cubes;
  for (let i = 0; i < coordinate.length; i++) {
    if (i === coordinate.length - 1) {
      if (!ref.hasOwnProperty(coordinate[i])) {
        ref[coordinate[i]] = {
          coordinate,
          active: false,
        };
      }
      cube = ref[coordinate[i]];
    } else {
      if (!ref.hasOwnProperty(coordinate[i])) ref[coordinate[i]] = {};
      ref = ref[coordinate[i]];
    }
  }
  return cube;
}

const getNeighbors = (cube, cubes) => {
  const coordinate = cube.coordinate;
  let neighbors = [];
  let coordinates = [[]];
  for (let i = 0; i < coordinate.length; i++) {
    let t = [];
    for (let j = 0; j < coordinates.length; j++) {
      for (let k = -1; k <= 1; k++) t.push([...coordinates[j], coordinate[i] + k]);
    }
    coordinates = t;
  }
  for (let i = 0; i < coordinates.length; i++) {
    let neighbor = getCube(coordinates[i], cubes);
    if (neighbor !== cube) neighbors.push(neighbor);
  }
  return neighbors;
}

const cycleCubes = (actives, cubes) => {
  let involved = new Set();
  for (const cube of actives) {
    involved.add(cube);
    getNeighbors(cube, cubes).forEach(n => involved.add(n));
  }
  for (const cube of involved) {
    setActiveNext(cube, cubes);
  }
  let activesNew = [];
  for (const cube of involved) {
    cube.active = cube.activeNext;
    if (cube.active) activesNew.push(cube);
  }
  actives = activesNew;
  return actives;
}

const setActiveNext = (cube, cubes) => {
  let t = getNeighbors(cube, cubes);
  let activeNeighbors = 0;
  for (const neighbor of t) {
    if (neighbor.active) activeNeighbors++;
  }
  if (cube.active && (activeNeighbors < 2 || activeNeighbors > 3)) cube.activeNext = false;
  else if (!cube.active && activeNeighbors === 3) cube.activeNext = true;
  else cube.activeNext = cube.active;
}

const part1 = () => {
  let actives = [];
  let cubes = {};
  for (let i = 0; i < initial.length; i++) {
    for (let j = 0; j < initial[i].length; j++) {
      if (initial[i][j] === "#") {
        const cube = createCube([i, j, 0], true, cubes);
        actives.push(cube);
      }
    }
  }
  for (let i = 0; i < 6; i++) {
    actives = cycleCubes(actives, cubes);
  }
  console.log(actives.length);
};

const part2 = () => {
  let actives = [];
  let cubes = {};
  for (let i = 0; i < initial.length; i++) {
    for (let j = 0; j < initial[i].length; j++) {
      if (initial[i][j] === "#") {
        const cube = createCube([i, j, 0, 0], true, cubes);
        actives.push(cube);
      }
    }
  }
  for (let i = 0; i < 6; i++) {
    actives = cycleCubes(actives, cubes);
  }
  console.log(actives.length);
};

part1();
part2();

