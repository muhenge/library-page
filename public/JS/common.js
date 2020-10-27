export const bookLibrary = [];

const app = firebase.app();
export const firestore = app.firestore();
export const books = firestore.collection("books");

export const getElement = (name) => {
  return document.getElementById(name);
};

export const validated = (titleField, authorField, nopField, descField) => {
  if (
    titleField === "" ||
    authorField === "" ||
    nopField === "" ||
    descField === ""
  ) {
    error.innerText = "Please enter valid data";
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
  event.target.setAttribute("disabled", "disabled");
  const id = event.target.attributes[1].value;
  let read = !(event.target.attributes[2].value === "true");

  const bookReadStatus = books.doc(id);
  bookReadStatus
    .update({
      read: read,
      updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function () {
      event.target.setAttribute("data-value", read);
      event.target.innerText = read ? "unread" : "Read";
      event.target.removeAttribute("disabled");
    });
};

export const deleteBook = (docRef) => {
  books
    .doc(docRef)
    .delete()
    .then(function () {});
};
