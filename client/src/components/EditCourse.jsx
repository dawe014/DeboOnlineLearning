
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import BackButton from "./BackButton";

export default function EditCourse() {
  return (
    <div>
      <BackButton/>
      <h1 className="mt-8 text-2xl font-poppins  mb-4">Edit Courses</h1>
      <div className="w-full  grid grid-cols-1  gap-4 font-poppins capitalize ">
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="name" value="Course Name" />
          <TextInput
            id="name"
            type="text"
            className="outline-none"
            value={'Web Development'}
            sizing="md"
          />
        </div>
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="category" value="Course Category" />
          <Select id="categories" value={'Web Development'} required>
            <option value="">Select Category</option>
            <option value="web develpment">Web Development</option>
            <option value="data science">Data Science</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
            <option value="others">Others</option>
          </Select>
        </div>
        <div className="flex flex-col space-y-4 items-start justify-start ">
          <Label htmlFor="desciption" value="Description" />
          <Textarea
            id="comment"
            className="outline-none border p-2"
            placeholder="Add Description"
            required
            rows={5}
            cols={40}
            value={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}
          />
        </div>
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="name" value="Status" />
          <TextInput
            id="name"
            type="text"
            className="outline-none"
            value={'Draft'}
            sizing="md"
          />
        </div>
        <div className="flex  space-y-4 items-center justify-start  ">
          <button className="border font-poppins text-lg px-4 py-2 text-slate-900 dark:text-yellow-400 font-bold rounded-xl dark:bg-slate-900 border-slate-900 hover:text-white transition duration-200 ">
            Update Course
          </button>
        </div>
      </div>
    </div>
  );
}
