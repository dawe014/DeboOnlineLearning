import { FaBookReader } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import { Progress } from 'flowbite-react';
import LessonsNav from './LessonsNav';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

export default function OpenCourse() {
  return (
    <div className="bg-yellow-50 dark:text-white font-montserrat dark:bg-slate-900 min-h-screen">
      <Header />
      <Dashboard />
    </div>
  );
}

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false); // State for sidebar visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container text-slate-900 dark:text-white dark:bg-slate-900 px-4 md:px-8 pt-32  relative">
      <div className="flex  justify-start">
        {isOpen ? (
          <IoClose
            size={24}
            onClick={toggleMenu}
            className="cursor-pointer lg:hidden text-2xl fixed top-16  left-4 z-50" // Fixed position on small screens
          />
        ) : (
          <HiMenu
            size={24}
            onClick={toggleMenu}
            className="cursor-pointer lg:hidden text-2xl fixed top-16 left-4 z-50" // Fixed position on small screens
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-4 sm:space-y-2 items-start lg:justify-between">
        <div className="flex justify-start space-x-4 items-center">
          <FaBookReader size={26} className="text-yellow-500" />
          <h1 className="text-md md:text-3xl font-extrabold">Course Name</h1>
        </div>
        <div className="flex justify-start space-x-4 items-center ">
          <Progress className='w-48'
      progress={45}
      progressLabelPosition="inside"
      textLabel="Progress"
      textLabelPosition="outside"
      size="lg"
      labelProgress
      labelText
    />
        </div>
      </div>

      <div className="flex w-full mt-4 space-x-2">
        <div className="hidden lg:block  sticky top-12 z-10 w-80 max-h-screen">
          {' '}
          {/* Sidebar for larger screens */}
          <LessonsNav />
        </div>
        <div className="flex-1">
          {' '}
          {/* Content area */}
          <Outlet />
        </div>
      </div>

      {/* Sidebar for small screens */}
      {isOpen && (
        <div className="absolute left-4 lg:hidden top-16  shadow-lg  ">
          <div className="fixed top-12 z-10 w-64 h-screen">
            <LessonsNav />
          </div>
        </div>
      )}
    </div>
  );
}
