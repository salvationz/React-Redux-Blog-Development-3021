import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
const mockCourses = [
  {
    id: 1,
    title: 'Complete React Developer Course',
    description: 'Learn React from scratch and build amazing web applications',
    fullDescription: 'Master React.js with this comprehensive course covering everything from basics to advanced concepts. Build real-world projects and learn best practices used by top companies.',
    category: 'web-development',
    level: 'intermediate',
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 2847,
    students: '45,231',
    duration: '42 hours',
    lessons: 156,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    bestseller: true,
    enrolled: false,
    instructor: {
      name: 'John Smith',
      title: 'Senior React Developer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      students: '125,000',
      bio: 'John has been developing with React for over 6 years and has worked with companies like Facebook and Netflix.'
    },
    learningOutcomes: [
      'Build modern React applications from scratch',
      'Master React Hooks and Context API',
      'Implement state management with Redux',
      'Create responsive and interactive UIs',
      'Deploy applications to production'
    ],
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'A computer with internet connection',
      'Willingness to learn and practice'
    ],
    modules: [
      {
        title: 'React Fundamentals',
        duration: '8 hours',
        lessons: [
          { title: 'Introduction to React', duration: '15 min', type: 'video', preview: true },
          { title: 'Setting up Development Environment', duration: '20 min', type: 'video', preview: false },
          { title: 'Your First React Component', duration: '25 min', type: 'video', preview: false }
        ]
      },
      {
        title: 'Advanced React Concepts',
        duration: '12 hours',
        lessons: [
          { title: 'React Hooks Deep Dive', duration: '35 min', type: 'video', preview: false },
          { title: 'Context API and State Management', duration: '40 min', type: 'video', preview: false },
          { title: 'Performance Optimization', duration: '30 min', type: 'video', preview: false }
        ]
      }
    ],
    reviewsList: [
      {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Excellent course! The instructor explains everything clearly and the projects are very practical.'
      },
      {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        rating: 4,
        date: '1 month ago',
        comment: 'Great content and well-structured. Helped me land my first React job!'
      }
    ],
    relatedCourses: [
      {
        title: 'Advanced JavaScript Course',
        instructor: 'Jane Doe',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=150&h=100&fit=crop'
      },
      {
        title: 'Node.js Backend Development',
        instructor: 'Bob Wilson',
        price: 94.99,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&h=100&fit=crop'
      }
    ]
  },
  {
    id: 2,
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis and machine learning',
    fullDescription: 'Comprehensive Python course focused on data science applications. Learn pandas, numpy, matplotlib, and scikit-learn.',
    category: 'data-science',
    level: 'beginner',
    price: 0,
    rating: 4.6,
    reviews: 1523,
    students: '28,945',
    duration: '35 hours',
    lessons: 128,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
    bestseller: false,
    enrolled: false,
    instructor: {
      name: 'Dr. Emily Rodriguez',
      title: 'Data Science Professor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      students: '89,000',
      bio: 'Dr. Rodriguez has 10+ years of experience in data science and machine learning research.'
    },
    learningOutcomes: [
      'Master Python programming fundamentals',
      'Analyze data with pandas and numpy',
      'Create visualizations with matplotlib',
      'Build machine learning models',
      'Handle real-world data science projects'
    ],
    requirements: [
      'No prior programming experience required',
      'Basic mathematics knowledge helpful',
      'Computer with Python installed'
    ],
    modules: [
      {
        title: 'Python Basics',
        duration: '10 hours',
        lessons: [
          { title: 'Introduction to Python', duration: '20 min', type: 'video', preview: true },
          { title: 'Variables and Data Types', duration: '25 min', type: 'video', preview: false }
        ]
      }
    ],
    reviewsList: [
      {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Perfect for beginners! The explanations are clear and the projects are engaging.'
      }
    ],
    relatedCourses: []
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass',
    description: 'Learn modern design principles and create stunning user interfaces',
    fullDescription: 'Complete guide to UI/UX design covering design thinking, prototyping, and user research.',
    category: 'design',
    level: 'intermediate',
    price: 129.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 3421,
    students: '67,890',
    duration: '38 hours',
    lessons: 142,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    bestseller: true,
    enrolled: false,
    instructor: {
      name: 'Maria Garcia',
      title: 'Senior UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      students: '156,000',
      bio: 'Maria has designed for top tech companies and has won multiple design awards.'
    },
    learningOutcomes: [
      'Master design thinking process',
      'Create user personas and journey maps',
      'Design beautiful user interfaces',
      'Prototype with Figma and Adobe XD',
      'Conduct user research and testing'
    ],
    requirements: [
      'Creative mindset and attention to detail',
      'Basic computer skills',
      'Design software (Figma recommended)'
    ],
    modules: [
      {
        title: 'Design Fundamentals',
        duration: '12 hours',
        lessons: [
          { title: 'Introduction to Design Thinking', duration: '30 min', type: 'video', preview: true },
          { title: 'Color Theory and Typography', duration: '45 min', type: 'video', preview: false }
        ]
      }
    ],
    reviewsList: [
      {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        rating: 5,
        date: '1 week ago',
        comment: 'Incredible course! Transformed my design skills completely.'
      }
    ],
    relatedCourses: []
  }
];

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filteredCourses = [...mockCourses];
    
    // Apply filters
    if (filters.category && filters.category !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.category === filters.category);
    }
    
    if (filters.level && filters.level !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }
    
    if (filters.price && filters.price !== 'all') {
      if (filters.price === 'free') {
        filteredCourses = filteredCourses.filter(course => course.price === 0);
      } else if (filters.price === 'paid') {
        filteredCourses = filteredCourses.filter(course => course.price > 0 && course.price < 100);
      } else if (filters.price === 'premium') {
        filteredCourses = filteredCourses.filter(course => course.price >= 100);
      }
    }
    
    if (filters.search) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Apply sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'newest':
          filteredCourses.sort((a, b) => b.id - a.id);
          break;
        case 'rating':
          filteredCourses.sort((a, b) => b.rating - a.rating);
          break;
        case 'price-low':
          filteredCourses.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredCourses.sort((a, b) => b.price - a.price);
          break;
        default:
          // Keep original order for 'popular'
          break;
      }
    }
    
    return filteredCourses;
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCourses.find(course => course.id === parseInt(id));
  }
);

export const enrollCourse = createAsyncThunk(
  'courses/enrollCourse',
  async (courseId) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return courseId;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    currentCourse: null,
    enrolledCourses: [],
    isLoading: false,
    error: null,
    filters: {
      category: 'all',
      level: 'all',
      price: 'all',
      search: '',
      sort: 'popular'
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      // Enroll course
      .addCase(enrollCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const courseId = action.payload;
        
        // Update enrolled courses
        if (!state.enrolledCourses.includes(courseId)) {
          state.enrolledCourses.push(courseId);
        }
        
        // Update course enrollment status
        const course = state.courses.find(c => c.id === courseId);
        if (course) {
          course.enrolled = true;
        }
        
        if (state.currentCourse && state.currentCourse.id === courseId) {
          state.currentCourse.enrolled = true;
        }
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { setFilters, clearCurrentCourse, clearError } = coursesSlice.actions;
export default coursesSlice.reducer;