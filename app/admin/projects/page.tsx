"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, ExternalLink, Github, Loader2, Image as ImageIcon, X, Pencil, AlertTriangle } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import { toast } from "react-hot-toast"

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const [newProject, setNewProject] = useState({
    title: "", description: "", imageUrl: "", tags: "Game", githubLink: "", liveLink: ""
  })

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error("Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const openAddModal = () => {
    setEditingId(null)
    setNewProject({ title: "", description: "", imageUrl: "", tags: "Game", githubLink: "", liveLink: "" })
    setIsModalOpen(true)
  }

  const openEditModal = (project: any) => {
    setEditingId(project.id)
    setNewProject({
      title: project.title, description: project.description, imageUrl: project.imageUrl || "",
      tags: project.tags || "Game", githubLink: project.githubLink || "", liveLink: project.liveLink || ""
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProject.imageUrl) return toast.error("Please upload a cover image")
    
    setFormLoading(true)
    const isEditing = editingId !== null
    const toastId = toast.loading(isEditing ? "Updating..." : "Publishing...")
    
    try {
      const method = isEditing ? "PUT" : "POST"
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? { ...newProject, id: editingId } : newProject)
      })
      if (res.ok) {
        toast.success(isEditing ? "Updated!" : "Added!", { id: toastId })
        setIsModalOpen(false)
        fetchProjects()
      } else throw new Error()
    } catch (err) {
      toast.error("Error saving", { id: toastId })
    } finally {
      setFormLoading(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    const tid = toast.loading("Deleting...")
    try {
      const res = await fetch(`/api/projects?id=${deleteId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("Project deleted", { id: tid })
        setDeleteId(null)
        fetchProjects()
      }
    } catch (e) {
      toast.error("Could not delete project", { id: tid })
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Projects Library</h1>
        <button onClick={openAddModal} className="bg-[#FF006E] text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#FB5581] transition-all">
          <Plus size={20} className="inline mr-2" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p: any) => (
          <div key={p.id} className="bg-[#161B22] border border-[#30363D] rounded-3xl overflow-hidden relative group">
             <div className="relative">
               <img src={p.imageUrl} className="h-40 w-full object-cover" />
               <div className="absolute top-3 right-3 flex gap-2">
                 <button onClick={() => openEditModal(p)} className="bg-blue-500/80 text-white p-2 rounded-xl transition-all backdrop-blur-md hover:scale-110"><Pencil size={18} /></button>
                 <button onClick={() => setDeleteId(p.id)} className="bg-red-500/80 text-white p-2 rounded-xl transition-all backdrop-blur-md hover:scale-110"><Trash2 size={18} /></button>
               </div>
             </div>
             <div className="p-4">
                <h3 className="font-bold text-white">{p.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mt-1">{p.description}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Main Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#1C2128] border-2 border-[#444C56] w-full max-w-2xl rounded-[2rem] p-8 z-10 relative overflow-y-auto max-h-[90vh]">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={24}/></button>
              <h2 className="text-2xl font-bold text-white mb-6">{editingId ? "Edit Project Details" : "New Project Details"}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* نفس الفورم بتاعتك بالظبط بدون تعديل */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-200">COVER IMAGE</label>
                  <div className="h-44 border-2 border-dashed border-[#444C56] rounded-2xl bg-[#0D1117] flex items-center justify-center relative overflow-hidden group">
                    {newProject.imageUrl ? <img src={newProject.imageUrl} className="w-full h-full object-cover" /> : <ImageIcon size={40} className="text-gray-600" />}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(res: any) => setNewProject({...newProject, imageUrl: res.info.secure_url})}>
                        {({ open }) => <button type="button" onClick={() => open()} className="bg-white text-black px-6 py-2 rounded-lg font-bold">Upload New Image</button>}
                      </CldUploadWidget>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Project Name" required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="form-input" />
                  <select value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} className="form-input cursor-pointer">
                    <option value="Game">Game / Interactive</option>
                    <option value="VR/AR">VR / AR Experience</option>
                    <option value="Web App">Website / Platform</option>
                    <option value="Video">Educational Video</option>
                    <option value="Material">Teaching Material</option>
                  </select>
                </div>
                <textarea placeholder="Write about this project..." required rows={4} value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="form-input resize-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="https://github.com/..." value={newProject.githubLink} onChange={e => setNewProject({...newProject, githubLink: e.target.value})} className="form-input" />
                  <input type="text" placeholder="Project or Game link" required value={newProject.liveLink} onChange={e => setNewProject({...newProject, liveLink: e.target.value})} className="form-input border-[#FF006E]/40" />
                </div>
                <button disabled={formLoading} className="w-full bg-[#FF006E] py-4 rounded-2xl font-bold text-lg hover:bg-[#FB5581] disabled:opacity-50 text-white shadow-lg transition-all">
                  {formLoading ? <Loader2 className="animate-spin inline mr-2" /> : (editingId ? <Pencil className="inline mr-2" size={20} /> : <Plus className="inline mr-2" size={20} />)} 
                  {editingId ? "Save Changes" : "Add to Portfolio"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Popup */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteId(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#1C2128] border border-[#30363D] p-8 rounded-[2.5rem] max-w-sm w-full z-10 text-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner"><AlertTriangle size={40} /></div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Project?</h3>
                <p className="text-gray-400 text-sm mt-2">This action is permanent and cannot be undone.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 bg-[#30363D] hover:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`.form-input { width: 100%; background-color: #0D1117; border: 2px solid #444C56; border-radius: 12px; padding: 12px; color: white; outline: none; transition: all 0.2s; } .form-input:focus { border-color: #FF006E; background-color: #161B22; }`}</style>
    </div>
  )
}