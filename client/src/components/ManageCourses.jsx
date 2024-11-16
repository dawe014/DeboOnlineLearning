import { useEffect, useState } from 'react';
import { IoIosWarning } from 'react-icons/io';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Modal,
} from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Assuming the Axios instance is defined here

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false); // For showing the modal
  const [courseToDelete, setCourseToDelete] = useState(null); // Store the course to be deleted

  // Fetch courses from the API when the component mounts
  const fetchCourses = async () => {
    try {
      const response = await apiClient.get('/api/v1/courses');
      setCourses(response.data.data.courses); // Assuming response.data contains the list of courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  console.log(courses);
  

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle delete action
  const confirmDelete = (courseId) => {
    setCourseToDelete(courseId);
    setShowModal(true); // Show modal when user wants to delete
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/v1/courses/${courseToDelete}`);
      fetchCourses(); // Refresh the course list
      setShowModal(false); // Close modal
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

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
                      to={`/edit-course/${course._id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </NavLink>
                    <NavLink
                      to={`/dashboardadmin/course/${course._id}`}
                      className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                    >
                      Lessons
                    </NavLink>
                    <NavLink
                      to="#"
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                      onClick={() => confirmDelete(course._id)} // Trigger modal confirmation
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

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        size="md"
        popup
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <IoIosWarning size={48} className=' w-full text-red-500' />

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this course?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {`Yes, I'm sure`}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
