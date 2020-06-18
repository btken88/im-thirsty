# I'm Thirty
Your favorite cocktails at your fingertips.

## Table of Contents

- [I'm Thirty](#im-thirty)
  - [Table of Contents](#table-of-contents)
  - [General Info](#general-info)
  - [Inspiration](#inspiration)
  - [Demonstration Video](#demonstration-video)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Example Code](#example-code)
  - [Features](#features)
    - [Current Features](#current-features)
    - [Future Features](#future-features)
  - [Status](#status)
  - [Contact](#contact)
  - [License](#license)

## General Info

I'm Thirsty is a web-based application which allows users to find their favorite cocktail recipes or new, random cocktails to try at home. Users are able to create an account to save their favorite cocktail recipes in our database to find and reference later. Don't want to save a cocktail? No problem - you can still access all cocktails through the main page without creating an account.

## Inspiration

I'm Thirsty was created to help users find and save their favorite cocktail recipes in a single, central location.

## Demonstration Video

## Technologies

The following technologies were used to create this app:

- HTML5
- CSS
- JavaScript
- Ruby v.2.6.1
- Rails v.6.0.3
- Puma v.4.1
- Lite-server

## Setup

To be able to run I'm Thirsty locally on your own computer, you will need to follow the setup steps below.

In the backend folder, first bundle install the gems by running:

```bash
~im-thirsty/backend  bundle install
```

Next, you'll need to re-initialize the database by running:

```bash
~im-thirsty/backend  rails:db{create, migrate}
```

Finally, you'll need to get the frontend and backend servers running. Note that the app is currently configured to run the frontend on <http://localhost:3000> and the backend on <http://localhost:3001>. This is as simple as running the following:

```bash
~im-thirsty/backend  rails s -p 3001
~im-thirsty/fontend  lite-server
```

From here, you can open <http://localhost:3000> in your browser and begin exploring the app.

## Example Code

Code used to construct cocktail flipcards based on a user's search parameters:

```javascript
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
    </div>`
    $li.addEventListener("click", () => {
      $li.classList.toggle("reverse")
    })
    return $li
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
```

## Features

### Current Features

- Create a user account with password
- Search for cocktails by name
- Display a random cocktail
- Store favorite cocktails in your user page
- Add and delete to favorites

### Future Features

- Detailed information on different ingredients
- Find cocktails by ingredient
- Store ingredients you have in a personal liquor cabinet
- Find new cocktails based on the ingredients stored in your liquor cabinet
- Add new cocktails to the database

## Status

The web app is functional, though doesn't currently provide security around user login, which is why we don't collect personally identifying information during user registration.

Future updates and new functionality are later posibilities. Please reach out if you'd be interested in colaborating to expand the app.

## Contact

Created by [Bryce Kennedy](https://www.linkedin.com/in/bryce-kennedy/) and [Carlos Fernandez](jcfernan@live.com).

## License

[Click to view](https://github.com/btken88/im-thirsty/blob/master/license.txt)