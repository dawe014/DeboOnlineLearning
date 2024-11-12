/* eslint-disable react/prop-types */

import { Button, Card, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CourseCard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/courses',
        );
        setCourses(response.data.data.courses); // Update the state with the fetched courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run once when the component mounts

  console.log(courses);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 lg:grid-cols-3 text-white">
      {courses.map((course) => (
        <MyCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export function MyCard({ course }) {
  const [openModal, setOpenModal] = useState(false);
  const [instructorName, setInstructorName] = useState('');

  // Fetch the instructor name based on the instructor ID
  useEffect(() => {
    const fetchInstructorName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/users/${course.instructor}`,
        );
        setInstructorName(response.data.data.name); // Assuming the API returns a "name" field
        console.log(response);
        
      } catch (error) {
        console.error('Error fetching instructor details:', error);
      }
    };

    if (course.instructor) {
      fetchInstructorName(); // Fetch instructor name when the instructor ID is available
    }
  }, [course.instructor]); // Dependency on course.instructor to run the effect when it changes

  return (
    <>
      <Card className="max-w-sm" imgAlt="course image" imgSrc="/image1.png">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {course.title}
          </h5>
        </a>
        <div className="mb-5 mt-2.5 flex items-center">
          <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            {instructorName || 'Loading...'}{' '}
            {/* Display the instructor's name */}
          </h5>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="rounded-lg bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700 transition-all duration-200"
            onClick={() => setOpenModal(true)}
          >
            Details
          </button>
          <a
            href="#"
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 transition-all duration-200"
          >
            Enroll
          </a>
        </div>
      </Card>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{course.title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h1 className="text-gray-300 dark:text-gray-400">
              {instructorName}
            </h1>{' '}
            {/* Display the instructor name */}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {course.category}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {course.description}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={() => setOpenModal(false)}>Enroll</Button>
          <Button color="red" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
