/* eslint-disable react/prop-types */

const InstructorProfile = ({ createdCourses }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h3 className="text-lg font-semibold mb-4">Created Courses</h3>
      {createdCourses.length ? (
        <ul className="space-y-3">
          {createdCourses.map((course, index) => (
            <li key={index} className="p-4 border rounded-lg shadow-sm">
              <h4 className="font-medium">{course.title}</h4>
              <p className="text-sm text-gray-500">
                Enrolled Students: {course.studentsEnrolled}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No courses created yet.</p>
      )}
    </div>
  );
};

export default InstructorProfile;
