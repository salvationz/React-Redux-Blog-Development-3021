import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../components/common/SafeIcon'

const { FiSave, FiEye, FiImage, FiPlus, FiTrash2, FiVideo, FiFileText } = FiIcons

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    category: 'web-development',
    level: 'beginner',
    price: 0,
    originalPrice: 0,
    duration: '',
    image: '',
    instructor: {
      name: '',
      title: '',
      bio: ''
    },
    learningOutcomes: [''],
    requirements: [''],
    modules: [
      {
        title: '',
        duration: '',
        lessons: [
          {
            title: '',
            duration: '',
            type: 'video',
            preview: false
          }
        ]
      }
    ]
  })
  const [preview, setPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  const categories = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' }
  ]

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('instructor.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleArrayChange = (arrayName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }))
  }

  const addToArray = (arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }))
  }

  const removeFromArray = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }))
  }

  const handleModuleChange = (moduleIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map((module, i) => 
        i === moduleIndex ? { ...module, [field]: value } : module
      )
    }))
  }

  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map((module, i) => 
        i === moduleIndex ? {
          ...module,
          lessons: module.lessons.map((lesson, j) => 
            j === lessonIndex ? { ...lesson, [field]: value } : lesson
          )
        } : module
      )
    }))
  }

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, {
        title: '',
        duration: '',
        lessons: [
          {
            title: '',
            duration: '',
            type: 'video',
            preview: false
          }
        ]
      }]
    }))
  }

  const addLesson = (moduleIndex) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map((module, i) => 
        i === moduleIndex ? {
          ...module,
          lessons: [...module.lessons, {
            title: '',
            duration: '',
            type: 'video',
            preview: false
          }]
        } : module
      )
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const courseData = {
        ...formData,
        id: Date.now(),
        rating: 0,
        reviews: 0,
        students: '0',
        lessons: formData.modules.reduce((total, module) => total + module.lessons.length, 0),
        bestseller: false,
        enrolled: false,
        instructor: {
          ...formData.instructor,
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          rating: 4.8,
          students: '0'
        }
      }

      console.log('Course created:', courseData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to create course:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const defaultImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Course</h1>
          <p className="text-gray-600">Build an engaging learning experience</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter course title..."
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={2}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief course description..."
                    />
                  </div>

                  <div>
                    <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Description
                    </label>
                    <textarea
                      id="fullDescription"
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Detailed course description..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                        Level
                      </label>
                      <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {levels.map(level => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., 10 hours"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price ($) - Optional
                      </label>
                      <input
                        type="number"
                        id="originalPrice"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                      Course Image URL
                    </label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Instructor Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="instructor.name" className="block text-sm font-medium text-gray-700 mb-2">
                        Instructor Name
                      </label>
                      <input
                        type="text"
                        id="instructor.name"
                        name="instructor.name"
                        value={formData.instructor.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Instructor name..."
                      />
                    </div>

                    <div>
                      <label htmlFor="instructor.title" className="block text-sm font-medium text-gray-700 mb-2">
                        Instructor Title
                      </label>
                      <input
                        type="text"
                        id="instructor.title"
                        name="instructor.title"
                        value={formData.instructor.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., Senior Developer"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="instructor.bio" className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor Bio
                    </label>
                    <textarea
                      id="instructor.bio"
                      name="instructor.bio"
                      value={formData.instructor.bio}
                      onChange={handleChange}
                      rows={3}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief instructor biography..."
                    />
                  </div>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Outcomes</h3>
                <div className="space-y-3">
                  {formData.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => handleArrayChange('learningOutcomes', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="What will students learn?"
                      />
                      {formData.learningOutcomes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFromArray('learningOutcomes', index)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addToArray('learningOutcomes')}
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <SafeIcon icon={FiPlus} className="h-4 w-4 mr-1" />
                    Add Learning Outcome
                  </button>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                <div className="space-y-3">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Course requirement..."
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFromArray('requirements', index)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addToArray('requirements')}
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <SafeIcon icon={FiPlus} className="h-4 w-4 mr-1" />
                    Add Requirement
                  </button>
                </div>
              </div>

              {/* Course Modules */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Curriculum</h3>
                <div className="space-y-6">
                  {formData.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Module title..."
                        />
                        <input
                          type="text"
                          value={module.duration}
                          onChange={(e) => handleModuleChange(moduleIndex, 'duration', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Module duration..."
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700">Lessons</h4>
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-gray-50 rounded">
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                              placeholder="Lesson title..."
                            />
                            <input
                              type="text"
                              value={lesson.duration}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'duration', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                              placeholder="Duration..."
                            />
                            <select
                              value={lesson.type}
                              onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'type', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="video">Video</option>
                              <option value="quiz">Quiz</option>
                              <option value="reading">Reading</option>
                            </select>
                            <div className="flex items-center justify-between">
                              <label className="flex items-center text-sm">
                                <input
                                  type="checkbox"
                                  checked={lesson.preview}
                                  onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'preview', e.target.checked)}
                                  className="mr-1"
                                />
                                Preview
                              </label>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addLesson(moduleIndex)}
                          className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                        >
                          <SafeIcon icon={FiPlus} className="h-3 w-3 mr-1" />
                          Add Lesson
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addModule}
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <SafeIcon icon={FiPlus} className="h-4 w-4 mr-1" />
                    Add Module
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? 'Creating...' : 'Create Course'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  <SafeIcon icon={FiEye} className="h-4 w-4 mr-2" />
                  {preview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            {preview && (
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="space-y-4">
                  {(formData.image || defaultImage) && (
                    <img
                      src={formData.image || defaultImage}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = defaultImage
                      }}
                    />
                  )}
                  
                  <div>
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                      {formData.category.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {formData.title || 'Course title...'}
                  </h4>
                  
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {formData.description || 'Course description...'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{formData.level}</span>
                    <span className="font-bold text-gray-900">
                      {formData.price === 0 ? 'Free' : `$${formData.price}`}
                    </span>
                  </div>
                  
                  {formData.instructor.name && (
                    <div className="text-sm text-gray-600">
                      By {formData.instructor.name}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse