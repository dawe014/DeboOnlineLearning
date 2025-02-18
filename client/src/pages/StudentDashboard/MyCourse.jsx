/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'flowbite-react';
import apiClient from '../../api/apiClient';
import { jwtDecode } from 'jwt-decode';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

export default function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const decodedToken = jwtDecode(token);
  const studentId = decodedToken.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get(
          `/api/v1/enrollments/myCurriculum`,
        );
        const enrollments = response.data.data.enrollments;
        const progressPromises = enrollments.map(async (enrollment) => {
          const progressResponse = await apiClient.get(
            `/api/v1/progress/${studentId}/course/${enrollment.course._id}`,
          );
          const curProgress = await apiClient.get(
            `/api/v1/progress/course/${enrollment.course._id}/progress`,
          );
          return {
            ...enrollment,
            progress: progressResponse.data.data.overallProgress,
            currentContent: curProgress.data.data[0].currentContent,
          };
        });

        const coursesWithProgress = await Promise.all(progressPromises);
        setCourses(coursesWithProgress);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [studentId]);
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col space-y-2 font-montserrat">
      <h1 className="font-semibold text-2xl mb-4">My Courses</h1>
      {courses.map((course) => (
        <Course
          key={course._id}
          id={course.course._id}
          tx_ref={course.tx_ref}
          name={course.course.title}
          progress={course.progress || 0}
          currentContent={course.currentContent || 0}
          isCertified={course.certified}
          price={course.course.price}
          status={course.completed ? 'Completed' : 'In Progress'}
        />
      ))}
    </div>
  );
}

function Course({
  name,
  progress,
  price,
  status,
  id, tx_ref,
  currentContent,
  isCertified,
}) {
  const [showPayModal, setShowPayModal] = useState(false);
  const navigate = useNavigate();
 
  const verifyPayment = async () => {
    try {
     

      if (tx_ref === null) {
        setShowPayModal(true); // Show payment modal
      }
      if (tx_ref !== null) {
        // Proceed to view or download the certificate
        handleCertificateClick();
      } else {
        setShowPayModal(true); // Show payment modal
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('An error occurred while verifying payment.');
    }
  };

  const handleCertificateClick = () => {
    
    navigate(`/certificate/${id}`);
  };


  const handlePayment = async () => {
    try {
      const data = { phoneNumber: '0918344686' }; // Replace with dynamic values
      const resp = await apiClient.post(
        `/api/v1/payment/${id}/accept-payment`,
        data,
      );
      window.location.href = resp.data.data.paymentLink;

    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred while processing the payment.');
    }
  };
  return (
    <div className="mb-16">
      <Card className="w-full md:w-2/3 lg:w-1/2 px-4 py-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{name}</h1>
          {progress > 0 ? (
            <p className="text-gray-600">Progress: {progress}%</p>
          ) : (
            ''
          )}
          {!isCertified ? (
            <div className="flex items-center justify-between">
              <p className="font-bold">{status}</p>
              {progress > 0 ? (
                <NavLink
                  to={`/dashboard/courses/${id}/lesson/${currentContent}`}
                >
                  <button className="font-montserrat font-bold border hover:text-white hover:bg-yellow-500 text-yellow-500 px-3 py-2 border-yellow-300 transition-all duration-200">
                    Resume
                  </button>
                </NavLink>
              ) : (
                <NavLink to={`/dashboard/courses/${id}`}>
                  <button className="font-montserrat font-bold border hover:text-white text-green-500 px-3 py-2 border-green-300 transition-all duration-200">
                    Start
                  </button>
                </NavLink>
              )}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between">
              <button
                onClick={(price === 0) ? handleCertificateClick : verifyPayment}
                className="w-full md:w-max font-montserrat font-bold border hover:text-white hover:bg-green-500 text-green-500 px-3 py-2 border-green-300 transition-all duration-200"
              >
                View/Download Certificate
              </button>
              <NavLink to={`/dashboard/courses/${id}`}>
                <button className="w-100 md:w-max font-montserrat font-bold border hover:text-white text-green-500 px-3 py-2 border-green-300 transition-all duration-200">
                  View
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </Card>

      {/* Modal to ask user to pay */}
      <Modal
        size="sm"
        show={showPayModal}
        onClose={() => setShowPayModal(false)}
      >
        <Modal.Header >Payment Required</Modal.Header>
        <Modal.Body className="text-white ">
          <p>
            To view or download the certificate for <strong>{name}</strong>, you
            need to pay <strong>{`${price} ETB`}</strong>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePayment}>{`Pay ${price} ETB`}</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
