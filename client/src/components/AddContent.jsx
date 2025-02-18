import { useState } from 'react';
import {
  Button,
  Label,
  Select,
  TextInput,
  Modal,
  Textarea,
} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './custom-quill.css'; 
import apiClient from '../api/apiClient'; 
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';

export default function AddContent() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [questions, setQuestions] = useState([
    { questionText: '', options: [{ optionText: '', isCorrect: false }] },
  ]);
  const [passingScore, setPassingScore] = useState(50);
  const [certificationQuiz, setCertificationQuiz] = useState(false);

  const { lessonId } = useParams();
  const { triggerReload, handleAddContentClose } = useOutletContext();
  const navigate = useNavigate();

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].optionText =
      event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: [{ optionText: '', isCorrect: false }] },
    ]);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({
      optionText: '',
      isCorrect: false,
    });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!title || !type) {
      setErrorMessage('Please fill in all required fields.');
      setShowModal(true);
      return;
    }
    if ((type === 'content' || type === 'other')  && !content) {
      setError('Content is required.');
      return;
    }
    setError('');

    try {
      let quizId = null;

      // If the type is quiz, create the quiz first
      
      const score = Number(passingScore);
      
      if (type === 'quiz' || type === 'other') {
        const newQuiz = {
          lesson: lessonId,
          title,
          questions,
          certificationQuiz,
          passingScore:score,
        };
        const quizResponse = await apiClient.post(
          `/api/v1/quizzes/${lessonId}/quiz`,
          newQuiz,
        );
        console.log('quiz response', quizResponse);
        quizId = quizResponse.data.data.quiz._id; // Assign the created quiz ID
      }

      // Prepare content submission data
      const newContent = {
        contentTitle: title,
        type,
        url: url ? url : undefined,
        quiz: quizId ? quizId : undefined,
        text: content ? content : undefined,
      };

      // Submit the content
      const response = await apiClient.post(
        `/api/v1/contents/${lessonId}/content`,
        newContent,
      );

      console.log('Content added successfully:', response.data);
      setSuccessMessage('Content added successfully!');
      setShowModal(true);
      triggerReload();

      // Reset form fields
      setTitle('');
      setType('');
      setUrl('');
      setContent('');
      setQuestions([
        { questionText: '', options: [{ optionText: '', isCorrect: false }] },
      ]);
      setPassingScore(50);
      setCertificationQuiz(false);
    } catch (error) {
      console.error('Error adding content:', error);
      setErrorMessage('Failed to add content. Please try again.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage('');
    setErrorMessage('');
    navigate(-1);
  };

  return (
    <div>
      <h1 className="mt-8 text-2xl font-poppins mb-4">Add New Content</h1>
      <Modal show={showModal} size="md" popup={true} onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          {successMessage ? (
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-green-600">
                {successMessage}
              </h3>
              <Button color="success" onClick={closeModal}>
                OK
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-red-600">
                {errorMessage}
              </h3>
              <Button color="failure" onClick={closeModal}>
                Close
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-4">
        <div className="flex space-x-4 items-center lg:w-1/2">
          <Label htmlFor="title" value="Content Title" />
          <TextInput
            id="title"
            type="text"
            className="flex-1"
            placeholder="Content title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4 items-center lg:w-1/2">
          <Label htmlFor="type" value="Content Type" />
          <Select
            id="type"
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
        {(type === 'video' || type === 'other') && (
          <div className="flex space-x-4 items-center lg:w-1/2">
            <Label htmlFor="url" value="Video Link" />
            <TextInput
              id="url"
              type="text"
              placeholder="Video Link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required={type === 'video'}
            />
          </div>
        )}
        {(type === 'quiz' || type === 'other') && (
          <div>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="p-4 mb-4 rounded">
                <Textarea
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(questionIndex, e)}
                  placeholder="Question Text"
                  required={type === 'quiz'} // Required only if type is 'quiz'
                />
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex mt-4 items-center">
                    <TextInput
                      type="text"
                      value={option.optionText}
                      onChange={(e) =>
                        handleOptionChange(questionIndex, optionIndex, e)
                      }
                      placeholder="Option Text"
                      required={type === 'quiz'} // Optional: Make required if needed
                    />
                    <TextInput
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[questionIndex].options[
                          optionIndex
                        ].isCorrect = !option.isCorrect;
                        setQuestions(newQuestions);
                      }}
                    />
                    <label>Correct</label>
                  </div>
                ))}
                <Button type="button" onClick={() => addOption(questionIndex)}>
                  Add Option
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addQuestion}>
              Add Question
            </Button>
            <TextInput
              type="number"
              value={passingScore}
              onChange={(e) => setPassingScore(e.target.value)}
              placeholder="Passing Score"
              required={type === 'quiz'} // Required only if type is 'quiz'
            />
            <div className="flex items-center">
              <label>Certification Quiz</label>
              <TextInput
                type="checkbox"
                checked={certificationQuiz}
                onChange={(e) => setCertificationQuiz(e.target.checked)}
              />
            </div>
          </div>
        )}
        {error && (
          <p className="mt-20 p-2 bg-yellow-300 rounded w-max z-10 text-red-500">
            {error}
          </p>
        )}
        {type !== 'quiz' && type !== 'video' && (
          <div className="mb-4 border h-48 lg:h-72 h-">
            <ReactQuill
              className="w-full h-48 lg:h-60"
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </div>
        )}

        <div className="mt-4 ">
          <Button type="submit">Add Content</Button>
          <Button
            className="mt-4"
            type="button"
            color="gray"
            onClick={handleAddContentClose}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}
