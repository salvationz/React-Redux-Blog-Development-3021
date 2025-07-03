import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import blogSlice from './slices/blogSlice'
import uiSlice from './slices/uiSlice'
import coursesSlice from './slices/coursesSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    blog: blogSlice,
    ui: uiSlice,
    courses: coursesSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/loginUser/fulfilled', 'auth/registerUser/fulfilled']
      }
    })
})

export default store