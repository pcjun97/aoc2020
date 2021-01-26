const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const expressions = input.split(/\n/);

const solveExpression1 = (expression, index) => {
  let result = 0;
  let operation = "+";
  let i;
  for (i = index; i < expression.length && expression[i] !== ")"; i++) {
    if (expression[i] === "(") {
      const [innerResult, j] = solveExpression1(expression, i + 1);
      if (operation === "*") result *= innerResult;
      else result += innerResult;
      i = j;
    } else if (expression[i] === "+" || expression[i] === "*"){
      operation = expression[i];
    } else if (expression[i] !== " ") {
      if (operation === "*") result *= parseInt(expression[i])
      else result += parseInt(expression[i]);
    }
  }
  return [result, i];
}

const solveExpression2 = (expression, index) => {
  let num = [];
  let sum = 0;
  let i;
  for (i = index; i < expression.length && expression[i] !== ")"; i++) {
    if (expression[i] === "(") {
      const [innerResult, j] = solveExpression2(expression, i + 1);
      sum += innerResult;
      i = j;
    } else if (expression[i] === "*" && sum > 0){
      num.push(sum);
      sum = 0;
    } else if (expression[i] !== " " && expression[i] !== "+" && expression !== "*") {
      sum += parseInt(expression[i]);
    }
  }
  if (sum > 0) num.push(sum);
  let result = 1;
  for (const n of num) result *= n;
  return [result, i];
}

const part1 = () => {
  let sum = 0;
  for (const expression of expressions) {
    sum += solveExpression1(expression, 0)[0];
  }
  console.log(sum);
};

const part2 = () => {
  let sum = 0;
  for (const expression of expressions) {
    sum += solveExpression2(expression, 0)[0];
  }
  console.log(sum);
};

part1();
part2();

