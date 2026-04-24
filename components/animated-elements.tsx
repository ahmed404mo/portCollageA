"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Hook بسيط عشان نضمن إن الكود شغال في المتصفح فقط
function useIsMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}

export function ProgrammingLanguages() {
  const isMounted = useIsMounted()
  const languages = ["JavaScript", "React", "TypeScript", "Python", "CSS", "HTML", "Next.js", "Tailwind"]

  if (!isMounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {languages.map((lang, i) => (
        <motion.div
          key={i}
          className="absolute text-sm font-semibold text-[#00BFFF]/20 whitespace-nowrap"
          initial={{ opacity: 0.1, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [Math.random() * 100 - 50, Math.random() * 200 - 100, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 200 - 100, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 25) % 100}%`,
          }}
        >
          {lang}
        </motion.div>
      ))}
    </div>
  )
}

export function FloatingStars() {
  const isMounted = useIsMounted()
  if (!isMounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#00BFFF] rounded-full"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0.3, 1, 0.3], y: [-20, 20, -20] }}
          transition={{ duration: 3 + i, repeat: Infinity }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
            boxShadow: "0 0 10px rgba(0, 191, 255, 0.5)"
          }}
        />
      ))}
    </div>
  )
}

export function FloatingClouds() {
  const isMounted = useIsMounted()
  if (!isMounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-10"
          initial={{ x: -100 }}
          animate={{ x: 800 }} // زيادة المسافة عشان الشاشات الكبيرة
          transition={{ duration: 25 + i * 5, repeat: Infinity, ease: "linear" }}
          style={{
            top: `${15 + i * 20}%`,
          }}
        >
          ☁️
        </motion.div>
      ))}
    </div>
  )
}

export function FloatingBooks() {
  const isMounted = useIsMounted()
  if (!isMounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: [0.1, 0.4, 0.1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity }}
          style={{
            right: `${10 + i * 15}%`,
            top: `${20 + i * 15}%`,
          }}
        >
          📚
        </motion.div>
      ))}
    </div>
  )
}