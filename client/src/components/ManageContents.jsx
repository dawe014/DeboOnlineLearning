
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import BackButton from './BackButton';

export default function ManageContents() {
  return (
    <div>
      <BackButton />
      <h1 className="mt-8 text-2xl font-poppins  mb-4">Course name/ lesson</h1>

      <div className="overflow-x-auto mb-4">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>Content Title</TableHeadCell>
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
                  to="edit-content"
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
                Digital Marketing
              </TableCell>

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
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                React native
              </TableCell>

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
      <NavLink to="add-content">
        <Button className="dark:text-yellow-400 font-bold hover:text-white ">
          Add Content
        </Button>
      </NavLink>
    </div>
  );
}
