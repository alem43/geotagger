import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
}

interface AuthContextType {
  isSignedIn: boolean
  setIsSignedIn: (value: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8787/me', {
          credentials: 'include',
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setIsSignedIn(true)
        } else {
          setUser(null)
          setIsSignedIn(false)
        }
      } catch (error) {
        console.error('Session check failed:', error)
        setUser(null)
        setIsSignedIn(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, user, setUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
