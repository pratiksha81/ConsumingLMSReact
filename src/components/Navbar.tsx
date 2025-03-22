import React from 'react';
import { Link } from 'react-router-dom';
import logoutIcon from "../assets/Logout.svg";
import dashboardIcon from "../assets/Dashboard.svg";  
import authorsIcon from "../assets/Author.svg";
import bookIcon from "../assets/Books.svg";
import studentsIcon from "../assets/Students.svg";
import transactionIcon from "../assets/Transaction.svg";
import issuingIcon from "../assets/Issuing.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-[222px] h-screen bg-[#255D81] text-white flex flex-col items-center pt-[51px] shadow-[2px_0_5px_rgba(0,0,0,0.2)] z-[1030]">
      {/* Logo Section */}
      <div>
        <h1 className="text-4xl font-bold text-white">HSMSS</h1>
        <h1 className="text-4xl font-bold text-white"> LIBRARY</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-start w-full mt-5">
        {[
          { path: '/dashboard', icon: dashboardIcon, label: 'Dashboard' },
          { path: '/author', icon: authorsIcon, label: 'Author' },
          { path: '/book', icon: bookIcon, label: 'Books' },
          { path: '/student', icon: studentsIcon, label: 'Students' },
          { path: '/transaction-view', icon: transactionIcon, label: 'Transactions' },
          { path: '/transaction', icon: issuingIcon, label: 'Issuing' },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="group flex items-center w-full p-3 text-white hover:bg-white hover:text-[#255D81] transition-all duration-300"
          >
            <img
              src={link.icon}  
              alt={`${link.label} Icon`}
              className="w-5 h-5 mr-2 transition-all duration-300 
                         group-hover:invert-[500%] group-hover:sepia-[1000%] 
                         group-hover:saturate-[1000%] group-hover:hue-rotate-[175deg]"
            />
            {link.label}
          </Link>
        ))}
      </div>

      {/* Logout Section */}
      <div className="mt-auto w-full">
        <Link
          to="/login"
          className="group flex items-center w-full p-3 text-white hover:bg-white hover:text-[#255D81] transition-all duration-300"
        >
              <img 
          src={logoutIcon} 
          alt="Logout Icon" 
          className="w-5 h-5 mr-2 transition-all duration-300 
                    group-hover:invert-[200%] group-hover:sepia-[1000%] 
                    group-hover:saturate-[100%] group-hover:hue-rotate-[900deg]" 
        />

          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
