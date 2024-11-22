import { useState } from 'react';
import { Button } from 'flowbite-react';
import { useOutletContext } from 'react-router-dom';

export default function DisplayContent() {
  const { selectedContent, handleNavigate } = useOutletContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // Tracks user answers

  if (!selectedContent) {
    return (
      <div className="p-4 text-gray-500">Select a lesson content to view.</div>
    );
  }

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="w-full min-h-screen lg:px-4 lg:py-6 bg-gray-50 dark:bg-slate-900">
      {/* Content Display */}
      <div className="mb-6">
        <h2 className="text-2xl mb-4 font-bold">
          {selectedContent.contentTitle}
        </h2>

        {selectedContent.type === 'video' && (
          <iframe
            className="w-full max-w-4xl h-64 sm:h-96 mx-auto rounded shadow-lg"
            src={selectedContent.url}
            title={selectedContent.contentTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}

        {selectedContent.text && (
          <div className="prose prose-lg mx-start p-4 bg-white dark:bg-slate-900 rounded shadow break-words">
            <div
              className="react-quill"
              dangerouslySetInnerHTML={{ __html: selectedContent.text }}
            ></div>
          </div>
        )}

        {selectedContent.type === 'quiz' && (
          <div className="p-4 dark:bg-slate-900 bg-white rounded shadow">
            {selectedContent.quiz.certificationQuiz ? (
              // Display one question at a time for certification quizzes
              <div>
                <p className="mb-4">
                  Question {currentQuestionIndex + 1} of{' '}
                  {selectedContent.questions.length}
                </p>
                <h3 className="mb-4 font-bold">
                  {selectedContent.questions[currentQuestionIndex].questionText}
                </h3>
                <ul className="mb-4">
                  {selectedContent.questions[currentQuestionIndex].options.map(
                    (option, idx) => (
                      <li key={idx} className="mb-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`question-${currentQuestionIndex}`}
                            value={idx}
                            checked={userAnswers[currentQuestionIndex] === idx}
                            onChange={() =>
                              handleAnswerChange(currentQuestionIndex, idx)
                            }
                          />
                          <span>{option.optionText}</span>
                        </label>
                      </li>
                    ),
                  )}
                </ul>
                <div className="flex justify-between">
                  <Button
                    color="gray"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    color="blue"
                    onClick={handleNextQuestion}
                    disabled={
                      currentQuestionIndex ===
                      selectedContent.questions.length - 1
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              // Display all questions at once for non-certification quizzes
              <div>
                {selectedContent.quiz.questions.map((question, index) => (
                  <div
                    key={index}
                    className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded"
                  >
                    <h3 className="mb-2 font-bold">{question.questionText}</h3>
                    <ul>
                      {question.options.map((option, idx) => (
                        <li key={idx} className="mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={idx}
                              checked={userAnswers[index] === idx}
                              onChange={() => handleAnswerChange(index, idx)}
                            />
                            <span>{option.optionText}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full mt-4">
        <Button
          color="gray"
          onClick={() => handleNavigate('previous')}
          // disabled={!selectedContent.previous}
        >
          Previous
        </Button>
        <Button
          color="blue"
          onClick={() => handleNavigate('next')}
          // disabled={!selectedContent.next}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
