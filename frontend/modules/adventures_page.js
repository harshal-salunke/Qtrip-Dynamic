import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let searchPram = new URLSearchParams(search);
  const city = searchPram.get("city");
  // console.log(city)
  // console.log(search, "search");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    ); //use await with fetch and correct URL data inside fetch().
    const user = await response.json();
    // console.log(user);
    return user; //put return data into variable.
  } catch (err) { //exception
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures);
  adventures.forEach((adventure) => {
    let divElement = document.createElement("div");
    divElement.className = "col-6 col-sm-4 col-lg-3 mb-4";
    divElement.innerHTML = `
    <a href="detail/?adventure=${adventure.id}" id=${adventure.id}
      <div class="activity-card">
        <div class="category-banner">${adventure.category}</div>
        <img class="img-responsive" src="${adventure.image}" />
        <div class="adventure-card-text w-100 text-md-center mt-2">
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3 "
            <h5 class="text-left">${adventure.name}</h5>
            <p>${adventure.costPerHead}</p>
          </div>
        <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3 "
          <h5 class="text-left">Duration</h5>
          <p>${adventure.duration} hours</p>
        </div>
      </div>
    </a>
    `;
    document.getElementById("data").append(divElement);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(low, "low time")
  //   console.log( high,"high time")
  return list.filter((adv) => adv.duration>=low && adv.duration<=high);
  // console.log(filterduration,"filterduration")
  // return filterduration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // let filteredAdv = [];
  // for (let i = 0; i < categoryList.length; i++) {
  //   console.log(list);
  //   let filterCurrCat = list.filter(adv => adv.category===categoryList[i]);

  //   filterCurrCat.forEach((adv) => { filteredAdv.push(adv)});
  // }

  const filteredList = list.filter(adventure => categoryList.includes(adventure.category));

  return filteredList
  // console.log(filteredAdv, "filteredAdv");
  // return filteredAdv;
  // console.log(filterAdvByCategory);
  // return filterAdvByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log(list);
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    // let lowTime = filters.duration.split("-")[0];
    // let highTime = filters.duration.split("-")[1];
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    let durationFiltered = filterByDuration(list, lowTime, highTime);
    return filterByCategory(durationFiltered, filters.category);
  } else if (filters["duration"].length > 0) {
    // let lowTime = filters.duration.split("-")[0];
    // let highTime = filters.duration.split("-")[1];
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    return filterByDuration(list, lowTime, highTime);

  } else if (filters["category"].length > 0) {
    return filterByCategory(list, filters["category"]);
  } else {
    return list;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let localStorageFilter = JSON.parse(window.localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return localStorageFilter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = filters.category;
  let catListEle = document.getElementById('category-list');
  categoryList.forEach(function (category) {
    let divEle = document.createElement('div');
    divEle.className = 'category-filter';
    divEle.innerText = category;
    catListEle.append(divEle);
  });

  let durationEle = document.getElementById('duration-select');
  durationEle.value = filters.duration;
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
