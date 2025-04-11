let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const penny = document.getElementById("penny");
const nickel = document.getElementById("nickel");
const dime = document.getElementById("dime");
const quarter = document.getElementById("quarter");
const one = document.getElementById("one");
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const twenty = document.getElementById("twenty");
const hundred = document.getElementById("hundred");

const totalPrice = document.getElementById("total-price");
const button = document.getElementById("purchase-btn");
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");

const denominations = [
  [0.01, 'PENNY'],
  [0.05, 'NICKEL'],
  [0.1, 'DIME'],
  [0.25, 'QUARTER'],
  [1, 'ONE'],
  [5, 'FIVE'],
  [10, 'TEN'],
  [20, 'TWENTY'],
  [100, 'ONE HUNDRED']
].reverse();

const update = () => {
  penny.textContent = cid[0][1].toFixed(2);
  nickel.textContent = cid[1][1].toFixed(2);
  dime.textContent = cid[2][1].toFixed(2);
  quarter.textContent = cid[3][1].toFixed(2);
  one.textContent = cid[4][1].toFixed(2);
  five.textContent = cid[5][1].toFixed(2);
  ten.textContent = cid[6][1].toFixed(2);
  twenty.textContent = cid[7][1].toFixed(2);
  hundred.textContent = cid[8][1].toFixed(2);
};

const totalDrawer = () => {
  return cid.reduce((sum, curr) => sum + curr[1], 0);
};

const calculate = (cashGiven) => {
  let change = +(cashGiven - price).toFixed(2);
  let changeArr = [];
  for (let [value, name] of denominations) {
    let amountAvailable = cid.find(c => c[0] === name)[1];
    let amountToGive = 0;
    while (change >= value && amountAvailable >= value) {
      change = +(change - value).toFixed(2);
      amountAvailable = +(amountAvailable - value).toFixed(2);
      amountToGive = +(amountToGive + value).toFixed(2);
    }
    if (amountToGive > 0) {
      changeArr.push([name, amountToGive]);
      const index = cid.findIndex(c => c[0] === name);
      cid[index][1] = amountAvailable;
    }
  }
  if (change > 0) {
    return null; 
  }
  return changeArr;
};

const print = (changeArr) => {
  if (changeArr === null) {
    changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  if (changeArr.length === 0) {
    changeDue.innerHTML = "<p>Status: CLOSED</p>";
    for (let [name, amount] of cid) {
      if (amount > 0) {
        changeDue.innerHTML += `<p>${name}: $${amount.toFixed(2)}</p>`;
      }
    }
    return;
  }

  // If there's change, status is "OPEN"
  changeDue.innerHTML = "<p>Status: OPEN</p>";
  for (let [name, amount] of changeArr) {
    if (amount > 0) {
      changeDue.innerHTML += `<p>${name}: $${amount.toFixed(2)}</p>`;
    }
  }
};

window.onload = function () {
  totalPrice.textContent = price;
  update();
};

button.addEventListener("click", () => {
  const cashValue = Number(cash.value);
  const changeNeeded = +(cashValue - price).toFixed(2);
  const drawerTotal = +totalDrawer().toFixed(2);

  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashValue === price) {
    changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>";
    return;
  }

  if (changeNeeded > drawerTotal) {
    changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  if (changeNeeded === drawerTotal) {
    changeDue.innerHTML = `<p>Status: CLOSED</p>`;
    for (let [name, amount] of cid) {
      if (amount > 0) {
        changeDue.innerHTML += `<p>${name}: $${amount.toFixed(2)}</p>`;
      }
    }
    cid = cid.map(([name]) => [name, 0]);
    update();
    return;
  }

  const result = calculate(cashValue);
  print(result);
  update();
});