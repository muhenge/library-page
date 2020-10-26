import { bookLibrary, getElement, validated, Book, readStatus } from "./common.js";

export const formContainer = document.querySelector('.form-container');

const root = getElement('root');
const error = getElement('error');

const addBookToRootNode = (i, book) => {
  const bookCard = document.createElement('div');
  const bTitle = document.createElement('h2');
  const bAuthor = document.createElement('p');
  const bNop = document.createElement('p');
  const bDesc = document.createElement('p');
  const deleteBtn = document.createElement('button');
  const statusBtn = document.createElement('button');
  statusBtn.setAttribute('id', 'statusBtn');
  statusBtn.innerText = 'Read';
  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('id', 'deleteBtn');
  deleteBtn.setAttribute('data', i);
  deleteBtn.addEventListener('click', deleteBookFromLibrary);
  statusBtn.addEventListener('click', readStatus, false);
  statusBtn.setAttribute('id', 'statusBtn');
  statusBtn.setAttribute('data', i);
  statusBtn.innerText = 'Read';
  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('id', 'deleteBtn');
  deleteBtn.setAttribute('data', i);
  deleteBtn.addEventListener('click', deleteBookFromLibrary);
  statusBtn.addEventListener('click', readStatus);
  bTitle.innerText = book.title;
  bAuthor.innerText = book.author;
  bNop.innerText = book.nop;
  bDesc.innerText = book.description;
  bookCard.appendChild(bTitle);
  bookCard.appendChild(bAuthor);
  bookCard.appendChild(bNop);
  bookCard.appendChild(bDesc);
  bookCard.appendChild(deleteBtn);
  bookCard.appendChild(statusBtn);
  root.prepend(bookCard);
};

const deleteBookFromLibrary = (event) => {
  bookLibrary.splice(event.target.attributes[1].value, 1);

  root.removeChild(event.target.parentElement);
};

export const displayBooks = () => {
  if (bookLibrary.length < 1) {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  bookLibrary.forEach((book, i) => {
    addBookToRootNode(i, book);
  });
};

export const addBookToLibrary = () => {
  const title = getElement('titleField');
  const author = getElement('authorField');
  const nop = getElement('nopField');
  const desc = getElement('descField');

  if (!validated(title.value, author.value, nop.value, desc.value)) {
    return;
  }

  const newBook = new Book(title.value, author.value, desc.value, nop.value);
  bookLibrary.push(newBook);
  formContainer.style.display = 'none';
  addBookToRootNode(bookLibrary.length - 1, newBook);
  title.value = '';
  author.value = '';
  desc.value = '';
  nop.value = '';
};

export const bookForm = () => {
  formContainer.style.display = 'block';
};

getElement('add').addEventListener('click', bookForm);
getElement('saveBook').addEventListener('click', addBookToLibrary, false);