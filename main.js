const library = document.querySelector(".library");

function addBook() {
    let book = document.createElement("div");
    book.classList.add("book");
    library.appendChild(book);
}

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const haveReadInput = document.querySelector("#have-read");
const addButton = document.querySelector(".add");

const bookArray = [];

addButton.addEventListener("click", () => {
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, haveReadInput.checked);
    bookArray.push(newBook);
    newBook.index = bookArray.indexOf(newBook);
    displayBooks();
})

class Book {
    constructor(title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }
}

const addBookToTibrary = (bookObject) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    let infoList = document.createElement("ul");
    let titlePara = document.createElement("p");
    titlePara.textContent += "Title: " + bookObject.title;
    let authorPara = document.createElement("p");
    authorPara.textContent += "Author: " + bookObject.author;
    let pagesPara = document.createElement("p");
    pagesPara.textContent += "Pages: " + bookObject.pages;

    let haveReadDiv = document.createElement("div");

    let haveReadLabel = document.createElement("label");
    haveReadLabel.textContent += "Have read:";
    let haveReadButton = document.createElement("input");
    haveReadButton.type = "checkbox";
    haveReadButton.checked = bookObject.haveRead;
    haveReadButton.addEventListener("click", () => {
        bookObject.haveRead = haveReadButton.checked;
    })

    haveReadDiv.appendChild(haveReadLabel);
    haveReadDiv.appendChild(haveReadButton);
    haveReadDiv.classList.add("have-read-div");

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove book";
    removeButton.addEventListener("click", () => {
        bookArray.splice(bookArray.indexOf(bookObject), 1);
        displayBooks();
    })

    infoList.appendChild(titlePara);
    infoList.appendChild(authorPara);
    infoList.appendChild(pagesPara);
    infoList.appendChild(haveReadDiv);
    bookDiv.appendChild(infoList);
    bookDiv.appendChild(removeButton);

    library.appendChild(bookDiv);
}

const displayBooks = () => {
    library.replaceChildren();
    for (let i = 0; i < bookArray.length; i++) {
        addBookToTibrary(bookArray[i]);
    }
}

