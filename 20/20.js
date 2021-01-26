const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const _tiles = input.split(/\n\n/g);

const tiles = new Map();
_tiles.forEach((tile) => {
  const _tile = tile.trim().split("\n");
  tiles.set(_tile[0].substring(5, _tile[0].length - 1), _tile.slice(1));
});

const parseTile = (tile) => {
  const content = tile
    .slice(1, tile.length - 1)
    .map((line) => line.substring(1, line.length - 1).split(""));
  let top = ["", ""],
    right = ["", ""],
    bottom = ["", ""],
    left = ["", ""];
  for (let i = 0; i < tile.length; i++) {
    top[0] = top[0] + tile[0][i];
    top[1] = tile[0][i] + top[1];
    right[0] = right[0] + tile[i][tile.length - 1];
    right[1] = tile[i][tile.length - 1] + right[1];
    bottom[0] = bottom[0] + tile[tile.length - 1][tile.length - 1 - i];
    bottom[1] = tile[tile.length - 1][tile.length - 1 - i] + bottom[1];
    left[0] = left[0] + tile[tile.length - 1 - i][0];
    left[1] = tile[tile.length - 1 - i][0] + left[1];
  }
  return {
    borders: {
      top,
      right,
      bottom,
      left,
    },
    content,
  };
};

const flipTileHorizontal = () => {};
const flipTileHorizontal = () => {};
const rotateTile = () => {};

const getBorders = (tile) => {
  let borders = ["", "", "", ""];
  for (let i = 0; i < tile.length; i++) {
    borders[0] = borders[0] + tile[0][i];
    borders[1] = borders[1] + tile[i][tile.length - 1];
    borders[2] = tile[tile.length - 1][i] + borders[2];
    borders[3] = tile[i][0] + borders[3];
  }
  return borders;
};

const part1 = () => {
  const link = new Map();
  const linkCount = new Map();
  tiles.forEach((tile, id) => {
    linkCount.set(id, 0);
    const borders = getBorders(tile);
    for (const border of borders) {
      if (link.has(border)) {
        link.get(border).push(id);
        for (let i of link.get(border)) {
          linkCount.set(i, linkCount.get(i) + 1);
        }
      } else {
        link.set(border, [id]);
        const rev = border.split("").reverse().join("");
        link.set(rev, [id]);
      }
    }
  });
  let product = 1n;
  linkCount.forEach((count, id) => {
    if (count === 2) product *= BigInt(id);
  });
  console.log(product);
};

const part2 = () => {};

part1();
part2();
