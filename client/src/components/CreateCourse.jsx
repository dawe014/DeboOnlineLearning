import { useState } from 'react';
import {
  Label,
  Select,
  Textarea,
  TextInput,
  Alert,
  Spinner,
} from 'flowbite-react';
// import axios from 'axios'; // Import axios for HTTP requests
import apiClient from '../api/apiClient';

export default function CreateCourse() {
  const [courseName, setCourseName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle the loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Prepare the new course object
    const newCourse = {
      title: courseName,
      category: category,
      description: description,
    };

    try {
      setIsSubmitting(true); // Start loading state
      // Send the course data to the backend using axios POST request
      const response = await apiClient.post('/api/v1/courses', newCourse); // Replace with your backend API route
      console.log(response);

      // Set success message
      setSuccessMessage('Course created successfully!');

      // Reset form fields after successful submission
      setCourseName('');
      setCategory('');
      setDescription('');
    } catch (error) {
      console.error('Error creating course:', error);
      // Set error message
      setErrorMessage('Error creating course. Please try again.');
    } finally {
      setIsSubmitting(false); // End loading state
    }
  };

  return (
    <div>
      <h1 className="mt-8 text-2xl font-poppins mb-4">Create Courses</h1>

      {/* Success Alert */}
      {successMessage && (
        <Alert color="success" className="mb-4">
          <span>{successMessage}</span>
        </Alert>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <Alert color="failure" className="mb-4">
          <span>{errorMessage}</span>
        </Alert>
      )}

      <form
        onSubmit={handleCreateCourse}
        className="w-full grid grid-cols-1 gap-4 font-poppins capitalize"
      >
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="name" value="Course Name" />
          <TextInput
            id="name"
            type="text"
            className="outline-none"
            sizing="md"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="category" value="Course Category" />
          <Select
            id="categories"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
            <option value="Others">Others</option>
          </Select>
        </div>
        <div className="flex flex-col space-y-4 items-start justify-start">
          <Label htmlFor="description" value="Description" />
          <Textarea
            id="comment"
            className="outline-none border p-2"
            placeholder="Add Description"
            required
            rows={5}
            cols={40}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex space-y-4 items-center justify-start">
          {isSubmitting ? (
            <button
              type="submit"
              className="border font-poppins text-lg px-4 py-2 text-slate-900 dark:text-yellow-400 font-bold rounded-xl dark:bg-slate-900 border-slate-900 hover:text-white transition duration-200"
              disabled={isSubmitting} // Disable button while submitting
            >
              <Spinner size="sm" />
              <span className="pl-3">Creating...</span>
            </button>
          ) : (
            <button
              type="submit"
              className="border font-poppins text-lg px-4 py-2 text-slate-900 dark:text-yellow-400 font-bold rounded-xl dark:bg-slate-900 border-slate-900 hover:text-white transition duration-200"
              disabled={isSubmitting} // Disable button while submitting
            >
              Create course
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
