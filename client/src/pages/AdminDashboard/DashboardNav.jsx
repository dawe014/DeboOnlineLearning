/* eslint-disable react/prop-types */
//eslint-disable-next-line react/prop-types
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { FaBook, FaBookOpen } from 'react-icons/fa';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

export default function DashboardNav({ closeSidebar }) {
  const [isUsersSubMenuOpen, setIsUsersSubMenuOpen] = useState(false);

  const toggleUsersSubMenu = () => {
    setIsUsersSubMenuOpen(!isUsersSubMenuOpen);
  };

  return (
    <div className="flex fixed flex-col space-y-2 px-4 pt-6">
      <div className="hover:bg-slate-400 hover:text-white rounded-lg mb-4">
        <NavLink to="" onClick={closeSidebar}>
          <div className="flex space-x-4 items-center justify-start">
            <MdSpaceDashboard size={20} />
            <p className="font-bold text-2xl">Dashboard</p>
          </div>
        </NavLink>
      </div>

      <h1 className="w-full border"></h1>

      <div className="hover:bg-slate-400 hover:text-white rounded-lg">
        <NavLink to="manage-courses" onClick={closeSidebar}>
          <div className="flex space-x-4 items-center justify-start px-4 py-2">
            <FaBook size={20} />
            <p className="font-semibold text-lg">Manage Courses</p>
          </div>
        </NavLink>
      </div>

      <div className="hover:bg-slate-400 hover:text-white rounded-lg">
        <NavLink to="create-course" onClick={closeSidebar}>
          <div className="flex space-x-4 items-center justify-start px-4 py-2">
            <FaBookOpen size={20} />
            <p className="font-semibold text-lg">Create Courses</p>
          </div>
        </NavLink>
      </div>

      {/* Manage Users Section with Submenu */}
      <div className=" rounded-lg">
        <button
          className="flex space-x-4 items-center justify-start px-4 py-2 w-full"
          onClick={toggleUsersSubMenu}
        >
          <IoMdPerson size={20} />
          <p className="font-semibold text-lg">Manage Users</p>
          {isUsersSubMenuOpen ? (
            <HiChevronUp size={20} />
          ) : (
            <HiChevronDown size={20} />
          )}
        </button>
        {isUsersSubMenuOpen && (
          <div className="pl-8 font-semibold space-y-2">
            <NavLink
              to="manage-students"
              onClick={closeSidebar}
              className="block  hover:bg-slate-400 hover:text-white rounded-lg px-4 py-2"
            >
              Manage Students
            </NavLink>
            <NavLink
              to="manage-instructors"
              onClick={closeSidebar}
              className="block hover:bg-slate-400 hover:text-white rounded-lg px-4 py-2"
            >
              Manage Instructors
            </NavLink>
            <NavLink
              to="add-instructors"
              onClick={closeSidebar}
              className="block hover:bg-slate-400 hover:text-white rounded-lg px-4 py-2"
            >
              Add Instructors
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
