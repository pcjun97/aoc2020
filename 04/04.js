const fs = require("fs");

const input = fs.readFileSync("/dev/stdin", "utf-8").trim();
const passports = input.split(/\n{2,}/g);

const part1 = () => {
  let validCount = 0;
  for(const passport of passports) {
    const fields = passport.trim().split(/\s+/).map(field => field.split(":")[0]);
    const set = new Set(fields);
    const required = [
      "byr",
      "iyr",
      "eyr",
      "hgt",
      "hcl",
      "ecl",
      "pid"
    ]
    let valid = true;
    for (const r of required) {
      if (!set.has(r)) {
        valid = false;
        break;
      }
    }
    if (valid) validCount++;
  }
  console.log(validCount);
};

const part2 = () => {
  let validCount = 0;
  for (const passport of passports) {
    const fields = passport.trim().split(/\s+/);
    const map = {};
    for (const field of fields) {
      const [key, val] = field.split(":");
      map[key] = val;
    }

    const byrReg = /^[0-9]{4}$/;
    const byr = map["byr"];
    if (!byr || !byrReg.test(byr) || parseInt(byr) < 1920 || parseInt(byr) > 2002)
      continue;

    const iyrReg = /^[0-9]{4}$/;
    const iyr = map["iyr"];
    if (!iyr || !iyrReg.test(iyr) || parseInt(iyr) < 2010 || parseInt(iyr) > 2020)
      continue;
    
    const eyrReg = /^[0-9]{4}$/;
    const eyr = map["eyr"];
    if (!eyr || !eyrReg.test(eyr) || parseInt(eyr) < 2020 || parseInt(eyr) > 2030)
      continue;

    if (eyr <= iyr) continue;
    
    const hgtReg = /^[0-9]{2,3}(cm|in)$/;
    const hgt = map["hgt"];
    if (!hgt || !hgtReg.test(hgt)) continue;
    const hgtVal = parseInt(hgt.substring(hgt.length, hgt.length - 2));
    const hgtUnit = hgt.substring(hgt.length - 2);
    if (hgtUnit !== "in" && hgtUnit !== "cm") continue;
    if (hgtUnit === "in" && (hgtVal < 59 || hgtVal > 76)) continue;
    if (hgtUnit === "cm" && (hgtVal < 150 || hgtVal > 193)) continue;

    const hclReg = /^#[0-9a-f]{6}$/;
    const hcl = map["hcl"];
    if (!hcl || !hclReg.test(hcl)) continue;

    const eclOptions = new Set([
      "amb",
      "blu",
      "brn",
      "gry",
      "grn",
      "hzl",
      "oth"
    ])
    const ecl = map["ecl"];
    if (!ecl || !eclOptions.has(ecl)) continue;

    const pidReg = /^[0-9]{9}$/;
    const pid = map["pid"];
    if (!pid || !pidReg.test(pid)) continue;

    validCount++;
  }
  console.log(validCount);
};

part1();
part2();
