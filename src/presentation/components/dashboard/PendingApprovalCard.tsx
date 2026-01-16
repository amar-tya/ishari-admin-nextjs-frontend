import React from 'react';
import { Card } from '../base';
import { AlertIcon, ArrowRightIcon } from '../base/icons';

interface PendingApprovalCardProps {
  count: number;
  message?: string;
  onReviewClick?: () => void;
  className?: string;
}

export const PendingApprovalCard: React.FC<PendingApprovalCardProps> = ({
  count,
  message = 'new user registration requests pending your approval.',
  onReviewClick,
  className = '',
}) => {
  return (
    <Card className={`bg-[#FEF2F2] border-[#FECACA] ${className}`} padding="md">
      <div className="flex gap-3">
        {/* Alert Icon */}
        <div
          className="
            flex-shrink-0
            flex items-center justify-center
            w-10 h-10 rounded-full
            bg-[#FEE2E2]
          "
        >
          <span className="text-[#DC2626]">
            <AlertIcon size={20} />
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-subtitle text-[#991B1B] mb-1">Pending Approvals</h3>
          <p className="text-description text-[#7F1D1D]">
            There are {count} {message}
          </p>

          {/* Review Button */}
          <button
            onClick={onReviewClick}
            className="
              inline-flex items-center gap-1 mt-3
              text-[#DC2626] font-medium
              hover:text-[#B91C1C]
              transition-colors
              text-[clamp(0.75rem,0.9vw,0.875rem)]
            "
          >
            Review Requests
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PendingApprovalCard;
