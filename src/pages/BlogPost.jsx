import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../components/common/SafeIcon'
import { fetchPostById } from '../store/slices/blogSlice'
import { format } from 'date-fns'

const { FiCalendar, FiClock, FiEye, FiHeart, FiArrowLeft, FiShare2, FiMessageCircle } = FiIcons

const BlogPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentPost, isLoading } = useSelector(state => state.blog)

  useEffect(() => {
    dispatch(fetchPostById(id))
  }, [dispatch, id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Link
            to="/blog"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4">
            <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
              {currentPost.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {currentPost.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <img
                src={currentPost.authorAvatar}
                alt={currentPost.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-medium text-gray-900">{currentPost.author}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-1" />
                  {format(new Date(currentPost.publishedAt), 'MMMM dd, yyyy')}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center">
                <SafeIcon icon={FiClock} className="h-4 w-4 mr-1" />
                <span className="text-sm">{currentPost.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiEye} className="h-4 w-4 mr-1" />
                <span className="text-sm">{currentPost.views}</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiHeart} className="h-4 w-4 mr-1" />
                <span className="text-sm">{currentPost.likes}</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiMessageCircle} className="h-4 w-4 mr-1" />
                <span className="text-sm">{currentPost.comments}</span>
              </div>
              <button className="flex items-center hover:text-primary-600 transition-colors">
                <SafeIcon icon={FiShare2} className="h-4 w-4 mr-1" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-8 mb-8"
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {currentPost.content}
            </p>
            
            {/* Additional content paragraphs */}
            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Key Takeaways</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li className="mb-2">Understanding the fundamentals is crucial for long-term success</li>
              <li className="mb-2">Practice regularly to improve your skills and knowledge</li>
              <li className="mb-2">Stay updated with the latest trends and best practices</li>
              <li className="mb-2">Build projects to apply what you've learned</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {currentPost.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-primary-600"
        >
          <div className="flex items-start">
            <img
              src={currentPost.authorAvatar}
              alt={currentPost.author}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentPost.author}</h3>
              <p className="text-gray-600 leading-relaxed">
                Passionate writer and developer with expertise in modern web technologies. Loves sharing knowledge and helping others grow in their development journey.
              </p>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  )
}

export default BlogPost