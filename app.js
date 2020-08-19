// Book object
function Book(title, auther, isbn) {
    this.title = title;
    this.auther = auther;
    this.isbn = isbn;

}

// UI object
function UI() {}
// Add book prototype
UI.prototype.addBook = function(book) {
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

// Clear fields prototype
UI.prototype.clearFields = function() {
        document.getElementById('title').value = '';
        document.getElementById('auther').value = '';
        document.getElementById('isbn').value = '';
    }
    // Show alert prototype
UI.prototype.showAlert = function(msg, className) {
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        container.insertBefore(div, document.getElementById('book-form'));
        setTimeout(function() {
            container.removeChild(div);
        }, 2000)
    }
    // Event lestiners

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
        ui.showAlert('Book Added!', 'success')
            // Clear inpt fields
        ui.clearFields();
    }


    e.preventDefault();
})