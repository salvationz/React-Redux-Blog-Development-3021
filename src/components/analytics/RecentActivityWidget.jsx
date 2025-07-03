import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageCircle, FiHeart, FiShare2, FiUserPlus, FiMoreHorizontal } = FiIcons;

const RecentActivityWidget = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment':
        return FiMessageCircle;
      case 'like':
        return FiHeart;
      case 'share':
        return FiShare2;
      case 'subscribe':
        return FiUserPlus;
      default:
        return FiMoreHorizontal;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'comment':
        return 'text-purple-600 bg-purple-100';
      case 'like':
        return 'text-red-600 bg-red-100';
      case 'share':
        return 'text-green-600 bg-green-100';
      case 'subscribe':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <img
              src={activity.avatar}
              alt={activity.user}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  {activity.user}
                </span>
                <div className={`p-1 rounded-full ${getActivityColor(activity.type)}`}>
                  <SafeIcon 
                    icon={getActivityIcon(activity.type)} 
                    className="h-3 w-3" 
                  />
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mt-1">
                {activity.action} {activity.target && (
                  <span className="font-medium text-gray-900">
                    "{activity.target}"
                  </span>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {activity.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center">
          <div className="flex -space-x-2">
            {activities.slice(0, 4).map((activity, index) => (
              <img
                key={index}
                src={activity.avatar}
                alt={activity.user}
                className="w-6 h-6 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <span className="ml-3 text-sm text-gray-600">
            +{activities.length - 4} more interactions today
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityWidget;