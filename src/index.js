import './main.css';
import './pop.css';
import './myreset.css';
import './style.css';
import FetchBooks from './modules/bookfetchfunction.js'; // Update the module import
import BookDetails from './modules/getbook.js'; // Update the module import

FetchBooks.fetchBooks();
BookDetails.commentFn();
