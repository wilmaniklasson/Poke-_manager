
import { createSearchPokemonCard } from './dom.js';
import { createEmptySearchModal } from './modal.js';


const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

//klickhändelse som hanterar sökningen
const searchButton = document.querySelector('#searchBtn');
searchButton.addEventListener('click', handleSearch);

// Funktion för att hämta och spara Pokémon-namn i local storage
function fetchAndSavePokemonNames() {
  fetch(pokemonApiUrl)
    .then(response => response.json())
    .then(data => {
      // Extrahera Pokémon-namnen från API-responsen och spara i local storage
      const pokemonNames = data.results.map(pokemon => pokemon.name);
      localStorage.setItem('pokemonNames', JSON.stringify(pokemonNames));
      console.log('Pokemon names saved in local storage:');
    })
    .catch(error => console.error('Error fetching Pokemon data:', error));
}

// Hämta Pokémon-namn från local storage
const pokemonNames = localStorage.getItem('pokemonNames');

// Kontrollera om Pokémon-namn finns i local storage, annars hämta och spara dem
if (pokemonNames) {
  console.log('Pokemon names found in local storage:');
} else {
  console.log('No Pokemon names found in local storage.');
  // Anropa funktionen för att hämta och spara Pokémon-namn
  fetchAndSavePokemonNames();
}



/*_______________________________________________________________*/

let pokemonDetailsArray = [];

// Funktion för sökningen
async function handleSearch() {
    // Hämta söktermen från inputfältet och omvandla till gemener
    const searchInput = document.querySelector('#searchInput').value.toLowerCase();

    // Kontrollera om sökfältet är tomt
    if (searchInput.length === 0) {
        // Visa modalen om sökfältet är tomt
        createEmptySearchModal();
        return;
    }

    // Dela upp söktermen i en array av strängar
    const searchTerms = searchInput.split(' ');

    // Hämta Pokémon-namn från local storage eller använd en tom array om det inte finns några namn
    const pokemonNames = JSON.parse(localStorage.getItem('pokemonNames')) || [];

    // Filtrera Pokémon-namn baserat på söktermerna för att kunna söka på Exempel: "MaN" hittar "Charmander", "Mankey" och "Omanyte".
    const matchingPokemon = [];
    pokemonNames.forEach(name => {
        if (searchTerms.some(term => name.includes(term))) {
            matchingPokemon.push(name);
        }
    });

    // Om matchande Pokémon finns, hämta deras detaljer och skapa dom element
    if (matchingPokemon.length > 0) {
      try {
          // Begränsa till de första 25 matchande Pokémon
          const limitedMatchingPokemon = matchingPokemon.slice(0, 25);
  
          // Väntar in alla pokemonDetails för att samtidigt lägga till dessa i arrayen
          pokemonDetailsArray = await Promise.all(
              limitedMatchingPokemon.map(pokemonName => getPokemonDetails(pokemonName))
          );
            // anroppar funktionen som skapar dom elementen
            createSearchPokemonCard(pokemonDetailsArray);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
        }
    } else {
        console.log('No matching Pokemon found.');
    }
}

/*_______________________________________________________________*/

// Funktion för att hämta detaljer om en Pokémon från API
async function getPokemonDetails(pokemonName) {
  // Skapa URL för att hämta detaljer om en specifik Pokémon
  const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  try {
    const response = await fetch(pokemonDetailsUrl);
    const data = await response.json();

    // skapar objekt med de detaljer som behövs
    const pokemonDetails = {
      name: data.name,
      image: data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default,
      abilities: data.abilities.map(ability => ability.ability.name),
    };

    return pokemonDetails;
  } catch (error) {
    // Hantera eventuella fel vid hämtning av Pokémon-detaljer
    console.error(`Error fetching details for ${pokemonName}:`, error);
    return { error: true, message: 'Error fetching Pokemon details' };
  }
}

// Exportera arrayen inehållande objekt med pokemonDetails
export { pokemonDetailsArray };