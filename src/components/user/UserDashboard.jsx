import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import { useAuthContext } from '../../contexts/AuthContext'

const { 
  FiUser, FiBookOpen, FiEdit, FiHeart, FiMessageCircle, FiEye, 
  FiTrendingUp, FiCalendar, FiClock, FiStar, FiTarget, FiAward,
  FiBookmark, FiSettings, FiBarChart3
} = FiIcons

const UserDashboard = () => {
  const { user } = useAuthContext()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3 },
    { id: 'posts', label: 'My Posts', icon: FiEdit },
    { id: 'courses', label: 'My Courses', icon: FiBookOpen },
    { id: 'bookmarks', label: 'Bookmarks', icon: FiBookmark },
    { id: 'profile', label: 'Profile', icon: FiUser }
  ]

  // Mock user data
  const userStats = {
    postsWritten: 12,
    coursesEnrolled: 8,
    coursesCompleted: 5,
    totalViews: 3420,
    totalLikes: 287,
    totalComments: 94,
    readingTime: 24.5,
    streak: 7,
    achievements: 6
  }

  const recentPosts = [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      status: 'published',
      views: 1420,
      likes: 89,
      comments: 23,
      publishedAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Advanced CSS Grid Techniques',
      status: 'draft',
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: null
    }
  ]

  const enrolledCourses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      progress: 75,
      instructor: 'John Smith',
      nextLesson: 'React Router Deep Dive',
      totalLessons: 42,
      completedLessons: 31
    },
    {
      id: 2,
      title: 'Python for Data Science',
      progress: 45,
      instructor: 'Dr. Emily Rodriguez',
      nextLesson: 'Data Visualization with Matplotlib',
      totalLessons: 28,
      completedLessons: 13
    }
  ]

  const achievements = [
    { id: 1, title: 'First Post', description: 'Published your first blog post', earned: true },
    { id: 2, title: 'Consistent Writer', description: 'Published 10 posts', earned: true },
    { id: 3, title: 'Popular Author', description: 'Received 100 likes', earned: true },
    { id: 4, title: 'Course Enthusiast', description: 'Enrolled in 5 courses', earned: true },
    { id: 5, title: 'Quick Learner', description: 'Completed a course in 1 week', earned: false },
    { id: 6, title: 'Community Helper', description: 'Helped 50 students', earned: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.user_metadata?.name || 'User'}!
              </h1>
              <p className="text-gray-600 mt-2">Track your learning journey and content creation</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                <SafeIcon icon={FiTarget} className="h-4 w-4 mr-1" />
                {userStats.streak} day streak
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-1">
            <nav className="flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-500">
                      <SafeIcon icon={FiEdit} className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Posts Written</p>
                    <p className="text-2xl font-semibold text-gray-900">{userStats.postsWritten}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-500">
                      <SafeIcon icon={FiBookOpen} className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Courses Enrolled</p>
                    <p className="text-2xl font-semibold text-gray-900">{userStats.coursesEnrolled}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-500">
                      <SafeIcon icon={FiEye} className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Views</p>
                    <p className="text-2xl font-semibold text-gray-900">{userStats.totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-red-500">
                      <SafeIcon icon={FiHeart} className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Likes</p>
                    <p className="text-2xl font-semibold text-gray-900">{userStats.totalLikes}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <div key={post.id} className="border-l-4 border-primary-500 pl-4">
                      <h4 className="font-medium text-gray-900">{post.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                        {post.status === 'published' && (
                          <>
                            <span>{post.views} views</span>
                            <span>{post.likes} likes</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
                <div className="space-y-4">
                  {enrolledCourses.slice(0, 2).map((course, index) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned 
                        ? 'border-yellow-300 bg-yellow-50' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned ? 'bg-yellow-200' : 'bg-gray-200'
                      }`}>
                        <SafeIcon 
                          icon={FiAward} 
                          className={`h-5 w-5 ${
                            achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                          }`} 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab !== 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-8 text-center"
          >
            <SafeIcon icon={FiSettings} className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label} Coming Soon
            </h3>
            <p className="text-gray-600">
              This section is under development and will be available soon.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard