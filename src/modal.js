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

export { createEmptySearchModal };


