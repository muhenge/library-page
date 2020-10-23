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
  formContainer = document.querySelector('.form-container');
  formContainer.style.display = 'block'
}

document.getElementById('add').addEventListener('click',bookForm);

displayBooks();



function addBookToLibrary(
) {}
