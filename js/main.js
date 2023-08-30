
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
addBookToLibrary(TheLittlePrince);

/*const newBookDialog = document.querySelector("#new-book-dialog");

const newBookButton = document.querySelector("#new-book-button");
newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

const cancelButton = document.querySelector("#cancel-btn");
cancelButton.addEventListener("close", (e) => console.log(e));*/

myLibrary.forEach(b => {
    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("book-info-div");
    
    const bookImg = document.createElement("img");
    bookImg.src = "./img/book.svg";
    bookImg.alt = "book";
    bookImg.style.width = "125px";
    bookImg.style.height = "125px";
    
    bookInfoDiv.append(bookImg);

    const bookInfoSubDiv = document.createElement("div");
    
    const bookInfoH2 = document.createElement("h2");
    bookInfoH2.textContent = b.title;
    bookInfoH2.style.fontStyle = "italic";

    const bookInfoH3 = document.createElement("h3");
    bookInfoH3.textContent = b.author;

    bookInfoSubDiv.append(bookInfoH2, bookInfoH3);
    bookInfoDiv.append(bookInfoSubDiv);
    document.querySelector("#library-div").append(bookInfoDiv);
})