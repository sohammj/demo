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
      className={`fixed inset-0 bg-white flex items-center justify-center transition-all duration-1000 z-[9999] ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="animate-zoom">
            {logoUrl ? (
                <div className="max-w-[60vw]">
                   <img
                        src={logoUrl}
                        alt="Hridmann Logo"
                        className="w-[300px] md:w-[500px] lg:w-[700px] h-auto"
                    />

                </div>

            ) : (
                <span className="text-2xl font-bold">Hridmann</span>
            )}
        </div>

    </div>
  )
}
