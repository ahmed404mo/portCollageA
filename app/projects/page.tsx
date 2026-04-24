"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { ProgrammingLanguages } from "@/components/animated-elements"
import ParticlesBackground from "@/components/particles-background"
import Link from "next/link" 

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden">
      <ParticlesBackground />
      <ProgrammingLanguages />

      {/* Header Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">Projects <span className="text-[#FF006E]">Library</span></h1>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Explore my latest educational tools, games, and interactive platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#FF006E]" size={40} /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/projects/${project.id}`} 
                    className="group block bg-[#161B22] border border-[#30363D] rounded-3xl overflow-hidden shadow-lg hover:border-[#FF006E]/50 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col cursor-pointer"
                  >
                    <div className="h-48 w-full overflow-hidden relative">
                       <img src={project.imageUrl || "/placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={project.title} />
                    </div>
                    <div className="p-8 space-y-4 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#FF006E] transition-colors line-clamp-1">{project.title}</h3>
                      <p className="text-[#9CA3AF] text-sm leading-relaxed line-clamp-2 flex-1">{project.description}</p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="px-3 py-1 text-xs font-bold bg-[#FF006E]/10 text-[#FF006E] rounded-lg border border-[#FF006E]/30 uppercase tracking-wider">
                          {project.tags}
                        </span>
                      </div>

                      {/* التعديل هنا: شكل الزرار الجديد */}
                      <div className="mt-6 flex items-center justify-center gap-2 bg-[#FF006E] text-white font-bold py-3 px-4 rounded-xl group-hover:bg-[#FB5581] transition-all shadow-md">
                         <span className="group-hover:-translate-x-1 transition-transform">View Details</span>
                         <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}