/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { Avatar, Dropdown } from 'flowbite-react';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../api/apiClient';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

export default function Header({ toggleNav, isOpenNav }) {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [user, setUser] = useState(null); // State to hold user info
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const [userRole, setUserRole] = useState(null)
  const [isSidebar, setIsSidebar] = useState(false);
const location = useLocation();
  

  useEffect(() => {
    setIsSidebar(
      location.pathname !== '/' &&
        location.pathname !== '/my-profile' &&
        location.pathname !== '/dashboard' &&
        location.pathname !== '/dashboard/mycourse' &&
        location.pathname !== '/dashboard/courses' &&
        location.pathname !== '/login' &&
        location.pathname !== '/register',
    );
  }, [location.pathname]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage

      if (token) {
        try {
          const decoded = jwtDecode(token); // Decode the token
          const userId = decoded.id;
          setUserRole(decoded.role)
          const response = await apiClient.get(`/api/v1/users/${userId}`);
          if (response.status !== 200) {
            throw new Error('Failed to fetch user details');
          }

          const data =
            response.data.data.profilePicture || 'default_profile.jpg';
          setUser(data); // Set user details in state
          setIsLoggedIn(true); // Update login state
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails(); // Call the async function
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the dropdown menu state
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setUser(null); // Clear user info
    setIsLoggedIn(false); // Update login state
  };

  return (
    <div className="z-50 fixed w-screen border-b-2 border-black bg-slate-900">
      <div className="container px-4 md:px-8 text-white mx-auto h-16 flex items-center justify-between">
        <div className={`${isSidebar ? '' : 'hidden'} lg:hidden`}>
          {/* Toggle Menu */}
          {isOpenNav ? (
            <IoClose
              size={32}
              onClick={toggleNav}
              className="cursor-pointer lg:hidden text-2xl   bg-slate-900  left-4 z-50"
            />
          ) : (
            <HiMenu
              size={32}
              onClick={toggleNav}
              className="cursor-pointer bg-slate-900  lg:hidden text-2xl  left-4 z-50"
            />
          )}
        </div>
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
          className="inline-flex text-3xl items-center w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen} // Update aria-expanded based on state
        >
          <span className="sr-only">Open main menu</span>
          {isLoggedIn ? (
            <Avatar
              img={`http://localhost:3000/api/v1/images/profile_pictures/${user}`} // Access the profile picture from the user object
              rounded={true}
            />
          ) : isOpen ? (
            'X'
          ) : (
            <MdMenu />
          )}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex md:space-x-4 md:justify-end">
          {isLoggedIn ? (
            <Dropdown
              label={
                <>
                  <Avatar
                    img={`http://localhost:3000/api/v1/images/profile_pictures/${user}`} // Access the profile picture from the user object
                    rounded={true}
                  />
                </>
              }
              inline
            >
              <Dropdown.Item>
                <NavLink
                  to={`${userRole === 'admin' ? '/dashboardadmin' : userRole === 'instructor' ? '/dashboardinst' : '/dashboard'}`}
                  className="block px-4 py-2 text-sm"
                >
                  My Dashboard
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to="/my-profile" className="block px-4 py-2 text-sm">
                  My Profile
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Dropdown menu for mobile */}
      <div
        className={`md:hidden bg-slate-700 md:bg-slate-900 h-svh w-1/2 text-white transition-all duration-200 ease-in-out ${
          isOpen ? 'block' : 'hidden'
        }`} // Show or hide based on state
        id="navbar-default"
      >
        {isLoggedIn ? (
          <>
            <NavLink
              to={`${userRole === 'admin' ? '/dashboardadmin' : userRole === 'instructor' ? '/dashboardinst' : '/dashboard'}`}
              className="block font-montserrat font-bold border hover:text-white text-yellow-500 px-3 py-2 border-none md:border-yellow-300"
            >
              My Dashboard
            </NavLink>
            <NavLink
              to="/my-profile"
              className="block font-montserrat font-bold border hover:text-white text-yellow-500 px-3 py-2 border-none md:border-yellow-300"
            >
              My Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="block w-full text-left font-montserrat font-bold border hover:text-white text-yellow-500 px-3 py-2 border-none md:border-yellow-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
