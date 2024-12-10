const searchInput = document.getElementById('searchInput');
const genreButtons = document.querySelectorAll('.genre-btn');
const bookCards = document.querySelectorAll('.book-card');

// Search functionality
searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();

  bookCards.forEach(card => {
    const text = card.textContent?.toLowerCase() || '';
    card.classList.toggle('hidden', !text.includes(query));
  });
});

// Genre filter functionality
genreButtons.forEach(button => {
  button.addEventListener('click', () => {
    genreButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedGenre = button.getAttribute('data-genre');
    bookCards.forEach(card => {
      const cardGenre = card.getAttribute('data-genre');
      if (selectedGenre === 'all') {
        card.classList.remove('hidden');
      } else {
        card.classList.toggle('hidden', cardGenre !== selectedGenre);
      }
    });
  });
});
// Select the form and book list container
const addBookForm = document.getElementById('addBookForm');
const bookList = document.querySelector('.book-list');

// Function to create a book card
function createBookCard(book) {
    const bookCard = document.createElement('article');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-genre', book.genre);

    bookCard.innerHTML = `
        <img src="${book.cover}" alt="Cover of ${book.title}" class="book-cover" />
        <div class="book-info">
            <h2>${book.title}</h2>
            <p class="author">by ${book.author}</p>
            <span class="genre">${book.genre}</span>
            <p class="description">${book.description}</p>
        </div>
    `;

    bookList.appendChild(bookCard);
}

// Load books from local storage on page load
function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.forEach(book => createBookCard(book));
}

// Save books to local storage
function saveBooks() {
    const books = [];
    document.querySelectorAll('.book-card').forEach(card => {
        const book = {
            title: card.querySelector('h2').textContent,
            author: card.querySelector('.author').textContent.replace('by ', ''),
            genre: card.querySelector('.genre').textContent,
            description: card.querySelector('.description').textContent,
            cover: card.querySelector('.book-cover').src
        };
        books.push(book);
    });
    localStorage.setItem('books', JSON.stringify(books));
}

// Handle the form submission
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the values from the form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const description = document.getElementById('description').value;
    const cover = document.getElementById('cover').value;

    // Create the new book object
    const newBook = {
        title,
        author,
        genre,
        description,
        cover
    };

    // Add the new book to the book list
    createBookCard(newBook);

    // Save the updated book list to local storage
    saveBooks();

    // Reset the form
    addBookForm.reset();
});

// Load books when the page loads
loadBooks();
