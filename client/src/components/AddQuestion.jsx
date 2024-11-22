/* eslint-disable react/prop-types */

// import { useState } from 'react';
import { Button, TextInput, Textarea } from 'flowbite-react';

const AddQuestion = ({
  handleSubmit,
  title,
  setTitle,
  questions,
  handleQuestionChange,
  addQuestion,
  passingScore,
  setPassingScore,
  certificationQuiz,
  setCertificationQuiz,
  handleOptionChange,
  addOption,
  setQuestions,
}) => {
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
        <div key={questionIndex} className="p-4 mb-4 rounded">
          <Textarea
            className="p-2"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(questionIndex, e)}
            placeholder="Question Text"
            required
          />
          {question.options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className="flex mt-4 ms-4 items-center space-x-2"
            >
              <TextInput
                type="text"
                value={option.optionText}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e)
                }
                placeholder="Option Text"
                required
              />
              <TextInput
                type="checkbox"
                checked={option.isCorrect}
                onChange={() => {
                  const newQuestions = [...questions];
                  newQuestions[questionIndex].options[optionIndex].isCorrect =
                    !option.isCorrect;
                  setQuestions(newQuestions);
                }}
              />
              <label>Correct</label>
            </div>
          ))}
          <Button
            type="button"
            className="mt-2"
            onClick={() => addOption(questionIndex)}
          >
            Add Option
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addQuestion}>
        Add Question
      </Button>
      <TextInput
        className="max-w-sm"
        type="number"
        value={passingScore}
        onChange={(e) => setPassingScore(Number(e.target.value))}
        placeholder="Passing Score"
        required
      />
      <div className="max-w-sm flex justify-start space-x-4 items-center">
        <label>Certification Quiz</label>
        <TextInput
          className="max-w-sm"
          type="checkbox"
          checked={certificationQuiz}
          onChange={(e) => setCertificationQuiz(e.target.checked)}
        />
      </div>
      <Button type="submit">Submit Quiz</Button>
    </form>
  );
};
export default AddQuestion;
