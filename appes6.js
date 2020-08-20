class Book {
    constructor(title, auther, isbn) {
        this.title = title;
        this.auther = auther;
        this.isbn = isbn;
    }
}
class UI {
    addBook = function(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.auther}</td>
            <td>${book.isbn}</td>
            <td><a herf="#" class="delete">x<a/></td>
            `
        list.appendChild(row);
    }
    clearFields = function() {
        document.getElementById('title').value = '';
        document.getElementById('auther').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert = function(msg, className) {
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        container.insertBefore(div, document.getElementById('book-form'));
        setTimeout(function() {
            container.removeChild(div);
        }, 2000)
    }

    deleteBook = function(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}
// Class for Handling Local storage
class Storage {
    // Gets books from local storage
    static getBooks() {
            let books;
            if (JSON.parse(localStorage.getItem('books'))) {
                console.log('in');

                books = JSON.parse(localStorage.getItem('books'));
            } else {
                books = [];
            }
            return books;
        }
        // stores book to local storage
    static store(book) {
            let books = Storage.getBooks();
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }
        // Display books on Docment load
    static displayBook() {
            const books = Storage.getBooks();
            const ui = new UI();
            books.forEach(function(book) {
                ui.addBook(book);
            });
        }
        // Delete book from local storage by isbn
    static deleteBook(isbn) {
        let books = Storage.getBooks();
        books.forEach(function(book, index) {
            if (book.isbn == isbn) {
                books.splice(index, index + 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// ON docment load event lestiner
document.addEventListener('DOMContentLoaded', Storage.displayBook);
// Book form Event lestiner
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Declare variables
    const title = document.getElementById('title').value,
        auther = document.getElementById('auther').value,
        isbn = document.getElementById('isbn').value,
        book = new Book(title, auther, isbn),
        ui = new UI()
        // Validate input
    if (title === '' || auther === '' || isbn === '') {
        ui.showAlert('Please enter the data', 'error');
    } else {
        // Add book
        ui.addBook(book);
        Storage.store(book);
        ui.showAlert('Book Added!', 'success')
            // Clear inpt fields
        ui.clearFields();
    }
    e.preventDefault();
})

// Delete event listener
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    // Delete from UI
    ui.deleteBook(e.target);
    // Delete from Local Storage by isbn
    Storage.deleteBook(e.target.parentElement.previousSibling.previousSibling.textContent);
    // Show success UI alert
    ui.showAlert('Deleted successfully!', 'success');
    e.preventDefault();
})