const searchParams = new URLSearchParams(window.location.search)
const user = searchParams.get('user')

const $searchSubmit = document.querySelector('#search-submit')

$searchSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const searchText = document.querySelector('#search-text').value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(renderJson)
    .then(renderSearchResults)

})

function renderSearchResults(searchResults) {
  document.querySelector('#results').innerHTML = '';
  appendDrinks(mapSearchResults(searchResults));
}

function renderJson(data) {
  return data.json()
}


function mapSearchResults(searchResults) {
  return searchResults.drinks.map(drink => {
    const $li = document.createElement('li');
    $li.classList.add("outer-container");
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
    </div>`;
    $li.addEventListener("click", () => {
      $li.classList.toggle("reverse");
    });
    return $li;
  });
}

function appendDrinks(drinks) {
  const $results = document.querySelector("#results");
  drinks.forEach(drink => {
    $results.append(drink);
  });
}

function getDrinkIngredients(drink) {
  let ingredients = '';
  for (i = 1; i <= 15; i++) {
    if (drink[`strIngredient${i}`]) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      ingredients += `<li>${ingredient} - ${measure}</li>`;
    }
  }
  return ingredients;
}

function randomDrink() {
  document.querySelector('#results').innerHTML = '';
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(renderJson)
    .then(renderSearchResults);
}

