export const fb = firebase; // eslint-disable-line
export const app = fb.app();
export const firestore = app.firestore();
export const books = firestore.collection('books');

export const getElement = (id) => document.getElementById(id);

export const error = getElement('error');

export const validated = (titleField, authorField, nopField, descField) => {
  if (
    titleField === ''
    || authorField === ''
    || nopField === ''
    || descField === ''
  ) {
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
  if (!event.target.hasAttribute('data') || !event.target.hasAttribute('data-value')) {
    return;
  }
  event.target.setAttribute('disabled', 'disabled');
  const id = event.target.getAttribute('data');
  const read = !(event.target.getAttribute('data-value') === 'true');

  const bookReadStatus = books.doc(id);
  bookReadStatus
    .update({
      read,
      updateAt: fb.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      event.target.setAttribute('data-value', read);
      event.target.innerText = read ? 'Unread' : 'Read';
      event.target.removeAttribute('disabled');
    });
};

export const deleteBook = (docRef) => {
  books
    .doc(docRef)
    .delete()
    .then(() => {});
};
