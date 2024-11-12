import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoMdPerson } from 'react-icons/io';
import { FaBook, FaBookOpen } from 'react-icons/fa';

export default function DashboardNav() {
  return (
    <div className="fixed  flex flex-col space-y-2  px-4 md:ps-12 pt-6">
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
        <NavLink to="manage-courses">
          <div className="flex space-x-4 items-center justify-start px-4 py-2 ">
            <FaBook size={20} />
            <p className="font-semibold text-lg">Manage Courses</p>
          </div>
        </NavLink>
      </div>

      <div className=" hover:bg-slate-400 hover:text-white  rounded-lg">
        <NavLink to="create-course">
          <div className="flex space-x-4 items-center justify-start px-4 py-2 ">
            <FaBookOpen size={20} />
            <p className="font-semibold text-lg">Create Courses</p>
          </div>
        </NavLink>
      </div>
      <div className=" hover:bg-slate-400 hover:text-white  rounded-lg">
        <NavLink to="manage-users">
          <div className="flex space-x-4 items-center justify-start px-4 py-2 ">
            <IoMdPerson size={20} />
            <p className="font-semibold text-lg">Manage Users</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
