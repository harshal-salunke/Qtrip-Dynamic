import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let response = await fetch(config.backendEndpoint + "/cities"); //use await with fetch and correct URL data inside fetch().
    let user = await response.json();
    console.log(user);
    return user; //put return data into variable.
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let row = document.getElementById("data");
  let container = document.createElement("div");
  container.className = "col-6 col-lg-3 mb-4";

  let a = document.createElement("a");
  a.href = `pages/adventures/?city=${id}`;
  a.id = id;
  a.innerHTML = `<div class="tile">
    <div class="tile-text text-center">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
      <img class="img-responsive" src=${image}>
  </div>`;

  container.append(a)
  row.appendChild(container)
  // let container = document.createElement('div');
  // console.log(container);
  // container.className = 'tile'
  // container.innerHTML = `<p>${city}${id}${description}<p><img src = "${image}" class ="img-response">`

  // document.getElementById("data").appendChild(container);
}
export { init, fetchCities, addCityToDOM };
