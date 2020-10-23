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
    const authorField = document.createElement('input');
    const titleField = document.createElement('input');
    const nopField = document.createElement('input');
    const descField = document.createElement('textarea');
    formContainer.appendChild(form);
    form.appendChild(authorField)
    form.appendChild(titleField)
    form.appendChild(nopField)
    form.appendChild(descField)
    root.appendChild(formContainer);
}

document.getElementById('add').addEventListener('click',bookForm);

displayBooks();



function addBookToLibrary(
) {}
