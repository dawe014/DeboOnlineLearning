import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import DashboardNav from './DashboardNav';
// import { HiMenu, HiX } from 'react-icons/hi'; // Menu and close icons

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Header toggleNav={toggleSidebar} isOpenNav={isSidebarOpen}/>
      <section className="bg-white container dark:bg-slate-900 dark:text-white flex-1">
        <div className="flex flex-col lg:flex-row">
          {/* Hamburger menu for mobile */}
          {/* <div className="lg:hidden p-4 mt-14">
            <button className="text-yellow-500" onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <HiX size={30} /> // Close icon when sidebar is open
              ) : (
                <HiMenu size={30} /> // Menu icon when sidebar is closed
              )}
            </button>
          </div> */}

          {/* Backdrop for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 mt-12 bg-black opacity-50 z-40"
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar for mobile (as a modal) */}
          <div
            className={`fixed inset-0 bg-slate-900 text-yellow-500 font-montserrat transition-all duration-300 ease-in-out z-50 mt-16 lg:hidden ${
              isSidebarOpen ? 'transform-none' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-col pt-4 px-4 space-y-2">
              {/* Close button inside the modal */}
              {/* <button
                className="text-yellow-500 absolute top-4 right-4"
                onClick={closeSidebar}
              >
                <HiX size={30} />
              </button> */}
              <DashboardNav closeSidebar={closeSidebar} />{' '}
              {/* Pass closeSidebar function */}
            </div>
          </div>

          {/* Sidebar for large screens (normal display) */}
          <div className="hidden min-h-svh lg:block lg:w-1/4 bg-slate-800 text-yellow-500 pt-16">
            <DashboardNav closeSidebar={closeSidebar} />
          </div>

          {/* Main content area */}
          <div className="mt-16 lg:mt-16 w-full lg:w-3/4 px-4 md:px-8">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}
