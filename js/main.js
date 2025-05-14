
const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead
    this.id = self.crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
}

// Create book object and add to library.
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead)
    myLibrary.push(book)
    return book;
}

function addBookToUI(book) {
    libraryDiv.append(createBookInfoDiv(book));
}

// Print library as table in console.
function displayLibrary () {
    console.table(myLibrary)
}

// Create book elements.
function createBookInfoDiv(book) {
    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.dataset.bookDivID = book.id;
    bookInfoDiv.classList.add("book-info-div")

    const bookInfoLeftColumn = document.createElement("div");
    bookInfoLeftColumn.classList.add("book-info-left-column");

    const bookImg = document.createElement("img");
    bookImg.classList.add("book-info-img");
    bookImg.src = "./img/book.svg";
    bookImg.alt = "Book icon";
    bookInfoLeftColumn.append(bookImg);

    const bookInfoButtonsDiv = document.createElement("div");
    bookInfoButtonsDiv.classList.add("book-info-buttons");
    bookInfoLeftColumn.append(bookInfoButtonsDiv);

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.classList.add("delete-btn");
    deleteBookBtn.textContent = "Delete";
    deleteBookBtn.addEventListener("click", () => {
        const index = myLibrary.findIndex(bk => bk.id === book.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            // Remove parent (and, subsequently, children)
            bookInfoDiv.remove();
        }
    });
    bookInfoButtonsDiv.append(deleteBookBtn);

    const readBookBtn = document.createElement("button");
    readBookBtn.classList.add("read-btn");
    book.isRead ? readBookBtn.textContent = "Mark Unread" : readBookBtn.textContent = "Mark Read";
    readBookBtn.addEventListener("click", () => {
        const index = myLibrary.findIndex(bk => bk.id === book.id);
        if (index !== -1) {
            myLibrary.at(index).toggleRead();
        }
        bookInfoIsReadSpan.textContent = book.isRead ? "Yes" : "No";
        bookInfoIsReadSpan.className = book.isRead ? "read-status yes" : "read-status no";
        book.isRead ? readBookBtn.textContent = "Mark Unread" : readBookBtn.textContent = "Mark Read";
    });
    bookInfoButtonsDiv.append(readBookBtn);
    bookInfoDiv.append(bookInfoLeftColumn);

    const bookInfoSubDiv = document.createElement("div");
    bookInfoSubDiv.classList.add("book-info-subdiv");

    const bookInfoH2Title = document.createElement("h2");
    bookInfoH2Title.textContent = book.title;
    bookInfoH2Title.style.fontStyle = "italic";

    const bookInfoH3Author = document.createElement("h3");
    bookInfoH3Author.textContent = book.author;

    const bookInfoH3Pages = document.createElement("h3");
    bookInfoH3Pages.textContent = `Pages: ${book.pages}`;
    
    const bookInfoH3IsRead = document.createElement("h3");
    bookInfoH3IsRead.textContent = "Read: ";
    book.isRead ? readBookBtn.textContent = "Mark Unread" : readBookBtn.textContent = "Mark Read";
    
    const bookInfoIsReadSpan = document.createElement("span");
    bookInfoIsReadSpan.classList.add("book-info-is-read");
    bookInfoIsReadSpan.textContent = book.isRead ? "Yes" : "No";
    bookInfoIsReadSpan.className = book.isRead ? "read-status yes" : "read-status no";
    bookInfoH3IsRead.append(bookInfoIsReadSpan);
    
    bookInfoSubDiv.append(bookInfoH2Title, bookInfoH3Author, bookInfoH3Pages, bookInfoH3IsRead);
    bookInfoDiv.append(bookInfoSubDiv);

    return bookInfoDiv;
}

function updateBookUIIcon(book, url) {
    const targetBook = document.querySelector(`[data-book-div-i-d="${book.id}"]`);
    const targetBookIcon = targetBook.querySelector(".book-info-img");
    
    if (url !== null) {
        targetBookIcon.src = url;
    }
}

// Fetch book cover from OpenLibrary and return URL.
async function fetchBookCover(book) {
    const authorLastName = typeof book.author === "string" ? book.author.split(" ").at(-1) : "";
    const bookTitle = book.title;

    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}&author=${encodeURIComponent(authorLastName.trim())}&language=eng&limit=1`);
    const data = await response.json();
    
    if (data.docs.length > 0 && data.docs[0].cover_i) {
        const coverID = data.docs[0].cover_i;
        return `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
    } else {
        return null;
    }
}

// Preloaded books
addBookToLibrary("Atomic Habits", "James Clear", 319, false);
addBookToLibrary("The 7 Habits of Highly Effective People", "Stephen R. Covey", 372, false);
addBookToLibrary("How to Win Friends and Influence People", "Dale Carnegie", 288, true);
addBookToLibrary("The Subtle Art of Not Giving a F*ck", "Mark Manson", 212, false);
addBookToLibrary("The Let Them Theory", "Mel Robbins", 311, false);

// Create preloaded books' elements & add to UI.
const libraryDiv = document.querySelector("#library-div");
myLibrary.forEach(b => libraryDiv.append(createBookInfoDiv(b)));
myLibrary.forEach(b => fetchBookCover(b).then((e) => updateBookUIIcon(b, e)));

const newBookDialog = document.querySelector("#new-book-dialog");
const newBookButton = document.querySelector("#add-book-btn");
newBookButton.addEventListener("click", () => newBookDialog.showModal());

const newBookDialogForm = document.querySelector("#new-book-dialog form");

const newBookCloseButton = document.querySelector("#cancel-btn");
newBookCloseButton.addEventListener("click", () => {
    newBookDialogForm.reset();
    newBookDialog.close();
});

newBookDialogForm.addEventListener("submit", (e) => {
    if (e.submitter.id === "submit-btn") {
        const title = document.querySelector("#book-title").value;
        const author = document.querySelector("#book-author").value;
        const pages = document.querySelector("#book-pages").value;
        const isRead = document.querySelector("#book-isRead").checked;

        e.preventDefault();
        newBookDialogForm.reset();
        newBookDialog.close();

        const book = addBookToLibrary(title, author, pages, isRead);
        createBookInfoDiv(book);
        addBookToUI(book);
        fetchBookCover(book).then(e => updateBookUIIcon(book, e));
    }
});

displayLibrary();