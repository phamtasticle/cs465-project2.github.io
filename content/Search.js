let url = "https://api.edamam.com/search?q=";
let myApiKey = "&app_key=6c85be342a5528cb19c8eed9fc6ab235";
let myApiId = "&app_id=fc2d8135";
var searchArray = []; //array to hold keywords to search by
let healthLabelVariable = "&health=";
console.log(healthLabelVariable.length);

function addSearchItem() {
  if (searchArray.length >= 10) {
    window.alert("max items already added");
    return;
  }
  var item = $("#searchBar").val();

  //add button to display on page
  $(".searchItems").append(
    $("<input></input>").attr({
      type: "button",
      class: "btn searchDisplay",
      value: item
    })
  );

  //add value to search array
  searchArray.push(item);
  console.log("last item: " + searchArray[searchArray.length - 1]);
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
  healthLabelVariable = "&health=";
  let holdString = healthLabelVariable.concat(label);
  healthLabelVariable = holdString;
  console.log(healthLabelVariable);

  console.log(label);

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

    window.location.pathname = "/content/page1.html";
    /*
    response.hits.map(dish => {
      makeCard(dish.recipe.label, dish.recipe.ingredients, dish.recipe.image);
    });
    */
  };

  //sending GET request
  if (healthLabelVariable == "&health=") {
    healthLabelVariable = "";
  }
  xmlRequest.open(
    "GET",
    url + q + myApiId + myApiKey + healthRest + healthLabelVariable
  );
  xmlRequest.send();
}
