import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the dropdown menu state
  };

  return (
    <div className="z-50 fixed w-screen border-b-2 border-black bg-slate-900">
      <div className="container px-4 md:px-8 text-white mx-auto h-16 flex items-center justify-between">
        <div>
          <NavLink to="/" className="text-2xl">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 bg-white rounded-full"
            />
          </NavLink>
        </div>
        <button
          onClick={toggleMenu} // Toggle dropdown on button click
          type="button"
          className="inline-flex text-3xl items-center p-2 w-10 h-10 justify-center  text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen} // Update aria-expanded based on state
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? 'X' : <MdMenu />} {/* Simple toggle indicator */}
        </button>
        {/* Desktop menu */}
      <div className="hidden md:flex md:space-x-4 md:justify-end">
        <NavLink
          to="/login"
          className="font-montserrat font-bold border hover:text-white text-yellow-500 px-3 py-2 border-yellow-300"
        >
          Log in
        </NavLink>
        <NavLink
          to="/register"
          className="font-montserrat font-bold border text-yellow-500 px-3 py-2 hover:text-white border-yellow-300"
        >
          Register
        </NavLink>
      </div>

      </div>

      {/* Dropdown menu for mobile */}
      <div
        className={`md:hidden bg-slate-700 md:bg-slate-900 text-white transition-all duration-200 ease-in-out ${isOpen ? 'block' : 'hidden'}`} // Show or hide based on state
        id="navbar-default"
      >
        <NavLink
          to="/login"
          className="block font-montserrat font-bold border hover:text-white text-yellow-500 px-3 py-2 border-none md:border-yellow-300"
        >
          Log in
        </NavLink>
        <NavLink
          to="/register"
          className="block font-montserrat font-bold border text-yellow-500 px-3 py-2 hover:text-white border-none md:border-yellow-300"
        >
          Register
        </NavLink>
      </div>

          </div>
  );
}
