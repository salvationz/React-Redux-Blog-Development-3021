import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiTarget, FiClock, FiAward, FiTrendingUp, FiBookOpen, FiCheckCircle, FiPlay } = FiIcons;

const StudentProgressWidget = ({ analytics }) => {
  const progressData = [
    {
      name: 'Active Learners',
      value: '2,890',
      total: analytics.totalStudents,
      percentage: 78,
      icon: FiUsers,
      color: 'blue'
    },
    {
      name: 'Course Completions',
      value: '1,425',
      total: analytics.totalEnrollments,
      percentage: 65,
      icon: FiCheckCircle,
      color: 'green'
    },
    {
      name: 'Avg Progress',
      value: '67%',
      total: 100,
      percentage: 67,
      icon: FiTarget,
      color: 'purple'
    },
    {
      name: 'Study Time',
      value: '4.2h',
      total: 8,
      percentage: 52,
      icon: FiClock,
      color: 'orange'
    }
  ];

  const recentActivity = [
    { action: 'Course completed', course: 'React Fundamentals', count: 23, time: '2h ago' },
    { action: 'New enrollments', course: 'Python Data Science', count: 45, time: '4h ago' },
    { action: 'Certificates issued', course: 'UI/UX Design', count: 12, time: '6h ago' },
    { action: 'Progress milestones', course: 'Node.js Backend', count: 34, time: '8h ago' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600' }
    };
    return colors[color];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Student Progress</h3>
          <p className="text-gray-600 text-sm mt-1">Learning activity and completion rates</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <SafeIcon icon={FiTrendingUp} className="h-4 w-4" />
          <span>Real-time</span>
        </div>
      </div>

      {/* Progress Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {progressData.map((metric, index) => {
          const colorClasses = getColorClasses(metric.color);
          
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses.light}`}>
                  <SafeIcon icon={metric.icon} className={`h-4 w-4 ${colorClasses.text}`} />
                </div>
                <span className={`text-xs font-medium ${colorClasses.text}`}>
                  {metric.percentage}%
                </span>
              </div>

              <div className="text-xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>

              <div className="text-sm text-gray-600 mb-3">
                {metric.name}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className={`h-2 rounded-full ${colorClasses.bg}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <SafeIcon icon={FiBookOpen} className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.course}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  +{activity.count}
                </div>
                <div className="text-xs text-gray-500">
                  {activity.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {analytics.completionRate}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {analytics.avgRating}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              2,890
            </div>
            <div className="text-sm text-gray-600">Active Students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressWidget;