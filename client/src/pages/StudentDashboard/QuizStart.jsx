/* eslint-disable react/prop-types */
import { Card, Button } from 'flowbite-react';

export default function QuizStart({ startQuiz, passingScore }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Certification Quiz: Prove Your Mastery!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          This quiz is designed to test your knowledge and skills on what youve
          learned in this course.
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
          <li>
            You need to score at least{' '}
            <strong className="text-blue-500">{passingScore}%</strong> to pass.
          </li>
          <li>Review the course material before starting the quiz.</li>
          <li>
            You will only get{' '}
            <strong className="text-red-500">one attempt</strong> to pass.
          </li>
        </ul>
        <Button color="blue" onClick={startQuiz} size="lg" className="mt-6">
          Start Quiz
        </Button>
      </Card>
    </div>
  );
}
