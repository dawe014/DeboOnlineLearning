import {
  Button,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from 'flowbite-react';
import { NavLink, Outlet } from 'react-router-dom';
import BackButton from './BackButton';

export default function ManageLessons() {
  return (
    <div>
      <BackButton/>
      <h1 className="mt-8 text-2xl font-poppins  mb-4">Course Name</h1>

      <div className="overflow-x-auto mb-4">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>Lessons</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {'Web Development'}
              </TableCell>

              <TableCell className="flex space-x-4">
                <NavLink
                  to="content"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </NavLink>
                <NavLink
                  to="content"
                  className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                >
                  Contents
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
                Digital Marketing
              </TableCell>

              <TableCell className="flex space-x-4">
                <NavLink
                  to="content"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </NavLink>
                <NavLink
                  to="content"
                  className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                >
                  Contents
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
                React native
              </TableCell>

              <TableCell className="flex space-x-4">
                <NavLink
                  to="content"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </NavLink>
                <NavLink
                  to="content"
                  className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                >
                  Contents
                </NavLink>
                <NavLink
                  to=""
                  className="font-medium text-cyan-600 hover:underline dark:text-red-500"
                >
                  Delete
                </NavLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className=" flex flex-col space-y-4 ">
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="title" value="Lesson title" />
          <TextInput
            id="title"
            type="text"
            className="outline-none"
            sizing="md"
          />
        </div>
        <Button className="dark:text-yellow-400 font-bold hover:text-white w-max">
          Add lesson
        </Button>
      </div>
      <Outlet />
    </div>
  );
}
