let searchBox = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");
let recipeContainer = document.querySelector("#recipe-section");

let msgUser = document.querySelector(".msg-btn");
let recipeCrossBtn = document.querySelector(".recipe-details .recipe-cross-btn");
let recipeTxt = document.querySelector(".recipe-details-txt");
let recipeDetailsDiv = document.querySelector(".recipe-details");

let newRSP = document.querySelector("#recipe-container");
console.log(recipeContainer)


const searchRecipe = async (query)=>{


    msgUser.innerHTML = "Your recipes are below..";
    
    newRSP.innerHTML = "";
    try {
        
        let data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
       
        response.meals.forEach(meal => {
        
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
            
            <img src="${meal.strMealThumb}"/>
            <h2>${meal.strMeal}</h2>
            <h3>${meal.strCategory}</h3>
            <h4>${meal.strArea}</h4>
            `;
            const button = document.createElement('button');
            button.textContent = "view recipe";
            button.classList.add("recipe-btn");
            
            
            newRSP.appendChild(recipeDiv);
            recipeDiv.appendChild(button);
    
            button.addEventListener("click",()=>{
                recipeDetaiPopup(meal);
            })
        });
    } catch (error) {
        msgUser.innerHTML = "Error Please Try again..";
        msgUser.style.color = "red";
    }
}



searchBtn.addEventListener("click",()=>{

    localStorage.clear();

    let food_name = searchBox.value.trim();
    searchRecipe(food_name);

});



const fetchIncrediants = (meal)=>{
    let ingredientList = "";
    for(let i = 1;i<=20;i++){
        const ingredent = meal[`strIngredient${i}`];
        if(ingredent){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredent}</li>`;
        }
        else{
            break;
        }
    }
    return ingredientList;
}




const recipeDetaiPopup = (meal)=>{
    recipeTxt.innerHTML = `
    <h2 class="mealTitle">${meal.strMeal}</h2>
    <h3>Incredients</h3>
    <ul>${fetchIncrediants(meal)}</ul>
    <div>
        <h3>Instructions Below</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsDiv.style.display = "block";

}

recipeCrossBtn.addEventListener("click",()=>{
    recipeDetailsDiv.style.display = "none";
})


// const clearFoodCards = ()=>{
//     recipeDiv.innerHTML = "";
// }