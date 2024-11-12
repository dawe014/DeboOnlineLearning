import { useState } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import BackButton from './BackButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './custom-quill.css'; // Your custom styles

export default function AddContent() {
  const [content, setContent] = useState('');
  // const [theme, setTheme] = useState('snow'); // Default theme

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // All header levels
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'], // You can add 'image' if you want image uploading
      ['clean'], // Clear formatting button
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <BackButton />
      <h1 className="mt-8 text-2xl font-poppins mb-4">Add New Content</h1>
      <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 mb-4 md:space-x-4">
        
        <div className="flex space-x-4 items-center justify-start w-full">
          <Label htmlFor="title" value="Content Title" />
          <TextInput
            id="title"
            type="text"
            className="flex-1"
            sizing="md"
            placeholder="Content title"
          />
        </div>
        <div className="flex space-x-4 w-full items-center justify-start">
          <Label htmlFor="type" value="Content Type" />
          <Select id="type" className="flex-1" required>
            <option value="">Select Category</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="quiz">Quiz</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="flex space-x-4 items-center justify-start">
          <Label htmlFor="url" value="Video Link" />
          <TextInput
            id="url"
            type="text"
            className="outline-none flex-1"
            sizing="md"
            placeholder="Video Link"
          />
        </div>
        <div className="flex space-x-4 items-center justify-start w-full">
          <Label htmlFor="quiz" value="Quiz ID" />
          <TextInput
            id="quiz"
            type="text"
            className="outline-none flex-1"
            sizing="md"
            placeholder="Quiz ID"
          />
        </div>
      </div>
      <Label htmlFor="article" value="Add Article" className="mb-4" />
      <ReactQuill
        className="h-60  mb-10 overflow-hidden mt-3"
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
        modules={modules}
        onChange={setContent}
        value={content}
      />

      <Button className="dark:text-yellow-400 font-bold hover:text-white mb-4">
        Publish Content
      </Button>
    </div>
  );
}
