import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiEdit, FiTrash2, FiEye, FiEyeOff, FiPlus, FiBook, FiFileText, 
  FiCalendar, FiClock, FiUsers, FiStar, FiMoreHorizontal, FiFilter
} = FiIcons;

const ContentManagementWidget = ({ posts, courses, analytics }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [filter, setFilter] = useState('all');

  const tabs = [
    { id: 'posts', label: 'Blog Posts', icon: FiFileText },
    { id: 'courses', label: 'Courses', icon: FiBook },
    { id: 'drafts', label: 'Drafts', icon: FiEdit }
  ];

  const postFilters = ['all', 'published', 'draft', 'scheduled'];
  const courseFilters = ['all', 'active', 'draft', 'archived'];

  const mockDrafts = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      type: 'post',
      lastModified: '2024-01-20',
      status: 'draft'
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      type: 'course',
      lastModified: '2024-01-19',
      status: 'draft'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Content Management</h3>
            <p className="text-gray-600 text-sm mt-1">Manage your blog posts and courses</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {activeTab === 'posts' ? (
                postFilters.map(f => (
                  <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                ))
              ) : activeTab === 'courses' ? (
                courseFilters.map(f => (
                  <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                ))
              ) : (
                <option value="all">All Drafts</option>
              )}
            </select>
            <Link
              to="/create"
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
              New Content
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={tab.icon} className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {activeTab === 'posts' ? posts.length : activeTab === 'courses' ? courses.length : mockDrafts.length}
            </div>
            <div className="text-sm text-blue-600">
              Total {activeTab === 'posts' ? 'Posts' : activeTab === 'courses' ? 'Courses' : 'Drafts'}
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {activeTab === 'posts' ? analytics.publishedThisMonth : activeTab === 'courses' ? analytics.coursesThisMonth : 2}
            </div>
            <div className="text-sm text-green-600">This Month</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {activeTab === 'posts' ? analytics.totalViews.toLocaleString() : activeTab === 'courses' ? analytics.totalStudents.toLocaleString() : '5'}
            </div>
            <div className="text-sm text-purple-600">
              {activeTab === 'posts' ? 'Total Views' : activeTab === 'courses' ? 'Total Students' : 'In Progress'}
            </div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {activeTab === 'posts' ? analytics.avgReadTime : activeTab === 'courses' ? analytics.avgRating : '3'}
            </div>
            <div className="text-sm text-orange-600">
              {activeTab === 'posts' ? 'Avg Read Time' : activeTab === 'courses' ? 'Avg Rating' : 'Scheduled'}
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="space-y-4">
          {activeTab === 'posts' && posts.slice(0, 5).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{post.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-1" />
                      {post.publishedAt}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiEye} className="h-4 w-4 mr-1" />
                      {post.views}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="h-4 w-4 mr-1" />
                      {post.readTime}m
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor('published')}`}>
                  Published
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <SafeIcon icon={FiEdit} className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <SafeIcon icon={FiMoreHorizontal} className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {activeTab === 'courses' && courses.slice(0, 5).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
                      {course.students}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiStar} className="h-4 w-4 mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor('published')}`}>
                  Active
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <SafeIcon icon={FiEdit} className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <SafeIcon icon={FiMoreHorizontal} className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {activeTab === 'drafts' && mockDrafts.map((draft, index) => (
            <motion.div
              key={draft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <SafeIcon 
                    icon={draft.type === 'post' ? FiFileText : FiBook} 
                    className="h-6 w-6 text-gray-400" 
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{draft.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-1" />
                      Modified {draft.lastModified}
                    </div>
                    <span className="capitalize">{draft.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(draft.status)}`}>
                  {draft.status}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <SafeIcon icon={FiEdit} className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Quick Actions</h4>
            <div className="flex space-x-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Bulk Edit
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Export
              </button>
              <button className="px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagementWidget;