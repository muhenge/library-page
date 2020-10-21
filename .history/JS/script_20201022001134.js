let myLibrary = [];
const root = document.getElementById('root')


function Book(title, author, description,nop) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.nop = nop;
}

function displayBooks() {
  myLibrary.forEach((book) => {
      const bookCard = document.createElement('div');
      bookCard.innerText = book;
      document.getElementById('root').appendChild(bookCard)
  });
}

function bookForm (){
    const formContainer = document.createElement('div');
    const form = document.createElement('form');
    formContainer.appendChild(form);
    root.appendChild(formContainer);
}

document.getElementById('add').addEventListener('click',bookForm);

displayBooks();



function addBookToLibrary(
) {}
