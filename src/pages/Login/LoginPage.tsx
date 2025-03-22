import { useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import Registerbook from "../../assets/BookRegister.svg"
import SignUpModel from "../../components/SignUp/SignUpModel";
const LoginPage: React.FC = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <LoginForm />
      <div className="flex flex-col justify-center items-center w-1/2 bg-[#255d81] text-white rounded-l-3xl">
        <img src= {Registerbook} alt="Library Logo" className="mb-4" />
        <h1 className="text-4xl  font-medium text-white-600">HSMSS</h1>
        <h1 className="text-5xl font-medium text-white-600 mb-4">LIBRARY</h1>
        <p className="text-3xl font-medium mb-2">New to our platform?</p>
        <p className="text-3xl font-medium mb-4">Register Now</p>
        <button
          onClick={() => setIsSignUpOpen(true)}
          className="bg-[#d9d9d9] text-black py-3 px-24 rounded-full text-xl"
        >
          Register
        </button>
      </div>
      <SignUpModel isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </div>
  );
};

export default LoginPage;