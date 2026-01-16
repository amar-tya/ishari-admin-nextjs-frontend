import React from 'react';
import { Card } from '../base';
import { InfoIcon, ChevronRightIcon } from '../base/icons';

interface NotificationItem {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}

interface NotificationCardProps {
  notifications: NotificationItem[];
  className?: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notifications,
  className = '',
}) => {
  const getTypeStyles = (type: NotificationItem['type']) => {
    switch (type) {
      case 'warning':
        return 'text-[var(--color-warning)]';
      case 'success':
        return 'text-[var(--color-success)]';
      default:
        return 'text-[var(--color-info)]';
    }
  };

  return (
    <Card className={className} padding="md">
      <h3 className="text-subtitle mb-4">Unread Notifications</h3>
      
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="
              flex items-center justify-between
              p-3 rounded-lg
              bg-[var(--color-bg-main)]
              hover:bg-[var(--color-border-light)]
              transition-colors cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <span className={getTypeStyles(notification.type)}>
                <InfoIcon size={18} />
              </span>
              <p className="text-body">{notification.message}</p>
            </div>
            <span className={getTypeStyles(notification.type)}>
              <ChevronRightIcon size={16} />
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NotificationCard;
