const cardContainer = document.querySelector('.cardcontainer');
const formContainer = document.querySelector('.formcontainer');
const addNewBookBtn = document.querySelector('#addnew');
const addBookBtn = document.querySelector('#addbook');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#readbuttons');
const inputs = document.getElementsByTagName('input');

let myLibrary = [];

// function Book(title, author, pages, read) {
    
//     this.createInfoCard = createInfoCard;
//     this.createReadButton = createReadButton;
// };

class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    createInfoCard() {
        let card = document.createElement('p');
        card.setAttribute('style', 'white-space: pre;');
        card.textContent = `"${this.title}" \r\n`
        card.textContent += `${this.author} \r\n`
        card.textContent += `${this.pages} pages \r\n`
        return card;
    };

    createReadButton(readStatus) {
        if (readStatus === true) {
            let readButton = document.createElement('button');
            readButton.textContent = "Read";
            readButton.classList.add('readButton');
            return readButton;
        } else {
            let readButton = document.createElement('button');
            readButton.textContent = "Not read yet";
            readButton.classList.add('notReadButton');
            return readButton;
        }
    };

    saySomething() {
        console.log("I said something");
    }
}


// function createInfoCard() {
//     let card = document.createElement('p');
//     card.setAttribute('style', 'white-space: pre;');
//     card.textContent = `"${this.title}" \r\n`
//     card.textContent += `${this.author} \r\n`
//     card.textContent += `${this.pages} pages \r\n`
//     return card;
// };

// function createReadButton(readStatus) {
//     if (readStatus === true) {
//         let readButton = document.createElement('button');
//         readButton.textContent = "Read";
//         readButton.classList.add('readButton');
//         return readButton;
//     } else {
//         let readButton = document.createElement('button');
//         readButton.textContent = "Not read yet";
//         readButton.classList.add('notReadButton');
//         return readButton;
//     }
// };

function createDeleteButton(id) {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(`deleteButton`);
    deleteButton.setAttribute('id', `deleteButton${id}`);
    return deleteButton;
}

function displayLibrary() {
    myLibrary.forEach(element => {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        assignBookId(cardDiv, element);
        cardContainer.append(cardDiv);
        cardDiv.append(element.createInfoCard());
        cardDiv.append(element.createReadButton(element.read));
        cardDiv.append(createDeleteButton(myLibrary.indexOf(element)));
        }
    );
};

function checkExistingMatch(title, author) {
    let result;
    myLibrary.every(element => {
        if (element.title === title && element.author === author) {
            result = true;
        };
    });
    return result;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    if (!localStorage.getItem(`${title}`)) {
        addBookToStorage(title, newBook);
    }
};

function addReadButtonToggle() {
    cardContainer.addEventListener('click', event => {
        if (event.target.textContent === "Read" || event.target.textContent === "Not read yet")
        toggleReadStatus(`${event.target.parentNode.id}`);
    })
};

function toggleReadStatus(id) {
    if (myLibrary[id].read === true) {
        removeReadButton(event.target);
        myLibrary[id].read = false;
        localStorage.setItem(`${myLibrary[id].title}`, `${JSON.stringify(myLibrary[id])}`);
        let readButton = myLibrary[id].createReadButton(false);
        let deleteBtn = document.getElementById(`deleteButton${id}`);
        let parentDiv = deleteBtn.parentNode;
        parentDiv.insertBefore(readButton, deleteBtn);
    } else if (myLibrary[id].read === false) {
        removeReadButton(event.target);
        myLibrary[id].read = true;
        localStorage.setItem(`${myLibrary[id].title}`, `${JSON.stringify(myLibrary[id])}`);
        let readButton = myLibrary[id].createReadButton(true);
        let deleteBtn = document.getElementById(`deleteButton${id}`);
        let parentDiv = deleteBtn.parentNode;
        parentDiv.insertBefore(readButton, deleteBtn);
    } else {
        console.log("toggleReadStatus error");
    }
};

function getReadAnswer() {
    if (document.getElementById('read').checked === true) {
        return true;
    } else if (document.getElementById('readno').checked === true) {
        return false;
    } else {
        console.log("getReadAnswer error")
        return "error";
    }
};

function assignBookId(card, book) {
    card.setAttribute('id', `${myLibrary.indexOf(book)}`);
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

addBookBtn.addEventListener('click', function(event) {
    event.preventDefault;

    if (!formTitle.value || !formAuthor.value || !formPages.value || (getReadAnswer() === "error")) {
        alert("Please fill out all fields.");
        return;
    } else {
        if ((checkExistingMatch(formTitle.value, formAuthor.value)) === true) {
            clearForm();
            alert("Book already exists in your library.");
        } else {
            addBookToLibrary(`${formTitle.value}`, `${formAuthor.value}`, `${parseInt(formPages.value)}`, getReadAnswer());
        clearLibraryDisplay();
        displayLibrary();
        formContainer.classList.toggle("hidden");
        }
    }
});

let book = {};

function addBookToStorage(title, bookObject) {
    localStorage.setItem(`${title}`, JSON.stringify(bookObject));
};

addNewBookBtn.addEventListener('click', function(event) {
    formContainer.classList.toggle("hidden");
    clearForm();
});

function deleteCard(id) {
    document.getElementById(id).remove();
};

function deleteBook(id) {
    localStorage.removeItem(`${myLibrary[id].title}`);
    myLibrary.splice(id, 1);
    
};

function clearLibraryDisplay() {
    cardContainer.querySelectorAll('.card').forEach(card => card.remove());
}

function removeReadButton(button) {
    button.parentNode.removeChild(button);
};

function clearForm() {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs.type === "radio") { 
        inputs[i].checked = false
        } else {
        inputs[i].value = '';
        }
    }
};

addReadButtonToggle();
displayLibrary();

function retrieveStorage() {
    for (i = 0; i <= localStorage.length-1; i++) {
        let book = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(book.title);
        book = new Book(book.title, book.author, book.pages, book.read);
        book.createInfoCard();

        // console.log(book[0]);
        
        // book.addBookToLibrary() = createInfoCard;
        // book.createReadButton = createReadButton;
        myLibrary.push(book);
        
    }
    displayLibrary();
};

retrieveStorage();



