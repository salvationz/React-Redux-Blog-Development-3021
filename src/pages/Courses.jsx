import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../components/common/SafeIcon'
import { fetchCourses, enrollCourse, setFilters } from '../store/slices/coursesSlice'

const {
  FiSearch, FiFilter, FiStar, FiUsers, FiClock, FiPlay, FiBookmark,
  FiAward, FiTrendingUp, FiCalendar, FiDollarSign, FiCheck, FiArrowRight
} = FiIcons

const Courses = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courses, isLoading, filters } = useSelector(state => state.courses)
  const { user } = useSelector(state => state.auth)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' }
  ]

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const priceFilters = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
    { value: 'premium', label: 'Premium' }
  ]

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ]

  useEffect(() => {
    dispatch(fetchCourses({
      category: selectedCategory,
      level: selectedLevel,
      price: selectedPrice,
      search: searchTerm,
      sort: sortBy
    }))
  }, [dispatch, selectedCategory, selectedLevel, selectedPrice, searchTerm, sortBy])

  const handleEnroll = (courseId) => {
    if (!user) {
      navigate('/login')
      return
    }
    dispatch(enrollCourse(courseId))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is handled by useEffect
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriceDisplay = (course) => {
    if (course.price === 0) return 'Free'
    if (course.originalPrice && course.originalPrice > course.price) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">${course.price}</span>
          <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
        </div>
      )
    }
    return <span className="text-lg font-bold text-gray-900">${course.price}</span>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn New Skills
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of courses from expert instructors and advance your career
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <SafeIcon
                  icon={FiSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {priceFilters.map(price => (
                  <option key={price.value} value={price.value}>
                    {price.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{courses.length}</span> courses found
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
              <span>50K+ students</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <SafeIcon icon={FiStar} className="h-4 w-4 mr-1 text-yellow-500" />
              <span>4.8 average rating</span>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Course Image */}
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <SafeIcon icon={FiBookmark} className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  {course.bestseller && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded">
                        Bestseller
                      </span>
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-600 font-medium">
                      {course.category}
                    </span>
                    <div className="flex items-center">
                      <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {course.rating} ({course.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiPlay} className="h-4 w-4 mr-1" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {course.instructor.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {course.instructor.title}
                        </p>
                      </div>
                    </div>
                    {getPriceDisplay(course)}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      {course.enrolled ? (
                        <>
                          <SafeIcon icon={FiCheck} className="h-4 w-4 mr-2" />
                          Enrolled
                        </>
                      ) : (
                        <>
                          {course.price === 0 ? 'Enroll Free' : 'Enroll Now'}
                          <SafeIcon icon={FiArrowRight} className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </button>
                    <Link
                      to={`/courses/${course.id}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && courses.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiSearch} className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Become an Instructor</h2>
              <p className="text-primary-100 mb-4">
                Share your knowledge and earn money by teaching what you love
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
                  <span>50K+ students</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiDollarSign} className="h-4 w-4 mr-1" />
                  <span>Earn up to $5000/month</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiAward} className="h-4 w-4 mr-1" />
                  <span>Expert recognition</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Teaching
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Courses