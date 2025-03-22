import { useEffect, useState } from "react";
import { Book } from "../../domain/books/books";
import Navbar from "../../components/Navbar";
import BookForm from "../../components/books/BookForm";
import BookTable from "../../components/books/BookTable";
import logo from "../../assets/BookHead.svg"; // Header Image for book info
import { fetchBooks, updateBook, createBook, deleteBook } from "../../services/books/bookService";


const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const bookData = await fetchBooks();  // Fetch the list of books
      setBooks(bookData);  // Update the state with the fetched data
    } catch (err) {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };
  

  // Handle Add or Update books
  const handleAddOrUpdate = async (book: Book) => {
    try {
      if (isEdit && book.bookId) {
        await updateBook(book); // Update existing book
      } else {
        await createBook(book); // Create a new book
      }
      setSelectedBook(null);
      setIsEdit(false);
      loadBooks(); // Refresh the list after adding/updating
    } catch (err) {
      setError(`Failed to ${isEdit ? "update" : "add"} book.`);
    }
  };
  
  // Handle Edit
  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsEdit(true);
  };

  // Handle Delete
  const handleDelete = async (bookId: number) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId !== bookId));
    } catch (err) {
      setError("Failed to delete book.");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="ml-[222px] w-full">
        <div className="h-[65px] bg-white shadow-md flex items-center px-5">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <h2 className="text-lg font-semibold">Book Info</h2>
        </div>
        <div className="bg-[#F2F2F2] p-5 h-[calc(100vh-65px)] overflow-y-auto">
          {error && <div className="bg-red-100 text-red-700 p-3 mb-4">{error}</div>}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              <BookForm book={selectedBook} isEdit={isEdit} onSubmit={handleAddOrUpdate} />
              <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
