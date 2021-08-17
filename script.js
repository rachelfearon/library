const cardContainer = document.querySelector('.cardcontainer');
const formContainer = document.querySelector('.formcontainer');
const addNewBookBtn = document.querySelector('#addnew');
const addBookBtn = document.querySelector('#addbook');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read');

let myLibrary = [
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

addBookToLibrary("Homemade", "Yvette van Boven", 500, true);
addBookToLibrary("War for the Oaks", "Emma Bull", 344, true);

function addReadButtonToggle() {
    cardContainer.addEventListener('click', event => {
        toggleReadStatus(`${event.target.parentNode.id}`);
    })
};

function toggleReadStatus(id) {
    if ((myLibrary[id].read === true)) {
        //remove button?
        removeReadButton(event.target);
        //switch to false
        myLibrary[id].read = false;
        //createReadButton(false);
        document.getElementById(id).append(createReadButton(false));
        //cardDiv.append(element.createReadButton(false));
    } else if (myLibrary[id].read === false) {
        removeReadButton(event.target);
        myLibrary[id].read = true;
        document.getElementById(id).append(createReadButton(true));
    } else {
        console.log("toggleReadStatus error");
    }
};

//use array index # as book ID and assign it to the card DOM element
function assignBookId(card, book) {
    card.setAttribute('id', `${myLibrary.indexOf(book)}`);
};

addBookBtn.addEventListener('click', function(event) {
    event.preventDefault;

    if (!formTitle.value || !formAuthor.value || !formPages.value || !formRead.value) {
        alert("Please fill out all fields.");
        return;
    } else {
        addBookToLibrary(`${formTitle.value}`, `${formAuthor.value}`, `${formPages.value}`, `${formRead.value}`);
    clearLibraryDisplay();
    displayLibrary();
    formContainer.classList.toggle("hidden");
    }

    
});

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

displayLibrary();
addReadButtonToggle();



