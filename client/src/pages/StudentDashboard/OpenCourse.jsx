import { FaBookReader } from 'react-icons/fa';
import { Outlet, useParams, useNavigate, NavLink } from 'react-router-dom';
import Header from '../../components/Header';
import { Progress } from 'flowbite-react';
import LessonsNav from './LessonsNav';
// import { HiMenu } from 'react-icons/hi';
import { useState, useEffect } from 'react';
// import { IoClose } from 'react-icons/io5';
import apiClient from '../../api/apiClient';
import Loader from '../../components/Loader';

export default function OpenCourse() {
  return (
    <div className="bg-yellow-50 dark:text-white font-montserrat dark:bg-slate-900 min-h-screen">
      {/* <Header /> */}
      <Dashboard />
    </div>
  );
}

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [course, setCourse] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myProgress, setMyProgress] = useState(0);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const { courseId, id } = useParams(); // Capture both courseId and id from the route
  const navigate = useNavigate();
  console.log(courseId);
  useEffect(() => {
    setLoading(true)
    const fetchCourseData = async () => {
      try {
              setLoading(true);

        const response = await apiClient.get(`/api/v1/courses/${courseId}`);
        setCourse(response.data.data.course);
        setCourseName(response.data.data.course.title);
console.log("response",response)
        
        const allContents = response.data.data.course.lessons.flatMap(
          (lesson) => lesson.contents,
        );

        let contentToSelect = null;

        // If `id` exists in the URL, find the matching content
        if (id) {
          contentToSelect = allContents.find((content) => content._id === id);
        }

        // If `id` is not provided or doesn't match, select the first content as fallback
        if (!contentToSelect && allContents.length > 0) {
          contentToSelect = allContents[0];
          navigate(`lesson/${contentToSelect._id}`); // Sync the URL
        }

        if (contentToSelect) {
          setSelectedContent(contentToSelect);
        }
      } catch (err) {
        setError('Failed to load course data.');
        console.error(err);
} finally {
        setLoading(false);
      }
    };

    const fetchProgress = async () => {
      
      try {
              setLoading(true);

        const progressResponse = await apiClient.get(
          `/api/v1/progress/course/${courseId}`,
        );
        console.log('progress calculate', progressResponse.data.data);
        setMyProgress(progressResponse.data.data.overallProgress);

      } catch (err) {
        setError('Failed to load course progress.');
        console.error(err);

      }
    };

    fetchProgress();
    fetchCourseData();
  }, [courseId, id, navigate]);

  const handleContentSelect = (content) => {
    setSelectedContent(content);
    setIsOpen(false);
  };

  // import axios from 'axios';
  const handleNavigate = async (direction) => {
    if (!selectedContent || !course) return;

    // Find the current lesson and content
    const currentLessonIndex = course.lessons.findIndex((lesson) =>
      lesson.contents.some((content) => content._id === selectedContent._id),
    );

    if (currentLessonIndex === -1) return;

    const currentLesson = course.lessons[currentLessonIndex];
    const currentIndex = currentLesson.contents.findIndex((content) =>
     content._id === selectedContent._id,
    );

    let newContent = null;

    if (direction === 'next') {
      if (
        currentIndex === currentLesson.contents.length - 1 &&
        currentLessonIndex < course.lessons.length - 1
      ) {
        // Navigate to the first content of the next lesson
        const nextLesson = course.lessons[currentLessonIndex + 1];
        newContent = nextLesson.contents[0];
      } else if (currentIndex < currentLesson.contents.length - 1) {
        // Navigate to the next content in the same lesson

        newContent = currentLesson.contents[currentIndex + 1];
      } else if (
        currentIndex === currentLesson.contents.length - 1 &&
        currentLessonIndex === course.lessons.length - 1
      ) {
        newContent = currentLesson.contents[currentIndex];
      }
    } else if (direction === 'previous') {
      if (currentIndex > 0) {
        newContent = currentLesson.contents[currentIndex - 1];
      } else if (currentLessonIndex > 0) {
        const previousLesson = course.lessons[currentLessonIndex - 1];
        newContent =
          previousLesson.contents[previousLesson.contents.length - 1];
      }
    }

    if (newContent) {
      try {
        // Update progress in the backend
        const data = await apiClient.patch('/api/v1/progress/update', {
          courseId: course._id,
          contentId: newContent._id,
          lessonId: currentLesson._id,
          completedContentId: selectedContent._id, // Include the current content
        });

        console.log('Progress updated successfully', data);

        // Update selected content
        setSelectedContent(newContent);

        // Update the route with the new content ID
        navigate(`lesson/${newContent._id}`);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return <div><Loader/></div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header toggleNav={toggleMenu} isOpenNav={isOpen} />
      <div className="container text-slate-900 dark:text-white dark:bg-slate-900 px-4 md:px-8 pt-32 relative">
        {/* <div className="flex justify-start">
          {isOpen ? (
            <IoClose
              size={24}
              onClick={toggleMenu}
              className="cursor-pointer lg:hidden text-2xl fixed top-16  bg-slate-900  left-4 z-50"
            />
          ) : (
            <HiMenu
              size={24}
              onClick={toggleMenu}
              className="cursor-pointer bg-slate-900  lg:hidden text-2xl fixed top-16 left-4 z-50"
            />
          )}
        </div> */}
        <NavLink
          to="/dashboard/mycourse"
          className="px-4 py-2 border hover:text-white hover:bg-yellow-500 md:px-8 border-yellow-500 rounded-lg text-yellow-500 font-bold transition-all duration-200"
        >
          My Course
        </NavLink>

        <div className="flex flex-col lg:flex-row lg:space-x-4 sm:space-y-2 mt-4 items-start lg:justify-between">
          <div className="flex justify-start space-x-4 items-center">
            <FaBookReader size={26} className="text-yellow-500" />
            <h1 className="text-md md:text-3xl font-extrabold">{courseName}</h1>
          </div>
          <div className="flex justify-start space-x-4 items-center">
            <Progress
              className="w-80 text-sm"
              progress={myProgress}
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
              // progress={progress}
            />
          </div>
          <div className="flex-1">
            <Outlet context={{ selectedContent, handleNavigate, courseName }} />
          </div>
        </div>

        {isOpen && (
          <div
            className={`fixed inset-0 bg-slate-900/50 text-yellow-500 font-montserrat transition-all duration-300 ease-in-out z-50 mt-16 lg:hidden ${
              isOpen ? 'transform-none' : '-translate-x-full'
            }`}
          >
            <div className="fixed w-svw h-screen">
              <LessonsNav
                course={course}
                handleContentSelect={handleContentSelect}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
