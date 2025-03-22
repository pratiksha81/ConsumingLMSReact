import axios from "axios";
import { Book } from "../../domain/books/books";

const API_URL = "https://localhost:7178/api/Books"; // Ensure this URL is correct

// Fetch all books
export const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get<Book[]>(API_URL);
  return response.data;
};

// Create a new book
export const createBook = async (book: Book): Promise<Book> => {
  const response = await axios.post<Book>(API_URL, book);
  return response.data;
};

// Update an existing book
export const updateBook = async (book: Book): Promise<void> => {
  await axios.put(`${API_URL}/${book.bookId}`, book);
};

// Delete a book
export const deleteBook = async (bookId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${bookId}`);
};
