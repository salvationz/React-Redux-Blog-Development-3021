import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mock API calls - replace with real API
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check for admin account
      if (email === 'admin@blog.com' && password === 'password') {
        const user = {
          id: 1,
          email: 'admin@blog.com',
          name: 'Admin User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          role: 'admin'
        }
        localStorage.setItem('user', JSON.stringify(user))
        return user
      }
      
      // Check for regular user account
      if (email === 'user@blog.com' && password === 'password') {
        const user = {
          id: 2,
          email: 'user@blog.com',
          name: 'Regular User',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
          role: 'user'
        }
        localStorage.setItem('user', JSON.stringify(user))
        return user
      }
      
      // Check for any other demo users
      const demoUsers = [
        {
          id: 3,
          email: 'demo@blog.com',
          name: 'Demo User',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          role: 'user'
        },
        {
          id: 4,
          email: 'test@blog.com',
          name: 'Test User',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          role: 'user'
        }
      ]
      
      const foundUser = demoUsers.find(u => u.email === email && password === 'password')
      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser))
        return foundUser
      }
      
      // If no match found, throw error
      throw new Error('Invalid email or password. Use demo credentials.')
      
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create new user
      const user = {
        id: Date.now(),
        email,
        name,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        role: 'user'
      }
      localStorage.setItem('user', JSON.stringify(user))
      return user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    localStorage.removeItem('user')
    return null
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.error = null
      })
  }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer