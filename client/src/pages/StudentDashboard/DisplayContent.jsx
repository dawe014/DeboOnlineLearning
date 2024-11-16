/* eslint-disable react/prop-types */

import { Button } from 'flowbite-react';

export default function DisplayContent({ content, onNavigate }) {
  if (!content) {
    return (
      <div className="p-4 text-gray-500">Select a lesson content to view.</div>
    );
  }

  return (
    <div className="w-full min-h-screen border px-4 py-6 bg-gray-50">
      {/* Content Display */}
      <div className="mb-6">
        {content.type === 'video' && (
          <iframe
            className="w-full max-w-4xl h-64 sm:h-96 mx-auto rounded shadow-lg"
            src={content.url}
            title={content.contentTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
        {content.type === 'article' && (
          <div className="prose prose-lg mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold">{content.contentTitle}</h2>
            <p>{content.text}</p>
          </div>
        )}
        {content.type === 'quiz' && (
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">{content.contentTitle}</h2>
            <p>Quiz content and interactions will go here.</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full mt-4">
        <Button
          color="gray"
          onClick={() => onNavigate('previous')}
          disabled={!content.previous}
        >
          Previous
        </Button>
        <Button
          color="blue"
          onClick={() => onNavigate('next')}
          disabled={!content.next}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
