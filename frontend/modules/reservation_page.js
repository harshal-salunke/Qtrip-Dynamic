import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const result = await fetch(config.backendEndpoint + `/reservations/`);
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    let reservationTable = document.getElementById('reservation-table')
    reservations.forEach(rev => {
      let row = document.createElement('tr');
      row.innerHTML =
      //template string starts
      `
      <td>${rev.id}</td>
      <td>${rev.name}</td>
      <td>${rev.adventureName}</td>
      <td>${parseInt(rev.person)}</td>
      <td>${new Date(rev.date).toLocaleDateString("en-IN" ,)}</td>
      <td>${rev.price}</td>
      <td>${new Date(rev.time).toLocaleString("en-IN", {
          year: "numeric",
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
      })}</td>
      <td>
        <div class="reservation-visit-button" id=${rev.id}>
          <a href="../detail/?adventure=${rev.adventure}">Visit Adventure</a>
        </div>
      </td>
      ` ;//template string ends
      reservationTable.appendChild(row);
    })
  
}

export { fetchReservations, addReservationToTable };
