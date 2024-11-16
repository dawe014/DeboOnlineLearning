import { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { NavLink, Outlet, useNavigate, useParams,  } from 'react-router-dom';
import BackButton from './BackButton';
import apiClient from '../api/apiClient'; // Assuming you have an API client set up

export default function ManageContents() {
  const { lessonId } = useParams(); // Get the lesson ID from the URL parameters
  const [contents, setContents] = useState([]);
  const [reload, setReload] = useState(false); // State to trigger rerender
  const [isAddContentOpen, setIsAddContentOpen] = useState(false); // New state to toggle Add Content visibility
  const [lessonTitle, setLessonTitle] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonContents = async () => {
      try {
        // Fetch the lesson to get its content IDs
        const lessonResponse = await apiClient.get(
          `/api/v1/lessons/${lessonId}`,
        );
        console.log('lesson response', lessonResponse.data.data.lesson.lessonTitle);
         setLessonTitle( lessonResponse.data.data.lesson.lessonTitle);
        const contentIds = lessonResponse.data.data.lesson.contents;
        console.log(contentIds);

        // Collect the content data
        const fetchedContents = contentIds.map((data) => data);
        setContents(fetchedContents);
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    };

    fetchLessonContents();
  }, [lessonId, reload]); // Depend on lessonId and reload to refetch if they change

  const handleDelete = async (contentId) => {
    try {
      await apiClient.delete(`/api/v1/contents/${lessonId}/${contentId}`);
      setContents(contents.filter((content) => content._id !== contentId)); // Update state to remove deleted content
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  // Function to trigger reload
  const triggerReload = () => {
    setReload((prev) => !prev); // Toggle the reload state
  };

  const handleAddContentOpen = () => {
    setIsAddContentOpen(true); // Show Add Content and hide Add button
  };

  const handleAddContentClose = () => {
    setIsAddContentOpen(false); // Close Add Content and show Add button
    navigate(-1)
  };

  return (
    <div>
      <BackButton />
      <h1 className="mt-8 text-2xl font-poppins mb-4">
        {`${lessonTitle} / Contents`}
      </h1>

      <div className="overflow-x-auto mb-4">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>Content Title</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {contents.length > 0 ? (
              contents.map((content) => (
                <TableRow
                  key={content._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {content.contentTitle}
                  </TableCell>
                  <TableCell className="flex space-x-4">
                    <NavLink
                      to={`/dashboardadmin/contents/edit-content/${content._id}`} // Adjust the route for editing
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(content._id)} // Call delete handler
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No contents available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!isAddContentOpen && (
        <NavLink to={`add-content`}>
          <Button
            onClick={handleAddContentOpen}
            className="dark:text-yellow-400 font-bold hover:text-white"
          >
            Add Content
          </Button>
        </NavLink>
      )}
      {/* Passing the triggerReload function as context for the Outlet */}
      <Outlet context={{ triggerReload, handleAddContentClose }} />
    </div>
  );
}
