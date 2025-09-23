'use client'
import { useEffect, useState } from 'react'
import ClickSpark from './ClickSpark'

export default function ClickSparkWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [showSpark, setShowSpark] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const splashShown = sessionStorage.getItem('splashShown') === '1'
      if (splashShown) setShowSpark(true)
      else {
        const t = setTimeout(() => setShowSpark(true), 2600)
        return () => clearTimeout(t)
      }
    } catch {
      setShowSpark(true)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {children}
      {showSpark && (
        <ClickSpark
          sparkColor="#30cbd4"
          sparkSize={12}
          sparkRadius={22}
          sparkCount={12}
          duration={600}
          easing="ease-out"
          extraScale={1.1}
        />
      )}
    </>
  )
}


// 'use client'

// import { useEffect, useState } from 'react'
// import ClickSpark from './ClickSpark'

// export default function ClickSparkWrapper({ children }: { children: React.ReactNode }) {
//   const [showSpark, setShowSpark] = useState(false)
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     // Avoid SSR crash
//     setMounted(true)

//     try {
//       const splashShown = sessionStorage.getItem('splashShown') === '1'
//       if (splashShown) {
//         setShowSpark(true)
//       } else {
//         const t = setTimeout(() => setShowSpark(true), 2600)
//         return () => clearTimeout(t)
//       }
//     } catch (err) {
//       console.error('Error checking splashShown:', err)
//       setShowSpark(true) // fallback
//     }
//   }, [])

//   if (!mounted) return null // prevent SSR mismatch

//   return showSpark ? (
//     <ClickSpark
//       sparkColor="#30cbd4"
//       sparkSize={12}
//       sparkRadius={20}
//       sparkCount={10}
//       duration={600}
//       easing="ease-out"
//     >
//       {children}
//     </ClickSpark>
//   ) : (
//     <>{children}</>
//   )
// }
