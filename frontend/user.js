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
  const $greeting = document.querySelector('#greeting')
  $greeting.textContent = `Welcome back, ${userData.name}!`
  console.log(userData.user_cocktails)
}

function renderSearchResults(searchResults) {
  appendSearch(mapSearchResults(searchResults))
}

function mapSearchResults(searchResults) {
  return searchResults.drinks.map(drink => {
    const $li = document.createElement('li')
    $li.innerHTML = `
    <p>${drink.strDrink}</p>
    <img src="${drink.strDrinkThumb}">
    <form method="POST" action="http://localhost:3001/user_cocktails">
      <input type="hidden" name="user_id" value="">
      <input type="hidden" name="cocktail_id" value="${drink.idDrink}">
      <input type="submit" value="Add Favorite">
    </form>`
    return $li
  })
}

function appendSearch(drinks) {
  const $results = document.querySelector("#results")
  drinks.forEach(drink => {
    $results.append(drink)
  })
}