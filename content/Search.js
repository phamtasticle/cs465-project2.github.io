let url = "https://api.edamam.com/search?q=";
let myApiKey = "&app_key=6c85be342a5528cb19c8eed9fc6ab235";
let myApiId = "&app_id=fc2d8135";
var searchArray = []; //array to hold keywords to search by

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
  
  //clear search bar
  $("#searchBar").val('');
  return false;
}

function addHealthLabel() {
  var label = $("#healthLabelSelect option:selected").text();

  $(".healthLabelItems").append(
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
    console.log("searchArray:")
    for (var i=0; i<len; ++i){
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
  xmlRequest.open("GET", url + q + myApiId + myApiKey);
  xmlRequest.send();
}

function getRecipes() {
  let myFood = JSON.parse(sessionStorage.getItem("food"));
  let recipe1= myFood[0].recipe;
  let title1 = document.getElementsByName("title1");
  let img1 = document.getElementsByName("img1");
  let url = document.getElementsByName("web1");

  let i;
  for( i=0; i < title1.length; ++i){
    title1[i].innerHTML = recipe1.label;
  }
  for( i=0; i < img1.length; ++i){
    img1[i].setAttribute('src',recipe1.image);
  }
  for( i=0; i < url.length; ++i){
    let temp1 = "location.href='" + recipe1.url +"';";
    url[i].setAttribute('onclick',temp1);
  }
  console.log(myFood);
  console.log(recipe1.image);
  return myFood;
}
const moreFood = getRecipes();

