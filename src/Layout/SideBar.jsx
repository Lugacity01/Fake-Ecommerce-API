import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBox,
  faShoppingCart,
  faUsers,
  faSignOutAlt,
  faPlusCircle,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Logout from "../pages/Auth/components/Logout";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/", icon: faTachometerAlt },
    { name: "Products", path: "/products", icon: faBox },
    { name: "Add New Product", path: "/add-new-products", icon: faPlusCircle },
    { name: "Cart", path: "/cart", icon: faShoppingCart },
    // { name: "Users", path: "/users", icon: faUsers },
    { name: "Settings", path: "/settings", icon: faGear },
  ];

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`sticky top-0 h-screen ${
        isExpanded ? "w-64 bg-[#8fbdbd]" : "w-20"
      } flex flex-col bg-[#E3F4F4] p-6 text-[#116A7B] transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div
        onClick={toggleSidebar}
        className="mb-8 flex cursor-pointer items-center gap-2"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-gray-900">
          FK
        </div>

        {isExpanded && <h2 className="text-md lg:block hidden font-bold">FAKE E-COMM API</h2>}
        {isExpanded && <h2 className="text-md block lg:hidden font-bold">FEA</h2>}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `my-2 flex cursor-pointer items-center gap-3 rounded p-2 transition-colors duration-300 ${
                isActive ? "bg-[#116A7B] text-white" : "hover:bg-[#A7D7C5]"
              } ${isExpanded ? "justify-start p-2" : "justify-center"}`
            }
          >
            <FontAwesomeIcon icon={link.icon} className="transition-colors duration-300" />
            {isExpanded && <span>{link.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          className={`flex ${
            isExpanded ? "justify-center gap-2" : "justify-center"
          } w-full items-center rounded bg-[#116A7B] py-2 text-white transition-colors duration-300 hover:bg-[#A7D7C5]`}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          {isExpanded && (
            <span>
              <Logout Logout="Logout" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
