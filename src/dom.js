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


    searchResults.appendChild(resultList);
}
/*_______________________________________________________________*/


// arrayer för att lagra valda och reservpokemons
const valdaPokemons = [];
const reservPokemons = [];

function addToTeam(pokemon) {
    if (valdaPokemons.length < 3) {
        valdaPokemons.push(pokemon);
        createValdaPokemons('valdaPokemonsList', valdaPokemons);
    } else {
        reservPokemons.push(pokemon);
        createReservPokemons('reservPokemonsList', reservPokemons);
    }
}

/*_______________________________________________________________*/
// Funktion för att skapa element för valdaPokemons = [];

function createValdaPokemons(listId, pokemonList) {
    const list = document.getElementById(listId);

    pokemonList.forEach((pokemon, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('selected-champion');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('selected-champion-img');

        if (pokemon.image) {
            const image = document.createElement('img');
            image.src = pokemon.image;
            imageDiv.appendChild(image);
        }

        const realNameHeader = document.createElement('h2');
        realNameHeader.classList.add('real-name');
        realNameHeader.textContent = pokemon.name;

        const nicknameHeader = document.createElement('h2');
        nicknameHeader.classList.add('nickname');

        const nicknameInput = document.createElement('input');
        nicknameInput.type = 'text';
        nicknameInput.placeholder = 'Enter Nickname';

        const setNicknameBtn = document.createElement('button');
        setNicknameBtn.classList.add('set-nickname-btn');
        setNicknameBtn.textContent = 'Set Nickname';

        setNicknameBtn.addEventListener('click', function () {
            const newNickname = nicknameInput.value;
            if (newNickname) {
                setNickname(pokemon, newNickname);
                nicknameHeader.textContent = `Nickname: ${newNickname}`;
            }
        });

        const moveUpBtn = document.createElement('button');
        moveUpBtn.classList.add('move-up-btn');
        moveUpBtn.textContent = 'Move Up';
        moveUpBtn.addEventListener('click', function () {
            movePokemon(pokemon, index, index - 1);
        });

        const moveDownBtn = document.createElement('button');
        moveDownBtn.classList.add('move-down-btn');
        moveDownBtn.textContent = 'Move Down';
        moveDownBtn.addEventListener('click', function () {
            movePokemon(pokemon, index, index + 1);
        });

        const removeFromTeamBtn = document.createElement('button');
        removeFromTeamBtn.classList.add('remove-from-team-btn');
        removeFromTeamBtn.textContent = 'Remove';

        removeFromTeamBtn.addEventListener('click', function () {
            removeFromTeam(pokemon, 'team');
            listItem.remove();
        });

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('infoDiv');

        infoDiv.appendChild(realNameHeader);
        infoDiv.appendChild(nicknameHeader);
        infoDiv.appendChild(nicknameInput);
        infoDiv.appendChild(setNicknameBtn);
        infoDiv.appendChild(moveUpBtn);
        infoDiv.appendChild(moveDownBtn);
        infoDiv.appendChild(removeFromTeamBtn);

        listItem.appendChild(imageDiv);
        listItem.appendChild(infoDiv);

        list.appendChild(listItem);
    });
}
function setNickname(pokemon, nickname) {
    console.log(`Setting nickname "${nickname}" for Pokemon "${pokemon.name}"`);
}

/*_______________________________________________________________*/
//funktion för att skapa element för reservPokemons = [];

function createReservPokemons(listId, pokemonList) {
    const list = document.getElementById(listId);

    pokemonList.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.classList.add('search-champion');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('search-champion-img');

        if (pokemon.image) {
            const image = document.createElement('img');
            image.src = pokemon.image;
            imageDiv.appendChild(image);
        }

        const removeFromReserveBtn = document.createElement('button');
        removeFromReserveBtn.classList.add('remove-from-reserve-btn');
        removeFromReserveBtn.textContent = 'Remove from reserve';

        removeFromReserveBtn.addEventListener('click', function () {
            removeFromReserve(pokemon);
        });

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('infoDiv');
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = pokemon.name;

        infoDiv.appendChild(nameHeader);
        infoDiv.appendChild(removeFromReserveBtn);
        listItem.appendChild(imageDiv);
        listItem.appendChild(infoDiv);

        list.appendChild(listItem);
    });
}

 /*_______________________________________________________________*/

function updateLists() {
    const valdaPokemonsList = document.getElementById('valdaPokemonsList');
    const reservPokemonsList = document.getElementById('reservPokemonsList');

    // Återställ listorna
    valdaPokemonsList.innerHTML = '';
    reservPokemonsList.innerHTML = '';


    createValdaPokemons('valdaPokemonsList', valdaPokemons);


   createValdaPokemons('reservPokemonsList', reservPokemons);
}


/*_______________________________________________________________*/

  
/*_______________________________________________________________*/

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
//ändra ordning på reserver och knappar till dessa.

