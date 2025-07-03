import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../components/common/SafeIcon'
import AnalyticsChart from '../components/analytics/AnalyticsChart'
import MetricsCard from '../components/analytics/MetricsCard'
import TopPostsWidget from '../components/analytics/TopPostsWidget'
import TrafficSourcesWidget from '../components/analytics/TrafficSourcesWidget'
import RecentActivityWidget from '../components/analytics/RecentActivityWidget'
import EngagementMetrics from '../components/analytics/EngagementMetrics'
import CoursesOverviewWidget from '../components/analytics/CoursesOverviewWidget'
import RevenueMetricsWidget from '../components/analytics/RevenueMetricsWidget'
import StudentProgressWidget from '../components/analytics/StudentProgressWidget'
import ContentManagementWidget from '../components/analytics/ContentManagementWidget'

const {
  FiEdit, FiEye, FiHeart, FiMessageCircle, FiTrendingUp, FiPlus, FiUsers, FiTarget,
  FiClock, FiShare2, FiBookmark, FiThumbsUp, FiCalendar, FiFilter, FiDownload,
  FiBook, FiPlayCircle, FiDollarSign, FiAward, FiSettings, FiBarChart3, FiGrid,
  FiList, FiPieChart
} = FiIcons

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const { posts } = useSelector(state => state.blog)
  const { courses, enrolledCourses } = useSelector(state => state.courses)

  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('views')
  const [activeView, setActiveView] = useState('overview')

  // Enhanced analytics data combining blog and courses
  const [analytics, setAnalytics] = useState({
    // Blog Analytics
    totalViews: 24567,
    totalLikes: 1843,
    totalComments: 567,
    totalShares: 234,
    totalSubscribers: 1205,
    avgReadTime: 4.2,
    bounceRate: 34.5,
    engagementRate: 6.8,
    totalPosts: posts.length,
    publishedThisMonth: 12,
    // Course Analytics
    totalCourses: courses.length,
    totalStudents: 15420,
    totalRevenue: 89750.50,
    avgRating: 4.7,
    completionRate: 78.5,
    totalEnrollments: 3245,
    activeLearners: 2890,
    coursesThisMonth: 5,
    // Growth Metrics
    viewsGrowth: 12.5,
    likesGrowth: 8.3,
    commentsGrowth: -2.1,
    sharesGrowth: 15.7,
    subscribersGrowth: 23.4,
    readTimeGrowth: 5.2,
    bounceRateGrowth: -8.1,
    engagementGrowth: 11.2,
    studentsGrowth: 28.7,
    revenueGrowth: 45.2,
    enrollmentsGrowth: 32.1,
    completionGrowth: 5.8
  })

  // Enhanced chart data
  const chartData = {
    '7d': [
      { date: '2024-01-15', views: 1200, likes: 89, comments: 23, shares: 12, enrollments: 45, revenue: 2340 },
      { date: '2024-01-16', views: 1450, likes: 102, comments: 31, shares: 18, enrollments: 52, revenue: 2890 },
      { date: '2024-01-17', views: 1680, likes: 125, comments: 28, shares: 15, enrollments: 38, revenue: 1950 },
      { date: '2024-01-18', views: 1890, likes: 143, comments: 35, shares: 22, enrollments: 67, revenue: 3420 },
      { date: '2024-01-19', views: 2100, likes: 167, comments: 42, shares: 28, enrollments: 71, revenue: 3890 },
      { date: '2024-01-20', views: 1750, likes: 134, comments: 29, shares: 19, enrollments: 43, revenue: 2150 },
      { date: '2024-01-21', views: 2200, likes: 178, comments: 48, shares: 31, enrollments: 89, revenue: 4560 }
    ],
    '30d': [
      { date: 'Week 1', views: 8500, likes: 650, comments: 180, shares: 95, enrollments: 285, revenue: 15420 },
      { date: 'Week 2', views: 9200, likes: 720, comments: 210, shares: 110, enrollments: 342, revenue: 18950 },
      { date: 'Week 3', views: 8800, likes: 680, comments: 195, shares: 88, enrollments: 298, revenue: 16780 },
      { date: 'Week 4', views: 10100, likes: 820, comments: 245, shares: 125, enrollments: 425, revenue: 23850 }
    ],
    '90d': [
      { date: 'Month 1', views: 32000, likes: 2400, comments: 680, shares: 340, enrollments: 1250, revenue: 68500 },
      { date: 'Month 2', views: 35500, likes: 2780, comments: 750, shares: 390, enrollments: 1450, revenue: 79200 },
      { date: 'Month 3', views: 38200, likes: 3100, comments: 820, shares: 445, enrollments: 1680, revenue: 89750 }
    ]
  }

  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' }
  ]

  const views = [
    { id: 'overview', label: 'Overview', icon: FiGrid },
    { id: 'blog', label: 'Blog Analytics', icon: FiEdit },
    { id: 'courses', label: 'Course Analytics', icon: FiBook },
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign },
    { id: 'content', label: 'Content Management', icon: FiSettings }
  ]

  // Enhanced metrics for overview
  const overviewMetrics = [
    {
      name: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      change: analytics.revenueGrowth,
      icon: FiDollarSign,
      color: 'green',
      trend: 'up'
    },
    {
      name: 'Total Students',
      value: analytics.totalStudents.toLocaleString(),
      change: analytics.studentsGrowth,
      icon: FiUsers,
      color: 'blue',
      trend: 'up'
    },
    {
      name: 'Course Enrollments',
      value: analytics.totalEnrollments.toLocaleString(),
      change: analytics.enrollmentsGrowth,
      icon: FiBook,
      color: 'purple',
      trend: 'up'
    },
    {
      name: 'Blog Views',
      value: analytics.totalViews.toLocaleString(),
      change: analytics.viewsGrowth,
      icon: FiEye,
      color: 'orange',
      trend: 'up'
    }
  ]

  const blogMetrics = [
    {
      name: 'Total Views',
      value: analytics.totalViews.toLocaleString(),
      change: analytics.viewsGrowth,
      icon: FiEye,
      color: 'blue',
      trend: 'up'
    },
    {
      name: 'Total Likes',
      value: analytics.totalLikes.toLocaleString(),
      change: analytics.likesGrowth,
      icon: FiHeart,
      color: 'red',
      trend: 'up'
    },
    {
      name: 'Comments',
      value: analytics.totalComments.toLocaleString(),
      change: analytics.commentsGrowth,
      icon: FiMessageCircle,
      color: 'purple',
      trend: 'down'
    },
    {
      name: 'Shares',
      value: analytics.totalShares.toLocaleString(),
      change: analytics.sharesGrowth,
      icon: FiShare2,
      color: 'green',
      trend: 'up'
    }
  ]

  const courseMetrics = [
    {
      name: 'Total Students',
      value: analytics.totalStudents.toLocaleString(),
      change: analytics.studentsGrowth,
      icon: FiUsers,
      color: 'blue',
      trend: 'up'
    },
    {
      name: 'Course Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      change: analytics.revenueGrowth,
      icon: FiDollarSign,
      color: 'green',
      trend: 'up'
    },
    {
      name: 'Avg Rating',
      value: analytics.avgRating.toFixed(1),
      change: 2.3,
      icon: FiAward,
      color: 'yellow',
      trend: 'up'
    },
    {
      name: 'Completion Rate',
      value: `${analytics.completionRate}%`,
      change: analytics.completionGrowth,
      icon: FiTarget,
      color: 'purple',
      trend: 'up'
    }
  ]

  // Mock data for widgets
  const topPosts = [
    {
      id: 1,
      title: 'Getting Started with React and Redux Toolkit',
      views: 5420,
      likes: 234,
      comments: 67,
      shares: 45,
      readTime: 8,
      publishedAt: '2024-01-15',
      trend: 'up'
    },
    {
      id: 2,
      title: 'Modern CSS Techniques for Better UI Design',
      views: 3890,
      likes: 187,
      comments: 34,
      shares: 28,
      readTime: 6,
      publishedAt: '2024-01-12',
      trend: 'up'
    },
    {
      id: 3,
      title: 'Building Scalable Node.js Applications',
      views: 4200,
      likes: 198,
      comments: 45,
      shares: 32,
      readTime: 12,
      publishedAt: '2024-01-10',
      trend: 'down'
    }
  ]

  const topCourses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      students: 2847,
      revenue: 25890,
      rating: 4.8,
      completion: 85,
      trend: 'up'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      students: 1523,
      revenue: 0,
      rating: 4.6,
      completion: 72,
      trend: 'up'
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      students: 3421,
      revenue: 45890,
      rating: 4.9,
      completion: 78,
      trend: 'up'
    }
  ]

  const recentActivity = [
    {
      type: 'enrollment',
      user: 'John Doe',
      action: 'enrolled in',
      target: 'React Developer Course',
      time: '2 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    },
    {
      type: 'comment',
      user: 'Sarah Wilson',
      action: 'commented on',
      target: 'Modern CSS Techniques',
      time: '5 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=50&h=50&fit=crop&crop=face'
    },
    {
      type: 'completion',
      user: 'Mike Chen',
      action: 'completed',
      target: 'Python Data Science Course',
      time: '12 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
    },
    {
      type: 'like',
      user: 'Emma Davis',
      action: 'liked',
      target: 'Building Scalable Node.js',
      time: '1 hour ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
    }
  ]

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 5),
        totalStudents: prev.totalStudents + Math.floor(Math.random() * 2),
        totalRevenue: prev.totalRevenue + (Math.random() * 100)
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user?.name}! Here's your complete platform overview
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCalendar} className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {periods.map(period => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <Link
                to="/create"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                New Content
              </Link>
            </div>
          </div>
        </motion.div>

        {/* View Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-1">
            <nav className="flex space-x-1">
              {views.map(view => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === view.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={view.icon} className="h-4 w-4 mr-2" />
                  {view.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Overview View */}
        {activeView === 'overview' && (
          <>
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {overviewMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MetricsCard {...metric} />
                </motion.div>
              ))}
            </div>

            {/* Combined Analytics Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <AnalyticsChart
                data={chartData[selectedPeriod]}
                selectedMetric={selectedMetric}
                onMetricChange={setSelectedMetric}
              />
            </motion.div>

            {/* Quick Overview Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <CoursesOverviewWidget courses={topCourses} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <RevenueMetricsWidget analytics={analytics} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <RecentActivityWidget activities={recentActivity} />
              </motion.div>
            </div>
          </>
        )}

        {/* Blog Analytics View */}
        {activeView === 'blog' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {blogMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MetricsCard {...metric} />
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <AnalyticsChart
                data={chartData[selectedPeriod]}
                selectedMetric={selectedMetric}
                onMetricChange={setSelectedMetric}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <EngagementMetrics analytics={analytics} />
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <TopPostsWidget posts={topPosts} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <TrafficSourcesWidget sources={[
                  { source: 'Organic Search', visitors: 8420, percentage: 42.1, trend: 'up' },
                  { source: 'Direct', visitors: 5230, percentage: 26.2, trend: 'stable' },
                  { source: 'Social Media', visitors: 3890, percentage: 19.5, trend: 'up' },
                  { source: 'Referral', visitors: 1560, percentage: 7.8, trend: 'down' },
                  { source: 'Email', visitors: 890, percentage: 4.4, trend: 'up' }
                ]} />
              </motion.div>
            </div>
          </>
        )}

        {/* Course Analytics View */}
        {activeView === 'courses' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {courseMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MetricsCard {...metric} />
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CoursesOverviewWidget courses={topCourses} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <StudentProgressWidget analytics={analytics} />
              </motion.div>
            </div>
          </>
        )}

        {/* Revenue View */}
        {activeView === 'revenue' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <MetricsCard
                  name="Total Revenue"
                  value={`$${analytics.totalRevenue.toLocaleString()}`}
                  change={analytics.revenueGrowth}
                  icon={FiDollarSign}
                  color="green"
                  trend="up"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MetricsCard
                  name="Monthly Revenue"
                  value="$23,850"
                  change={15.2}
                  icon={FiTrendingUp}
                  color="blue"
                  trend="up"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MetricsCard
                  name="Avg Order Value"
                  value="$127.50"
                  change={8.7}
                  icon={FiTarget}
                  color="purple"
                  trend="up"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <RevenueMetricsWidget analytics={analytics} />
            </motion.div>
          </>
        )}

        {/* Content Management View */}
        {activeView === 'content' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <ContentManagementWidget
                posts={posts}
                courses={courses}
                analytics={analytics}
              />
            </motion.div>
          </>
        )}

        {/* Quick Actions Footer - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-8 bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/create"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiEdit} className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-900">Create Blog Post</span>
            </Link>
            <Link
              to="/create-course"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiBook} className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-900">Create Course</span>
            </Link>
            <Link
              to="/blog"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiEye} className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-900">View Blog</span>
            </Link>
            <Link
              to="/courses"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiUsers} className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-900">View Courses</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard