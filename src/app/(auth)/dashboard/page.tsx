import { Button } from '@/presentation/components/base';
import {
  UsersIcon,
  ChaptersIcon,
  VersesIcon,
  SearchIcon,
  UserPlusIcon,
  BookPlusIcon,
  TranslationsIcon,
  SettingsIcon,
  ExportIcon,
  PlusIcon,
} from '@/presentation/components/base/icons';
import {
  StatCard,
  QuickActionCard,
  NotificationCard,
  PendingApprovalCard,
  RecentUpdatesTable,
} from '@/presentation/components/dashboard';

// Dummy data - with colors matching the design
const statsData = [
  { 
    icon: <UsersIcon size={28} />, 
    label: 'Total Users', 
    value: 1240,
    iconBgColor: 'bg-[#EAF7ED]',
    iconColor: 'text-[#3AAF50]',
    labelColor: 'text-[#3AAF50]',
  },
  { 
    icon: <ChaptersIcon size={28} />, 
    label: 'Chapters', 
    value: 543,
    iconBgColor: 'bg-[#DBEAFE]',
    iconColor: 'text-[#2563EB]',
    labelColor: 'text-[#2563EB]',
  },
  { 
    icon: <VersesIcon size={28} />, 
    label: 'Verses', 
    value: 89,
    iconBgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#D97706]',
    labelColor: 'text-[#D97706]',
  },
  { 
    icon: <SearchIcon size={28} />, 
    label: 'Daily Searches', 
    value: 2304,
    iconBgColor: 'bg-[#DBEAFE]',
    iconColor: 'text-[#2563EB]',
    labelColor: 'text-[#2563EB]',
  },
];

const quickActions = [
  { icon: <UserPlusIcon size={24} />, label: 'Add User', color: 'bg-[#EAF7ED]', iconColor: 'text-[#3AAF50]' },
  { icon: <BookPlusIcon size={24} />, label: 'Add Book', color: 'bg-[#FEF3C7]', iconColor: 'text-[#D97706]' },
  { icon: <TranslationsIcon size={24} />, label: 'New Translation', color: 'bg-[#DBEAFE]', iconColor: 'text-[#2563EB]' },
  { icon: <SettingsIcon size={24} />, label: 'Manage Roles', color: 'bg-[#EAF7ED]', iconColor: 'text-[#3AAF50]' },
];

const notificationsData = [
  { id: '1', message: 'System updates available', type: 'info' as const },
  { id: '2', message: 'New user registration', type: 'info' as const },
];

const recentUpdatesData = [
  {
    id: '1',
    entity: 'Verse #4023',
    action: 'Text Update',
    user: { name: 'John Doe', initials: 'JD' },
    time: '2 mins ago',
    status: 'completed' as const,
  },
  {
    id: '2',
    entity: 'Translation: EN_V2',
    action: 'New Registration',
    user: { name: 'Alice Smith', initials: 'AS' },
    time: '45 mins ago',
    status: 'pending' as const,
  },
  {
    id: '3',
    entity: 'User: M. Scott',
    action: 'Role Change',
    user: { name: 'Admin', initials: 'AD' },
    time: '2 hours ago',
    status: 'completed' as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-heading">Welcome back, Admin 👋</h1>
          <p className="text-description mt-1">
            Here&apos;s what&apos;s happening with your master data today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={<ExportIcon size={18} />}>
            Export Report
          </Button>
          <Button variant="primary" icon={<PlusIcon size={18} />}>
            New Entry
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px, 15vw, 200px), 1fr))',
        }}
      >
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
            labelColor={stat.labelColor}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: 'minmax(0, 1fr) clamp(280px, 25vw, 360px)',
        }}
      >
        {/* Left Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div>
            <h2 className="text-title mb-4">Quick Actions</h2>
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(100px, 12vw, 140px), 1fr))',
              }}
            >
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  icon={action.icon}
                  label={action.label}
                  iconBgColor={action.color}
                  iconColor={action.iconColor}
                />
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <RecentUpdatesTable data={recentUpdatesData} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <NotificationCard notifications={notificationsData} />

          {/* Pending Approvals */}
          <PendingApprovalCard
            count={3}
            message="new user registration requests pending your approval."
          />
        </div>
      </div>
    </div>
  );
}