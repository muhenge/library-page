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
  bookLibrary.forEach((book,i) => {
      const bookCard = document.createElement('div');
      const bTitle = document.createElement('h2');
      const bAuthor = document.createElement('p');
      const bNop = document.createElement('p');
      const bDesc= document.createElement('p');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = "Delete"
      deleteBtn.setAttribute("id","deleteBtn");
      deleteBtn.setAttribute("data",i);
      bTitle.innerText = book.title;
      bAuthor.innerText = book.author;
      bNop.innerText = book.nop;
      bDesc.innerText = book.description;
      bookCard.appendChild(bTitle);
      bookCard.appendChild(bAuthor);
      bookCard.appendChild(bNop);
      bookCard.appendChild(bDesc);
        bookCard.appendChild(deleteBtn);
      document.getElementById('root').appendChild(bookCard);
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
  const title = document.getElementById('titleField');
  const author = document.getElementById('authorField');
  const nop = document.getElementById('nopField');
  const desc = document.getElementById('descField');

  if (!validated(title.value, author.value, nop.value, desc.value)) {
    return;
  }

  bookLibrary.push(new Book(title.value, author.value, desc.value, nop.value))
  formContainer.style.display = 'none'
  displayBooks();
  title.value = '';
  author.value = '';
  desc.value = '';
  nop.value = '';


}

document.getElementById('add').addEventListener('click',bookForm);
document.getElementById('saveBook').addEventListener('click', addBookToLibrary);
