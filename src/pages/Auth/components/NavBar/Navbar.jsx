// import React from 'react'

import { Outlet } from "react-router-dom"
import Sidebar from "../../../../Layout/SideBar"
import TopNavBar from "../../../../Layout/TopNavBar";

const Navbar = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopNavBar/>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Navbar