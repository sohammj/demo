"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

type Props = {
  logoUrl?: string
  showOncePerSession?: boolean
}

export default function Splash({ logoUrl, showOncePerSession = true }: Props) {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    if (showOncePerSession && typeof window !== "undefined") {
      if (sessionStorage.getItem("splashShown") === "1") {
        setHide(true)
        return
      }
      sessionStorage.setItem("splashShown", "1")
    }
    const t = setTimeout(() => setHide(true), 2500)
    return () => clearTimeout(t)
  }, [showOncePerSession])

  return (
    <div
        className={`fixed inset-0 flex items-center justify-center transition-all duration-1000 z-[9999] ${
            hide ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ backgroundColor: "#d9f6f8" }} // light blue
    >
      <div className="animate-zoom flex items-center justify-center w-full h-full">
            {logoUrl ? (
            <img
                src={logoUrl}
                alt="Hridmann Logo"
                className="max-w-[80vw] max-h-[80vh] object-contain"
            />
            ) : (
            <span className="text-4xl font-bold">Hridmann</span>
            )}
        </div>
    </div>
  )
}
