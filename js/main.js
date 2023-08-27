
const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function displayLibrary () {
    myLibrary.forEach(b => console.table(b));
}

const LordOfTheRings = new Book("The Hobbit", "J. R. R. Tolkien");
addBookToLibrary(LordOfTheRings);

const ATaleOfTwoCities = new Book("A Tale Of Two Cities", "Charles Dickens");
addBookToLibrary(ATaleOfTwoCities);

const TheLittlePrince = new Book("The Little Prince", "Antoine de Saint-Exupéry");
addBookToLibrary(LordOfTheRings);

const newBookDialog = document.querySelector("#new-book-dialog");


const newBookButton = document.querySelector("#new-book-button");
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

const cancelButton = document.querySelector("#cancel-btn");
cancelButton.addEventListener("close", (e) => console.log(e));