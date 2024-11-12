import { NavLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function ManageUsers() {
  return (
    <div>
      <h1 className="mt-8 text-2xl font-poppins  mb-4">Manage Courses</h1>
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>User name</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>

            <TableHeadCell>
              <span className="sr-only">Edit</span>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-slate-900 dark:text-white">
                {'Chala Tola'}
              </TableCell>
              <TableCell>Student</TableCell>
              <TableCell className="flex space-x-4">
                <NavLink
                  to="user-id"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </NavLink>
                <NavLink
                  to="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-red-500"
                >
                  Delete
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Sena Oljira'}
              </TableCell>
              <TableCell>Admin</TableCell>
              <TableCell className="flex space-x-4">
                <NavLink
                  to="user-id"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </NavLink>
                <NavLink
                  to="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-red-500"
                >
                  Delete
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Robera Qanno'}
              </TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell className="flex space-x-4">
                <NavLink
                  to="user-id"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </NavLink>
                <NavLink
                  to="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-red-500"
                >
                  Delete
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Fenet Tamiru'}
              </TableCell>
              <TableCell>Student</TableCell>
              <TableCell className="flex space-x-4">
                <NavLink
                  to="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </NavLink>
                <NavLink
                  to="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-red-500"
                >
                  Delete
                </NavLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
