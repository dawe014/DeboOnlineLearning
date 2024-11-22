/* eslint-disable react/prop-types */

import { Sidebar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

export default function LessonsNav({ course, handleContentSelect }) {
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="sticky top-12 z-10 w-80 h-[520px]"
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
    </div>
  );
}