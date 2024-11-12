import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import DashboardNav from './DashboardNav';
import { FaBookReader } from 'react-icons/fa';

export default function StudentDashboard() {
  return (
    <div className="bg-yellow-50 dark:text-white dark:bg-slate-900">
      <Header />
      <Dashboard />
    </div>
  );
}
function Dashboard() {
  return (
    <div className="container text-slate-900 dark:text-white dark:bg-slate-900 px-4 md:px-8 pt-32 pb-16">
      <div className=" flex justify-start space-x-4 items-center">
<FaBookReader size={26} className='text-yellow-500' />

      <h1 className="text-3xl font-extrabold">Courses</h1>
      </div>
      <DashboardNav/>
      <Outlet />
    </div>
  );
}
