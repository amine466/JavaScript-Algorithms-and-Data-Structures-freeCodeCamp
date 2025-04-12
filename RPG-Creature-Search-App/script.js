const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const api = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

const creatureInfo = document.getElementById("creature-info");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const creatureHp = document.getElementById("hp");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const creatureSpAttack = document.getElementById("special-attack");
const creatureSpDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");

const analyseData = (data) => {
  const {
    id,
    name,
    weight,
    height,
    special,
    stats,
    types,
  } = data;

  creatureInfo.style.display = "block";
  creatureName.innerText = name;
  creatureId.innerText = "#" + id;
  creatureWeight.innerText = weight;
  creatureHeight.innerText = height;

  stats.forEach(stat => {
    switch (stat.name) {
      case "hp":
        creatureHp.innerText = stat.base_stat;
        break;
      case "attack":
        creatureAttack.innerText = stat.base_stat;
        break;
      case "defense":
        creatureDefense.innerText = stat.base_stat;
        break;
      case "special-attack":
        creatureSpAttack.innerText = stat.base_stat;
        break;
      case "special-defense":
        creatureSpDefense.innerText = stat.base_stat;
        break;
      case "speed":
        creatureSpeed.innerText = stat.base_stat;
        break;
      default:
        break;
    }
  });

  creatureTypes.innerHTML = "";
  types.forEach(type => {
    creatureTypes.innerHTML += `<span class="${type.name}">${type.name}</span>`
  })
}

const fetchData = async (input) => {
  try {
    const res = await fetch(api + "/" + input.toLowerCase());
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const search = async () => {
  const data = await fetchData(input.value);
  if (!data) {
    alert("Creature not found");
  } else {
    analyseData(data);
  }
}

button.addEventListener("click", () => {
  search()
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
