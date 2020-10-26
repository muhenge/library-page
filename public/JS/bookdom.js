import { bookLibrary, getElement, validated, Book, readStatus, books, deleteBook } from "./common.js";

export const formContainer = document.querySelector('.form-container');

const root = getElement('root');
const error = getElement('error');

const addBookToRootNode = (docId, book) => {
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
  deleteBtn.setAttribute('data', docId);
  deleteBtn.addEventListener('click', deleteBookFromLibrary);
  statusBtn.addEventListener('click', readStatus, false);
  statusBtn.setAttribute('id', 'statusBtn');
  statusBtn.setAttribute('data', docId);
  statusBtn.setAttribute('data-value', book.read);
  statusBtn.innerText = 'Read';
  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('id', 'deleteBtn');
  deleteBtn.setAttribute('data', docId);
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
  deleteBook(event.target.attributes[1].value);
  root.removeChild(event.target.parentElement);
};

export const displayBooks = () => {
  books
  .orderBy("createdAt", "desc")
  .limit(50)
  .onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach(function (change) {
      if (change.type === "added") {
        addBookToRootNode(change.doc.id, change.doc.data());
      }});
  });
}

export const addBookToLibrary = (event) => {
  const title = getElement('titleField');
  const author = getElement('authorField');
  const nop = getElement('nopField');
  const desc = getElement('descField');

  if (!validated(title.value, author.value, nop.value, desc.value)) {
    return;
  }
  const newBook = new Book(title.value, author.value, desc.value, nop.value);
  const addBook = books.doc();
  event.target.setAttribute("disabled", "disabled");
  addBook
    .set({
      ...newBook,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updateAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(
      () => {
        formContainer.style.display = 'none';
        title.value = null;
        author.value = null;
        desc.value = null;
        nop.value = null;
      },
      (err) => {
        error.innerText = `Error on saving data ${err}`;
      }
    )
    .finally(() => {
      event.target.removeAttribute("disabled");
    });
};

export const bookForm = () => {
  formContainer.style.display = 'block';
};

getElement('add').addEventListener('click', bookForm);
getElement('saveBook').addEventListener('click', addBookToLibrary);