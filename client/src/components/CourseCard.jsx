/* eslint-disable react/prop-types */


import { Button, Card, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
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
  }, []); 
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 lg:grid-cols-3 text-white mx-auto">
      {courses.map((course) => (
        <MyCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export function MyCard({ course }) {

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
        setInstructorName(response.data.data.name); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching instructor details:', error);
        setLoading(false);
      }
    };

    if (course.instructor) {
      fetchInstructorName(); 
    }
  }, [course.instructor]); // Dependency on course.instructor to run the effect when it changes

  const handleEnroll = async () => {
    try {

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

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Card
        className="max-w-sm"
        imgAlt="course image"
        imgSrc={`http://localhost:3000/api/v1/images/cover_images/${course.coverImage}`}
      >
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {course.title}
          </h5>
        </a>

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
              Instructor: {instructorName}
            </h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Category: {course.category}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Price: {course.price}ETB
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
