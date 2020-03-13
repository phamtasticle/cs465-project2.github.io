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



//This function gets called every time the add button is pressed.
//It will take the value in the search bar and add a button for
//display with the corresponding value.
function addSearchItem() {
  if (searchArray.length >= 10) {
    window.alert("max items already added");
    return;
  }

  //getting the value from the search bar
  var item = $("#searchBar").val();

  //if empty input, just return
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

  //adds a button to display on page
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

        //removing from food array that will be sent to API
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

  //add value to search array for API
  searchArray.push(item);
  console.log(searchArray);
  return false;
}



//this function will add a button for the health
//label that was selected. This function will be called
//every time the select element on the form changes
function addHealthLabel() {
  //getting health label from selected option
  var label = $("#healthLabelSelect option:selected").text();

  document.getElementById("healthContainer").innerHTML = "";

  //if no item is selected, don't add anything
  if (label == "Choose one (optional)") {
    sessionStorage.setItem("healthLabel", "");
    return;
  }

  //adding a button for the health label that 
  //was selected
  $(".healthLabelItems").append(
    $("<input></input>")
      .attr({
        id: "healthbutton",
        type: "button",
        class: "btn searchDisplay labelDisplay health-btn",
        value: label
      })
      .click(function() {
        //onclick, this will be removed 

        //resetting label in sessionStorage
        sessionStorage.setItem("healthLabel", "");

        //removing label from html
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
    //updating health label in SessionStorage
    sessionStorage.setItem("healthLabel", label);
  }

  return false;
}



//this function will add a button for the diet
//label that was selected. This function will be called
//every time the select element on the form changes
function addDietLabel() {
  //getting value of diet label from selected option
  var label = $("#dietLabelSelect option:selected").text();
  document.getElementById("dietContainer").innerHTML = "";

   //if no item is selected, don't add anything
  if (label == "Choose one (optional)") {
    document.getElementById("dietContainer").innerHTML = "";
    sessionStorage.setItem("dietLabel", "");
    return;
  }

  //adding a button for the diet label that 
  //was selected
  $(".dietLabelItems").append(
    $("<input></input>")
      .attr({
        id: "dietbutton",
        type: "button",
        class: "btn searchDisplay labelDisplay diet-btn",
        value: label
      })
      .click(function() {
        //onclick, this will be removed

        //resetting diet label in sessionStorage
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



//this function will get called when the submit
//button is clicked. It will store the array, display
//the loading icon and call the sendGetRequest function
function submitSearch() {
  /*
    var len = searchArray.length;
    console.log("searchArray:")
    for (var i=0; i<len; ++i){
        console.log(searchArray[i]);
    }
    */

  //if no foods were added, don't send the
  //get request
  if (searchArray.length < 1) {
    window.alert("Zero ingredients added");
    return;
  }
  //storing the food array in sessionStorage
  sessionStorage.setItem("searchedFoods", searchArray);

  //displaying the loading icon
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
