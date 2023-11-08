
// Function to fetch and display the list of books
function displayBooks() {
  fetch('http://localhost:3000/books/')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('bookList');
      tableBody.innerHTML = ''; // Clear the existing table content

      data.forEach(book => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        titleCell.textContent = book.name;
        row.appendChild(titleCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        const publishDateCell = document.createElement('td');
        publishDateCell.textContent = book.publish_date;
        row.appendChild(publishDateCell);

        const actionsCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-primary');
        editButton.setAttribute('data-toggle', 'modal');
        editButton.setAttribute('data-target', `#editBookModal${book.id}`);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => deleteBook(book.id));
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        tableBody.appendChild(row);
        });
  
    })
    .catch(error => console.error('Error fetching books:', error));
}

// Function to create a new book
const createBookForm = document.getElementById('createBookForm');
createBookForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;
  const publish_date = document.getElementById('publish_date').value;

  fetch('http://localhost:3000/books/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, author, publish_date })
  })
  .then(() => {
    displayBooks();
    createBookForm.reset();
  })
  .catch(error => console.error('Error creating book:', error));
});

// Initial book list display
displayBooks();
