// /* eslint-disable react/prop-types */

import { Button } from 'flowbite-react';
import { useOutletContext } from 'react-router-dom';

export default function DisplayContent() {
  const { selectedContent, handleNavigate } = useOutletContext();
  console.log('content', selectedContent);
  if (!selectedContent) {
    return (
      <div className="p-4 text-gray-500">Select a lesson content to view.</div>
    );
  }

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
          <div className="prose prose-lg mx-auto p-4 bg-white dark:bg-slate-900 rounded shadow">
            <div
              className="react-quill"
              dangerouslySetInnerHTML={{ __html: selectedContent.text }}
            ></div>

            {/* <p>{selectedContent.text}</p> */}
          </div>
        )}
        {selectedContent.type === 'quiz' && (
          <div className="p-4 dark:bg-slate-900 bg-white rounded shadow">
            
            <p>Quiz content and interactions will go here.</p>
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
