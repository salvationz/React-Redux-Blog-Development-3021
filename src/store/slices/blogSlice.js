import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { format } from 'date-fns'

// Mock data
const mockPosts = [
  {
    id: 1,
    title: 'Getting Started with React and Redux Toolkit',
    content: 'Learn how to build modern React applications with Redux Toolkit for state management. This comprehensive guide covers everything from setup to advanced patterns.',
    excerpt: 'Learn how to build modern React applications with Redux Toolkit for state management.',
    author: 'Admin User',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    publishedAt: '2024-01-15',
    category: 'React',
    tags: ['React', 'Redux', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    readTime: 8,
    likes: 45,
    views: 1200,
    comments: 23,
    shares: 12
  },
  {
    id: 2,
    title: 'Modern CSS Techniques for Better UI Design',
    content: 'Explore the latest CSS features and techniques that will help you create stunning user interfaces. From Grid to Flexbox, learn it all.',
    excerpt: 'Explore the latest CSS features and techniques for stunning user interfaces.',
    author: 'Sarah Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
    publishedAt: '2024-01-12',
    category: 'CSS',
    tags: ['CSS', 'Design', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    readTime: 6,
    likes: 32,
    views: 890,
    comments: 15,
    shares: 8
  },
  {
    id: 3,
    title: 'Building Scalable Node.js Applications',
    content: 'Learn best practices for building scalable backend applications with Node.js. Cover architecture patterns, database design, and performance optimization.',
    excerpt: 'Best practices for building scalable backend applications with Node.js.',
    author: 'Mike Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    publishedAt: '2024-01-10',
    category: 'Backend',
    tags: ['Node.js', 'Backend', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    readTime: 12,
    likes: 67,
    views: 1500,
    comments: 34,
    shares: 18
  },
  {
    id: 4,
    title: 'Advanced JavaScript ES6+ Features',
    content: 'Discover the power of modern JavaScript with ES6+ features including arrow functions, destructuring, async/await, and more.',
    excerpt: 'Master modern JavaScript features that every developer should know.',
    author: 'Emily Davis',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    publishedAt: '2024-01-08',
    category: 'JavaScript',
    tags: ['JavaScript', 'ES6', 'Programming'],
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
    readTime: 10,
    likes: 89,
    views: 2100,
    comments: 28,
    shares: 22
  },
  {
    id: 5,
    title: 'Complete Guide to Responsive Web Design',
    content: 'Learn how to create websites that look great on all devices. Master CSS Grid, Flexbox, and media queries.',
    excerpt: 'Create beautiful responsive websites that work perfectly on all devices.',
    author: 'David Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    publishedAt: '2024-01-05',
    category: 'Design',
    tags: ['CSS', 'Responsive', 'Web Design'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    readTime: 15,
    likes: 124,
    views: 3200,
    comments: 45,
    shares: 31
  }
]

export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (filters = {}) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    let posts = [...mockPosts]
    
    if (filters.category && filters.category !== 'All') {
      posts = posts.filter(post => post.category === filters.category)
    }
    
    if (filters.search) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.content.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    return posts
  }
)

export const fetchPostById = createAsyncThunk(
  'blog/fetchPostById',
  async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockPosts.find(post => post.id === parseInt(id))
  }
)

export const createPost = createAsyncThunk(
  'blog/createPost',
  async (postData, { getState }) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newPost = {
      id: Date.now(),
      ...postData,
      author: 'Current User',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      publishedAt: format(new Date(), 'yyyy-MM-dd'),
      likes: 0,
      views: 0,
      comments: 0,
      shares: 0
    }
    
    return newPost
  }
)

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, postData }) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { id, ...postData }
  }
)

export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return id
  }
)

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    currentPost: null,
    isLoading: false,
    error: null,
    filters: {
      category: 'All',
      search: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearCurrentPost: (state) => {
      state.currentPost = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Fetch post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPost = action.payload
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts.unshift(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id)
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...action.payload }
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload)
      })
  }
})

export const { setFilters, clearCurrentPost, clearError } = blogSlice.actions
export default blogSlice.reducer