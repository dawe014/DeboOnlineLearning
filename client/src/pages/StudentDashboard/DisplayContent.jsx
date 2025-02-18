import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { useOutletContext, useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import QuizStart from './QuizStart';
import QuizFinish from './QuizFinish';
import Loader from '../../components/Loader';

export default function DisplayContent() {
  const { selectedContent, handleNavigate, courseName } = useOutletContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [myAnswers, setMyAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Tracks submission
  const [quizResults, setQuizResults] = useState([]); // Tracks results for each question
  const [summary, setSummary] = useState({ correct: 0, wrong: 0 }); // Tracks summary
  //  const [quizSubmission, setQuizSubmission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  const [started, setStarted] = useState(false);
  // const [finished, setFinished] = useState(false);
  const [questionLen, setQuestionLen] = useState(null);
  const [score, setScore] = useState(0);
  const { courseId } = useParams();
  console.log('course id', courseId);
  console.log(selectedContent);

  useEffect(() => {
    const initializeQuiz = async () => {
      if (selectedContent) {
        setLoading(true);

        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setMyAnswers({});
        setQuizSubmitted(false);
        setQuizResults([]);
        setSummary({ correct: 0, wrong: 0 });

        if (selectedContent?.quiz?._id) {
          try {
            const data = await fetchQuizSubmission(
              selectedContent.quiz._id,
              selectedContent._id,
            );
            if (data?.answers?.length) {
              setMyAnswers(data.answers);
              setScore(data.score);
              setQuizSubmitted(true);
            }
            setQuestionLen(selectedContent.quiz.questions.length);
            setIsCertificate(selectedContent.quiz.certificationQuiz);
          } catch(err) {
            console.log(err)
            console.error('Failed to fetch quiz submission.');
          }
        }

      }
      setLoading(false);
    };

    initializeQuiz();
  }, [
    selectedContent,
  ]);

  useEffect(() => {
  if (Object.keys(myAnswers).length > 0) {
    // Ensure userAnswers is set before calling showResult
    setLoading(true)
    showResult();
    setLoading(false)
  }
}, [myAnswers]); // Trigger showResult whenever userAnswers changes


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

  const handleStartQuiz = () => {
    setStarted(true);
  };
  

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedContent.quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("You've reached the last question.");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else {
      alert("You're at the first question.");
    }
  };

  const fetchQuizSubmission = async (quizId, lessonId) => {
    try {
      const response = await apiClient.get(
        `/api/v1/quizSubmissions/quiz/${quizId}/${lessonId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz submission:', error);
      throw error;
    }
  };

  function showResult() {

    let correctCount = 0;
    let wrongCount = 0;


    const results = selectedContent.quiz.questions.map((question, index) => {
      const userAnswerIndex = myAnswers[index].selectedOptionIndex;
      const isCorrect = question.options[userAnswerIndex]?.isCorrect || false;

      if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }

      return {
        questionText: question.questionText,
        isCorrect,
        selectedOption:
          question.options[userAnswerIndex]?.optionText || 'No Answer',
        correctOption: question.options.find((opt) => opt.isCorrect)
          ?.optionText,
      };
    });

    
    setQuizResults(results);
    setSummary({ correct: correctCount, wrong: wrongCount });
    setQuizSubmitted(true);
  };

  const handleSubmitQuiz = async () => {
    let correctCount = 0;
    let wrongCount = 0;


    const results = selectedContent.quiz.questions.map((question, index) => {
      const userAnswerIndex = userAnswers[index];
      const isCorrect = question.options[userAnswerIndex]?.isCorrect || false;

      if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }

      return {
        questionText: question.questionText,
        isCorrect,
        selectedOption:
          question.options[userAnswerIndex]?.optionText || 'No Answer',
        correctOption: question.options.find((opt) => opt.isCorrect)
          ?.optionText,
      };
    });

    setQuizResults(results);
    setSummary({ correct: correctCount, wrong: wrongCount });
    const myScore = (correctCount / questionLen) * 100;
    setScore(myScore);
    setQuizSubmitted(true);

    // Prepare submission payload
    const submissionData = {
      courseId,
      questionLen,
      correctCount,
      lessonId: selectedContent._id,
      quizId: selectedContent.quiz._id,
      answers: Object.entries(userAnswers).map(
        ([questionIndex, selectedOptionIndex]) => ({
          questionIndex: parseInt(questionIndex, 10),
          selectedOptionIndex,
        }),
      ),
    };

    try {
      // Make API request to submit the quiz
      const response = await apiClient.post(
        '/api/v1/quizSubmissions',
        submissionData,
      );

      // Update the UI based on the backend response
      if (response.data.submission.score !== null) {
        alert(`Quiz graded! You scored: ${response.data.submission.score}%`);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };
  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="w-full min-h-screen lg:px-4 lg:py-6 bg-gray-50 dark:bg-slate-900">
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

        {selectedContent.quiz && (
          <div className="p-4 dark:bg-slate-900 bg-white rounded shadow">
            {!quizSubmitted ? (
              selectedContent.quiz.certificationQuiz ? (
                // Certification Quiz: One question at a time
                
                !started ? (
                  <QuizStart
                    startQuiz={handleStartQuiz}
                    passingScore={selectedContent.quiz.passingScore}
                  />
                ) : (
                  <div>
                    <p className="mb-4">
                      Question {currentQuestionIndex + 1} of{' '}
                      {selectedContent.quiz.questions.length}
                    </p>
                    <h3 className="mb-4 font-bold">
                      {
                        selectedContent.quiz.questions[currentQuestionIndex]
                          .questionText
                      }
                    </h3>
                    <ul className="mb-4">
                      {selectedContent.quiz.questions[
                        currentQuestionIndex
                      ].options.map((option, idx) => (
                        <li key={idx} className="mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              className="focus:outline-none"
                              type="radio"
                              name={`question-${currentQuestionIndex}`}
                              value={idx}
                              checked={
                                userAnswers[currentQuestionIndex] === idx
                              }
                              onChange={() =>
                                handleAnswerChange(currentQuestionIndex, idx)
                              }
                            />
                            <span>{option.optionText}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between">
                      <Button
                        color="gray"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </Button>
                      {currentQuestionIndex ===
                      selectedContent.quiz.questions.length - 1 ? (
                        <Button color="success" onClick={handleSubmitQuiz}>
                          Submit Quiz
                        </Button>
                      ) : (
                        <Button color="blue" onClick={handleNextQuestion}>
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                )
              ) : (
                // Non-Certification Quiz: All questions at once
                <div>
                  {selectedContent.quiz.questions.map((question, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded"
                    >
                      <h3 className="mb-2 font-bold">
                        {index + 1}. {question.questionText}
                      </h3>
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
                  <div className="flex justify-center mt-4">
                    <Button color="success" onClick={handleSubmitQuiz}>
                      Submit Quiz
                    </Button>
                  </div>
                </div>
              )
            ) : // Quiz Results
            selectedContent.quiz.certificationQuiz ? (
              <QuizFinish
                score={score}
                passingScore={selectedContent.quiz.passingScore} courseName={courseName}
              />
            ) : (
              <div>
                <h3 className="text-lg font-bold mb-4">Quiz Results</h3>

                {quizResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 mb-4 rounded ${
                      result.isCorrect ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  >
                    <p className="font-bold">
                      {index + 1}. {result.questionText}
                    </p>
                    <p>
                      <span className="font-semibold">Your Answer:</span>{' '}
                      {result.selectedOption}
                    </p>
                    {!result.isCorrect && (
                      <p>
                        <span className="font-semibold">Correct Answer:</span>{' '}
                        {result.correctOption}
                      </p>
                    )}
                  </div>
                ))}
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                  <p>
                    <span className="font-semibold">Score:</span>{' '}
                    {summary.correct} / {questionLen}
                  </p>
                  
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isCertificate ? (
        ''
      ) : (
        <div className="flex justify-between w-full mt-4">
          <Button color="gray" onClick={() => handleNavigate('previous')}>
            Previous
          </Button>
          <Button color="blue" onClick={() => handleNavigate('next')}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
