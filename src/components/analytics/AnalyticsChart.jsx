import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiEye, FiHeart, FiMessageCircle, FiShare2 } = FiIcons;

const AnalyticsChart = ({ data, selectedMetric, onMetricChange }) => {
  const metrics = [
    { key: 'views', label: 'Views', icon: FiEye, color: 'blue' },
    { key: 'likes', label: 'Likes', icon: FiHeart, color: 'red' },
    { key: 'comments', label: 'Comments', icon: FiMessageCircle, color: 'purple' },
    { key: 'shares', label: 'Shares', icon: FiShare2, color: 'green' }
  ];

  const maxValue = Math.max(...data.map(item => item[selectedMetric]));
  
  const colorClasses = {
    blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
    red: { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-600' },
    purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' },
    green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' }
  };

  const selectedMetricConfig = metrics.find(m => m.key === selectedMetric);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          <p className="text-gray-600 text-sm mt-1">Track your blog's key metrics over time</p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex flex-wrap gap-2">
          {metrics.map(metric => (
            <button
              key={metric.key}
              onClick={() => onMetricChange(metric.key)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedMetric === metric.key
                  ? `${colorClasses[metric.color].bg} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={metric.icon} className="h-4 w-4 mr-2" />
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between px-4">
          {data.map((item, index) => {
            const height = (item[selectedMetric] / maxValue) * 100;
            return (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center flex-1 mx-1"
              >
                <div 
                  className={`w-full max-w-12 ${selectedMetricConfig.color === 'blue' ? 'bg-blue-500' : 
                    selectedMetricConfig.color === 'red' ? 'bg-red-500' :
                    selectedMetricConfig.color === 'purple' ? 'bg-purple-500' : 'bg-green-500'
                  } rounded-t-md relative group cursor-pointer`}
                  style={{ height: '100%' }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {item[selectedMetric].toLocaleString()} {selectedMetric}
                  </div>
                </div>
                
                <div className="mt-3 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {item[selectedMetric].toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.date}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        {metrics.map(metric => {
          const total = data.reduce((sum, item) => sum + item[metric.key], 0);
          const average = total / data.length;
          
          return (
            <div key={metric.key} className="text-center">
              <div className={`inline-flex items-center justify-center w-8 h-8 ${colorClasses[metric.color].light} rounded-lg mb-2`}>
                <SafeIcon icon={metric.icon} className={`h-4 w-4 ${colorClasses[metric.color].text}`} />
              </div>
              <div className="text-lg font-bold text-gray-900">
                {total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                Total {metric.label}
              </div>
              <div className="text-xs text-gray-500">
                Avg: {Math.round(average).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsChart;