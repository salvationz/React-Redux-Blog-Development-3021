import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { fetchCourseById, enrollCourse } from '../store/slices/coursesSlice';

const { 
  FiArrowLeft, FiStar, FiUsers, FiClock, FiPlay, FiDownload, FiShare2,
  FiCheck, FiLock, FiBookmark, FiHeart, FiMessageCircle, FiAward
} = FiIcons;

const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCourse, isLoading } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.auth);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, [dispatch, id]);

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(enrollCourse(id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <button
            onClick={() => navigate('/courses')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="h-5 w-5 mr-2" />
            Back to Courses
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentCourse.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{currentCourse.title}</h1>
              
              <p className="text-gray-300 text-lg mb-6">
                {currentCourse.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center">
                  <SafeIcon icon={FiStar} className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-semibold mr-2">{currentCourse.rating}</span>
                  <span className="text-gray-300">({currentCourse.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <SafeIcon icon={FiUsers} className="h-5 w-5 mr-1" />
                  <span>{currentCourse.students} students</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <SafeIcon icon={FiClock} className="h-5 w-5 mr-1" />
                  <span>{currentCourse.duration}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <SafeIcon icon={FiPlay} className="h-5 w-5 mr-1" />
                  <span>{currentCourse.lessons} lessons</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <img
                  src={currentCourse.instructor.avatar}
                  alt={currentCourse.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{currentCourse.instructor.name}</p>
                  <p className="text-gray-300 text-sm">{currentCourse.instructor.title}</p>
                </div>
              </div>
            </div>

            {/* Course Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={currentCourse.image}
                    alt={currentCourse.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <button className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors">
                      <SafeIcon icon={FiPlay} className="h-6 w-6 text-gray-900" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-4">
                    {currentCourse.price === 0 ? (
                      <span className="text-2xl font-bold text-green-600">Free</span>
                    ) : (
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${currentCourse.price}</span>
                        {currentCourse.originalPrice && (
                          <span className="text-lg text-gray-500 line-through ml-2">
                            ${currentCourse.originalPrice}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleEnroll}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      {currentCourse.enrolled ? 'Continue Learning' : 'Enroll Now'}
                    </button>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <SafeIcon icon={FiBookmark} className="h-4 w-4 mr-2" />
                        Save
                      </button>
                      <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <SafeIcon icon={FiShare2} className="h-4 w-4 mr-2" />
                        Share
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold mb-3">This course includes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <SafeIcon icon={FiPlay} className="h-4 w-4 mr-2 text-green-500" />
                        {currentCourse.duration} on-demand video
                      </li>
                      <li className="flex items-center">
                        <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2 text-green-500" />
                        Downloadable resources
                      </li>
                      <li className="flex items-center">
                        <SafeIcon icon={FiAward} className="h-4 w-4 mr-2 text-green-500" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">What you'll learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentCourse.learningOutcomes?.map((outcome, index) => (
                          <div key={index} className="flex items-start">
                            <SafeIcon icon={FiCheck} className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {currentCourse.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {currentCourse.fullDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Course Content</h3>
                      <span className="text-sm text-gray-500">
                        {currentCourse.modules?.length} modules • {currentCourse.lessons} lessons
                      </span>
                    </div>

                    {currentCourse.modules?.map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                        >
                          <div>
                            <h4 className="font-medium">{module.title}</h4>
                            <p className="text-sm text-gray-500">
                              {module.lessons.length} lessons • {module.duration}
                            </p>
                          </div>
                          <SafeIcon 
                            icon={FiArrowLeft} 
                            className={`h-4 w-4 transform transition-transform ${
                              expandedModule === index ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                        {expandedModule === index && (
                          <div className="border-t border-gray-200">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="px-4 py-3 border-b border-gray-100 last:border-b-0 flex items-center justify-between">
                                <div className="flex items-center">
                                  <SafeIcon 
                                    icon={lesson.type === 'video' ? FiPlay : FiDownload} 
                                    className="h-4 w-4 mr-3 text-gray-400"
                                  />
                                  <div>
                                    <p className="text-sm font-medium">{lesson.title}</p>
                                    <p className="text-xs text-gray-500">{lesson.duration}</p>
                                  </div>
                                </div>
                                {lesson.preview ? (
                                  <button className="text-primary-600 text-sm hover:text-primary-700">
                                    Preview
                                  </button>
                                ) : (
                                  <SafeIcon icon={FiLock} className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={currentCourse.instructor.avatar}
                        alt={currentCourse.instructor.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{currentCourse.instructor.name}</h3>
                        <p className="text-gray-600">{currentCourse.instructor.title}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <SafeIcon icon={FiStar} className="h-4 w-4 mr-1" />
                            <span>{currentCourse.instructor.rating} rating</span>
                          </div>
                          <div className="flex items-center">
                            <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
                            <span>{currentCourse.instructor.students} students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">About the Instructor</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {currentCourse.instructor.bio}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Student Reviews</h3>
                      <div className="flex items-center">
                        <SafeIcon icon={FiStar} className="h-5 w-5 text-yellow-500 mr-1" />
                        <span className="font-semibold mr-2">{currentCourse.rating}</span>
                        <span className="text-gray-500">({currentCourse.reviews} reviews)</span>
                      </div>
                    </div>

                    {currentCourse.reviewsList?.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-start space-x-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{review.name}</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <SafeIcon
                                    key={i}
                                    icon={FiStar}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{review.date}</p>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold mb-4">Related Courses</h3>
              <div className="space-y-4">
                {currentCourse.relatedCourses?.map((course, index) => (
                  <div key={index} className="flex space-x-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{course.title}</h4>
                      <p className="text-xs text-gray-500">{course.instructor}</p>
                      <p className="text-sm font-semibold">${course.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;