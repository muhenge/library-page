let bookLibrary = [{
  title: 'Harry Potter',
  author: 'Rowling',
  nop: 402,
  description: 'It made my childhood'
}];

const root = document.getElementById('root');
const error = document.getElementById('error');
const formContainer = document.querySelector('.form-container');

function Book(title, author, description, nop, read = false) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.nop = nop;
  this.read = read;
}

const readStatus = (event) =>{
  const id  = event.target.attributes[1].value
  bookLibrary[id].read = !bookLibrary[id].read
  event.target.innerText = bookLibrary[id].read ? "unread" : 'Read';
}

displayBooks = _ => {
  if (bookLibrary.length < 1) {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  bookLibrary.forEach((book, i) => {
      addBookToRootNode(i, book);
  });
}

bookForm = _ => {
  formContainer.style.display = 'block'
}

validated = (titleField, authorField, nopField, descField) => {
  if (titleField == '' || authorField == '' || nopField == '' || descField == '') {
    error.innerText = 'Please enter valid data'
    return false;
  }

  return true
}

addBookToLibrary = event => {
  const title = document.getElementById('titleField');
  const author = document.getElementById('authorField');
  const nop = document.getElementById('nopField');
  const desc = document.getElementById('descField');

  if (!validated(title.value, author.value, nop.value, desc.value)) {
    return;
  }

  const newBook = new Book(title.value, author.value, desc.value, nop.value);
  bookLibrary.push(newBook)
  formContainer.style.display = 'none'
  addBookToRootNode(bookLibrary.length - 1, newBook);
  title.value = '';
  author.value = '';
  desc.value = '';
  nop.value = '';
}

deleteBookFromLibrary = (event) => {
  bookLibrary.splice(event.target.attributes[1].value, 1)

  root.removeChild(event.target.parentElement)
}

document.getElementById('add').addEventListener('click',bookForm);
document.getElementById('saveBook').addEventListener('click', addBookToLibrary,false);

addBookToRootNode = (i, book) => {
  const bookCard = document.createElement('div');
  const bTitle = document.createElement('h2');
  const bAuthor = document.createElement('p');
  const bNop = document.createElement('p');
  const bDesc = document.createElement('p');
  const deleteBtn = document.createElement('button');
  const statusBtn = document.createElement('button');
  statusBtn.setAttribute('id','statusBtn');
  statusBtn.setAttribute('data', i);
  statusBtn.innerText = "Read";
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("id", "deleteBtn");
  deleteBtn.setAttribute("data", i);
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
}

displayBooks();