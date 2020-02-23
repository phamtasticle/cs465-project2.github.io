let url = "https://api.edamam.com/search?q=";
let myApiKey = "&app_key=6c85be342a5528cb19c8eed9fc6ab235";
let myApiId = "&app_id=fc2d8135";
var searchArray = []; //array to hold keywords to search by

function addSearchItem() {
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
  var label = $("#healthLabels option:selected").text();

  $(".searchItems").append(
    $("<input></input>").attr({
      type: "button",
      class: "btn searchDisplay labelDisplay",
      value: label
    })
  );

  return false;
}

function submitSearch() {
  /*
  var len = searchArray.length;
  console.log("searchArray:");
  for (var i = 0; i < len; ++i) {
    console.log(searchArray[i]);
  }
  */
  if (searchArray.length < 1) {
    window.alert("Zero ingredients added");
    return;
  }
  sendGetRequest(searchArray);
}

function sendGetRequest(q) {
  //make request without reloading page
  xmlRequest = new XMLHttpRequest();

  //if request is succesfull this function happen
  xmlRequest.onload = function() {
    let response = JSON.parse(this.responseText);
    console.log(response.hits);
    /*
    response.hits.map(dish => {
      makeCard(dish.recipe.label, dish.recipe.ingredients, dish.recipe.image);
    });
    */
  };

  //sending GET request
  xmlRequest.open("GET", url + q + myApiId + myApiKey);
  xmlRequest.send();
}