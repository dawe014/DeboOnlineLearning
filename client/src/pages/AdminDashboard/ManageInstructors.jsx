import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  Button,
} from 'flowbite-react';
import apiClient from '../../api/apiClient';
import Loader from '../../components/Loader';

export default function ManageInstructors() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/api/v1/users/instructors'); 
        setUsers(response.data.data); 
      } catch (error) {
        console.log(error);
        setErrorMessage('Error fetching users!');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(
        `/api/v1/users/delete-user/${selectedUserId}`,
      ); // Adjust endpoint as needed
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== selectedUserId),
        ); // Remove user from state
        setConfirmModalVisible(false);
        setSuccessModalVisible(true);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setErrorMessage('Error deleting user!');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <div>
      <h1 className="mt-8 text-2xl font-poppins mb-4">Manage Instructors</h1>
      <div className="overflow-x-auto mb-8">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>User Name</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
              <span className="sr-only">Delete</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y capitalize">
            {users.map((user) => (
              <TableRow
                key={user._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-slate-900 dark:text-white">
                  {user.name}
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex space-x-4">
                  <NavLink
                    to={`user/${user._id}`} // Edit link to user details page
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </NavLink>
                  <button
                    onClick={() => {
                      setSelectedUserId(user._id);
                      setConfirmModalVisible(true);
                    }}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirm Delete Modal */}
      <Modal
        show={confirmModalVisible} 
        onClose={() => setConfirmModalVisible(false)}
      >
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p className='text-yellow-400'>Are you sure you want to delete this instructor?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="failure"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Button>
          <Button onClick={() => setConfirmModalVisible(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
      >
        <Modal.Header>Success</Modal.Header>
        <Modal.Body>
          <p>User deleted successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setSuccessModalVisible(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
