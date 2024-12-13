/* eslint-disable react/prop-types */
import { Card, Button, Alert } from 'flowbite-react';
import { NavLink, useParams } from 'react-router-dom';
// import  {downloadCertificate}  from './Certificate';
// downloadCertificate
export default function QuizFinish({ score, passingScore, courseName }) {
  return (
    <>
      {score >= passingScore ? (
        <AfterCertificationQuizPassed score={score} courseName={courseName} />
      ) : (
        <AfterCertificationQuizFailed
          score={score}
          passingScore={passingScore}
        />
      )}
    </>
  );
}

function AfterCertificationQuizPassed({ score, courseName }) {
  const { courseId } = useParams();
  return (
    <div className="flex justify-center  min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-xl">
        <Alert color="success">
          <span className="text-lg font-bold">Congratulations! 🎉</span>
        </Alert>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          You have successfully completed the certification quiz with a score of
          <strong className="text-green-500"> {score}%</strong>.
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          You are now certified in <strong>{courseName}</strong>. Your
          certificate is ready for download and can be shared on LinkedIn or
          with potential employers.
        </p>
        <div className="flex justify-between mt-6">
          <NavLink to={`/certificate/${courseId}`}>
            <Button color="green">View/Download Certificate</Button>
          </NavLink>

          <Button color="blue">Continue to Advanced Courses</Button>
        </div>
      </Card>
    </div>
  );
}

function AfterCertificationQuizFailed({ score, passingScore }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-xl">
        <Alert color="warning">
          <span className="text-lg font-bold">Don’t Give Up Yet! 💪</span>
        </Alert>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          You scored <strong className="text-red-500">{score}%</strong>, which
          is below the passing score of
          <strong className="text-blue-500"> {passingScore}%</strong>.
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Keep learning and reviewing the material. Remember, every failure is a
          stepping stone to success!
        </p>
        <div className="flex justify-between mt-6">
          <Button color="gray">Review Course Materials</Button>
          <Button color="blue">Try Again Later</Button>
        </div>
      </Card>
    </div>
  );
}
