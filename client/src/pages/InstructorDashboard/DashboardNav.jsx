import {  FaBook, FaBookOpen } from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import { MdSpaceDashboard } from 'react-icons/md';

import { NavLink } from 'react-router-dom';

export default function DashboardNav() {
  return (
    <div className=" flex flex-col space-y-2  px-4 md:ps-12 pt-6">
      
      <div className=" hover:bg-slate-400 hover:text-white  rounded-lg mb-4">
        <NavLink to="">
          <div className="flex space-x-4 items-center justify-start ">
            <MdSpaceDashboard size={20} />
            <p className="font-bold text-2xl">Dashboard</p>
          </div>
        </NavLink>
      </div>

      <h1 className="w-full border"></h1>

      <div className=" hover:bg-slate-400 hover:text-white  rounded-lg">
        <NavLink to="create-course">
          <div className="flex space-x-4 items-center justify-start px-4 py-2 ">
            <FaBookOpen size={20} />
            <p className="font-semibold text-xl">Create Course</p>
          </div>
        </NavLink>
      </div>

      <div className=" hover:bg-slate-400 hover:text-white  rounded-lg">
        <NavLink to="my-courses">
          <div className="flex space-x-4 items-center justify-start px-4 py-2 ">
            <FaBook size={20} />
            <p className="font-semibold text-xl">My Courses</p>
          </div>
        </NavLink>
      </div>
      <div className=" hover:bg-slate-400 hover:text-white  rounded-lg">
        <NavLink to="enrolled-students">
          <div className="flex space-x-4 items-center justify-start px-4 py-2 ">
            <PiStudentBold size={20} />
            <p className="font-semibold text-xl">Enrolled Students</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
