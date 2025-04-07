const input = document.getElementById("user-input");
const result = document.getElementById("results-div");
const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");

const clean = () => {
  result.innerHTML = "";
}

const valid = msg => `<p class="valid">Valid US number: ${msg}</p>`;

const invalid = msg => `<p class="invalid">Invalid US number: ${msg}</p>`;

const test = () => {
  if (!input.value) {
    alert("Please provide a phone number");
    return;
  }

  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?(\d{3})[-\s]?(\d{4})$/;

  if (input.value.match(regex)) {
    result.innerHTML += valid(input.value);
  } else {
    result.innerHTML += invalid(input.value);
  }
}

check.addEventListener("click", test);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    test();
  }
});
clear.addEventListener("click", clean);