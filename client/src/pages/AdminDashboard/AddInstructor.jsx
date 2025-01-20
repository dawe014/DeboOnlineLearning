import { useState } from 'react';
import { Modal } from 'flowbite-react';
import apiClient from '../../api/apiClient';

export default function AddInstructor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    setLoading(true); // Set loading state
    setErrorMessage(''); // Clear any previous error message

    const instructorData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'instructor', // Automatically assign the "Instructor" role
    };

    try {
      // Simulate a server request
      const response = await apiClient.post(
        '/api/v1/users/registerInstructor',
        instructorData,
      );

      if (response.status === 201) {
        setSuccessMessage('Instructor added successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setErrorMessage('');
        setIsModalOpen(true); // Open modal on success
      }
    } catch (error) {
      console.error('Error registering:', error);
      setErrorMessage(
        `Registration failed. ${error.response?.data?.message || 'An error occurred'}`,
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-slate-700 p-6 rounded-md shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        Add Instructor
      </h2>
      {errorMessage && (
        <p className="bg-red-100 text-red-800 p-2 rounded-md mb-4">
          {errorMessage}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1 text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-200 text-slate-900 border-gray-300 border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-semibold mb-1 text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-200 text-slate-900 border-gray-300 border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block font-semibold mb-1 text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-200 text-slate-900 border-gray-300 border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block font-semibold mb-1 text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-gray-200 text-slate-900 border-gray-300 border rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full font-semibold py-2 px-4 rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Instructor'}
        </button>
      </form>

      {/* Success Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Success</Modal.Header>
        <Modal.Body>
          <p>{successMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
