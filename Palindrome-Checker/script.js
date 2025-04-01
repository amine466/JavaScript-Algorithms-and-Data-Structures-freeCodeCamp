const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

function cleanInputString(str) {
  const regex = /[^a-zA-Z0-9]/g;
  return str.replace(regex, '');
}

function reverse(str) {
  let reversed = "";
  for (let i=str.length - 1; i >= 0; i-- ) {
    reversed += str[i];
  }
  return reversed;
}

function check() {
  if (input.value === "") {
    alert("Please input a value");
    return;
  }
  const test = cleanInputString(input.value);
  const test_1 = test.toLowerCase();
  const test_2 = reverse(test).toLowerCase();
  if (test_1 === test_2) {
    result.innerText = `${input.value} is a palindrome.`;
  } else {
    result.innerText = `${input.value} is not a palindrome.`;
  }
}

button.addEventListener("click", check);