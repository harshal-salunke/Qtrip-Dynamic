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
    return user;//put return data into variable.
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement('div');
  container.className = 'col-6 col-lg-4 mb-4'
  container.innerHTML = `<p>${city}<p><img src = "${image}" class ="img-response">`
  container.innerHTML = innerHTML;

  document.getElementById("data").appendChild(container);
}

export { init, fetchCities, addCityToDOM };
