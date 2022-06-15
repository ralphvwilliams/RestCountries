let list = document.getElementById("List");
let searchDiv = document.getElementById("search");
let input = document.getElementById("countryName");
let searchBtn = document.getElementById("searchBtn");
let resultsDiv = document.getElementById("results");

async function getList() {
  const countryData = await fetch("https://restcountries.com/v3.1/all");
  return countryData.json();
}

const data = getList();
data.then((response) => {
  let topTen = response.slice(0, 10);
  console.log(topTen);
  for (let index in topTen) {
    let countryName = topTen[index].altSpellings[1];
    let countryFlag = topTen[index].flags.png;
    let countryRegion = topTen[index].region;
    let countryCapital = topTen[index].capital[0];
    list.innerHTML += `<p class="countries">Name: ${countryName}</p>
      <img src="${countryFlag}">
      <p>Region: ${countryRegion}</p>
      <p>Capital: ${countryCapital}</p>`;
  }
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resultsDiv.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/name/${input.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let index in data) {
        resultsDiv.innerHTML += `<p class="countries">Name: ${data[index].name.common}</p>
      <img src="${data[index].flags.png}">
      <p>Region: ${data[index].region}</p>
      <p>Capital: ${data[index].capital[0]}</p>`;
      }
    });
});

//data[0].name.common
//data[0].flags.png
//data[0].region
//data[0].capital[0]
