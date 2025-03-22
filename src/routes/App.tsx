import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import StudentPage from "../pages/students/StudentPage";  // Import StudentPage
import LoginPage from "../pages/Login/LoginPage";
import { AuthProvider } from "../context/Authorization/AuthContext";  // Import AuthProvider
import DashboardPage from "../pages/dashboard/DashBoardPage";
import Navbar from "../components/Navbar";
import AuthorPage from "../pages/authors/AuthorPage";
import BookPage from "../pages/books/BookPage";
import TransactionPage from "../pages/transaction/TransactionPage";
import IssuingPage from "../pages/issuing/IssuingPage";
// import IssuingPage from "../pages/students/StudentPage";

// A wrapper component to handle conditional rendering of the Navbar
const AppLayout: React.FC = () => {
  const location = useLocation(); // Get the current route

  // Hide Navbar on the login page
  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/author" element={<AuthorPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/transaction-view" element={<TransactionPage />} />
        <Route path="/transaction" element={<IssuingPage />} />
        {/* dfault navigation */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

export default App;