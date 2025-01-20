import { useState, useEffect } from 'react';
import { Label, Select, Textarea, TextInput } from 'flowbite-react';
import { Modal, Button, Spinner } from 'flowbite-react'; // Import Modal and Spinner components
import BackButton from './BackButton';
import apiClient from '../api/apiClient'; // Import your configured API client
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export default function EditCourse() {
  const { id: courseId } = useParams();
  const [courseName, setCourseName] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [fetching, setFetching] = useState(false); // State for loading spinner

  useEffect(() => {
    const fetchCourse = async () => {
      setFetching(true); // Start loading
      try {
        const response = await apiClient.get(`/api/v1/courses/${courseId}`);
        const courseData = response.data.data.course;

        setCourseName(courseData.title || '');
        setCategory(courseData.category || '');
        setDescription(courseData.description || '');
        setStatus(courseData.status || '');
      } catch (error) {
        console.log(error);
        setModalMessage('Failed to fetch course details.');
        setIsError(true);
        setShowModal(true);
      } finally {
        setFetching(false); // Stop loading
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append(
      'category',
      category === 'Others' ? customCategory : category,
    );
    formData.append('description', description);
    formData.append('status', status);
    formData.append('coverImage', coverImage);

    try {
      const response = await apiClient.patch(
        `/api/v1/courses/${courseId}`,
        formData,
      );
      console.log(response);
      setModalMessage('Course updated successfully!');
      setIsError(false);
      setShowModal(true);
    } catch (error) {
      console.log(error);
      setModalMessage('Failed to update the course.');
      setIsError(true);
      setShowModal(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };
if (fetching) return <Loader/>

  return (
    <div>
      <BackButton />
      <h1 className="mt-8 text-2xl font-poppins mb-4">Edit Course</h1>
      <form
        onSubmit={handleUpdateCourse}
        className="w-full grid grid-cols-1 gap-4 font-poppins capitalize"
      >
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="name" value="Course Name" />
          <TextInput
            id="name"
            type="text"
            className="outline-none"
            value={courseName}
            sizing="md"
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="category" value="Course Category" />
          <Select
            id="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
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
        {category === 'Others' && (
          <div className="flex space-x-4 items-center justify-start">
            <Label htmlFor="customCategory" value="Custom Category" />
            <TextInput
              id="customCategory"
              type="text"
              className="outline-none"
              value={customCategory}
              sizing="md"
              onChange={(e) => setCustomCategory(e.target.value)}
              required
            />
          </div>
        )}
        <div className="flex flex-col space-y-4 items-start justify-start ">
          <Label htmlFor="description" value="Description" />
          <Textarea
            id="description"
            className="outline-none border p-2"
            placeholder="Add Description"
            required
            rows={5}
            cols={40}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="status" value="Status" />
          <Select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </Select>
        </div>
        <div className="flex flex-col space-y-4 items-start justify-start">
          <Label htmlFor="coverImage" value="Cover Image" />
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            className="block w-full text-sm text-gray-500"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex space-y-4 items-center justify-start">
          <button
            type="submit"
            className={`border font-poppins text-lg px-4 py-2 text-slate-900 dark:text-yellow-400 font-bold rounded-xl dark:bg-slate-900 border-slate-900 hover:text-white transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="mr-2" /> Updating...
              </>
            ) : (
              'Update Course'
            )}
          </button>
        </div>
      </form>

      {/* Modal for Success/Error Messages */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="md"
        position="center"
      >
        <Modal.Header>{isError ? 'Error' : 'Success'}</Modal.Header>
        <Modal.Body>
          <p className='text-yellow-400'>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
