/* eslint-disable react/prop-types */

// import jwtDecode from 'jwt-decode';

import { Button, Card, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import apiClient from '../api/apiClient';
import Loader from './Loader';
export default function CourseCard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);

      try {
        const response = await apiClient.get('/api/v1/courses');
        setCourses(response.data.data.courses); // Update the state with the fetched courses
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run once when the component mounts
  if (loading) {
    return <Loader />;
  }
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
  // const token = localStorage.getItem('token');

  //   const decodedToken = jwtDecode(token);

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [instructorName, setInstructorName] = useState('');
  const [enrollmentMessage, setEnrollmentMessage] = useState('');
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  // Fetch the instructor name based on the instructor ID
  useEffect(() => {
    const fetchInstructorName = async () => {
      try {
              setLoading(true);

        const response = await apiClient.get(
          `/api/v1/users/${course.instructor}`,
        );
        setInstructorName(response.data.data.name); // Assuming the API returns a "name" field
              setLoading(false);

      } catch (error) {
        console.error('Error fetching instructor details:', error);
              setLoading(false);

      }
    };

    if (course.instructor) {
      fetchInstructorName(); // Fetch instructor name when the instructor ID is available
    }
  }, [course.instructor]); // Dependency on course.instructor to run the effect when it changes

  const handleEnroll = async () => {
    try {
      // const studentId = `${decodedToken.id}`; // Replace with the actual student ID from your auth context or state
      // const enrollmentData = {
      //   course: course._id,
      //   student: studentId,
      // };

      const response = await apiClient.post(
        `/api/v1/enrollments/${course._id}/enroll`,
      );
      console.log('Enrollment successful:', response.data);
      setEnrollmentMessage('Successfully enrolled in the course!');
      setEnrollmentSuccess(true);
      setEnrollmentModalOpen(true); // Show the enrollment result modal
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setEnrollmentMessage('Enrollment failed. Please try again.');
      setEnrollmentSuccess(false);
      setEnrollmentModalOpen(true); // Show the enrollment result modal
    }
  };

  if(loading){
    return <Loader/>
  }
  return (
    <>
      <Card className="max-w-sm" imgAlt="course image" imgSrc="/image1.png">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {course.title}
          </h5>
        </a>
        <div className="mb-1 mt-1 flex items-center">
          <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            {instructorName || 'Loading...'}
          </h5>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="rounded-lg bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700 transition-all duration-200"
            onClick={() => setOpenModal(true)}
          >
            Details
          </button>
          <button
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 transition-all duration-200"
            onClick={handleEnroll}
          >
            Enroll
          </button>
        </div>
      </Card>

      {/* Details Modal */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{course.title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h1 className="text-gray-300 dark:text-gray-400">
              {instructorName}
            </h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {course.category}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {course.description}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Enrollment Result Modal */}
      <Modal
        show={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
      >
        <Modal.Header>
          {enrollmentSuccess ? 'Enrollment Successful' : 'Enrollment Failed'}
        </Modal.Header>
        <Modal.Body>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-200">
            {enrollmentMessage}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setEnrollmentModalOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
