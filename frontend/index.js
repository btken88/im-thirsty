const searchParams = new URLSearchParams(window.location.search)
const drink = searchParams.get('search')


if (drink) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(renderJson)
    .then(renderSearchResults)
} 

function renderJson(data) {
  return data.json()
}

function renderSearchResults(searchResults) {
  appendDrinks(mapSearchResults(searchResults))
}

function mapSearchResults(searchResults) {
  return searchResults.drinks.map(drink => {
    const $li = document.createElement('li')
    $li.innerHTML = `
    <p>${drink.strDrink}</p>
    <img src="${drink.strDrinkThumb}">`
    return $li
  })
}

function appendDrinks(drinks) {
  const $results = document.querySelector("#results")
  drinks.forEach(drink => {
    $results.append(drink)
  })
}

function randomDrink () {

document.querySelector("#results").innerHTML = ''
fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
.then(renderJson)
.then(renderSearchResults)
}
