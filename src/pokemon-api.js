
const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

// Funktion för att hämta och spara Pokemon-namnen
function fetchAndSavePokemonNames() {
  fetch(pokemonApiUrl)
    .then(response => response.json())
    .then(data => {
      const pokemonNames = data.results.map(pokemon => pokemon.name);
      localStorage.setItem('pokemonNames', JSON.stringify(pokemonNames));
      console.log('Pokemon names saved in local storage:');
    })
    .catch(error => console.error('Error fetching Pokemon data:', error));
}

const pokemonNames = localStorage.getItem('pokemonNames');


//kontrollerar om det finns Pokemon namn i local storage, om  det inte finns hämtas alla Pokemon namn från API och sparas i local storage
if (pokemonNames) {
  console.log('Pokemon names found in local storage:');
} else {
  console.log('No Pokemon names found in local storage.');
    // Anropa funktionen
    fetchAndSavePokemonNames();
}


//när användaren skrivit in ett namn i sökfältet och klickar på sökknappen tas värdet från sökfältet och sparas i searchInput
const searchButton = document.querySelector('#searchBtn');

searchButton.addEventListener('click', function() {

    const searchInput = document.querySelector('#searchInput').value.toLowerCase();
    const pokemonNames = JSON.parse(localStorage.getItem('pokemonNames')) || [];

  //hämtar alla Pokemon namn från local storage och filtrerar ut de som matchar searchInput och sparar i matchingPokemon
    const matchingPokemon = pokemonNames.filter(name => name.includes(searchInput));
  
    if (matchingPokemon.length > 0) {
        // väljer att ha en forEach loop för att kunna hämta alla Pokemon som matchar searchInput
        matchingPokemon.forEach(pokemonName => {
            //för varje Pokemon som matchar searchInput körs getPokemonDetails funktionen
          getPokemonDetails(pokemonName);
        });
      } else {
        console.log('No matching Pokemon found.');
      }
    });


    /*___________________________________________________________________*/



  //här körs getPokemonDetails funktionen som hämtar namn, bild och abilities för varje Pokemon som matchar searchInput
  function getPokemonDetails(pokemonName) {
   
    const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
    fetch(pokemonDetailsUrl)
      .then(response => response.json())
      .then(data => {
        const pokemonDetails = {
          name: data.name,
          image: data.sprites.front_default,
          //sparar abilities i en array då dessa oftast är flera
          abilities: data.abilities.map(ability => ability.ability.name),
        };
  
        console.log('Pokemon Details:', pokemonDetails);
        
      })
      .catch(error => console.error(`Error fetching details for ${pokemonName}:`, error));
  }
  

