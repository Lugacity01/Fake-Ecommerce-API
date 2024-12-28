import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Logout from "../pages/Auth/components/Logout";
import useAuth from "../hooks/useAuth";
// import Logout from "../pages/Auth/components/Logout";

const TopNavBar = () => {
  
  const {userDetails} = useAuth();
  
  // Get the current time to determine greeting
  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="flex flex-row items-center justify-between bg-[#F5F8FB] p-6 text-[#2C3E50] shadow-md">
      {/* Left Section: Welcome Message */}
      <div className="flex justify-center">
        <div>
          <h1 className="text-lg hidden lg:block font-bold text-[#2C3E50]">
            Welcome to Fake E-commerce 
          </h1>
            {userDetails ? (
              <h2 className="text-lg  capitalize text-[#2C3E50]">{greeting} {userDetails.name.firstname}</h2>
              
            ) : ''}
        </div>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search your course..."
          className="w-96 hidden lg:block transform rounded-l-md border border-[#2C3E50] px-4 py-2 outline-none transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
        />
      </div>

      {/* Right Section: Logout Button */}
      <div className="flex items-center gap-4">
        <button className="lg:flex items-center gap-2 rounded-md bg-[#116A7B] lg:px-4 lg:py-2 px-2 py-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#A7D7C5] hover:text-[#116A7B]">
          <span>
            <Logout
              Logout={
                <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
              }
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopNavBar;
