"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, PlayCircle, Globe, FileText, Download, Loader2 } from 'lucide-react'
import { ProgrammingLanguages } from "@/components/animated-elements"
import { useParams } from 'next/navigation'
import Link from 'next/link'

/** * مكون الـ Modal الاحترافي بالألوان الزرقاء
 */
const ResourceModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  let content;
  let resourceSrc = project.liveLink;
  
  const isVideo = project.tags === "Video";
  const isMaterial = project.tags === "Material";

  if (isVideo) {
    if (resourceSrc.includes('youtube.com/watch?v=')) resourceSrc = resourceSrc.replace('watch?v=', 'embed/');
    else if (resourceSrc.includes('youtu.be/')) resourceSrc = `https://www.youtube.com/embed/${resourceSrc.split('youtu.be/')[1].split('?')[0]}`;
    
    content = <iframe src={resourceSrc} title="Video player" frameBorder="0" allowFullScreen className='w-full h-full aspect-video rounded-2xl'></iframe>;
  } 
  else if (isMaterial) {
    if (resourceSrc.includes('drive.google.com/file/d/')) {
      const fileId = resourceSrc.split('/file/d/')[1].split('/')[0];
      resourceSrc = `https://drive.google.com/file/d/${fileId}/preview`;
    }
    content = <iframe src={resourceSrc} title="Material Viewer" className='w-full h-full bg-white rounded-2xl' frameBorder="0" allowFullScreen></iframe>;
  } 
  else {
    content = <iframe src={resourceSrc} title={project.title} className='w-full h-full bg-white rounded-2xl' sandbox="allow-scripts allow-same-origin"></iframe>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl h-[85vh] bg-[#161B22] border border-[#30363D] rounded-3xl overflow-hidden shadow-2xl flex flex-col p-2">
        <div className="flex justify-between items-center p-4">
            <h3 className="text-white font-bold text-xl">{project.title}</h3>
            <button onClick={onClose} className="p-2 bg-[#30363D] text-gray-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-hidden rounded-2xl border border-[#30363D] bg-black">
            {content}
        </div>
      </motion.div>
    </motion.div>
  );
};

/** * صفحة تفاصيل المشروع 
 */
export default function ProjectDetailsPage() {
  const params = useParams()
  const id = Number(params.id)
  
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === id)
        setProject(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className='min-h-screen bg-[#0D1117] flex justify-center items-center'><Loader2 className="animate-spin text-[#00BFFF]" size={50} /></div>

  if (!project) {
    return (
      <div className='min-h-screen bg-[#0D1117] flex justify-center items-center flex-col space-y-4'>
        <h1 className='text-6xl font-bold text-white'>404</h1>
        <p className='text-gray-400 text-xl'>Project not found or removed.</p>
        <Link href="/projects" className="text-[#00BFFF] hover:underline flex items-center gap-2"><ArrowRight className="rotate-180" size={16}/> Back to Projects</Link>
      </div>
    )
  }

  const getActionDetails = () => {
      if(project.tags === "Video") return { icon: <PlayCircle size={32} />, text: "Watch Video Lesson" }
      if(project.tags === "Material") return { icon: <FileText size={32} />, text: "View Material / PDF" }
      return { icon: <Globe size={32} />, text: "Launch Interactive App" }
  }

  const action = getActionDetails();

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden pb-20">
      <ProgrammingLanguages />

      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center justify-center min-h-[45vh]">
        <div className="absolute inset-0 z-0">
           <img src={project.imageUrl || "/placeholder.jpg"} className="w-full h-full object-cover opacity-60" alt="Background" />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D1117]/70 to-[#0D1117]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <span className="px-5 py-1.5 text-sm font-bold bg-[#00BFFF]/90 text-white rounded-full border border-[#00BFFF] uppercase tracking-widest inline-block shadow-lg">
              {project.tags}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl tracking-tight">{project.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content & Actions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Description */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-[#30363D] pb-4">Project Overview</h2>
                <p className="text-[#9CA3AF] text-lg leading-relaxed whitespace-pre-wrap break-words">
                    {project.description}
                </p>
            </motion.div>

            {/* Actions Panel */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 bg-[#161B22] border border-[#30363D] rounded-3xl p-8 space-y-6 shadow-2xl sticky top-24">
                <h3 className="text-xl font-bold text-white mb-2">Project Links</h3>
                
                {/* Main Action Button */}
                {project.liveLink && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 hover:bg-[#00BFFF] hover:text-white text-[#00BFFF] p-6 rounded-2xl transition-all group flex flex-col items-center justify-center gap-3 shadow-lg"
                  >
                     <div className="group-hover:scale-110 transition-transform">{action.icon}</div>
                     <span className="font-bold text-lg">{action.text}</span>
                  </button>
                )}

                {/* Additional Files Button */}
                {project.githubLink && (
                  <a 
                    href={project.githubLink} target="_blank" rel="noopener noreferrer"
                    className="w-full bg-[#0D1117] border border-[#30363D] hover:border-[#00BFFF]/50 text-gray-300 hover:text-white p-4 rounded-xl transition-all flex items-center justify-center gap-3 font-semibold group"
                  >
                     <Download size={20} className="group-hover:text-[#00BFFF] transition-colors" /> Access Files / Source
                  </a>
                )}
            </motion.div>

        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && <ResourceModal project={project} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}