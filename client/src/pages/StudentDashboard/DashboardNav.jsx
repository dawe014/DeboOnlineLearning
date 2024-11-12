import { NavLink } from "react-router-dom";

export default function DashboardNav() {
  return (
    <div className="flex   space-x-4 items-start justify-center md:justify-start mt-12 mb-12 ">
      <NavLink
        to="mycourse"
        className="px-4 py-2 md:px-8 bg-yellow-500 rounded-lg text-slate-900 font-bold"
      >
        My Course
      </NavLink>
      <NavLink
        to="courses"
        className="px-4 py-2 md:px-8  text-yellow-300 rounded-lg bg-slate-700 font-bold"
      >
        Open Courses
      </NavLink>
    </div>
  );
}
