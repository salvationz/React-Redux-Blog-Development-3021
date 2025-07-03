import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiTrendingDown, FiMinus } = FiIcons;

const TrafficSourcesWidget = ({ sources }) => {
  const getSourceIcon = (source) => {
    switch (source.toLowerCase()) {
      case 'organic search':
        return '🔍';
      case 'direct':
        return '🌐';
      case 'social media':
        return '📱';
      case 'referral':
        return '🔗';
      case 'email':
        return '📧';
      default:
        return '📊';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return FiTrendingUp;
      case 'down':
        return FiTrendingDown;
      default:
        return FiMinus;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
        <span className="text-sm text-gray-500">Last 30 days</span>
      </div>

      <div className="space-y-4">
        {sources.map((source, index) => (
          <motion.div
            key={source.source}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center flex-1">
              <span className="text-2xl mr-3">{getSourceIcon(source.source)}</span>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {source.source}
                </div>
                <div className="text-xs text-gray-500">
                  {source.visitors.toLocaleString()} visitors
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {source.percentage}%
                </div>
                <div className={`flex items-center text-xs ${getTrendColor(source.trend)}`}>
                  <SafeIcon 
                    icon={getTrendIcon(source.trend)} 
                    className="h-3 w-3 mr-1" 
                  />
                  {source.trend}
                </div>
              </div>
              
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${source.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="bg-primary-500 h-2 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Visitors</span>
          <span className="font-semibold text-gray-900">
            {sources.reduce((sum, source) => sum + source.visitors, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrafficSourcesWidget;