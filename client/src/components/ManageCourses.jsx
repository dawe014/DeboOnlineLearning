import  { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Assuming the Axios instance is defined here

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get('/api/v1/courses');
        setCourses(response.data.data.courses); // Assuming response.data contains the list of courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="mt-8 text-2xl font-poppins mb-4">Manage Courses</h1>

      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>Course Name</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>No. of Students</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {courses.length > 0 ? (
              courses.map((course) => (
                <TableRow
                  key={course._id} // Ensure each row has a unique key
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {course.title}
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>get it later</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell className="flex space-x-4">
                    <NavLink
                      to={`/edit-course/${course.id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </NavLink>
                    <NavLink
                      to={`/dashboardadmin/course/${course.id}`}
                      className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                    >
                      Lessons
                    </NavLink>
                    <NavLink
                      to="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-red-500"
                      onClick={() => handleDelete(course._id)} // Handle delete if needed
                    >
                      Delete
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No courses available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

async function handleDelete(courseId) {
  // You can implement the delete functionality here
  try {
        const response = await apiClient.delete(`/api/v1/courses/${courseId}`);
        console.log(response)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
 
}
