import { FaBookReader } from 'react-icons/fa';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { Progress } from 'flowbite-react';
import LessonsNav from './LessonsNav';
import { HiMenu } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import apiClient from '../../api/apiClient';

export default function OpenCourse() {
  return (
    <div className="bg-yellow-50 dark:text-white font-montserrat dark:bg-slate-900 min-h-screen">
      <Header />
      <Dashboard />
    </div>
  );
}

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const { courseId } = useParams()
  console.log(courseId)
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        console.log('course')
        const response = await apiClient.get(
          `/api/v1/courses/${courseId}`,
        ); // Replace with your API endpoint
        console.log('response', response)
        setCourse(response.data.data.course);
        // Initialize with the first content
        const firstLesson = response.data.data.course.lessons[0];
        if (firstLesson && firstLesson.contents.length > 0) {
          setSelectedContent(firstLesson.contents[0]);
        }
      } catch (err) {
        setError('Failed to load course data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleContentSelect = (content) => {
    setSelectedContent(content);
  };

  const handleNavigate = (direction) => {
    if (!selectedContent || !course) return;

    // Find the current lesson and content
    const currentLessonIndex = course.lessons.findIndex((lesson) =>
      lesson.contents.some((content) => content._id === selectedContent._id),
    );

    if (currentLessonIndex === -1) return; // Content not found in any lesson

    const currentLesson = course.lessons[currentLessonIndex];
    const currentIndex = currentLesson.contents.findIndex(
      (content) => content._id === selectedContent._id,
    );

    if (direction === 'previous') {
      // If it's the first content of the current lesson, go to the last content of the previous lesson
      if (currentIndex === 0 && currentLessonIndex > 0) {
        const previousLesson = course.lessons[currentLessonIndex - 1];
        setSelectedContent(
          previousLesson.contents[previousLesson.contents.length - 1],
        );
      } else if (currentIndex > 0) {
        // Navigate to the previous content in the same lesson
        setSelectedContent(currentLesson.contents[currentIndex - 1]);
      }
    }

    if (direction === 'next') {
      // If it's the last content of the current lesson, go to the first content of the next lesson
      if (
        currentIndex === currentLesson.contents.length - 1 &&
        currentLessonIndex < course.lessons.length - 1
      ) {
        const nextLesson = course.lessons[currentLessonIndex + 1];
        setSelectedContent(nextLesson.contents[0]);
      } else if (currentIndex < currentLesson.contents.length - 1) {
        // Navigate to the next content in the same lesson
        setSelectedContent(currentLesson.contents[currentIndex + 1]);
      }
    }
  };


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container text-slate-900 dark:text-white dark:bg-slate-900 px-4 md:px-8 pt-32 relative">
      <div className="flex justify-start">
        {isOpen ? (
          <IoClose
            size={24}
            onClick={toggleMenu}
            className="cursor-pointer lg:hidden text-2xl fixed top-16 left-4 z-50"
          />
        ) : (
          <HiMenu
            size={24}
            onClick={toggleMenu}
            className="cursor-pointer lg:hidden text-2xl fixed top-16 left-4 z-50"
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-4 sm:space-y-2 items-start lg:justify-between">
        <div className="flex justify-start space-x-4 items-center">
          <FaBookReader size={26} className="text-yellow-500" />
          <h1 className="text-md md:text-3xl font-extrabold">{course.title}</h1>
        </div>
        <div className="flex justify-start space-x-4 items-center">
          <Progress
            className="w-48"
            progress={45}
            progressLabelPosition="inside"
            textLabel="Progress"
            textLabelPosition="outside"
            size="lg"
            labelProgress
            labelText
          />
        </div>
      </div>

      <div className="flex w-full mt-4 space-x-2">
        <div className="hidden lg:block sticky top-12 z-10 w-80 max-h-screen">
          <LessonsNav
            course={course}
            handleContentSelect={handleContentSelect}
          />
        </div>
        <div className="flex-1">
          <Outlet context={{ selectedContent, handleNavigate }} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-4 lg:hidden top-16 shadow-lg">
          <div className="fixed top-12 z-10 w-64 h-screen">
            <LessonsNav
              course={course}
              handleContentSelect={handleContentSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
}
