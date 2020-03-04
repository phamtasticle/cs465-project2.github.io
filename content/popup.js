const entireFoodArray = JSON.parse(sessionStorage.getItem("food"));

const recipeList = entireFoodArray.map(food => {
  return food.recipe;
});
console.log(recipeList);
console.log(recipeList[0].image);

/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&     make card      &&&&&&&&&&&&&&&&*/

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

  /*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&     load images        &&&&&&&&&&&&&&&&*/

  document.getElementById("img-one").src = recipeList[0].image;
  document.getElementById("img-two").src = recipeList[1].image;
  document.getElementById("img-three").src = recipeList[2].image;
  document.getElementById("img-four").src = recipeList[3].image;
  document.getElementById("img-five").src = recipeList[4].image;
  document.getElementById("img-six").src = recipeList[5].image;
  document.getElementById("img-seven").src = recipeList[6].image;
  document.getElementById("img-eight").src = recipeList[7].image;
  document.getElementById("img-nine").src = recipeList[8].image;
  document.getElementById("img-ten").src = recipeList[9].image;
};
