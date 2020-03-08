const entireFoodArray = JSON.parse(sessionStorage.getItem("food"));

const recipeList = entireFoodArray.map(food => {
  return food.recipe;
});

const proteinFatCarbs = recipeList.map(PFC => {
  let serves = PFC.yield;
  let data =
    "Calories: " +
    Math.floor(PFC.calories / serves) +
    "<br/>" +
    "Protein: " +
    Math.floor(PFC.totalNutrients.PROCNT.quantity / serves) +
    "g" +
    "<br/>" +
    "Fat: " +
    Math.floor(PFC.totalNutrients.FAT.quantity / serves) +
    "g" +
    "<br/>" +
    "Carbs: " +
    Math.floor(PFC.totalNutrients.CHOCDF.quantity / serves) +
    "g";
  return data;
});

console.log(recipeList);

/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&     make cards on window load     &&&&&&&&&&&&&&&&*/

window.onload = function() {
  /*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&     load names        &&&&&&&&&&&&&&&&*/

  document.getElementById("name-one").innerHTML = recipeList[0].label;
  document.getElementById("name-two").innerHTML = recipeList[1].label;
  document.getElementById("name-three").innerHTML = recipeList[2].label;
  document.getElementById("name-four").innerHTML = recipeList[3].label;
  document.getElementById("name-five").innerHTML = recipeList[4].label;
  document.getElementById("name-six").innerHTML = recipeList[5].label;
  document.getElementById("name-seven").innerHTML = recipeList[6].label;
  document.getElementById("name-eight").innerHTML = recipeList[7].label;
  document.getElementById("name-nine").innerHTML = recipeList[8].label;
  document.getElementById("name-ten").innerHTML = recipeList[9].label;

  document.getElementById("title1").innerHTML = recipeList[0].label;
  document.getElementById("title2").innerHTML = recipeList[1].label;
  document.getElementById("title3").innerHTML = recipeList[2].label;
  document.getElementById("title4").innerHTML = recipeList[3].label;
  document.getElementById("title5").innerHTML = recipeList[4].label;
  document.getElementById("title6").innerHTML = recipeList[5].label;
  document.getElementById("title7").innerHTML = recipeList[6].label;
  document.getElementById("title8").innerHTML = recipeList[7].label;
  document.getElementById("title9").innerHTML = recipeList[8].label;
  document.getElementById("title10").innerHTML = recipeList[9].label;
  

  /*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&     load images        &&&&&&&&&&&&&&&&*/

  document.getElementById("img-one").src   = recipeList[0].image;
  document.getElementById("img-two").src   = recipeList[1].image;
  document.getElementById("img-three").src = recipeList[2].image;
  document.getElementById("img-four").src  = recipeList[3].image;
  document.getElementById("img-five").src  = recipeList[4].image;
  document.getElementById("img-six").src   = recipeList[5].image;
  document.getElementById("img-seven").src = recipeList[6].image;
  document.getElementById("img-eight").src = recipeList[7].image;
  document.getElementById("img-nine").src  = recipeList[8].image;
  document.getElementById("img-ten").src   = recipeList[9].image;

  document.getElementById("modal-img-1").src  = recipeList[0].image;
  document.getElementById("modal-img-2").src  = recipeList[1].image;
  document.getElementById("modal-img-3").src  = recipeList[2].image;
  document.getElementById("modal-img-4").src  = recipeList[3].image;
  document.getElementById("modal-img-5").src  = recipeList[4].image;
  document.getElementById("modal-img-6").src  = recipeList[5].image;
  document.getElementById("modal-img-7").src  = recipeList[6].image;
  document.getElementById("modal-img-8").src  = recipeList[7].image;
  document.getElementById("modal-img-9").src  = recipeList[8].image;
  document.getElementById("modal-img-10").src = recipeList[9].image;

  /*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&     load nutritional info        &&&&&&&&&&&&&&&&*/

  document.getElementById("nutrition-one").innerHTML    = proteinFatCarbs[0];
  document.getElementById("nutrition-two").innerHTML    = proteinFatCarbs[1];
  document.getElementById("nutrition-three").innerHTML  = proteinFatCarbs[2];
  document.getElementById("nutrition-four").innerHTML   = proteinFatCarbs[3];
  document.getElementById("nutrition-five").innerHTML   = proteinFatCarbs[4];
  document.getElementById("nutrition-six").innerHTML    = proteinFatCarbs[5];
  document.getElementById("nutrition-seven").innerHTML  = proteinFatCarbs[6];
  document.getElementById("nutrition-eight").innerHTML  = proteinFatCarbs[7];
  document.getElementById("nutrition-nine").innerHTML   = proteinFatCarbs[8];
  document.getElementById("nutrition-ten").innerHTML    = proteinFatCarbs[9];


  /*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  &&&&&&&&&&&&    display searched items &&&&&&&&&&&&&&&&&&*/

    /*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&     Loads Ingredients        &&&&&&&&&&&&&&&&*/
  let recipe = recipeList[0].ingredients;
  let empty_list = ""
  
  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list1").innerHTML = empty_list;

  recipe = recipeList[1].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list2").innerHTML = empty_list;

  recipe = recipeList[2].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list3").innerHTML = empty_list;

  recipe = recipeList[3].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list4").innerHTML = empty_list;

  recipe = recipeList[4].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list5").innerHTML = empty_list;

  recipe = recipeList[5].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list6").innerHTML = empty_list;

  recipe = recipeList[6].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list7").innerHTML = empty_list;

  recipe = recipeList[7].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list8").innerHTML = empty_list;

  recipe = recipeList[8].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list9").innerHTML = empty_list;

  recipe = recipeList[9].ingredients;
  empty_list = ""

  for (let i = 0; i < recipe.length; ++i){
    empty_list += "<li>" + recipe[i].text + "</li>";
  }
  document.getElementById("ingredient_list10").innerHTML = empty_list;

    /*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&     Loads Links       &&&&&&&&&&&&&&&&*/
  
  let temp = "location.href='" + recipeList[0].url +"';" ;
  document.getElementById("web1").setAttribute('onclick',temp);
  
  temp = "location.href='" + recipeList[1].url +"';" ;
  document.getElementById("web2").setAttribute('onclick',temp);

  temp = "location.href='" + recipeList[2].url +"';" ;
  document.getElementById("web3").setAttribute('onclick',temp);

  temp = "location.href='" + recipeList[3].url +"';" ;
  document.getElementById("web4").setAttribute('onclick',temp);

  temp = "location.href='" + recipeList[4].url +"';" ;
  document.getElementById("web5").setAttribute('onclick',temp);

  temp = "location.href='" + recipeList[5].url +"';" ;
  document.getElementById("web6").setAttribute('onclick',temp);

  temp = "location.href='" + recipeList[6].url +"';" ;
  document.getElementById("web7").setAttribute('onclick',temp);

  temp = "location.href='" + recipeList[7].url +"';" ;
  document.getElementById("web8").setAttribute('onclick',temp);

  temp = "location.href='" + recipeList[8].url +"';" ;
  document.getElementById("web9").setAttribute('onclick',temp);

  temp = "location.href='" + recipeList[9].url +"';" ;
  document.getElementById("web10").setAttribute('onclick',temp);
  /*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  &&&&&&&&&&&&    display searched items &&&&&&&&&&&&&&&&&&*/
  

  const foodString = sessionStorage.getItem("searchedFoods");
  const foodArray = foodString.split(",");
  const len = foodArray.length;

  for (var i = 0; i < len; ++i) {
    $(".search_area").append(
      $("<input></input>")
        .attr({
          type: "button",
          class: "btn",
          value: foodArray[i]
        })
        .click(function() {
          //onclick, food will be removed
          var val = $(this).val();

          //removing from food array
          for (var j = 0; j < len; ++j) {
            if (foodArray[j] === val) {
              foodArray.splice(j, 1);
            }
          }
          //updating food array in sessionStorage
          sessionStorage.setItem("searchedFoods", foodArray);

          //removing from html
          $(this).remove();

          //reload results on results page once removed

          document.getElementById("resultsLoadingContainer").style.display =
            "block";
          sendGetRequest(foodArray);
        })
    );
  }


  //displaying health label
  const healthLabel = sessionStorage.getItem("healthLabel");

  if (healthLabel != ""){
    $(".label_area").append(
      $("<input></input>").attr({
        type: "button",
        class: "btn",
        value: healthLabel
      })
    );
  }


};
function modifySearchItem() {
  const currentFood = sessionStorage.getItem("searchedFoods");
  const foodArray = currentFood.split(",");
  const len = foodArray.length;
  if (len >= 10) {
    window.alert("Max items limit of 10 already reached");
    return;
  }
  var item = $("#resultSearchBar").val();
  //empty input, just return
  if (item.length < 1) {
    return;
  }
  let k = 0;
  while (k < foodArray.length) {
    if (foodArray[k] == item) {
      window.alert(item + " already added");
      document.getElementById("resultSearchBar").value = "";
      return;
    }
    ++k;
  }

  document.getElementById("resultSearchBar").value = "";
  foodArray.push(item);
  sessionStorage.setItem("searchedFoods", foodArray);
  document.getElementById("resultsLoadingContainer").style.display = "block";
  sendGetRequest(foodArray);
}
