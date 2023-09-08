import GetBook from './getbook.js';

export default class FetchBooks {
  static fetchBooks = async () => {
    try {
      // Fetch book data from Gutendex API (Assuming Gutendex API endpoint)
      const response = await fetch('https://gutendex.com/books');
      const data = await response.json();
      const result = data.results;
      result.forEach((book) => {
        GetBook.getBook(book.id);
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
}
