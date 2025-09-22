"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { urlFor } from "@/lib/image"

type Props = {
  logo?: { asset?: { _ref?: string; url?: string } }
}

export default function Splash({ logo }: Props) {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center transition-all duration-1000 z-[9999] ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {logo?.asset ? (
        <div className="animate-zoom">
          <Image
            src={urlFor(logo).width(300).url()} // sanity image
            alt="Hridmann Logo"
            width={200}
            height={200}
            priority
          />
        </div>
      ) : (
        <span className="text-2xl font-bold">Hridmann</span>
      )}
    </div>
  )
}
