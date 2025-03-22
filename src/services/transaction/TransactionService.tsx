// src/services/transactions/transactionService.ts
import axios from "axios";
// import { Book } from "../../domain/books/books";
// import { IssuingTransaction } from "../../domain/issuing/Issuing";
// import { Student } from "../../domain/students/students";
import { Transaction } from "../../domain/transaction/Transaction";

const API_URL = "https://localhost:7178/api";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get<Transaction[]>(`${API_URL}/Transactions`);
  return response.data;
};

// export const createTransaction = async (transaction: IssuingTransaction): Promise<Transaction> => {
//   const payload = {
//     studentid: transaction.studentId,
//     user: transaction.userId,
//     bookid: transaction.bookId,
//     TransactionType: transaction.transactionType, // Updated to match backend
//     date: transaction.date,
//   };
//   const response = await axios.post<Transaction>(`${API_URL}/Transactions`, payload);
//   return response.data;
// };

// export const fetchStudents = async (): Promise<Student[]> => {
//   const response = await axios.get<any[]>(`${API_URL}/Students`);
//   return response.data.map((student: any) => ({
//     studentId: student.studentid || student.studentId,
//     name: student.name,
//     email: student.email || undefined,
//     contactNumber: student.contactNumber || undefined,
//     department: student.department || undefined,
//   }));
// };

// export const fetchBooks = async (): Promise<Book[]> => {
//   const response = await axios.get<any[]>(`${API_URL}/Books`);
//   return response.data.map((book: any) => ({
//     bookId: book.bookid || book.bookId,
//     title: book.title,
//     authorId: book.authorId || undefined,
//     genre: book.genre || undefined,
//     isbn: book.isbn || undefined,
//     quantity: book.quantity || undefined,
//   }));
// };