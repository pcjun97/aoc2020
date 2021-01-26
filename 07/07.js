const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const rules = input.split(/\n/g);

const constructRelationships = rules => {
  const relationships = {};
  for (const rule of rules) {
    let children;
    const [parent, childrenBags] = rule.split(" bags contain ");
    if (childrenBags.startsWith("no")) {
      children = [];
    } else {
      children = childrenBags.split(", ").map(childBag => {
        const [count, ...bag] = childBag.split(" ");
        const color = bag.slice(0, bag.length - 1).join(" ");
        return [color, parseInt(count)];
      })
    }
    relationships[parent] = children;
  }
  return relationships;
}

const findShinyGoldBag = (bag, relationships, map) => {
  if (!map.hasOwnProperty(bag)) {
    let contain = false;
    const children = relationships[bag];
    if (children.length > 0) {
      for (const child of children) {
        if (!map.hasOwnProperty(child[0])) {
          map[child[0]] = findShinyGoldBag(child[0], relationships, map);
        }
        if (map[child[0]]) {
          contain = true;
          break;
        } 
      }
    }
    map[bag] = contain;
  } 
  return map[bag];
}

const findTotalChildBagsCount = (bag, relationships, map) => {
  if (!map.hasOwnProperty(bag)) {
    let count = 0;
    const children = relationships[bag];
    if (children.length > 0) {
      for (const child of children) {
        if (!map.hasOwnProperty(child[0])) {
          map[child[0]] = findTotalChildBagsCount(child[0], relationships, map);
        }
        count += child[1] + child[1] * map[child[0]];
      }
    }
    map[bag] = count;
  }
  return map[bag];
}

const part1 = () => {
  let shinyGoldBagCount = 0;

  const relationships = constructRelationships(rules);
  const map = {};
  map["shiny gold"] = true;

  for (const bag of Object.keys(relationships)) {
    map[bag] = findShinyGoldBag(bag, relationships, map);
  }

  for (const containShinyGoldBag of Object.values(map)) {
    if (containShinyGoldBag) shinyGoldBagCount++;
  }

  shinyGoldBagCount -= 1;
  console.log(shinyGoldBagCount);
};

const part2 = () => {
  const relationships = constructRelationships(rules);
  const map = {};

  for (const bag of Object.keys(relationships)) {
    map[bag] = findTotalChildBagsCount(bag, relationships, map);
  }

  const bagCount = findTotalChildBagsCount("shiny gold", relationships, map);
  console.log(bagCount);
};

part1();
part2();

