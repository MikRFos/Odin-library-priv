/* eslint-disable max-classes-per-file */
const addBookButton = document.querySelector('.add-book');
const submitBookButton = document.querySelector('.book-submit');
const cardContainer = document.querySelector('.card-container');
const modal = document.querySelector('dialog');
const bookArray = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get info() {
    return `${this.title} by ${this.author}, ${this.pages} pages ${this.read ? 'has been read' : 'has not been read'}`;
  }
}

class Library {
  bookList = [];
  
  addBook(book) {
    this.bookList.push(book);
    displayBooks();
  }

  removeBook(book) {
    const index = this.bookList.indexOf(book);
    if (index > -1) {
      this.bookList.splice(index, 1);
    }
    displayBooks();
  }

  get getBooks() {
    return this.bookList;
  }
}

const library = new Library();

addBookButton.addEventListener('click', () => {
  modal.showModal();
});

submitBookButton.addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  console.log(read);
  const newBook = new Book(title, author, pages, read);
  library.addBook(newBook);
  document.querySelector('.book-input').reset();
  modal.close();
});

function createCard(book) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.textContent = book.title;
  title.classList.add('book-title');

  const info = document.createElement('p');
  info.textContent = book.info;
  info.classList.add('book-info');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Remove Book';

  card.appendChild(title);
  card.appendChild(info);
  card.appendChild(deleteButton);
  cardContainer.appendChild(card);

  deleteButton.addEventListener('click', () => {
    library.removeBook(book);
  });
}

function displayBooks() {
  cardContainer.textContent = '';
  library.getBooks.forEach(createCard);
}
