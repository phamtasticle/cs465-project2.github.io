let url = "https://api.edamam.com/search?q=";
let myApiKey = "&app_key=6c85be342a5528cb19c8eed9fc6ab235";
let myApiId = "&app_id=fc2d8135";
let healthRestrictions = "&health=";
var searchArray = []; //array to hold keywords to search by

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

  $(".healthLabelItems").append(
    $("<input></input>").attr({
      id: "healthbutton",
      type: "button",
      class: "btn searchDisplay labelDisplay",
      value: label
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

    //window.location.pathname = "cs465-project2.github.io/content/page1.html";
    window.location.pathname = "content/page1.html";
    
  };

  //length = 8 means no restriction was added
  if (healthRestrictions.length < 9) {
    healthRestrictions = "";
  }
  //sending GET request
  xmlRequest.open("GET", url + q + myApiId + myApiKey + healthRestrictions);
  xmlRequest.send();
}

function getRecipes() {
  let myFood = JSON.parse(sessionStorage.getItem("food"));
  //Getting the first recipe on the list
  
  return myFood;
}
const moreFood = getRecipes();
