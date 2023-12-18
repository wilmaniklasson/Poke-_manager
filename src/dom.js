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
        imageDiv.classList.add('search-imageDiv');

        if (pokemon.image) {
            const image = document.createElement('img');
            image.src = pokemon.image;
            imageDiv.appendChild(image);
            image.classList.add('search-image');
        }

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('search-infoDiv');
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = pokemon.name;

        const addToTeamBtn = document.createElement('button');
        addToTeamBtn.classList.add('add-to-team-btn');
        addToTeamBtn.textContent = 'Add to team';

        addToTeamBtn.addEventListener('click', function() {
            // Lägg till en kopia av den aktuella pokemonen i listan eller reservlistan
            addToTeam(JSON.parse(JSON.stringify(pokemon)));

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

    pokemonList.forEach((pokemon) => {
        const listItem = document.createElement('li');
        listItem.classList.add('selected-champion');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('selected-imageDiv');
        //om det finns bild på pokemonen skapas elementet
        if (pokemon.image) {
            const image = document.createElement('img');
            image.src = pokemon.image;
            imageDiv.appendChild(image);
            image.classList.add('selected-image');
        }

        const realNameHeader = document.createElement('h2');
        realNameHeader.textContent = pokemon.name;

        const nicknameHeader = document.createElement('h2');
        nicknameHeader.classList.add('nickname');

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');

        const nicknameInput = document.createElement('input');
        nicknameInput.classList.add('nickname-input');
        nicknameInput.type = 'text';
        nicknameInput.placeholder = 'Pokémon Nickname:';

        const setNicknameBtn = document.createElement('button');
        setNicknameBtn.classList.add('set-nickname-btn');
        setNicknameBtn.textContent = 'Save';

        setNicknameBtn.addEventListener('click', function () {
            const newNickname = nicknameInput.value;
            if (newNickname) {
                setNickname(pokemon, newNickname);
                nicknameHeader.textContent = `Nickname: ${newNickname}`;
                
            }
        });

        const moveBtn = document.createElement('button');
        moveBtn.classList.add('movebtn');
        moveBtn.textContent = 'Move';
        moveBtn.addEventListener('click', function () {
            move(pokemon);
            
        });

        const moveToReserveBtn = document.createElement('button');
        moveToReserveBtn.classList.add('move-to-reserve-btn');
        moveToReserveBtn.textContent = 'Move to reserve';
        moveToReserveBtn.addEventListener('click', function () {
            moveToReserve(pokemon);
            
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
        inputContainer.appendChild(nicknameInput);
        inputContainer.appendChild(setNicknameBtn);
        infoDiv.appendChild(inputContainer);
        infoDiv.appendChild(moveBtn);
        infoDiv.appendChild(moveToReserveBtn);
        infoDiv.appendChild(removeFromTeamBtn);
        listItem.appendChild(imageDiv);
        listItem.appendChild(infoDiv);

        list.appendChild(listItem);
    });
}

/*_______________________________________________________________*/
// Funktioner för att hantera laget

// Funktion för att ge Pokémon ett smeknamn
function setNickname(pokemon, newNickname) {
    pokemon.nickname = newNickname;
    updateLists();
}

// Funktion för att ta bort Pokémon från laget
function removeFromTeam(pokemon) {
    const index = valdaPokemons.indexOf(pokemon);
    if (index !== -1) {
        valdaPokemons.splice(index, 1);
        updateLists();
        addFromReserveToSelected();
    }
}

/*Funktion för att lägga till Pokemon från reservlistan till valdaPokemons
om valdaPokemons är mindre en tre */
function addFromReserveToSelected() {
    if (valdaPokemons.length < 3 && reservPokemons.length > 0) {
        const pokemonToAdd = reservPokemons.shift(); 
        valdaPokemons.push(pokemonToAdd); 
        updateLists();
    }
}


// Funktion för att flytta Pokémon i laget
function move(pokemon) {
    if (valdaPokemons.length === 3) {
        const index = valdaPokemons.indexOf(pokemon);
        if (index !== -1) {
            valdaPokemons.splice(index, 1);
            valdaPokemons.splice(index - 1, 0, pokemon);
            updateLists();
        }
    }

}

// Funktion för att flytta Pokémon till reservlaget
function moveToReserve(pokemon) {
    const index = valdaPokemons.indexOf(pokemon);
    if (index !== -1) {
        valdaPokemons.splice(index, 1);
        reservPokemons.unshift(pokemon);
        updateLists();
    }
}

/*_______________________________________________________________*/

function updateLists() {
    const valdaPokemonsList = document.getElementById('valdaPokemonsList');
    const reservPokemonsList = document.getElementById('reservPokemonsList');

    // Återställ listorna
    valdaPokemonsList.innerHTML = '';
    reservPokemonsList.innerHTML = '';

    createValdaPokemons('valdaPokemonsList', valdaPokemons);
    createReservPokemons('reservPokemonsList', reservPokemons);

    selectedTeamMembersList.innerHTML = '';
    reservedTeamMembersList.innerHTML = '';
    createSelectedTeamMembers('selectedTeamMembersList', valdaPokemons);
    createSelectedTeamMembers('reservedTeamMembersList', reservPokemons);
}



/*_______________________________________________________________*/
//funktion för att skapa element för reservPokemons = [];

function createReservPokemons(listId, pokemonList) {
    const list = document.getElementById(listId);

    pokemonList.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.classList.add('reserv-champion');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('reserv-imageDiv');
        //om det finns bild på pokemonen skapas elementet
        if (pokemon.image) {
            const image = document.createElement('img');
            image.src = pokemon.image;
            imageDiv.appendChild(image);
            image.classList.add('reserv-image');
        }

        const removeFromReserveBtn = document.createElement('button');
        removeFromReserveBtn.classList.add('remove-from-reserve-btn');
        removeFromReserveBtn.textContent = 'Remove';

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

// Funktion för att ta bort Pokémon från reserv laget
function removeFromReserve(pokemon) {
    const index = reservPokemons.indexOf(pokemon);
    if (index !== -1) {
        reservPokemons.splice(index, 1);
        updateLists();
    }
}
 /*_______________________________________________________________*/

 function createSelectedTeamMembers(listId, pokemonList) {
    const list = document.getElementById(listId);

    pokemonList.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.classList.add('selected-team-member');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('selected-team-imageDiv');
        
        // om det finns bild på pokemonen skapas elementet
        if (pokemon.image) {
            const image = document.createElement('img');
            image.src = pokemon.image;
            imageDiv.appendChild(image);
            image.classList.add('selected-team-image');
        }

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('selected-team-member-infoDiv');

        const nameHeader = document.createElement('h2');
        nameHeader.innerText = pokemon.name;

        // Skapa en h3 för Abilities-header
        const abilitiesHeader = document.createElement('h3');
        abilitiesHeader.innerText = 'Abilities:';

        const abilitiesList = document.createElement('ul');
        pokemon.abilities.forEach(ability => {
            const abilityItem = document.createElement('li');
            abilityItem.innerText = ability;
            abilitiesList.appendChild(abilityItem);
        });

        abilitiesHeader.appendChild(abilitiesList);
        
        if (pokemon.nickname) {
            const nicknameHeader = document.createElement('p');
            nicknameHeader.innerText = `Nickname: ${pokemon.nickname}`;
            infoDiv.appendChild(nicknameHeader);
        }

        infoDiv.appendChild(nameHeader);
        infoDiv.appendChild(abilitiesHeader);
        listItem.appendChild(imageDiv);
        listItem.appendChild(infoDiv);

        list.appendChild(listItem);
    });
}




/*_______________________________________________________________*/
  




export { createSearchPokemonCard };
export { valdaPokemons };
//ändra ordning på reserver och knappar till dessa.

