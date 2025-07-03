import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

const MetricsCard = ({ name, value, change, icon, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    indigo: 'bg-indigo-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    pink: 'bg-pink-500'
  };

  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`${colorClasses[color]} p-3 rounded-lg`}>
            <SafeIcon icon={icon} className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{name}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`flex items-center text-sm font-medium ${
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
          }`}>
            {isPositive && <SafeIcon icon={FiTrendingUp} className="h-4 w-4 mr-1" />}
            {isNegative && <SafeIcon icon={FiTrendingDown} className="h-4 w-4 mr-1" />}
            {Math.abs(change).toFixed(1)}%
          </div>
          <p className="text-xs text-gray-500 mt-1">vs last period</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsCard;