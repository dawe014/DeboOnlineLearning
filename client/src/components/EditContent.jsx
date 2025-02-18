import { useState, useEffect } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import BackButton from './BackButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './custom-quill.css'; 
import apiClient from '../api/apiClient'; 
import { useParams } from 'react-router-dom'; 

export default function EditContent() {
  const { contentId } = useParams(); 
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [quizId, setQuizId] = useState('');
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiClient.get(`/api/v1/contents/${contentId}`); // Fetch content by ID
        console.log(response)
        const data = response.data.data.content; 
        setTitle(data.contentTitle);
        setType(data.type);
        setUrl(data.url || ''); 
        setQuizId(data.quizId || ''); 
        setContent(data.text);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, [contentId]);

  const handleUpdate = async (e) => {
    e.preventDefault(); 

    try {
      const updatedContent = {
        contentTitle:title,
        type,
        url: type === 'video' ? url : undefined, // Only include if it's a video
        quizId: type === 'quiz' ? quizId : undefined, // Only include if it's a quiz
        text: content,
      };

      // Send a PUT request to update the content
      const response = await apiClient.patch(
        `/api/v1/contents/${contentId}`,
        updatedContent,
      );
      console.log('Content updated successfully:', response.data);

    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to update content. Please try again.');
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-12">
      <BackButton  />
      <h1 className="mt-8 text-2xl font-poppins mb-4">Edit Content</h1>
      <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <Label htmlFor="title" value="Content Title" />
          <TextInput
            id="title"
            type="text"
            className="outline-none"
            sizing="md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Content title"
            required
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="type" value="Content Type" />
          <Select
            id="type"
            className="flex-1"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="quiz">Quiz</option>
            <option value="other">Other</option>
          </Select>
        </div>
        {type === 'video' && (
          <div className="flex flex-col">
            <Label htmlFor="url" value="Video Link" />
            <TextInput
              id="url"
              type="text"
              className="outline-none"
              sizing="md"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Video Link"
            />
          </div>
        )}
        {type === 'quiz' && (
          <div className="flex flex-col">
            <Label htmlFor="quiz" value="Quiz ID" />
            <TextInput
              id="quiz"
              type="text"
              className="outline-none"
              sizing="md"
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              placeholder="Quiz ID"
            />
          </div>
        )}
        <Label htmlFor="article" value="Add Article" className="mb-4" />
        <ReactQuill
          className="h-60 mb-10 overflow-hidden mt-3"
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

        <Button
          type="submit"
          className="dark:text-yellow-400 w-max font-bold hover:text-white mb-4"
        >
          Update Content
        </Button>
      </form>
    </div>
  );
}
