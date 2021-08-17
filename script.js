const cardContainer = document.querySelector('.cardcontainer');
const formContainer = document.querySelector('.formcontainer');
const addNewBookBtn = document.querySelector('#addnew');
const addBookBtn = document.querySelector('#addbook');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#readbuttons');

let myLibrary = [
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    let readAnswer = false;
    if (read === "true") {
        readAnswer = true
    } else if (read === "false") {
        readAnswer = false
    };
    this.read = readAnswer;
    this.createInfoCard = createInfoCard;
    this.createReadButton = createReadButton;
};

function createInfoCard() {
    let card = document.createElement('p');
    card.setAttribute('style', 'white-space: pre;');
    card.textContent = `"${this.title}" \r\n`
    card.textContent += `${this.author} \r\n`
    card.textContent += `${this.pages} pages \r\n`
    card.textContent += `${((this.read === true ? "read" : "not read yet"))}`
    return card;
};

function createReadButton(readStatus) {
    if (readStatus === true) {
        let readButton = document.createElement('button');
        readButton.textContent = "Read";
        readButton.classList.add('readButton');
        return readButton;
    } else {
        let readButton = document.createElement('button');
        readButton.textContent = "Not read yet";
        readButton.classList.add('readButton');
        return readButton;
    }
};

function createDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('deleteButton');
    return deleteButton;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

function addReadButtonToggle() {
    cardContainer.addEventListener('click', event => {
        if (event.target.textContent === "Read" || event.target.textContent === "Not read yet")
        toggleReadStatus(`${event.target.parentNode.id}`);
    })
};

cardContainer.addEventListener('click', event => {
    let id = event.target.parentNode.id;
    if (event.target.textContent === "Delete") {
        deleteCard(id);
        deleteBook(id);
        clearLibraryDisplay();
        displayLibrary();
    }
});

function deleteCard(id) {
    document.getElementById(id).remove();
};

function deleteBook(id) {
    myLibrary.splice(id, 1);
};


function toggleReadStatus(id) {
    if (myLibrary[id].read === true) {
        removeReadButton(event.target);
        myLibrary[id].read = false;
        document.getElementById(id).append(createReadButton(false));
    } else if (myLibrary[id].read === false) {
        removeReadButton(event.target);
        myLibrary[id].read = true;
        document.getElementById(id).append(createReadButton(true));
    } else {
        console.log("toggleReadStatus error");
    }
};

function assignBookId(card, book) {
    card.setAttribute('id', `${myLibrary.indexOf(book)}`);
};

addBookBtn.addEventListener('click', function(event) {
    event.preventDefault;

    if (!formTitle.value || !formAuthor.value || !formPages.value ) {
        alert("Please fill out all fields.");
        return;
    } else {
        addBookToLibrary(`${formTitle.value}`, `${formAuthor.value}`, `${formPages.value}`, getReadAnswer());
    clearLibraryDisplay();
    displayLibrary();
    formContainer.classList.toggle("hidden");
    }
});

function getReadAnswer() {
    if (document.getElementById('read').checked === true) {
        return true;
    } else if (document.getElementById('readno').checked === true) {
        return false;
    } else {
        console.log("getReadAnswer error")
    }
};

addNewBookBtn.addEventListener('click', function(event) {
    formContainer.classList.toggle("hidden");
});



function displayLibrary() {
    myLibrary.forEach(element => {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        assignBookId(cardDiv, element);
        cardContainer.append(cardDiv);
        cardDiv.append(element.createInfoCard());
        cardDiv.append(element.createReadButton(element.read));
        cardDiv.append(createDeleteButton());
        //cardDiv.append(element.createReadButton(`${this.read}`));
        }
    );
};

function clearLibraryDisplay() {
    cardContainer.querySelectorAll('.card').forEach(card => card.remove());
}

function removeReadButton(button) {
    button.parentNode.removeChild(button);
};
addBookToLibrary("Homemade", "Yvette van Boven", 500, true);
addBookToLibrary("War for the Oaks", "Emma Bull", 344, true);
displayLibrary();
addReadButtonToggle();



