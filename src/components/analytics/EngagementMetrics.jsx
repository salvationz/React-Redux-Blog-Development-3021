import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiClock, FiUsers, FiTrendingUp, FiActivity, FiBookmark } = FiIcons;

const EngagementMetrics = ({ analytics }) => {
  const engagementData = [
    {
      name: 'Engagement Rate',
      value: `${analytics.engagementRate}%`,
      change: analytics.engagementGrowth,
      description: 'Likes, comments, and shares per view',
      icon: FiActivity,
      color: 'purple'
    },
    {
      name: 'Average Read Time',
      value: `${analytics.avgReadTime}m`,
      change: analytics.readTimeGrowth,
      description: 'Time spent reading your content',
      icon: FiClock,
      color: 'blue'
    },
    {
      name: 'Bounce Rate',
      value: `${analytics.bounceRate}%`,
      change: analytics.bounceRateGrowth,
      description: 'Visitors who leave after one page',
      icon: FiTarget,
      color: 'orange',
      inverse: true
    },
    {
      name: 'Return Visitors',
      value: '42.3%',
      change: 18.7,
      description: 'Visitors who come back to your blog',
      icon: FiUsers,
      color: 'green'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' },
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' }
    };
    return colors[color];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Engagement Insights</h3>
          <p className="text-gray-600 text-sm mt-1">How users interact with your content</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <SafeIcon icon={FiTrendingUp} className="h-4 w-4" />
          <span>Real-time data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engagementData.map((metric, index) => {
          const colorClasses = getColorClasses(metric.color);
          const isPositive = metric.inverse ? metric.change < 0 : metric.change > 0;
          
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses.light}`}>
                  <SafeIcon icon={metric.icon} className={`h-5 w-5 ${colorClasses.text}`} />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {isPositive ? '+' : ''}{metric.change.toFixed(1)}%
                </div>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              
              <div className="text-sm font-medium text-gray-900 mb-2">
                {metric.name}
              </div>
              
              <div className="text-xs text-gray-500">
                {metric.description}
              </div>

              {/* Progress bar for visual representation */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(parseFloat(metric.value), 100)}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className={`h-1 rounded-full ${colorClasses.bg}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Engagement Score */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Overall Engagement Score</h4>
            <p className="text-sm text-gray-600">Based on all interaction metrics</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600">8.7</div>
            <div className="text-sm text-green-600 font-medium">+0.5 this month</div>
          </div>
        </div>
        
        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '87%' }}
            transition={{ delay: 1, duration: 1 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default EngagementMetrics;