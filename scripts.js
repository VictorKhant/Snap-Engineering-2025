/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

//Importing data from Json
import data from './data/data.js';

// This function adds cards the page to display the data in the array
function showCards() {
  let filteredData = data;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  const searchText = document.getElementById("search-input").value;
  filteredData = searchCards(filteredData, searchText);

  const clicked_filter = document
    .querySelector(".filter")
    .querySelector(".clicked");
  const filter_type = clicked_filter ? clicked_filter.textContent : null;
  filteredData = filterCards(filteredData, filter_type);

  for (let i = 0; i < filteredData.length; i++) {
    let cardInfo = filteredData[i];

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, cardInfo); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newCardInfo) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newCardInfo.fname + " " + newCardInfo.lname;

  const cardImage = card.querySelector("img");
  cardImage.src = "./data/img/" + newCardInfo.playerid + ".png";
  cardImage.alt = newCardInfo.fname + "'s Headshot";

  const cardStats = card.querySelectorAll("li");
  cardStats[0].textContent = "Position: " + newCardInfo.position;
  cardStats[1].textContent = "Age: " + calculateAge(newCardInfo.birthday);
  cardStats[2].textContent = "Draft Year: " + newCardInfo.draft_year;
}

function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
}

function searchCards(dataArr, user_input) {
  if (user_input.length === 0) {
    return dataArr;
  }
  return dataArr.filter((player) =>
    (player.fname + " " + player.lname)
      .toLowerCase()
      .includes(user_input.toLowerCase())
  );
}

function filterCards(dataArr, clicked) {
  if (clicked === null) return dataArr;
  return dataArr.filter(
    (player) => player.position.toLowerCase() === clicked.toLowerCase()
  );
}

let filterbtns = document.querySelectorAll(".filter button");

filterbtns.forEach(function (button) {
  button.addEventListener("click", function () {
    const currentlyClicked = document.querySelector(".filter .clicked");

    if (currentlyClicked === button) {
      button.classList.remove("clicked");
    } else {
      if (currentlyClicked) {
        currentlyClicked.classList.remove("clicked");
      }
      button.classList.add("clicked");
    }
    showCards();
  });
});

// This calls the showCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

// Detecting input in search box
document.getElementById("search-input").addEventListener("input", function () {
  showCards();
});
