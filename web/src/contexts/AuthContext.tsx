import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface AuthContextType {
  isSignedIn: boolean
  setIsSignedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8787/me', {
          credentials: 'include',
        })

        if (response.ok) {
          setIsSignedIn(true)
        } else {
          setIsSignedIn(false)
        }
      } catch (error) {
        console.error('Session check failed:', error)
        setIsSignedIn(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
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
