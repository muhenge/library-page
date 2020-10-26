export const bookLibrary = [];

export const getElement = (name) => {
  return document.getElementById(name);
}

export const validated = (titleField, authorField, nopField, descField) => {
  if (titleField === '' || authorField === '' || nopField === '' || descField === '') {
    error.innerText = 'Please enter valid data';
    return false;
  }

  return true;
};

export function Book(title, author, description, nop, read = false) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.nop = nop;
  this.read = read;
}

export const readStatus = (event) => {
  const id = event.target.attributes[1].value;
  bookLibrary[id].read = !bookLibrary[id].read;
  event.target.innerText = bookLibrary[id].read ? 'unread' : 'Read';
};