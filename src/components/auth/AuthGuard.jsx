import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'

const AuthGuard = ({ children, requireAuth = true, fallback = null }) => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Please log in to access this page.</p>
          <a
            href="/login"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go to Login
          </a>
        </motion.div>
      </div>
    )
  }

  if (!requireAuth && user) {
    return fallback || children
  }

  return children
}

export default AuthGuard