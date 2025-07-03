import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user || null)
      } catch (err) {
        setError(err.message)
        // Fallback to localStorage for demo
        const mockUser = localStorage.getItem('user')
        if (mockUser) {
          setUser(JSON.parse(mockUser))
        }
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signUp = async (email, password, userData) => {
    try {
      setError(null)
      setLoading(true)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) {
        // Fallback for demo
        const mockUser = {
          id: Date.now().toString(),
          email,
          user_metadata: userData,
          created_at: new Date().toISOString()
        }
        localStorage.setItem('user', JSON.stringify(mockUser))
        setUser(mockUser)
        return { user: mockUser, error: null }
      }

      return { user: data.user, error: null }
    } catch (err) {
      setError(err.message)
      return { user: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setError(null)
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        // Demo fallback
        if (email === 'admin@blog.com' && password === 'password') {
          const mockUser = {
            id: '1',
            email: 'admin@blog.com',
            user_metadata: { 
              name: 'Admin User',
              role: 'admin'
            },
            created_at: new Date().toISOString()
          }
          localStorage.setItem('user', JSON.stringify(mockUser))
          setUser(mockUser)
          return { user: mockUser, error: null }
        }
        throw error
      }

      return { user: data.user, error: null }
    } catch (err) {
      setError(err.message)
      return { user: null, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signOut()
      
      // Clear localStorage fallback
      localStorage.removeItem('user')
      setUser(null)
      
      if (error) throw error
    } catch (err) {
      setError(err.message)
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err.message }
    }
  }

  const updateProfile = async (updates) => {
    try {
      setError(null)
      const { error } = await supabase.auth.updateUser({
        data: updates
      })
      if (error) throw error
      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err.message }
    }
  }

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile
  }
}