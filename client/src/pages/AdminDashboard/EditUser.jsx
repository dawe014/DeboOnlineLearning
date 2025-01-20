import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import apiClient from '../../api/apiClient'; // Ensure this is properly set up
import Loader from '../../components/Loader';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // Loading state for update
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/api/v1/users/${id}`);
        setUserData({
          name: response.data.data.name,
          email: response.data.data.email,
          role: response.data.data.role,
        });
        setRole(response.data.data.role);
      } catch (error) {
        console.log(error)
        setErrorMessage('Error fetching user data!');
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the role has been changed
    if (userData.role === role) {
      setErrorMessage('No changes detected. Please modify the role to update.');
      setShowModal(true);
      return;
    }

    setIsUpdating(true); // Start the loading state
    try {
      const response = await apiClient.patch(`/api/v1/users/${id}/role`, userData);
      if (response.status === 200) {
        setSuccessMessage('User updated successfully!');
        setShowModal(true);
        setTimeout(() => {
          navigate(-1); // Redirect after success
        }, 2000);
      }
    } catch (error) {
      console.log(error)
      setErrorMessage('Error updating user!');
      setShowModal(true);
    } finally {
      setIsUpdating(false); // End the loading state
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="mt-8 text-2xl font-poppins mb-4">Edit User Role</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            className="w-full bg-gray-200 text-slate-900 border-gray-300 border rounded-md p-2"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            className="w-full bg-gray-200 text-slate-900 border-gray-300 border rounded-md p-2"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block font-semibold mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full bg-gray-200 text-slate-900 border-gray-300 border rounded-md p-2"
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full font-semibold py-2 px-4 rounded-md ${
            isUpdating ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Update User'}
        </button>
      </form>

      {/* Modal for success or error messages */}
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
        >
          <Modal.Header>
            {successMessage ? 'Success' : 'Error'}
          </Modal.Header>
          <Modal.Body>
            <p className={successMessage ? 'text-green-500' : 'text-red-500'}>
              {successMessage || errorMessage}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => setShowModal(false)}
              className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
