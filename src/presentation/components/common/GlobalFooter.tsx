import React from 'react';

export const GlobalFooter = () => {
  const creatorName = process.env.NEXT_PUBLIC_CREATOR_NAME || 'Creator';
  const creatorMessage =
    process.env.NEXT_PUBLIC_CREATOR_MESSAGE || 'Built with love';
  const creatorEmail =
    process.env.NEXT_PUBLIC_CREATOR_EMAIL || 'contact@example.com';

  return (
    <footer className="w-full py-6 mt-auto bg-white border-t border-gray-200">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-gray-500">
          <p>
            {new Date().getFullYear()} {creatorMessage} oleh{' '}
            <span className="font-medium text-gray-900">{creatorName}</span>
          </p>
          <div className="flex space-x-4">
            <a
              href={`mailto:${creatorEmail}`}
              className="transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950"
              aria-label="Contact via email"
            >
              Contact: {creatorEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
