import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import DashboardNav from "./DashboardNav";

export default function InstructorDashboard() {
  return (
    <div>
      <Header />
      <section className="bg-white dark:bg-slate-800 dark:text-white min-h-screen ">
        <div className="    flex ">
          <div className=" w-1/4 min-h-screen pt-16 hidden lg:block bg-slate-900 text-yellow-500 font-montserrat">
            <DashboardNav />
          </div>
          <div className="mt-16 w-full lg:w-3/4 px-4 md:px-8">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}
