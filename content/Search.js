let url = "https://api.edamam.com/search?q=";
let myApiKey = "&app_key=6c85be342a5528cb19c8eed9fc6ab235";
let myApiId = "&app_id=fc2d8135";
let healthRestrictions = "&health=";
let dietRestrictions = "&diet=";
var searchArray = []; //array to hold keywords to search by

//to make sure the labels are always null when back at the main page.

window.onload = () => {
  document.getElementById("searchBar").addEventListener("input", suggestions);

  sessionStorage.setItem("healthLabel", "");
  sessionStorage.setItem("dietLabel", "");
};

function addSearchItem() {
  if (searchArray.length >= 10) {
    window.alert("max items already added");
    return;
  }
  var item = $("#searchBar").val();

  //empty input, just return
  if (item.length < 1) {
    return;
  }
  let k = 0;
  while (k < searchArray.length) {
    let str1 = JSON.stringify(searchArray[k]);
    let itemOne = JSON.stringify(item);
    let res = str1.toUpperCase();
    let itemRes = itemOne.toUpperCase();
    if (res == itemRes) {
      window.alert(item + " already added.");
      document.getElementById("searchBar").value = "";
      return;
    }
    ++k;
  }

  //add button to display on page
  $(".searchItems").append(
    $("<input></input>")
      .attr({
        type: "button",
        class: "btn searchDisplay",
        value: item
      })
      .click(function() {
        //onclick, food will be removed
        var val = $(this).val();
        var len = searchArray.length;

        //removing from food array
        for (var i = 0; i < len; ++i) {
          if (searchArray[i] === val) {
            searchArray.splice(i, 1);
          }
        }

        //removing from html
        $(this).remove();
      })
  );

  //clear input after ingredient added.
  document.getElementById("searchBar").value = "";

  //add value to search array
  searchArray.push(item);
  console.log(searchArray);
  return false;
}

function addHealthLabel() {
  var label = $("#healthLabelSelect option:selected").text();
  document.getElementById("healthContainer").innerHTML = "";
  if (label == "Choose one (optional)") {
    sessionStorage.setItem("healthLabel", "");
    return;
  }

  $(".healthLabelItems").append(
    $("<input></input>")
      .attr({
        id: "healthbutton",
        type: "button",
        class: "btn searchDisplay labelDisplay health-btn",
        value: label
      })
      .click(function() {
        sessionStorage.setItem("healthLabel", "");

        //removing from html
        $(this).remove();
        document.getElementById("healthLabelSelect").selectedIndex = 0;
        return;
      })
  );

  if (label == "Choose one (optional)") {
    document.getElementById("healthContainer").innerHTML = "";
    sessionStorage.setItem("healthLabel", "");
  } else {
    healthRestrictions = "&health=";
    let holdLabel = healthRestrictions.concat(label);
    healthRestrictions = holdLabel;
    sessionStorage.setItem("healthLabel", label);
  }

  return false;
}
function addDietLabel() {
  var label = $("#dietLabelSelect option:selected").text();
  document.getElementById("dietContainer").innerHTML = "";
  if (label == "Choose one (optional)") {
    document.getElementById("dietContainer").innerHTML = "";
    sessionStorage.setItem("dietLabel", "");
    return;
  }

  $(".dietLabelItems").append(
    $("<input></input>")
      .attr({
        id: "dietbutton",
        type: "button",
        class: "btn searchDisplay labelDisplay diet-btn",
        value: label
      })
      .click(function() {
        sessionStorage.setItem("dietLabel", "");

        //removing from html
        $(this).remove();
        document.getElementById("dietLabelSelect").selectedIndex = 0;
        return;
      })
  );
  if (label == "Choose one (optional)") {
    document.getElementById("dietContainer").innerHTML = "";
    sessionStorage.setItem("dietLabel", "");
  } else {
    dietRestrictions = "&diet=";
    let holdLabel = dietRestrictions.concat(label);
    dietRestrictions = holdLabel;
    sessionStorage.setItem("dietLabel", label);
  }

  return false;
}

function submitSearch() {
  /*
    var len = searchArray.length;
    console.log("searchArray:")
    for (var i=0; i<len; ++i){
        console.log(searchArray[i]);
    }
    */

  if (searchArray.length < 1) {
    window.alert("Zero ingredients added");
    return;
  }
  sessionStorage.setItem("searchedFoods", searchArray);
  document.getElementById("loadingContainer").style.display = "block";
  sendGetRequest(searchArray);
}

function sendGetRequest(q) {
  //second change
  //make request without reloading page

  xmlRequest = new XMLHttpRequest();

  //if request is succesfull this function happen
  xmlRequest.onload = function() {
    let response = JSON.parse(this.responseText);

    console.log(response.hits);

    sessionStorage.setItem("food", JSON.stringify(response.hits));

    window.location.pathname = "cs465-project2.github.io/content/page1.html";
    //window.location.pathname = "content/page1.html";
  };

  const healthLabel = sessionStorage.getItem("healthLabel");
  if (!healthLabel) {
    healthRestrictions = "";
    sessionStorage.setItem("healthLabel", healthRestrictions);
  } else {
    healthRestrictions = "&health=";
    let holdLabel = healthRestrictions.concat(healthLabel);
    healthRestrictions = holdLabel;
    sessionStorage.setItem("healthLabel", healthLabel);
  }

  const dietLabel = sessionStorage.getItem("dietLabel");
  if (!dietLabel) {
    dietRestrictions = "";
    sessionStorage.setItem("dietLabel", dietRestrictions);
  } else {
    dietRestrictions = "&diet=";
    let holddiet = dietRestrictions.concat(dietLabel);
    dietRestrictions = holddiet;
    sessionStorage.setItem("dietLabel", dietLabel);
  }

  //length = 8 means no restriction was added
  if (healthRestrictions.length < 9) {
    healthRestrictions = "";
  }
  //
  if (dietRestrictions.length < 7) {
    dietRestrictions = "";
  }
  //sending GET request
  xmlRequest.open(
    "GET",
    url + q + myApiId + myApiKey + healthRestrictions + dietRestrictions
  );
  xmlRequest.send();
}
function getRecipes() {
  let myFood = JSON.parse(sessionStorage.getItem("food"));
  //Getting the first recipe on the list

  return myFood;
}
const moreFood = getRecipes();

/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&& AUTOCOMPLETE FEATURE &&&&&&&&&&&&&&&&&&&*/

let form = document.querySelector("form");
let anotherApiId = "038c58e0";
let anotherApiKey = "83a54763d963b2fa850b419c4b61c61d";
let autocompleteURL =
  "https://trackapi.nutritionix.com/v2/search/instant?query=";

function suggestions() {
  currentInput = document.getElementById("searchBar").value;
  //empty so do nothing
  if (currentInput == "") {
    document.getElementById("autocomplete-results").innerHTML = "";
    return;
  }
  if (currentInput == " " || currentInput == "  ") {
    document.getElementById("searchBar").value = "";
    document.getElementById("autocomplete-results").innerHTML = "";
    return;
  }
  callAutocomplete(currentInput);
}

function callAutocomplete(currentInput) {
  autocompleteXmlRequest = new XMLHttpRequest();

  autocompleteXmlRequest.onload = function() {
    let response = JSON.parse(this.responseText);
    document.getElementById("autocomplete-results").innerHTML = "";
    if (response.common.length == 0) {
      document.getElementById("autocomplete-results").innerHTML = "";
      return;
    }

    let startWith = response.common.filter(recipe => {
      const regex = new RegExp(`^${currentInput}`, "gi");
      return recipe.food_name.match(regex);
    });
    console.log(startWith);
    document.getElementById("autocomplete-results").innerHTML = "";
    startWith.map(names => {
      const recipe = document.createElement("DIV");
      recipe.innerHTML = names.food_name;
      recipe.addEventListener("click", function(e) {
        document.getElementById("searchBar").value = this.innerHTML;
        document.getElementById("autocomplete-results").innerHTML = "";
      });
      document.getElementById("autocomplete-results").appendChild(recipe);
    });
    if (document.getElementById("searchBar").value == "") {
      document.getElementById("autocomplete-results").innerHTML = "";
    }
  };
  autocompleteXmlRequest.open("GET", autocompleteURL + currentInput, true);
  autocompleteXmlRequest.setRequestHeader("x-app-id", anotherApiId);
  autocompleteXmlRequest.setRequestHeader("x-app-key", anotherApiKey);
  autocompleteXmlRequest.send();
}
//document.getElementById("searchBar").addEventListener("input", suggestions);
