import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Berhasil",
  message,
  buttonText = "OK",
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4">
          {/* Success Icon */}
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-green-600"
            >
              <path 
                d="M20 6L9 17L4 12" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
              {title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {message}
            </p>
          </div>
        </div>

        {/* Actions with background */}
        <div className="flex items-center justify-end mt-6 -mx-6 -mb-6 px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
