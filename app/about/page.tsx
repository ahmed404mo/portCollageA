"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Code2, Rocket, Share2, Loader2 } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"
import Image from "next/image"

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => {
        setAboutData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen bg-[#0D1117] flex items-center justify-center"><Loader2 className="animate-spin text-[#FF006E]" size={40} /></div>

  return (
    <div className="min-h-screen bg-[#0D1117] text-white relative overflow-hidden pb-20">
      <ParticlesBackground />

      {/* Header Section */}
      <section className="pt-32 px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
            Sara's <span className="text-[#FF006E]">World</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-medium italic">
            Welcome to my digital playground – where education meets innovation
          </p>
        </motion.div>
      </section>

      {/* Main Universe Content */}
      <section className="max-w-6xl mx-auto px-6 mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image/Visual Part */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#FF006E]/20 blur-[100px] rounded-full" />
            <div className="relative rounded-3xl border-2 border-[#FF006E]/30 overflow-hidden shadow-2xl shadow-[#FF006E]/10 aspect-square">
              <Image 
                src={aboutData?.imageUrl || "/about-placeholder.png"} 
                alt="Sara's Universe" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-[#161B22] p-4 rounded-2xl border border-[#30363D] shadow-xl"
            >
              <Sparkles className="text-[#FF006E]" />
            </motion.div>
          </motion.div>

          {/* Text/Interactive Connections Part */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-4xl font-bold flex items-center gap-3">
                <Share2 className="text-[#FF006E]" /> My Universe
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Dive into a connected world of ideas, where every node represents a passion, and every link is a collaboration. 
                From coding interactive stories to designing child-friendly apps, this visualizes the flow of creativity.
              </p>
            </motion.div>

            {/* Connection Links */}
            <div className="space-y-4">
              <h3 className="text-[#FF006E] font-bold tracking-widest uppercase text-sm">Explore Connections</h3>
              
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 bg-[#161B22]/50 border border-[#30363D] rounded-2xl group hover:border-[#FF006E]/50 transition-all">
                <div className="p-3 bg-[#FF006E]/10 rounded-lg text-[#FF006E]"><Code2 size={24}/></div>
                <div>
                  <p className="text-gray-200 font-medium">Interactive learning tools built with Next.js and Python.</p>
                </div>
                <ArrowRight className="ml-auto text-gray-600 group-hover:text-[#FF006E]" />
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 bg-[#161B22]/50 border border-[#30363D] rounded-2xl group hover:border-[#FF006E]/50 transition-all">
                <div className="p-3 bg-[#FB5581]/10 rounded-lg text-[#FB5581]"><Rocket size={24}/></div>
                <div>
                  <p className="text-gray-200 font-medium">Stories and games that spark young imaginations.</p>
                </div>
                <ArrowRight className="ml-auto text-gray-600 group-hover:text-[#FB5581]" />
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 bg-[#161B22]/50 border border-[#30363D] rounded-2xl group hover:border-[#FF006E]/50 transition-all">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Share2 size={24}/></div>
                <div>
                  <p className="text-gray-200 font-medium">Collaborative projects linking education and tech.</p>
                </div>
                <ArrowRight className="ml-auto text-gray-600 group-hover:text-blue-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description from Database */}
      <section className="max-w-4xl mx-auto px-6 mt-32">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="bg-[#161B22] p-10 rounded-[2rem] border border-[#30363D] relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles size={120} />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-[#FF006E]">Behind the Vision</h3>
            <div className="prose prose-invert max-w-none text-gray-300 leading-loose text-lg">
              {aboutData?.description || "Loading the story..."}
            </div>
         </motion.div>
      </section>
    </div>
  )
}