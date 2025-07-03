import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiDollarSign, FiStar, FiTrendingUp, FiTrendingDown, FiTarget } = FiIcons;

const CoursesOverviewWidget = ({ courses }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Performing Courses</h3>
        <Link to="/courses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link
                  to={`/courses/${course.id}`}
                  className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                >
                  {course.title}
                </Link>
                
                <div className="flex items-center mt-3 space-x-4 text-sm">
                  <div className="flex items-center text-blue-600">
                    <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                  
                  <div className="flex items-center text-green-600">
                    <SafeIcon icon={FiDollarSign} className="h-4 w-4 mr-1" />
                    {course.revenue === 0 ? 'Free' : `$${course.revenue.toLocaleString()}`}
                  </div>
                  
                  <div className="flex items-center text-yellow-600">
                    <SafeIcon icon={FiStar} className="h-4 w-4 mr-1" />
                    {course.rating}
                  </div>
                  
                  <div className="flex items-center text-purple-600">
                    <SafeIcon icon={FiTarget} className="h-4 w-4 mr-1" />
                    {course.completion}%
                  </div>
                </div>
              </div>
              
              <div className="ml-4 flex flex-col items-end">
                <div className={`flex items-center text-sm ${
                  course.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <SafeIcon 
                    icon={course.trend === 'up' ? FiTrendingUp : FiTrendingDown} 
                    className="h-4 w-4 mr-1" 
                  />
                  #{index + 1}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              ${courses.reduce((sum, course) => sum + course.revenue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesOverviewWidget;