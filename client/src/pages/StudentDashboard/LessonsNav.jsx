/* eslint-disable react/prop-types */

// import { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
// import apiClient from '../../api/apiClient';
// import DisplayContent from './DisplayContent'; // Import the DisplayContent component

export default function LessonsNav({ course, handleContentSelect }) {
  // const [course, setCourse] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // // // const [selectedContent, setSelectedContent] = useState(null);

  // useEffect(() => {
  //   const fetchCourseData = async () => {
  //     try {
  //       const response = await apiClient.get(
  //         '/api/v1/courses/6732f520fa7cb6d36744b277',
  //       ); // Replace with your API endpoint
  //       setCourse(response.data.data.course);
  //     } catch (err) {
  //       setError('Failed to load course data.');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourseData();
  // }, []);

  // const handleContentSelect = (content) => {
  //   // setSelectedContent(content);
  //   console.log(content)
  // };

  // // const handleNavigate = (direction) => {
  // //   if (!selectedContent || !course) return;

  // //   const currentLesson = course.lessons.find((lesson) =>
  // //     lesson.contents.some((content) => content.id === selectedContent.id),
  // //   );

  // //   if (currentLesson) {
  // //     const currentIndex = currentLesson.contents.findIndex(
  // //       (content) => content.id === selectedContent.id,
  // //     );

  // //     if (direction === 'previous' && currentIndex > 0) {
  // //       setSelectedContent(currentLesson.contents[currentIndex - 1]);
  // //     }

  // //     if (
  // //       direction === 'next' &&
  // //       currentIndex < currentLesson.contents.length - 1
  // //     ) {
  // //       setSelectedContent(currentLesson.contents[currentIndex + 1]);
  // //     }
  // //   }
  // // };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="sticky top-12 z-10 w-80 h-screen"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {course.lessons.map((lesson) => (
              <Sidebar.Collapse
                key={lesson.lessonTitle}
                label={lesson.lessonTitle}
              >
                {lesson.contents.map((content) => (
                  <NavLink key={content._id} to={`lesson/${content._id}`}>
                    <Sidebar.Item
                      key={content.id}
                      className="ms-4 text-start text-ellipsis overflow-hidden whitespace-nowrap"
                      onClick={() => handleContentSelect(content)}
                      title={content.contentTitle} // Tooltip for full title
                    >
                      {content.contentTitle}
                    </Sidebar.Item>
                  </NavLink>
                ))}
              </Sidebar.Collapse>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Main Content Area */}
      {/* <div className="flex-1 bg-gray-100">
        <DisplayContent content={selectedContent} onNavigate={handleNavigate} />
      </div> */}
    </div>
  );
}
