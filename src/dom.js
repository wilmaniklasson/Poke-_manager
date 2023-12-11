function createSearchPokemonCard(pokemonDetailsArray) {
    const searchResults = document.querySelector('.search-results');

    // Töm innehållet i behållaren innan du lägger till nya element
    searchResults.innerHTML = '';

    // Skapa en ul-lista för att hålla Pokémon-korten
    const resultList = document.createElement('ul');
    resultList.classList.add('search-results-list');

    // Loopa igenom varje Pokemon i arrayen
    pokemonDetailsArray.forEach(pokemon => {
        const searchChampion = document.createElement('li');
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

            // Uppdatera listorna efter att ha lagt till i team
            updateLists();
        });

        infoDiv.appendChild(nameHeader);
        infoDiv.appendChild(addToTeamBtn);

        searchChampion.appendChild(imageDiv);
        searchChampion.appendChild(infoDiv);

        resultList.appendChild(searchChampion);
    });

    // Lägg till ul-listan i sökresultatbehållaren
    searchResults.appendChild(resultList);
}


// arrayer för att lagra valda och reservpokemons
const valdaPokemons = [];
const reservPokemons = [];

function addToTeam(pokemon) {
    if (valdaPokemons.length < 3) {
        valdaPokemons.push(pokemon);
        createPokemonListElement('valdaPokemonsList', valdaPokemons);
    } else {
        reservPokemons.push(pokemon);
        createPokemonListElement('reservPokemonsList', reservPokemons);
    }
}

function createPokemonListElement(listId, pokemonList) {
    const list = document.getElementById(listId);
    
    pokemonList.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('search-champion'); 

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('search-champion-img'); 

        if (pokemon.image) {
            const image = document.createElement('img');
            image.src = pokemon.image;
            imageDiv.appendChild(image);
        }


        const removFromTeamBtn = document.createElement('button');
        removFromTeamBtn.classList.add('add-to-team-btn');
        removFromTeamBtn.textContent = 'remove from team';

        removFromTeamBtn.addEventListener('click', function() {
            
            

            // Uppdatera listorna efter att ha lagt till i team
            updateLists();
        });

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('infoDiv'); 
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = pokemon.name;

        infoDiv.appendChild(nameHeader);
        infoDiv.appendChild(removFromTeamBtn);
        pokemonCard.appendChild(imageDiv);
        pokemonCard.appendChild(infoDiv);

        list.appendChild(pokemonCard);
    });
}

function updateLists() {
    const valdaPokemonsList = document.getElementById('valdaPokemonsList');
    const reservPokemonsList = document.getElementById('reservPokemonsList');

    // Återställ listorna
    valdaPokemonsList.innerHTML = '';
    reservPokemonsList.innerHTML = '';


    createPokemonListElement('valdaPokemonsList', valdaPokemons);


    createPokemonListElement('reservPokemonsList', reservPokemons);
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
