
import { Button, Label, Select, TextInput } from 'flowbite-react';
import BackButton from '../../components/BackButton';
export default function UpdateUser() {

  
  return (
    <div>
      <BackButton />
      <h1 className="mt-8 text-2xl font-poppins mb-4">Update User Role</h1>
      <div className="flex flex-col w-max space-y-4 ">
        <div className="flex space-x-4 items-center justify-start w-full">
          <Label htmlFor="name" value=" User Name" />
          <TextInput
            id="name"
            type="text"
            className="outline-none flex-1"
            sizing="md"
            placeholder="Content title"
          />
        </div>
        <div className="flex space-x-4 w-full items-center justify-start">
          <Label htmlFor="role" value="User Role" />
          <Select id="tole" className="flex-1" required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
          </Select>
        </div>
        
      </div>
      

      <Button className="dark:text-yellow-400 font-bold hover:text-white mb-4 mt-4">
        Update Role
      </Button>
    </div>
  );
}
