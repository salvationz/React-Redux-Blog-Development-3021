import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/auth/AuthGuard'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import LandingPage from './pages/LandingPage'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import CreatePost from './pages/CreatePost'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'

// Admin Pages
import CreateCourse from './pages/admin/CreateCourse'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

// User Components
import UserProfile from './components/user/UserProfile'
import UserDashboard from './components/user/UserDashboard'

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected User Routes */}
                <Route 
                  path="/user-dashboard" 
                  element={
                    <AuthGuard>
                      <UserDashboard />
                    </AuthGuard>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <AuthGuard>
                      <UserProfile />
                    </AuthGuard>
                  } 
                />
                <Route 
                  path="/create" 
                  element={
                    <AuthGuard>
                      <CreatePost />
                    </AuthGuard>
                  } 
                />

                {/* Admin Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  } 
                />
                <Route 
                  path="/create-course" 
                  element={
                    <AuthGuard>
                      <CreateCourse />
                    </AuthGuard>
                  } 
                />

                {/* Fallback for unmatched routes */}
                <Route 
                  path="*" 
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-gray-600 mb-6">Page not found</p>
                        <a href="/" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                          Go Home
                        </a>
                      </div>
                    </div>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  )
}

export default App