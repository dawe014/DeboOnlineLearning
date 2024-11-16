import { useState, useEffect } from 'react';
import { Button, Label, Select, TextInput, Modal } from 'flowbite-react';
// import BackButton from './BackButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './custom-quill.css'; // Your custom styles
import apiClient from '../api/apiClient'; // Import your API client
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';

export default function AddContent() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [quizId, setQuizId] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [reload, setReload] = useState(false); // Reload state to trigger rerender
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const { triggerReload, handleAddContentClose } = useOutletContext(); // Access the reload function from Outlet context
  const navigate = useNavigate();

  const { lessonId } = useParams(); // Get the lesson ID from the URL parameters

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Reset messages
    setSuccessMessage('');
    setErrorMessage('');

    // Validate input fields (you can add more validation as needed)
    if (!title || !type) {
      setErrorMessage('Please fill in all required fields.');
      setShowModal(true); // Show modal on error
      return;
    }

    try {
      // Prepare the data to send
      const newContent = {
        contentTitle: title,
        type,
        url: type === 'video' ? url : undefined, // Only include if it's a video
        quizId: type === 'quiz' ? quizId : undefined, // Only include if it's a quiz
        text: content,
      };

      // Send a POST request to your API
      const response = await apiClient.post(
        `/api/v1/contents/${lessonId}/content`,
        newContent,
      ); // Adjust the endpoint as necessary
      console.log('Content added successfully:', response.data);

      // Set success message
      setSuccessMessage('Content added successfully!');
      setShowModal(true); // Show modal on success
      triggerReload();
      // Optionally reset the form
      setTitle('');
      setType('');
      setUrl('');
      setQuizId('');
      setContent('');

      // Trigger rerender by toggling the reload state
      setReload((prev) => !prev);
      
    } catch (error) {
      console.error('Error adding content:', error);
      setErrorMessage('Failed to add content. Please try again.');
      setShowModal(true); // Show modal on error
    }
  };

  useEffect(() => {
    // This effect can be used to refetch data or trigger a page rerender
    // when the reload state changes. For example, if you're fetching
    // the content list after adding, you can refetch it here.
    console.log('Rerender or data fetch can happen here on success');
  }, [reload]);

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage('');
    setErrorMessage('');
    navigate(-1); // Go back to previous page
  };

  return (
    <div>
      {/* <BackButton /> */}
      <h1 className="mt-8 text-2xl font-poppins mb-4">Add New Content</h1>

      {/* Modal for Success and Error Messages */}
      <Modal show={showModal} size="md" popup={true} onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          {successMessage ? (
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-green-600 dark:text-white">
                {successMessage}
              </h3>
              <Button
                color="success"
                onClick={closeModal}
                className="dark:text-yellow-400 font-bold hover:text-white"
              >
                OK
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-red-600">
                {errorMessage}
              </h3>
              <Button
                color="failure"
                onClick={closeModal}
                className="dark:text-yellow-400 font-bold hover:text-white"
              >
                Close
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-4 ">
        <div className="flex space-x-4 items-center justify-start w-full lg:w-1/2">
          <Label htmlFor="title" value="Content Title" />
          <TextInput
            id="title"
            type="text"
            className=" flex-1"
            sizing="md"
            placeholder="Content title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4 w-full items-center justify-start lg:w-1/2">
          <Label htmlFor="type" value="Content Type" />
          <Select
            id="type"
            className="flex-1"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="quiz">Quiz</option>
            <option value="other">Other</option>
          </Select>
        </div>
        {type === 'video' && (
          <div className="flex space-x-4 items-center justify-start lg:w-1/2">
            <Label htmlFor="url" value="Video Link" />
            <TextInput
              id="url"
              type="text"
              className="outline-none flex-1"
              sizing="md"
              placeholder="Video Link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        )}
        {type === 'quiz' && (
          <div className="flex space-x-4 items-center justify-start w-full lg:w-1/2">
            <Label htmlFor="quiz" value="Quiz ID" />
            <TextInput
              id="quiz"
              type="text"
              className="outline-none flex-1"
              sizing="md"
              placeholder="Quiz ID"
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
            />
          </div>
        )}
        <div className="flex w-full flex-col">
          <Label htmlFor="article" value="Add Article" className="mb-4" />
          <ReactQuill
            className="h-60 mb-10 overflow-hidden mt-3 w-full ps-32"
            theme="snow"
            formats={[
              'header',
              'font',
              'size',
              'bold',
              'italic',
              'underline',
              'strike',
              'blockquote',
              'list',
              'bullet',
              'indent',
              'link',
              'image',
            ]}
            placeholder="Write something amazing..."
            onChange={setContent}
            value={content}
          />
        </div>

        <Button
          type="submit"
          className="dark:text-yellow-400 font-bold hover:text-white w-max mb-4"
        >
          Publish Content
        </Button>
        <Button color='red'
          className="bg-red-400 hover:bg-red-500 mt-4 w-max"
          onClick={handleAddContentClose}
        >
          Close
        </Button>
      </form>
    </div>
  );
}
