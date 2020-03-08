let url = "https://api.edamam.com/search?q=";
let myApiKey = "&app_key=6c85be342a5528cb19c8eed9fc6ab235";
let myApiId = "&app_id=fc2d8135";
let healthRestrictions = "&health=";
var searchArray = []; //array to hold keywords to search by
console.log(healthRestrictions.length);
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
  $("#searchBar").val("");
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
    healthRestrictions = "&health=";
  } else {
    healthRestrictions = "&health=";
    let holdLabel = healthRestrictions.concat(label);
    healthRestrictions = holdLabel;
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

  //length = 8 means no restriction was added
  if (healthRestrictions.length == 8) {
    healthRestrictions = "";
  }
  //sending GET request
  xmlRequest.open("GET", url + q + myApiId + myApiKey + healthRestrictions);
  xmlRequest.send();
}

function getRecipes() {
  let myFood = JSON.parse(sessionStorage.getItem("food"));
  //Getting the first recipe on the list
  let recipe1 = myFood[0].recipe;
  //Getting the ingredients from the recipe
  let ingredients = recipe1.ingredients;
  //Getting the different type of documents that will be modifyied
  let title1 = document.getElementsByName("title1");
  let img1 = document.getElementsByName("img1");
  let url = document.getElementsByName("web1");
  let list = document.getElementById("ingredient_list");
  //Creating an empty string so that it can be filled later on
  let ingredient_list = "";
  //Counter for, for loops
  let i;
  //Getting the recipe name and posting it on the website
  for (i = 0; i < title1.length; ++i) {
    title1[i].innerHTML = recipe1.label;
  }
  //Getting the img
  for (i = 0; i < img1.length; ++i) {
    img1[i].setAttribute("src", recipe1.image);
  }
  //Getting the link to the website
  for (i = 0; i < url.length; ++i) {
    let temp1 = "location.href='" + recipe1.url + "';";
    url[i].setAttribute("onclick", temp1);
  }
  //Getting the ingredients
  for (i = 0; i < ingredients.length; ++i) {
    ingredient_list += "<li>" + ingredients[i].text + "</li>";
  }
  //Posting the ingredients to the website
  list.innerHTML = ingredient_list;

  console.log(myFood);
  console.log(ingredient_list);
  return myFood;
}
const moreFood = getRecipes();
