const input = document.getElementById("number");
const button = document.getElementById("convert-btn")
const output = document.getElementById("output");
const message = document.getElementById("message");
const romanNumerals = [
  {symbol: "M", value: 1000},
  {symbol: "CM", value: 900},
  {symbol: "D", value: 500},
  {symbol: "CD", value: 400},
  {symbol: "C", value: 100},
  {symbol: "XC", value: 90},
  {symbol: "L", value: 50},
  {symbol: "XL", value: 40},
  {symbol: "X", value: 10},
  {symbol: "IX", value: 9},
  {symbol: "V", value: 5},
  {symbol: "IV", value: 4},
  {symbol: "I", value: 1}
];

const check = () => {
  output.classList.remove("hidden");
  const number = parseInt(input.value);

  if (isNaN(number) || !input.value) {
    errMessage("Please enter a valid number");
    console.log("error")
    return;
  } else if (number <= 0) {
    errMessage("Please enter a number greater than or equal to 1.");
    return;
  } else if (number >= 4000) {
    errMessage("Please enter a number less than or equal to 3999.");
    return;
  }

  output.classList.remove("error");
  message.textContent = convert(number);
}

const errMessage = (msg) => {
  output.classList.add("error");
  message.textContent = msg;
}

function convert (number) {
  number = parseInt(number);
  let roman = "";
  for (let i = 0; i < romanNumerals.length; i++) {
    while (number >= romanNumerals[i].value) {
      roman += romanNumerals[i].symbol;
      number -= romanNumerals[i].value;
    }
  }
  return roman;
}

button.addEventListener("click", check);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    check();
  }
});