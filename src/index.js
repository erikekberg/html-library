import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCbeSImDGbHqVZZMrNXEcmnj7UeOrfkKuE",
  authDomain: "html-library.firebaseapp.com",
  projectId: "html-library",
  storageBucket: "html-library.appspot.com",
  messagingSenderId: "150122860849",
  appId: "1:150122860849:web:71454aa7643d8f68ff2010",
  measurementId: "G-DF4DED58HE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const displayBooks = () => {
  library.replaceChildren();
  for (let i = 0; i < bookArray.length; i++) {
    addBookToTibrary(bookArray[i]);
  }
};

//this.title = title;
//    this.author = author;
//    this.pages = pages;
//    this.haveRead = haveRead;

async function setBooks(book) {
  await setDoc(doc(db, "books", book.title), {
    title: book.title,
    author: book.author,
    pages: book.pages,
    haveRead: book.haveRead,
  });
}

async function setHaveRead(book, haveRead) {
  await updateDoc(doc(db, "books", book.title), {
    haveRead: haveRead,
  });
}

async function deleteBook(book) {
  await deleteDoc(doc(db, "books", book.title));
}

async function getBooks(db) {
  const booksCol = collection(db, "books");
  const bookSnapshot = await getDocs(booksCol);
  const bookList = bookSnapshot.docs.map((doc) => doc.data());
  return bookList;
}
let bookArray;

window.addEventListener("load", async () => {
  console.log("page loaded");
  bookArray = await getBooks(db);
  displayBooks();
});

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

addButton.addEventListener("click", () => {
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    haveReadInput.checked
  );
  bookArray.push(newBook);
  setBooks(newBook);
  newBook.index = bookArray.indexOf(newBook);
  displayBooks();
});

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
}

const titleError = document.querySelector("#title-error");
titleInput.addEventListener("input", (e) => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("Please enter a title");
    titleInput.reportValidity();
  } else {
    titleInput.setCustomValidity("");
  }
});

const authorError = document.querySelector("#author-error");
authorInput.addEventListener("input", (e) => {
  console.log(authorInput.validity.valueMissing);
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("Enter the name of the author");
    authorInput.reportValidity();
    authorError.textContent = "Enter the name of an author";
    authorError.classList.add("active");
  } else {
    authorInput.setCustomValidity("");
    authorError.textContent = "";
    authorError.classList.remove("active");
  }
});

const pagesError = document.querySelector("#pages-error");
pagesInput.addEventListener("input", (e) => {
  if (pagesInput.validity.valueMissing) {
    pagesInput.setCustomValidity("Please enter a number of pages");
    pagesInput.reportValidity();
  } else if (pagesInput.validity.rangeOverflow) {
    pagesInput.setCustomValidity("Too many pages");
    pagesInput.reportValidity();
    pagesError.textContent = "Way too many pages";
    pagesError.classList.add("active");
  } else {
    pagesInput.setCustomValidity("");
    pagesError.textContent = "";
    pagesError.classList.remove("active");
  }
});

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
    setHaveRead(bookObject, haveReadButton.checked);
    bookObject.haveRead = haveReadButton.checked;
  });

  haveReadDiv.appendChild(haveReadLabel);
  haveReadDiv.appendChild(haveReadButton);
  haveReadDiv.classList.add("have-read-div");

  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove book";
  removeButton.addEventListener("click", () => {
    bookArray.splice(bookArray.indexOf(bookObject), 1);
    deleteBook(bookObject);
    displayBooks();
  });

  infoList.appendChild(titlePara);
  infoList.appendChild(authorPara);
  infoList.appendChild(pagesPara);
  infoList.appendChild(haveReadDiv);
  bookDiv.appendChild(infoList);
  bookDiv.appendChild(removeButton);

  library.appendChild(bookDiv);
};
