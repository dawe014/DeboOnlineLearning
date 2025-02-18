import { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../api/apiClient';
import Loader from './Loader';

export default function Statistic() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const decodedToken = jwtDecode(token);
  const { id, role } = decodedToken;
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/v1/stats');
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics', error);
        setLoading(false);
      }
    };
    const fetchInstStatus = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/v1/stats/${id}`);
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics', error);
        setLoading(false);
      }
    };
    if (role === 'admin') {
      fetchStats();
    } else {
      fetchInstStatus();
    }
  }, [role, id]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {role === 'admin' && (
        <Card>
          <h5 className="text-xl font-bold">Total Users</h5>
          <p className="text-4xl font-semibold">{stats.totalUsers}</p>
        </Card>
      )}
      <Card>
        <h5 className="text-xl font-bold">Total Courses</h5>
        <p className="text-4xl font-semibold">{stats.totalCourses}</p>
      </Card>

      <Card>
        <h5 className="text-xl font-bold">Total Enrollments</h5>
        <p className="text-4xl font-semibold">{stats.totalEnrollments}</p>
      </Card>
    </div>
  );
}
