/* eslint-disable react/prop-types */

import { useState } from 'react';
import { TextInput, Textarea, Button, Modal } from 'flowbite-react';
import apiClient from '../../api/apiClient';

const UpdateProfileForm = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
    profilePicture: user.profilePicture,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [file, setFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const hasChanges = () => {
    return (
      formData.name !== user.name ||
      formData.bio !== user.bio ||
      formData.email !== user.email ||
      (file && file.name !== user.profilePicture) ||
      formData.newPassword ||
      formData.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      setModalMessage(
        'Current password cannot be the same as the new password.',
      );
      setModalSuccess(false);
      setModalOpen(true);
      return;
    }

    if (!hasChanges()) {
      setModalMessage('No changes detected to update.');
      setModalSuccess(false);
      setModalOpen(true);
      return;
    }

    const formDataWithFile = new FormData();

    if (formData.name !== user.name) {
      formDataWithFile.append('name', formData.name);
    }
    if (formData.bio !== user.bio) {
      formDataWithFile.append('bio', formData.bio);
    }
    if (formData.email !== user.email) {
      formDataWithFile.append('email', formData.email);
    }
    if (file) {
      formDataWithFile.append('profilePicture', file);
    }
    if (formData.currentPassword) {
      formDataWithFile.append('currentPassword', formData.currentPassword);
    }
    if (formData.newPassword) {
      formDataWithFile.append('newPassword', formData.newPassword);
    }
    if (formData.confirmPassword) {
      formDataWithFile.append('confirmPassword', formData.confirmPassword);
    }

    try {
      const response = await apiClient.put(
        '/api/v1/users/update-my-profile',
        formDataWithFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const data = await response.data;
      if (data.message === 'Profile updated successfully') {
        setModalMessage('Profile updated successfully');
        setModalSuccess(true);
        setFormData({
          name: data.user.name,
          bio: data.user.bio,
          profilePicture: data.user.profilePicture,
          email: data.user.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        onUpdate(data.user);
      } else {
        setModalMessage(data.message || 'An error occurred');
        setModalSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setModalMessage(error.response.data.message);
      setModalSuccess(false);
    } finally {
      setModalOpen(true);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 text-white rounded-lg shadow-md p-6 mt-4 max-w-3xl mx-auto"
      >
        <h3 className="text-lg font-semibold mb-4">Update Profile</h3>

        <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1 mb-4 sm:mb-0">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name
            </label>
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-700 text-white border-gray-600"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="bg-slate-700 py-2 px-4 text-white border-gray-600"
              rows={1}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border-gray-600 bg-slate-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
          />
          {formData.profilePicture && (
            <img
              src={`http://localhost:3000/api/v1/images/profile_pictures/${formData.profilePicture}`}
              alt="Profile Preview"
              className="mt-2 w-24 h-24 rounded-full"
            />
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-slate-700 text-white border-gray-600"
          />
        </div>

        <h3 className="text-lg font-semibold mb-4">Update Password</h3>
        <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1 mb-4 sm:mb-0">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Current Password
            </label>
            <TextInput
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="bg-slate-700 text-white border-gray-600"
              autoComplete="off" // Prevents autofill
            />
          </div>
          <div className="flex-1 mb-4 sm:mb-0">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              New Password
            </label>
            <TextInput
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="bg-slate-700 text-white border-gray-600"
              autoComplete="off" // Prevents autofill
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Confirm New Password
          </label>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-slate-700 text-white border-gray-600"
            autoComplete="off" // Prevents autofill
          />
        </div>

        <Button
          type="submit"
          color="blue"
          className="w-full text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Changes
        </Button>
      </form>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Profile Update</Modal.Header>
        <Modal.Body>
          <p className={modalSuccess ? 'text-green-600' : 'text-red-600'}>
            {modalMessage}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setModalOpen(false)}
            color={modalSuccess ? 'green' : 'red'}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProfileForm;
