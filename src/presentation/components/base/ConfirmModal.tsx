import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = 'danger',
}) => {
  if (!isOpen) return null;

  const iconColors = {
    danger: {
      bg: 'bg-red-100',
      icon: 'text-red-500',
    },
    warning: {
      bg: 'bg-orange-100',
      icon: 'text-orange-500',
    },
  };

  const colors = iconColors[variant];

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
          {/* Warning Icon */}
          <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center shrink-0`}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={colors.icon}
            >
              <path 
                d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64 18.3 1.55 18.65 1.55 19C1.55 19.35 1.64 19.69 1.81 19.99C1.99 20.29 2.24 20.55 2.54 20.72C2.84 20.9 3.18 21 3.53 21H20.47C20.82 21 21.16 20.9 21.46 20.72C21.76 20.55 22.01 20.29 22.19 19.99C22.36 19.69 22.45 19.35 22.45 19C22.45 18.65 22.35 18.3 22.18 18L13.71 3.86C13.53 3.57 13.28 3.32 12.98 3.15C12.68 2.99 12.34 2.9 12 2.9C11.66 2.9 11.32 2.99 11.02 3.15C10.72 3.32 10.47 3.57 10.29 3.86Z" 
                stroke="currentColor" 
                strokeWidth="2" 
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
        <div className="flex items-center justify-end gap-3 mt-6 -mx-6 -mb-6 px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-[var(--color-text-primary)] bg-white border border-[var(--color-border)] hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
