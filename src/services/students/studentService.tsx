import axios from "axios";
import { Student } from "../../domain/students/students";

const API_URL = "https://localhost:7178/api/Students"; // Ensure this URL is correct

// Fetch all students
export const fetchStudents = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>(API_URL);
  return response.data;
};

// Create a new student
export const createStudent = async (student: Student): Promise<Student> => {
  const response = await axios.post<Student>(API_URL, student);
  return response.data;
};

// Update an existing student
export const updateStudent = async (student: Student): Promise<void> => {
  await axios.put(`${API_URL}/${student.studentId}`, student);
};

// Delete a student
export const deleteStudent = async (studentId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${studentId}`);
};
