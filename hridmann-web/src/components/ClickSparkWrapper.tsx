'use client'

import { useEffect, useState } from 'react'
import ClickSpark from './Clickspark'

export default function ClickSparkWrapper({ children }: { children: React.ReactNode }) {
  const [showSpark, setShowSpark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Avoid SSR crash
    setMounted(true)

    try {
      const splashShown = sessionStorage.getItem('splashShown') === '1'
      if (splashShown) {
        setShowSpark(true)
      } else {
        const t = setTimeout(() => setShowSpark(true), 2600)
        return () => clearTimeout(t)
      }
    } catch (err) {
      console.error('Error checking splashShown:', err)
      setShowSpark(true) // fallback
    }
  }, [])

  if (!mounted) return null // prevent SSR mismatch

  return showSpark ? (
    <ClickSpark
      sparkColor="#30cbd4"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={600}
      easing="ease-out"
    >
      {children}
    </ClickSpark>
  ) : (
    <>{children}</>
  )
}
