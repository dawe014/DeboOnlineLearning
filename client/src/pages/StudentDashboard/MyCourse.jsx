/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { Button, Card,  } from 'flowbite-react';
import apiClient from '../../api/apiClient';
import { jwtDecode } from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/Loader';
// import Certificate from './Certificate';

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
        // Fetch enrollments for the current student
        const response = await apiClient.get(
          `/api/v1/enrollments/myCurriculum`,
        );
        const enrollments = response.data.data.enrollments;
        console.log('errolement', enrollments);
        // Fetch progress for each course

        const progressPromises = enrollments.map(async (enrollment) => {
          console.log('studentid course id', studentId, enrollment.course._id);
          const progressResponse = await apiClient.get(
            `/api/v1/progress/${studentId}/course/${enrollment.course._id}`,
          );
          console.log('progress response', progressResponse.data.data);
          const curProgress = await apiClient.get(
            `/api/v1/progress/course/${enrollment.course._id}/progress`,
          );
          return {
            ...enrollment,
            progress: progressResponse.data.data.overallProgress, // Adjust based on your API response
            currentContent: curProgress.data.data[0].currentContent,
          };
        });
        console.log('progress promise', progressPromises);
        try {
          console.log('try');
          const coursesWithProgress = await Promise.all(progressPromises);
          console.log('progress is', coursesWithProgress);
          setCourses(coursesWithProgress);
        } catch (error) {
          console.log('catch');
          console.error('Error resolving progress promises:', error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [studentId]);
  console.log('courses', courses);
  if (loading)
    return (
      <Loader/>
    );
  console.log(error);
  return (
    <div className="flex flex-col space-y-2 font-montserrat">
      <h1 className="font-semibold text-2xl mb-4">My Courses</h1>
      {courses.map((course) => (
        <Course
          key={course._id}
          id={course.course._id}
          name={course.course.title} // Adjust based on your data structure
          progress={course.progress || 0} // Default to 0 if progress is not available
          currentContent={course.currentContent || 0}
          isCertified={course.certified}
          status={course.completed ? 'Completed' : 'In Progress'} // Adjust based on your data structure
        />
      ))}
    </div>
  );
}
function Course({ name, progress, status, id, currentContent, isCertified }) {
  return (
    <div className="mb-16">
      <Card className="w-full md:w-2/3 lg:w-1/2 px-4 py-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{name}</h1>
          {/* Conditionally display progress */}
          {progress > 0 ? (
            <p className="text-gray-600">Progress: {progress}%</p>
          ) : (
            '' // Optional message
          )}
          {!isCertified ? (
            <div className="flex items-center justify-between">
              <p className="font-bold">{status}</p>
              {/* Conditionally render the button */}
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
                  <button className="font-montserrat font-bold border hover:text-white  text-green-500 px-3 py-2 border-green-300 transition-all duration-200">
                    Start
                  </button>
                </NavLink>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <NavLink to={`/certificate/${id}`}>
                <Button color="green">View/Download Certificate</Button>
              </NavLink>
              {/* Conditionally render the button */}

              <NavLink to={`/dashboard/courses/${id}`}>
                <button className="font-montserrat font-bold border hover:text-white  text-green-500 px-3 py-2 border-green-300 transition-all duration-200">
                  view
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </Card>
      {/* <Certificate /> */}
    </div>
  );
}
