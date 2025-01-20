/* eslint-disable react/prop-types */

const AdminProfile = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h3 className="text-lg font-semibold mb-4">Platform Statistics</h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Total Users:</span>
          <span>{stats.totalUsers}</span>
        </li>
        <li className="flex justify-between">
          <span>Active Courses:</span>
          <span>{stats.activeCourses}</span>
        </li>
        <li className="flex justify-between">
          <span>Daily Active Users:</span>
          <span>{stats.dailyActiveUsers}</span>
        </li>
      </ul>
    </div>
  );
};

export default AdminProfile;
