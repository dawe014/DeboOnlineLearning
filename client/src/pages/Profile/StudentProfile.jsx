/* eslint-disable react/prop-types */


const StudentProfile = ({ courses }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h3 className="text-lg font-semibold mb-4">Enrolled Courses</h3>
      {courses.length ? (
        <ul className="space-y-3">
          {courses.map((course, index) => (
            <li key={index} className="p-4 border rounded-lg shadow-sm">
              <h4 className="font-medium">{course.title}</h4>
              <p className="text-sm text-gray-500">
                Progress: {course.progress}%
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No enrolled courses yet.</p>
      )}
    </div>
  );
};

export default StudentProfile;
