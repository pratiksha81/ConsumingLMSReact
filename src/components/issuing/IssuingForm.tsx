// src/components/issuing/IssuingForm.tsx
import { useState, useEffect, FormEvent } from "react";
import { Book, IssuingTransaction, Student } from "../../domain/issuing/Issuing";
import { fetchBooks } from "../../services/books/bookService";
import { fetchStudents } from "../../services/students/studentService";

interface IssuingFormProps {
  onSubmit: (transaction: IssuingTransaction) => void;
}

const IssuingForm: React.FC<IssuingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<IssuingTransaction>({
    studentId: 0,         // Updated to camelCase
    userId: 0,           // Updated to camelCase and number
    bookId: 0,           // Updated to camelCase
    transactionType: "Borrow", // Updated to camelCase
    date: new Date().toISOString().split("T")[0], // Keeping date as YYYY-MM-DD
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [studentData, bookData] = await Promise.all([
          fetchStudents(),
          fetchBooks(),
        ]);
        setStudents(studentData);
        setBooks(bookData);
      } catch (err) {
        setError("Failed to load students or books.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.studentId === 0 || formData.bookId === 0 || formData.userId === 0) {
      setError("Please fill all required fields.");
      return;
    }
    onSubmit(formData);
    setFormData({
      studentId: 0,
      userId: 0,
      bookId: 0,
      transactionType: "Borrow",
      date: new Date().toISOString().split("T")[0],
    });
    setError(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "studentId" || name === "bookId" || name === "userId"
          ? Number(value) // Convert to number for numeric fields
          : value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className="card mb-4"
      style={{
        background: "#E3E3E3",
        padding: "22px 34px",
        border: "none",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-8">
            <label
              className="form-label"
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
            >
              Student
            </label>
            <select
              name="studentId" // Updated to camelCase
              value={formData.studentId}
              onChange={handleChange}
              required
              style={{
                height: "65px",
                backgroundColor: "#D9D9D9",
                border: "none",
                borderRadius: "4px",
                width: "100%",
                padding: "0 10px",
              }}
            >
              <option value={0} disabled>
                Select a Student
              </option>
              {students.map((student) => (
                <option key={student.studentId} value={student.studentId}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label
              className="form-label"
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
            >
              User ID
            </label>
            <input
              type="number" // Changed to number input
              name="userId" // Updated to camelCase
              value={formData.userId}
              onChange={handleChange}
              required
              style={{
                height: "65px",
                backgroundColor: "#D9D9D9",
                border: "none",
                borderRadius: "4px",
                width: "100%",
                padding: "0 10px",
              }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label
              className="form-label"
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
            >
              Book
            </label>
            <select
              name="bookId" // Updated to camelCase
              value={formData.bookId}
              onChange={handleChange}
              required
              style={{
                height: "65px",
                backgroundColor: "#D9D9D9",
                border: "none",
                borderRadius: "4px",
                width: "100%",
                padding: "0 10px",
              }}
            >
              <option value={0} disabled>
                Select a Book
              </option>
              {books.map((book) => (
                <option key={book.bookId} value={book.bookId}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label
              className="form-label"
              style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
            >
              Transaction Type
            </label>
            <select
              name="transactionType" // Updated to camelCase
              value={formData.transactionType}
              onChange={handleChange}
              required
              style={{
                height: "65px",
                backgroundColor: "#D9D9D9",
                border: "none",
                borderRadius: "4px",
                width: "100%",
                padding: "0 10px",
              }}
            >
              <option value="Borrow">Borrow</option>
              <option value="Return">Return</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label
            className="form-label"
            style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{
              height: "65px",
              backgroundColor: "#D9D9D9",
              border: "none",
              borderRadius: "4px",
              width: "100%",
              padding: "0 10px",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: "#255D81",
            fontSize: "15px",
            fontWeight: 800,
            width: "160px",
            color: "white",
            padding: "21px 56px",
            border: "none",
            borderRadius: "20px",
          }}
        >
          ISSUE
        </button>
      </form>
    </div>
  );
};

export default IssuingForm;