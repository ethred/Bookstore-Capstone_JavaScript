import Populate from './populatebook.js';
import Likes from './likes.js';
import Comments from './comments.js';

const popUp = document.querySelector('.pop-up');
const form = document.querySelector('.add-comment');
const popTitle = document.querySelector('.pop-title');
const popTop = document.querySelector('.pop-top');
const desc1 = document.querySelector('.desc-1');
const desc2 = document.querySelector('.desc-2');
const shadow = document.querySelector('#shadow');
const dispComment = document.querySelector('.display-comments');

export default class GetBook {
  static getBook = async (id) => {
    try {
      // Fetch book details from Gutendex API for the given ID (Assuming Gutendex API endpoint)
      const response = await fetch(`https://gutendex.com/books/${id}`);
      const book = await response.json();
      Populate.populateBook(book);
      this.setLikes();
      this.updateLikes();
      this.createModal();
      this.getCount();
    } catch (error) {
      console.error(`Error fetching book with ID ${id}:`, error);
    }
  };

  static getCount = () => {
    const pokes = document.querySelectorAll('.book-card');
    const count = this.counterPoke(pokes);
    const counters = document.querySelector('.book-count');
    counters.textContent = `Books (${count})`;
  }

  static counterPoke = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i += 1) {
      count += 1;
    }
    return count;
  }

  static setLikes = () => {
    const hearts = document.querySelectorAll('.fa-heart');
    hearts.forEach((heart) => {
      heart.addEventListener('click', (e) => {
        Likes.postLike(e.target.nextElementSibling.id).then(() => {
          this.updateLikes();
        });
      });
    });
  }

  static updateLikes = () => {
    Likes.fetchLike().then((data) => {
      data.forEach((item) => {
        const likeSpan = document.getElementById(`${item.item_id}`);
        if (likeSpan) {
          likeSpan.innerHTML = `${item.likes} Likes`;
        }
      });
    });
  }

  static createModal = () => {
    const commentButtons = document.querySelectorAll('.comment-button');
    commentButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.createComment(e.target.id);
        popUp.classList.add('active');
        // shadow.classList.add('active');
        if (e.target.parentElement.id === e.target.id) {
          form.setAttribute('id', `${e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.innerHTML}`);
          popUp.setAttribute('id', `${e.target.parentElement.firstElementChild.firstElementChild.alt}`);
          popTop.innerHTML = `
        <img class="top-img" src="${e.target.parentElement.firstElementChild.firstElementChild.src}">
        `;
          popTitle.innerHTML = `${e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.innerHTML}`;
          desc1.innerHTML = `Experience: ${e.target.previousElementSibling.id}`;
          desc2.innerHTML = `Default: ${e.target.parentElement.firstElementChild.nextElementSibling.children[1].id}`;
        }
      });
      const closeButtons = document.querySelector('.close-pop');
      closeButtons.addEventListener('click', () => {
        popUp.classList.remove('active');
        shadow.classList.remove('active');
      });
    });
  }

  static commentFn = () => {
    const inputName = document.getElementById('comment-input');
    const inputTextarea = document.getElementById('comment-textarea');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target.tagName === 'FORM') {
        Comments.postComment(e.target.id, inputName.value, inputTextarea.value)
          .then((data) => {
            if (data === 'Created') {
              const commentsDiv = document.querySelector('.comments-list');
              commentsDiv.innerHTML = '';
              dispComment.innerHTML = '';
              this.createComment(e.target.id);
              inputName.value = '';
              inputTextarea.value = '';
            }
          });
      }
    });
  }

  static createComment = (pokeid) => {
    Comments.fetchComment(pokeid).then((data) => {
      const commentsDiv = document.querySelector('.comments-list');
      commentsDiv.innerHTML = '';
      dispComment.innerHTML = '';
      if (Array.isArray(data)) {
        data.forEach((comment) => {
          dispComment.innerHTML = `Comments (${Comments.countFn(data)})`;
          const li = document.createElement('li');
          li.textContent = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
          commentsDiv.appendChild(li);
        });
      }
    });
  }
}
