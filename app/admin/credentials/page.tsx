"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Loader2, Image as ImageIcon, Award, Pencil, X, ExternalLink } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import { toast } from "react-hot-toast"

export default function CredentialsAdmin() {
  const [credentials, setCredentials] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({ 
    title: "", 
    issuer: "", 
    date: "", 
    description: "", 
    imageUrl: "", 
    link: "" 
  })

  const fetchCredentials = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/credentials")
      const data = await res.json()
      setCredentials(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error("Failed to load credentials")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCredentials() }, [])

  const openAddModal = () => {
    setEditingId(null)
    setFormData({ title: "", issuer: "", date: "", description: "", imageUrl: "", link: "" })
    setIsModalOpen(true)
  }

  const openEditModal = (cred: any) => {
    setEditingId(cred.id)
    setFormData({
      title: cred.title,
      issuer: cred.issuer,
      date: cred.date || "", 
      description: cred.description || "",
      imageUrl: cred.imageUrl || "",
      link: cred.link || ""
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.imageUrl) return toast.error("Please upload a certificate image")
    
    setFormLoading(true)
    const isEditing = editingId !== null
    const toastId = toast.loading(isEditing ? "Updating..." : "Adding credential...")

    try {
      const method = isEditing ? "PUT" : "POST"
      const bodyData = isEditing ? { ...formData, id: editingId } : formData

      const res = await fetch("/api/credentials", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      })

      if (res.ok) {
        toast.success(isEditing ? "Credential Updated!" : "Credential Added!", { id: toastId })
        setIsModalOpen(false)
        fetchCredentials()
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error("Error saving credential", { id: toastId })
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this credential?")) return
    const tid = toast.loading("Deleting...")
    try {
      const res = await fetch(`/api/credentials?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("Deleted", { id: tid })
        fetchCredentials()
      }
    } catch (e) {
      toast.error("Could not delete", { id: tid })
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
             {/* تم تغيير اللون للأزرق */}
             <Award className="text-[#00BFFF]" size={32} /> Credentials Library
           </h1>
           <p className="text-gray-400 mt-1">Manage your professional achievements and certifications.</p>
        </div>
        <button 
          onClick={openAddModal}
          // تم تغيير لون الزر للأزرق
          className="bg-[#00BFFF] hover:bg-[#3B82F6] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#00BFFF]/20"
        >
          <Plus size={20} /> Add Credential
        </button>
      </div>

      {/* Credentials Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="animate-spin text-[#00BFFF]" size={40} />
          <p className="text-gray-500 italic">Loading credentials...</p>
        </div>
      ) : credentials.length === 0 ? (
        <div className="text-center py-32 bg-[#161B22] border-2 border-dashed border-[#30363D] rounded-3xl">
           <Award className="mx-auto text-gray-600 mb-3" size={48} />
           <p className="text-gray-500 italic">No credentials added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred: any) => (
            <motion.div layout key={cred.id} className="bg-[#161B22] border border-[#30363D] rounded-3xl overflow-hidden group hover:border-[#00BFFF]/40 transition-all flex flex-col">
              <div className="h-40 overflow-hidden relative border-b border-[#30363D]">
                <img src={cred.imageUrl || "/placeholder.jpg"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={cred.title} />
                
                <div className="absolute top-3 right-3 flex gap-2">
                  <button onClick={() => openEditModal(cred)} className="bg-blue-500/80 hover:bg-blue-500 text-white p-2 rounded-xl transition-all backdrop-blur-md shadow-lg">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(cred.id)} className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-xl transition-all backdrop-blur-md shadow-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-center text-white">
                <h3 className="font-bold text-lg line-clamp-1">{cred.title}</h3>
                {/* تم تغيير لون جهة الإصدار للأزرق */}
                <p className="text-[#00BFFF] text-sm font-semibold mt-1">{cred.issuer}</p>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#30363D]">
                   <span className="text-xs text-gray-400 font-medium bg-[#0D1117] px-3 py-1 rounded-lg border border-[#30363D]">{cred.date || "No Date"}</span>
                   {cred.link && (
                     <a href={cred.link} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                       <ExternalLink size={18} />
                     </a>
                   )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-[#1C2128] border-2 border-[#444C56] w-full max-w-2xl rounded-[2rem] p-8 z-10 relative shadow-2xl overflow-y-auto max-h-[90vh]">
              
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={24}/></button>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {editingId ? "Edit Credential" : "New Credential"}
                </h2>
                <p className="text-gray-400 text-sm">Add the details of your certificate or achievement.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">Certificate Image</label>
                  <div className="h-44 border-2 border-dashed border-[#444C56] rounded-2xl bg-[#0D1117] flex items-center justify-center relative overflow-hidden group">
                    {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-600" size={40} />}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(res: any) => setFormData({...formData, imageUrl: res.info.secure_url})}>
                        {({ open }) => <button type="button" onClick={() => open()} className="bg-white text-black px-6 py-2 rounded-xl font-bold shadow-lg">Upload Image</button>}
                      </CldUploadWidget>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">Title</label>
                    <input type="text" placeholder="e.g. Meta Front-End" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="form-input" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">Issuer</label>
                    <input type="text" placeholder="e.g. Coursera, Udemy" required value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">Issue Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date} 
                      onChange={e => setFormData({...formData, date: e.target.value})} 
                      className="form-input [color-scheme:dark] cursor-pointer" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-300 ml-1 tracking-widest uppercase">Verify URL</label>
                    {/* تم تغيير لون حدود رابط التحقق للأزرق */}
                    <input type="text" placeholder="Link to certificate" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="form-input border-[#00BFFF]/40" />
                  </div>
                </div>

                <button disabled={formLoading} className="w-full bg-[#00BFFF] py-4 rounded-2xl font-bold text-lg hover:bg-[#3B82F6] disabled:opacity-50 text-white shadow-lg transition-all mt-2 flex items-center justify-center">
                  {formLoading ? <Loader2 className="animate-spin inline mr-2" /> : (editingId ? <Pencil className="inline mr-2" size={20} /> : <Plus className="inline mr-2" size={20} />)} 
                  {editingId ? "Save Changes" : "Add Credential"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .form-input {
          width: 100%;
          background-color: #0D1117;
          border: 2px solid #444C56;
          border-radius: 12px;
          padding: 12px;
          color: white;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          /* تم تغيير اللون عند الفوكس للأزرق */
          border-color: #00BFFF;
          background-color: #161B22;
        }
        .form-input::placeholder {
          color: #6E7681;
        }
      `}</style>
    </div>
  )
}