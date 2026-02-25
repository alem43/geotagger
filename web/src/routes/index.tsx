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

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [apiStatus, setApiStatus] = useState('loading...')

  useEffect(() => {
    fetch('http://localhost:8787/health')
      .then((res) => res.text())
      .then((text) => setApiStatus(text))
      .catch(() => setApiStatus('error'))
  }, [])

  return (
    <>
      <p>Proba</p>
    </>
  )
}
