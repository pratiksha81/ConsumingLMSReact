import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import StudentForm from "../../components/students/StudentForm";
import StudentTable from "../../components/students/StudentTable";
import { Student } from "../../domain/students/students";
import { fetchStudents,
   updateStudent,
    createStudent,
     deleteStudent } from "../../services/students/studentService";
import logo from "../../assets/StudentHead.svg"; //Header Image for student info

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all students on component mount
  useEffect(() => {
    loadStudents();
  }, []); // This ensures the student list is loaded initially
  
  const loadStudents = async () => {
    try {
      setLoading(true);
      const studentData = await fetchStudents();  // Fetch the list of students
      setStudents(studentData);  // Update the state with the fetched data
    } catch (err) {
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };
  // Handle Add or Update students
  const handleAddOrUpdate = async (student: Student) => {
    try {
      if (isEdit && student.studentId) {
        await updateStudent(student);
      } else {
        await createStudent(student);
      }
      setSelectedStudent(null);
      setIsEdit(false);
      loadStudents(); // Refresh the list after adding/updating
    } catch (err) {
      setError(`Failed to ${isEdit ? "update" : "add"} student.`);
    }
  };
  

  // Handle Edit
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEdit(true);
  };

  // Handle Delete
  const handleDelete = async (studentId: number) => {
    try {
      await deleteStudent(studentId);
      setStudents(students.filter((s) => s.studentId !== studentId));
    } catch (err) {
      setError("Failed to delete student.");
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="ml-[222px] w-full">
        <div className="h-[65px] bg-white shadow-md flex items-center px-5">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <h2 className="text-lg font-semibold">Student Info</h2>
        </div>
        <div className="bg-[#F2F2F2] p-5 h-[calc(100vh-65px)] overflow-y-auto">
          {error && <div className="bg-red-100 text-red-700 p-3 mb-4">{error}</div>}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              <StudentForm student={selectedStudent} isEdit={isEdit} onSubmit={handleAddOrUpdate} />
              <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
