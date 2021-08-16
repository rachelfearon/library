const cardContainer = document.querySelector('.cardcontainer');
const formContainer = document.querySelector('.formcontainer');

let myLibrary = [
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayInfo = displayInfo;
    console.log(this.displayInfo());
};

function displayInfo() {
    let card = document.createElement('p');
    card.setAttribute('style', 'white-space: pre;');
    card.textContent = `"${this.title}" \r\n`
    card.textContent += `${this.author} \r\n`
    card.textContent += `${this.pages} pages \r\n`
    card.textContent += `${((this.read === true ? "read" : "not read yet"))}`
    return card;
    //return (`"${this.title}" by ${this.author} ${this.pages} pages, ${((this.read === true) ? "read" : "not read yet")}`)
}

function addBookToLibrary(title, author, pages, read) {
    //create object from book title, author, pages, read values
    const newBook = new Book(title, author, pages, read);
    //append that object to the myLibrary array
    myLibrary.push(newBook);
    console.table(myLibrary);

};

addBookToLibrary("Homemade", "Yvette van Boven", 500, true);
addBookToLibrary("War for the Oaks", "Emma Bull", 344, true);

myLibrary.forEach(element => {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardContainer.append(cardDiv);
    //let card = document.createElement('p');
    //element.displayInfo();
    cardDiv.append(element.displayInfo());
    }
);



