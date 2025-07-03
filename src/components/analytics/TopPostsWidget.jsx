import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiEye, FiHeart, FiMessageCircle, FiShare2, FiTrendingUp, FiTrendingDown, FiClock } = FiIcons;

const TopPostsWidget = ({ posts }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Performing Posts</h3>
        <Link to="/blog" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link 
                  to={`/blog/${post.id}`}
                  className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
                
                <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <SafeIcon icon={FiClock} className="h-3 w-3 mr-1" />
                    {post.readTime}m read
                  </div>
                  <span>{post.publishedAt}</span>
                </div>

                <div className="flex items-center mt-3 space-x-4 text-sm">
                  <div className="flex items-center text-blue-600">
                    <SafeIcon icon={FiEye} className="h-4 w-4 mr-1" />
                    {post.views.toLocaleString()}
                  </div>
                  <div className="flex items-center text-red-600">
                    <SafeIcon icon={FiHeart} className="h-4 w-4 mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center text-purple-600">
                    <SafeIcon icon={FiMessageCircle} className="h-4 w-4 mr-1" />
                    {post.comments}
                  </div>
                  <div className="flex items-center text-green-600">
                    <SafeIcon icon={FiShare2} className="h-4 w-4 mr-1" />
                    {post.shares}
                  </div>
                </div>
              </div>

              <div className="ml-4 flex flex-col items-end">
                <div className={`flex items-center text-sm ${
                  post.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <SafeIcon 
                    icon={post.trend === 'up' ? FiTrendingUp : FiTrendingDown} 
                    className="h-4 w-4 mr-1" 
                  />
                  #{index + 1}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopPostsWidget;