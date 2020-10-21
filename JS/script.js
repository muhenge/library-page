let bookLibrary = [];
const root = document.getElementById('root');
const error = document.getElementById('error');
const formContainer = document.querySelector('.form-container');

function Book(title, author, description,nop) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.nop = nop;
}

function displayBooks() {
  bookLibrary.forEach((book) => {
      const bookCard = document.createElement('div');
      bookCard.innerText = book;
      document.getElementById('root').appendChild(bookCard)
  });
}

function bookForm (){
  formContainer.style.display = 'block'
}

displayBooks();

validated = (titleField, authorField, nopField, descField) => {


  if (titleField == '' || authorField == '' || nopField == '' || descField == '') {
    error.innerText = 'Please enter valid data'
    return false;
  }

  return true

}

addBookToLibrary = event => {
  const title = document.getElementById('titleField').value;
  const author = document.getElementById('authorField').value;
  const nop = document.getElementById('nopField').value;
  const desc = document.getElementById('descField').value;

  if (!validated(title, author, nop, desc)) {
    return;
  }

  bookLibrary.push(new Book(title, author, desc, nop))
  formContainer.style.display = 'none'
  displayBooks();
}

document.getElementById('add').addEventListener('click',bookForm);
document.getElementById('saveBook').addEventListener('click', addBookToLibrary);
