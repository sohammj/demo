'use client'
import { useEffect } from 'react'
export default function Reveal(){
  useEffect(()=>{
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view') })
    }, { threshold:.15 })
    els.forEach(el=>io.observe(el))
    return ()=>io.disconnect()
  },[])
  return null
}
