import {
  getElement, validated, Book, readStatus, books, deleteBook, app, error,
} from './common.js'; // eslint-disable-line

export const formContainer = document.querySelector('.form-container');

const root = getElement('root');

const deleteBookFromLibrary = (event) => {
  if (event.target.hasAttribute('data')) {
    deleteBook(event.target.getAttribute('data'));
    root.removeChild(event.target.parentElement);
  }
};

const addBookToRootNode = (docId, book) => {
  const bookCardWrapper = document.createElement('div');
  const bookCard = document.createElement('div');
  const bookCardContent = document.createElement('div');
  const bookCardActions = document.createElement('div');
  const bTitle = document.createElement('h2');
  const bAuthor = document.createElement('p');
  const bNop = document.createElement('p');
  const bDesc = document.createElement('p');
  const deleteBtn = document.createElement('button');
  const statusBtn = document.createElement('button');

  statusBtn.innerText = book.read ? 'Unread' : 'Read';
  statusBtn.addEventListener('click', readStatus);
  statusBtn.setAttribute('id', 'statusBtn');
  statusBtn.setAttribute('class', `
  inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold
  text-gray-700 bg-gray-200 rounded-sm
  `);
  statusBtn.setAttribute('data', docId);
  statusBtn.setAttribute('data-value', book.read);

  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('id', 'deleteBtn');
  deleteBtn.setAttribute('class', `
  inline-block px-3 py-1 mb-2 mr-2 text-sm 
  font-semibold text-gray-200 bg-red-700 rounded-sm
  `);
  deleteBtn.setAttribute('data', docId);
  deleteBtn.addEventListener('click', deleteBookFromLibrary);

  bTitle.innerText = book.title;
  bAuthor.innerHTML = `
  <svg class="w-5 h-5 mr-2 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
  </svg>
  ${book.author}`;
  bNop.innerText = `${book.nop} Pages`;
  bDesc.innerText = book.description;

  bookCardWrapper.setAttribute('class', 'w-full h-max min-w-1/2 lg:min-w-1/4 max-w-sm lg:max-w-full lg:flex');
  bookCard.setAttribute('class', `flex flex-col justify-between p-4 leading-normal
   bg-white border-b border-l border-r border-gray-400 rounded-b lg:border-l-0
  lg:border-t lg:border-gray-400 lg:rounded-b-none lg:rounded-r`);
  bookCardContent.setAttribute('class', 'mb-8');
  bAuthor.setAttribute('class', 'flex items-center text-base text-gray-600');
  bTitle.setAttribute('class', 'mb-2 text-xl font-bold text-gray-900');
  bDesc.setAttribute('class', 'text-base text-gray-700');
  bookCardActions.setAttribute('class', 'pt-4 pb-2');
  bNop.setAttribute('class', 'text-gray-600 mt-3');


  bookCardContent.appendChild(bAuthor);
  bookCardContent.appendChild(bTitle);
  bookCardContent.appendChild(bDesc);
  bookCardContent.appendChild(bNop);

  bookCardActions.appendChild(deleteBtn);
  bookCardActions.appendChild(statusBtn);

  bookCard.appendChild(bookCardContent);
  bookCard.appendChild(bookCardActions);

  bookCardWrapper.appendChild(bookCard);
  root.prepend(bookCardWrapper);
};

export const displayBooks = () => {
  books
    .orderBy('createdAt', 'desc')
    .limit(50)
    .onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          addBookToRootNode(change.doc.id, change.doc.data());
        }
      });
    });
};

export const addBookToLibrary = (event) => {
  event.target.setAttribute('disabled', 'disabled');

  const title = getElement('titleField');
  const author = getElement('authorField');
  const nop = getElement('nopField');
  const desc = getElement('descField');

  if (!validated(title.value, author.value, nop.value, desc.value)) {
    return;
  }
  const newBook = new Book(title.value, author.value, desc.value, nop.value);
  const addBook = books.doc();

  addBook
    .set({
      ...newBook,
      createdAt: app.firebase.firestore.FieldValue.serverTimestamp(),
      updateAt: app.firebase.firestore.FieldValue.serverTimestamp(),
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
      },
    )
    .finally(() => {
      event.target.removeAttribute('disabled');
    });
};

export const bookForm = () => {
  formContainer.style.display = 'flex';
};

getElement('add').addEventListener('click', bookForm);
getElement('saveBook').addEventListener('click', addBookToLibrary);