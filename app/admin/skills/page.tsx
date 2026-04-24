"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Loader2, Pencil, X, Code2, AlertTriangle } from "lucide-react"
import { toast } from "react-hot-toast"

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const [formData, setFormData] = useState({ name: "", category: "", level: 50 })

  const fetchSkills = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/skills")
      const data = await res.json()
      setSkills(Array.isArray(data) ? data : [])
    } catch (error) { toast.error("Failed to load skills") } finally { setLoading(false) }
  }

  useEffect(() => { fetchSkills() }, [])

  const openAddModal = () => { setEditingId(null); setFormData({ name: "", category: "", level: 50 }); setIsModalOpen(true); }
  const openEditModal = (skill: any) => { setEditingId(skill.id); setFormData({ name: skill.name, category: skill.category, level: skill.level }); setIsModalOpen(true); }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    const isEditing = editingId !== null
    const toastId = toast.loading(isEditing ? "Updating..." : "Adding skill...")
    try {
      const method = isEditing ? "PUT" : "POST"
      const res = await fetch("/api/skills", {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? { ...formData, id: editingId } : formData)
      })
      if (res.ok) { toast.success(isEditing ? "Updated!" : "Added!", { id: toastId }); setIsModalOpen(false); fetchSkills(); }
      else throw new Error()
    } catch (err) { toast.error("Error saving skill", { id: toastId }) } finally { setFormLoading(false) }
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    const tid = toast.loading("Deleting...")
    try {
      const res = await fetch(`/api/skills?id=${deleteId}`, { method: 'DELETE' })
      if (res.ok) { toast.success("Skill deleted", { id: tid }); setDeleteId(null); fetchSkills(); }
    } catch (e) { toast.error("Could not delete", { id: tid }) }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           {/* تم تغيير اللون للأزرق */}
           <h1 className="text-3xl font-bold flex items-center gap-3 text-white"><Code2 className="text-[#00BFFF]" size={32} /> Manage Skills</h1>
           <p className="text-gray-400 mt-1">Add and organize your technical and soft skills.</p>
        </div>
        {/* زر الإضافة بالأزرق */}
        <button onClick={openAddModal} className="bg-[#00BFFF] hover:bg-[#3B82F6] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#00BFFF]/20">
          <Plus size={20} /> Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill: any) => (
          <div key={skill.id} className="bg-[#161B22] p-6 rounded-3xl border border-[#30363D] hover:border-[#00BFFF]/50 transition-all group relative overflow-hidden">
             <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="font-bold text-xl text-white">{skill.name}</h3>
                 <span className="text-xs font-semibold text-gray-400 bg-[#0D1117] px-2 py-1 rounded-md border border-[#30363D] mt-2 inline-block">{skill.category}</span>
               </div>
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => openEditModal(skill)} className="text-blue-400 bg-blue-400/10 hover:bg-blue-400 hover:text-white p-2 rounded-xl transition-all"><Pencil size={16} /></button>
                 <button onClick={() => setDeleteId(skill.id)} className="text-red-400 bg-red-400/10 hover:bg-red-400 hover:text-white p-2 rounded-xl transition-all"><Trash2 size={16} /></button>
               </div>
             </div>
             <div className="space-y-2">
               {/* النسبة المئوية بالأزرق */}
               <div className="flex justify-between text-sm"><span className="text-gray-400 font-medium">Proficiency</span><span className="font-bold text-[#00BFFF]">{skill.level}%</span></div>
               <div className="w-full bg-[#0D1117] rounded-full h-2.5 overflow-hidden border border-[#30363D]">
                 {/* شريط التقدم بالأزرق */}
                 <div style={{width: `${skill.level}%`}} className="h-full bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] rounded-full shadow-[0_0_10px_#00BFFF55]" />
               </div>
             </div>
          </div>
        ))}
      </div>

      {/* Main Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#1C2128] border-2 border-[#444C56] w-full max-w-lg rounded-[2rem] p-8 z-10 relative shadow-2xl">
              <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={24}/></button>
              <h2 className="text-2xl font-bold text-white mb-6">{editingId ? "Edit Skill" : "Add New Skill"}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="Skill Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
                <input type="text" placeholder="Category" required list="categories" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="form-input" />
                <datalist id="categories"><option value="Frontend" /><option value="Backend" /><option value="Testing" /><option value="Educational Skills" /><option value="Soft Skills" /></datalist>
                
                <div className="space-y-3 bg-[#0D1117] p-5 rounded-2xl border border-[#444C56]">
                  {/* اللون الأزرق في الـ Range */}
                  <div className="flex justify-between items-center"><label className="text-xs font-bold text-gray-300">PROFICIENCY</label><span className="text-xl font-black text-[#00BFFF]">{formData.level}%</span></div>
                  <input type="range" min="0" max="100" step="5" value={formData.level} onChange={e => setFormData({...formData, level: Number(e.target.value)})} className="w-full accent-[#00BFFF] cursor-pointer" />
                </div>

                <button disabled={formLoading} className="w-full bg-[#00BFFF] hover:bg-[#3B82F6] py-4 rounded-2xl font-bold text-white transition-all shadow-lg shadow-[#00BFFF]/20">
                  {formLoading ? <Loader2 className="animate-spin inline mr-2" /> : (editingId ? "Save Changes" : "Add Skill")}
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
              <div><h3 className="text-xl font-bold text-white">Delete Skill?</h3><p className="text-gray-400 text-sm mt-2">This action is permanent and cannot be undone.</p></div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 bg-[#30363D] hover:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CSS للأزرق عند الـ focus */}
      <style jsx>{`.form-input { width: 100%; background-color: #0D1117; border: 2px solid #444C56; border-radius: 12px; padding: 12px; color: white; outline: none; transition: all 0.2s; } .form-input:focus { border-color: #00BFFF; background-color: #161B22; }`}</style>
    </div>
  )
}