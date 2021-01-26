const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const [fieldsSection, myTicketSection, nearbyTicketsSection] = input.split(/\n\n/g);

const fields = fieldsSection.split("\n").map(line => {
  const [name, rule] = line.trim().split(": ");
  return [name, rule.split(" or ").map(range => range.split("-").map(val => parseInt(val)))];
})

const myTicket = myTicketSection.split("\n")[1]
  .split(",")
  .map(val => parseInt(val));

const nearbyTickets = nearbyTicketsSection.split("\n").slice(1)
  .map(ticket => ticket.split(",").map(val => parseInt(val)));

const isValueValidForField = (val, rule) => {
  let valid = false;
  for (const minmax of rule) {
    const [min, max] = minmax;
    if (val >= min && val <= max) {
      valid = true;
      break;
    }
  }
  return valid;
}

const isValueValid = (val) => {
  let valid = false;
  for (const field of fields) {
    for (const minmax of field[1]) {
      const [min, max] = minmax;
      if (val >= min && val <= max) {
        valid = true;
        break;
      }
    }
    if (valid) break;
  }
  return valid
}

const part1 = () => {
  let rate = 0;
  for (const ticket of nearbyTickets) {
    for (const val of ticket) {
      if (!isValueValid(val)) rate += val;
    }
  }
  console.log(rate);
};

const part2 = () => {
  const validTickets = nearbyTickets.filter(ticket => {
    let valid = true;
    for (const val of ticket) {
      if (!isValueValid(val)) {
        valid = false;
        break;
      }
    }
    return valid;
  })
  let positions = {};
  for (const field of fields){
    positions[field[0]] = new Set();
    for (let i = 0; i < validTickets[0].length; i++) {
      let valid = true;
      for (let j = 0; j < validTickets.length; j++) {
        if (!isValueValidForField(validTickets[j][i], field[1])) {
          valid = false;
          break;
        }
      }
      if (valid) positions[field[0]].add(i);
    }
  }
  while(true) {
    let sanitized = true;
    for (const field in positions) {
      if (positions[field].size === 1) {
        const i = positions[field].values().next().value;
        for (const _field in positions) {
          if (positions[_field].has(i) && _field !== field)
            positions[_field].delete(i);
        }
      } else {
        sanitized = false;
      }
    }
    if (sanitized) break;
  }
  let product = 1;
  for (const field in positions) {
    if (field.includes("departure")) {
      const i = positions[field].values().next().value;
      product *= myTicket[i];
    }
  }
  console.log(product);
};

part1();
part2();

