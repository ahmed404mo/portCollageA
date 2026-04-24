"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Loader2, Award, Calendar, Building2, Maximize, X } from "lucide-react" // ضفنا Maximize و X
import { ProgrammingLanguages } from "@/components/animated-elements"
import ParticlesBackground from "@/components/particles-background"

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState([])
  const [loading, setLoading] = useState(true)
  
  // State عشان نمسك الصورة اللي هتتكبر
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/credentials")
      .then(res => res.json())
      .then(data => {
        setCredentials(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden pb-20">
      <ParticlesBackground />
      <ProgrammingLanguages />

      {/* Header Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center p-3 bg-[#FF006E]/10 rounded-full mb-4 border border-[#FF006E]/30 shadow-[0_0_20px_rgba(255,0,110,0.2)]"
          >
            <Award className="text-[#FF006E]" size={32} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white"
          >
            My <span className="text-[#FF006E]">Credentials</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed"
          >
            Professional certifications and educational achievements that validate my skills and knowledge.
          </motion.p>
        </div>
      </section>

      {/* Credentials Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-[#FF006E]" size={48} />
            </div>
          ) : credentials.length === 0 ? (
            <div className="text-center py-20 bg-[#161B22] border border-[#30363D] rounded-3xl">
               <p className="text-gray-500 italic">No credentials found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {credentials.map((cred: any, index: number) => (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden shadow-lg hover:border-[#FF006E]/50 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image Container - Click to Expand */}
                  <div 
                    onClick={() => setSelectedImage(cred.imageUrl || "/placeholder.jpg")}
                    className="h-56 w-full overflow-hidden relative bg-[#0D1117] border-b border-[#30363D] p-4 flex items-center justify-center group/image cursor-pointer"
                  >
                    <img 
                      src={cred.imageUrl || "/placeholder.jpg"} 
                      className="max-w-full max-h-full object-contain group-hover/image:blur-[3px] transition-all duration-300 drop-shadow-xl" 
                      alt={cred.title} 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center">
                       <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 text-white font-semibold text-sm shadow-xl transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-300">
                         <Maximize size={16} /> Click to expand
                       </div>
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="p-6 space-y-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF006E] transition-colors line-clamp-2">
                      {cred.title}
                    </h3>

                    <div className="space-y-3 mt-auto">
                      <div className="flex items-center gap-3 text-gray-400">
                         <div className="p-2 bg-[#0D1117] border border-[#30363D] rounded-lg">
                           <Building2 size={16} className="text-[#FF006E]" />
                         </div>
                         <span className="text-sm font-medium">{cred.issuer}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-400">
                           <div className="p-2 bg-[#0D1117] border border-[#30363D] rounded-lg">
                             <Calendar size={16} className="text-[#FF006E]" />
                           </div>
                           <span className="text-sm font-medium">{cred.date || "Ongoing"}</span>
                        </div>

                        {/* Verify Button (External Link) */}
                        {cred.link && (
                          <a 
                            href={cred.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#FF006E] hover:text-white bg-[#FF006E]/10 hover:bg-[#FF006E] p-2 rounded-lg transition-all"
                            title="Verify Certificate"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox Modal (شاشة تكبير الصورة) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedImage(null)} // القفل عند الضغط في أي مكان
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* زر القفل */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white bg-[#161B22] p-2 rounded-full border border-[#30363D] transition-colors z-[70]"
            >
              <X size={24} />
            </button>

            {/* الصورة المكبرة */}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={selectedImage} 
              alt="Enlarged Credential"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-[#30363D]"
              onClick={(e) => e.stopPropagation()} // منع القفل لو ضغطت على الصورة نفسها
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}