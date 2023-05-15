const addBookButton = document.querySelector('.add-book');
const submitBookButton = document.querySelector('.book-submit');
const cardContainer = document.querySelector('.card-container');
const modal = document.querySelector('dialog');
const bookArray = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.pages = pages;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages 
          ${this.read ? 'has been read' : 'has not been read'}`;
};

function addBook(book) {
  bookArray.push(book);
  displayBooks();
}

function removeBook(book) {
  const index = bookArray.indexOf(book);
  if (index > -1) {
    bookArray.splice(index, 1);
  }
  displayBooks();
}

addBookButton.addEventListener('click', () => {
  modal.showModal();
});

submitBookButton.addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').value;
  const newBook = new Book(title, author, pages, read);
  addBook(newBook);
  modal.close();
});

function createCard(book) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.textContent = book.title;
  title.classList.add('book-title');

  const info = document.createElement('p');
  info.textContent = book.info();
  info.classList.add('book-info');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Remove Book';

  card.appendChild(title);
  card.appendChild(info);
  card.appendChild(deleteButton);
  cardContainer.appendChild(card);

  deleteButton.addEventListener('click', () => {
    removeBook(book);
  });
}

function displayBooks() {
  cardContainer.textContent = '';
  bookArray.forEach(createCard);
}
