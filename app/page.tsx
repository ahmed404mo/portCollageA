"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"
import Image from "next/image"

export default function Home() {
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/stats")
        ])

        const profileData = await profileRes.json()
        const statsData = await statsRes.json()

        setProfile(profileData)

        // التعديل الأساسي هنا: استخراج مصفوفة stats من داخل الـ Object
        if (statsData.success && Array.isArray(statsData.stats)) {
          setStats(statsData.stats)
        } else {
          setStats([])
        }
        
      } catch (error) {
        console.error("Error fetching home data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#FF006E]" size={40} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden">
      <ParticlesBackground />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#FF006E] font-semibold text-lg uppercase tracking-wider"
              >
                {profile?.headline || "Software Tester"}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                Hi, I'm <span className="gradient-text">{profile?.name?.split(' ')[0] || "Sara"}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-[#9CA3AF] leading-relaxed italic"
              >
                Combining education and creativity through technology
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-[#6B7280] leading-relaxed max-w-lg"
              >
                {profile?.bio || "Welcome to my professional portfolio where I showcase my journey in software testing and early childhood education."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-8"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF006E] to-[#FB5581] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FF006E]/50 transition-all hover:scale-105 animate-glow"
                >
                  View Projects
                  <ArrowRight size={20} />
                </Link>
                {profile?.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#FF006E] text-[#FF006E] font-semibold rounded-lg hover:bg-[#FF006E]/10 transition-all"
                  >
                    Download CV
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF006E] to-[#FB5581] rounded-full blur-3xl opacity-30 animate-pulse" />

                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-[#FF006E]/30 shadow-2xl shadow-[#FF006E]/20">
                  <Image
                    src={profile?.avatarUrl || "/sara.png"}
                    alt={profile?.name || "Sara's Profile"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.length > 0 ? (
              stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="text-center p-8 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#FF006E]/50 transition-all group"
                >
                  <div className="text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <p className="text-[#9CA3AF] font-medium">{stat.label}</p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 italic">
                No statistics found. Start adding projects and skills to see them here!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Let's Create Something <span className="gradient-text">Amazing</span> Together
          </motion.h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#FF006E] to-[#FB5581] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FF006E]/50 transition-all hover:scale-105"
          >
            Get In Touch
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}