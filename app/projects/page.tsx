"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, FolderOpen, RefreshCcw } from "lucide-react"
import { ProgrammingLanguages } from "@/components/animated-elements"
import ParticlesBackground from "@/components/particles-background"
import Link from "next/link"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = () => {
    setLoading(true)
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching projects:", error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProjects()
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
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Projects <span className="text-[#00BFFF]">Library</span>
            </h1>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Explore my latest educational tools, games, and interactive platforms developed by Ahmed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="animate-spin text-[#00BFFF]" size={48} />
              <p className="text-[#00BFFF] font-medium animate-pulse">Loading amazing projects...</p>
            </div>
          ) : projects.length === 0 ? (
            /* Empty State المحسّن */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 px-6 bg-[#161B22]/40 border-2 border-dashed border-[#30363D] rounded-[2.5rem] text-center space-y-6 backdrop-blur-sm"
            >
              <div className="w-24 h-24 bg-[#00BFFF]/10 rounded-3xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                <FolderOpen className="w-12 h-12 text-[#00BFFF] opacity-60" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white">Project Library is Empty</h3>
                <p className="text-[#9CA3AF] max-w-md mx-auto text-lg leading-relaxed">
                  We couldn&apos;t find any projects at the moment. Ahmed is probably working on something great right now!
                </p>
              </div>
              <button
                onClick={fetchProjects}
                className="group flex items-center gap-2 px-8 py-3 bg-[#161B22] border border-[#00BFFF]/30 text-[#00BFFF] font-bold rounded-xl hover:bg-[#00BFFF] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#00BFFF]/20"
              >
                <RefreshCcw size={18} className="group-active:rotate-180 transition-transform duration-500" />
                Refresh Library
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="group block bg-[#161B22] border border-[#30363D] rounded-[2rem] overflow-hidden shadow-xl hover:border-[#00BFFF]/50 transition-all duration-500 hover:-translate-y-3 h-full flex flex-col cursor-pointer"
                  >
                    {/* Project Image Container */}
                    <div className="h-52 w-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] to-transparent z-10 opacity-60" />
                      <img
                        src={project.imageUrl || "/placeholder.jpg"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={project.title}
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 text-[10px] font-black bg-[#00BFFF] text-white rounded-full uppercase tracking-tighter shadow-lg">
                          {project.category || "New"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-4 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#00BFFF] transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-[#9CA3AF] text-sm leading-relaxed line-clamp-3 flex-1">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags && project.tags.split(',').map((tag: string, i: number) => (
                          <span 
                            key={i}
                            className="px-3 py-1 text-[10px] font-bold bg-[#00BFFF]/5 text-[#00BFFF] rounded-md border border-[#00BFFF]/20 uppercase tracking-widest"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="mt-6 flex items-center justify-center gap-2 bg-[#161B22] border border-[#00BFFF]/40 text-[#00BFFF] font-bold py-3.5 px-4 rounded-2xl group-hover:bg-[#00BFFF] group-hover:text-white transition-all duration-300 shadow-md">
                        <span className="text-sm">Explore Project</span>
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