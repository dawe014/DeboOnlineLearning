import  { useState } from 'react';
import { Button, TextInput, Textarea } from 'flowbite-react';

const AddQuestion = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [{ optionText: '', isCorrect: false }] }]);
  const [passingScore, setPassingScore] = useState(50);
  const [certificationQuiz, setCertificationQuiz] = useState(false);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].optionText = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [{ optionText: '', isCorrect: false }] }]);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ optionText: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quizData = { title, questions, passingScore, certificationQuiz };

    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        const newQuiz = await response.json();
        console.log('Quiz created:', newQuiz);
        // Optionally reset the form
      } else {
        console.error('Failed to create quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz Title"
        required
      />
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="border p-4 rounded">
          <Textarea
            value={question.questionText}
            onChange={(e) => handleQuestionChange(questionIndex, e)}
            placeholder="Question Text"
            required
          />
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center space-x-2">
              <TextInput
                type="text"
                value={option.optionText}
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                placeholder="Option Text"
                required
              />
              <TextInput
                type="checkbox"
                checked={option.isCorrect}
                onChange={() => {
                  const newQuestions = [...questions];
                  newQuestions[questionIndex].options[optionIndex].isCorrect = !option.isCorrect;
                  setQuestions(newQuestions);
                }}
              />
              <label>Correct</label>
            </div>
          ))}
          <Button type="button" onClick={() => addOption(questionIndex)}>Add Option</Button>
        </div>
      ))}
      <Button type="button" onClick={addQuestion}>Add Question</Button>
      <TextInput
        type="number"
        value={passingScore}
        onChange={(e) => setPassingScore(e.target.value)}
        placeholder="Passing Score"
        required
      />
      <label>
        <TextInput
          type="checkbox"
          checked={certificationQuiz}
          onChange={(e) => setCertificationQuiz(e.target.checked)}
        />
        Certification Quiz
      </label>
      <Button type="submit">Submit Quiz</Button>
    </form>
  );
};

export default AddQuestion;