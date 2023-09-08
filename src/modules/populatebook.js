const BooksDiv = document.querySelector('.books');

export default class Populate {
  static populateBook = (Book) => {
    const BookImg = Book.formats;
    BooksDiv.innerHTML += `
    <div id="${Book.title}" class="book-card">
      <div class="book-img">
        <img src="${BookImg['image/jpeg']}" alt="">
      </div>
      <div id="" class="book-content">
        <h4 class="book-name">${Book.title}</h4>
        <div id="" class="book-likes">
          <i class="fa-regular fa-heart"></i>
          <span id="${Book.id}" class="n-likes"> likes</span>
        </div>
      </div>
      <button id="${Book.title}" class="comment-button">Comment</button>
    </div>
  `;
  };
}
