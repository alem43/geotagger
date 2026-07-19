import { createFileRoute } from '@tanstack/react-router'
import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import HomePageIn from '@/components/HomePageIn'
import HomePageOut from '@/components/HomePageOut'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [apiStatus, setApiStatus] = useState('loading...')
  const { isSignedIn, setIsSignedIn } = useAuth()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => res.text())
      .then((text) => setApiStatus(text))
      .catch(() => setApiStatus('error'))
  }, [])

  return <>{isSignedIn ? <HomePageIn /> : <HomePageOut />}</>
}
