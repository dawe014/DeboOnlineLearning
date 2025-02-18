import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Button,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  Modal,
} from 'flowbite-react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import BackButton from './BackButton';
import apiClient from '../api/apiClient'; 
import Loader from './Loader';

export default function ManageLessons() {
  const [lessons, setLessons] = useState([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [isInputVisible, setInputVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility state for delete
  const [showEditModal, setShowEditModal] = useState(false); // Modal visibility state for edit
  const [lessonToDelete, setLessonToDelete] = useState(null); // Lesson to be deleted
  const [lessonToEdit, setLessonToEdit] = useState(null); // Lesson to be edited
  const [editLessonTitle, setEditLessonTitle] = useState(''); // Title for editing
  const inputRef = useRef(null);
  const { id } = useParams(); // Get course ID from URL parameters
  const [loading, setLoading] = useState(true);

  const fetchCourseLessons = useCallback(async () => {
    try {
      setLoading(true);
      const courseResponse = await apiClient.get(`/api/v1/courses/${id}`);
      const lessons = courseResponse.data.data.course.lessons || [];
      setLoading(false);
      setLessons(lessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setLessons([]);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseLessons();
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fetchCourseLessons]);

  const handleAddLesson = async () => {
    if (!newLessonTitle) return;
    try {
      await apiClient.post(`/api/v1/lessons/${id}/lesson`, {
        lessonTitle: newLessonTitle,
      });
      setNewLessonTitle('');
      fetchCourseLessons();
      setInputVisible(false);
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  const handleDeleteClick = (lessonId) => {
    setLessonToDelete(lessonId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/v1/lessons/${id}/lessons/${lessonToDelete}`);
      fetchCourseLessons();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleEditClick = (lesson) => {
    setLessonToEdit(lesson);
    setEditLessonTitle(lesson.lessonTitle);
    setShowEditModal(true);
  };

  const handleUpdateLesson = async () => {
    try {
      await apiClient.patch(`/api/v1/lessons/${lessonToEdit._id}`, {
        lessonTitle: editLessonTitle,
      });
      fetchCourseLessons();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <BackButton />
      <h1 className="mt-8 text-2xl font-poppins mb-4">Course Name</h1>

      <div className="overflow-x-auto mb-4">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>Lessons</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <TableRow
                  key={lesson._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {lesson.lessonTitle}
                  </TableCell>
                  <TableCell className="flex space-x-4">
                    <NavLink
                      to="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => handleEditClick(lesson)}
                    >
                      Edit
                    </NavLink>
                    <NavLink
                      to={`/dashboardadmin/course/lessons/${lesson._id}/contents`}
                      className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                    >
                      Contents
                    </NavLink>
                    <NavLink
                      to="#"
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteClick(lesson._id);
                      }}
                    >
                      Delete
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No lessons available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col space-y-4">
        <Button
          className="dark:text-yellow-400 font-bold hover:text-white w-max"
          onClick={() => setInputVisible((prev) => !prev)}
        >
          {isInputVisible ? 'Cancel' : 'Add Lesson'}
        </Button>

        {isInputVisible && (
          <div
            ref={inputRef}
            className="flex space-x-4 items-center justify-start"
          >
            <Label htmlFor="title" value="Lesson title" />
            <TextInput
              id="title"
              type="text"
              value={newLessonTitle}
              onChange={(e) => setNewLessonTitle(e.target.value)}
              className="outline-none"
              sizing="md"
            />
            <Button onClick={handleAddLesson} className="ml-2">
              Add
            </Button>
          </div>
        )}
      </div>

      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 text-yellow-50">
            <p>Are you sure you want to delete this lesson?</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button color="failure" onClick={handleDelete}>
            Delete
          </Button>
          <Button color="gray" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Editing Lesson */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Header>Edit Lesson Title</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Label htmlFor="edit-title" value="Lesson Title" />
            <TextInput
              id="edit-title"
              type="text"
              value={editLessonTitle}
              onChange={(e) => setEditLessonTitle(e.target.value)}
              className="outline-none"
              sizing="md"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={handleUpdateLesson} className="ml-2">
            Update
          </Button>
          <Button color="gray" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Outlet />
    </div>
  );
}
