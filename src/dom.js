

function createSearchPokemonCard(pokemonDetailsArray) {
    const searchResults = document.querySelector('.search-results');
    console.log(pokemonDetailsArray);
    
    // Töm innehållet i behållaren innan du lägger till nya element
 searchResults.innerHTML = '';

    // Loopa igenom varje Pokemon i arrayen
    pokemonDetailsArray.forEach(pokemon => {
 
        const searchChampion = document.createElement('div');
        searchChampion.classList.add('search-champion');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('search-champion-img');
      
        if (pokemon.image) {
            const image = document.createElement('img');
            image.src = pokemon.image;
            imageDiv.appendChild(image);
        }

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('infoDiv');
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = pokemon.name;

       

        const addToTeamBtn = document.createElement('button');
        addToTeamBtn.classList.add('add-to-team-btn');
        addToTeamBtn.textContent = 'Add to team';

        
        addToTeamBtn.addEventListener('click', function() {
            // Lägg till den aktuella pokemonen i listan eller reservlistan
            addToTeam(pokemon);
        });

        infoDiv.appendChild(nameHeader);
        infoDiv.appendChild(addToTeamBtn);

        searchChampion.appendChild(imageDiv);
        searchChampion.appendChild(infoDiv);

     searchResults.appendChild(searchChampion);
    });
}

// arrayer för att lagra valda och reservpokemons
const valdaPokemons = [];
const reservPokemons = [];


function addToTeam(pokemon) {
    if (valdaPokemons.length < 3) {
        valdaPokemons.push(pokemon);
    } else {
        reservPokemons.push(pokemon);
    }

    console.log('Valda pokemons:', valdaPokemons);
    console.log('Reservpokemons:', reservPokemons);
}






// Funktion för att skapa och visa en modal när sökfältet är tomt
function createEmptySearchModal() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const message = document.createElement('p');
    message.textContent = 'Please enter a search term.';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    });

    modal.appendChild(message);
    modal.appendChild(closeButton);

    modalContainer.appendChild(modal);
    
    document.body.appendChild(modalContainer);
}

export { createSearchPokemonCard, createEmptySearchModal };
