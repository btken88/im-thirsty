const searchParams = new URLSearchParams(window.location.search)
const drink = searchParams.get('search')
const id = searchParams.get('id')

const $searchId = document.createElement('input')
$searchId.type = "hidden";
$searchId.name = "id";
$searchId.value = `${id}`;
document.querySelector("form").append($searchId)

fetch(`http://localhost:3001/users/${id}`)
  .then(renderJson)
  .then(renderPage)

if (drink) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(renderJson)
    .then(renderSearchResults)
}

function renderJson(data) {
  return data.json()
}

function renderPage(userData) {
  updateGreeting(userData)
  renderFavorites(userData)
}

function renderSearchResults(searchResults) {
  appendSearch(mapSearchResults(searchResults))
}

function mapSearchResults(searchResults) {
  return searchResults.drinks.map(drink => {
    const $li = document.createElement('li')
    $li.classList.add("outer-container")
    $li.innerHTML = `
    <div class="inner-container">
      <div class="card-front">
        <p class="drink-name">${drink.strDrink}</p>
        <img src="${drink.strDrinkThumb}">
        <p>Click to make it at home</p>
      </div>
      <div class="card-back">
        <p>${drink.strDrink}</p>
        <ul class="ingredients">${getDrinkIngredients(drink)}</ul>
        <p>${drink.strInstructions}</p>
      </div>
    </div>
    <form method="POST" action="http://localhost:3001/user_cocktails">
    <input type="hidden" name="user_id" value="${id}">
    <input type="hidden" name="cocktail_id" value="${drink.idDrink}">
    <input class="favorite-button" type="submit" value="Add Favorite">
    </form>`
    $li.addEventListener("click", () => {
      $li.classList.toggle("reverse")
    })
    return $li
  })
}

function appendSearch(drinks) {
  const $results = document.querySelector("#results")
  drinks.forEach(drink => {
    $results.append(drink)
  })
}

function updateGreeting(userData) {
  const $greeting = document.querySelector('#greeting')
  $greeting.textContent = `Welcome back, ${userData.name}!`
}

function renderFavorites(userData) {
  userData.user_cocktails.map(cocktail => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.cocktail_id}`)
      .then(renderJson)
      .then(result => createFavorite(result, cocktail.id))
  })
}

function getDrinkIngredients(drink) {
  let ingredients = ''
  for (i = 1; i <= 15; i++) {
    if (drink[`strIngredient${i}`]) {
      const ingredient = drink[`strIngredient${i}`]
      const measure = drink[`strMeasure${i}`]
      ingredients += `<li>${ingredient} - ${measure}</li>`
    }
  }
  return ingredients
}

function createFavorite(drink, cocktailId) {
  const drinkInfo = drink.drinks[0]
  const $li = document.createElement('li')
  $li.classList.add("outer-container")
  $li.innerHTML = `
  <div class="inner-container">
    <div class="card-front">
      <p class="drink-name">${drinkInfo.strDrink}</p>
      <img src="${drinkInfo.strDrinkThumb}">
      <p>Click to make it at home</p>
    </div>
    <div class="card-back">
      <p>${drinkInfo.strDrink}</p>
      <ul class="ingredients">${getDrinkIngredients(drinkInfo)}</ul>
      <p>${drinkInfo.strInstructions}</p>
    </div>
    </div>
    <form method = "POST" action = "http://localhost:3001/user_cocktails/${cocktailId}">
      <input type="hidden" name="_method" value="DELETE">
        <input class="favorite-button" type="submit" value="Remove Favorite">
  </form>`
  $li.addEventListener("click", () => {
    $li.classList.toggle("reverse")
  })
  document.querySelector('#favorites').append($li)
}


function randomDrink() {
  document.querySelector('#results').innerHTML = ''
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(renderJson)
    .then(renderSearchResults)
}