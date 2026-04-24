"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Image as ImageIcon, MapPin, Calendar, Info } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import { toast } from "react-hot-toast"

export default function AboutAdmin() {
  const [about, setAbout] = useState({
    title: "",
    description: "",
    yearsOfExp: "",
    location: "",
    imageUrl: ""
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // 1. جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about")
        const data = await res.json()
        if (data) {
          setAbout({
            title: data.title || "",
            description: data.description || "",
            yearsOfExp: data.yearsOfExp || "",
            location: data.location || "",
            imageUrl: data.imageUrl || ""
          })
        }
      } catch (error) {
        toast.error("Failed to load about data")
      } finally {
        setFetching(false)
      }
    }

    fetchAbout()
  }, [])

  // 2. معالجة حفظ البيانات
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const loadId = toast.loading("Updating your story...")

    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about)
      })

      if (res.ok) {
        toast.success("About section updated! ✨", { id: loadId })
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error("Failed to update about info.", { id: loadId })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        {/* تغيير لون الـ Loader للأزرق */}
        <Loader2 className="animate-spin text-[#00BFFF]" size={48} />
        <p className="text-gray-500 animate-pulse">Fetching your universe details...</p>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto space-y-8 pb-20 text-white"
    >
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Edit About Me</h1>
        {/* تحديث الاسم من Sara إلى Ahmed */}
        <p className="text-gray-400">Craft the story of Ahmed's World and your digital playground.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Story Visual (Image) */}
        <section className="bg-[#161B22] p-8 rounded-3xl border border-[#30363D] shadow-xl">
          {/* تغيير لون الأيقونة للأزرق */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#00BFFF]">
            <ImageIcon size={20} /> Story Image
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* تحديث لون الحدود عند الهوفر للأزرق */}
            <div className="relative w-full md:w-64 h-64 border-2 border-dashed border-[#30363D] rounded-2xl overflow-hidden bg-[#0D1117] flex items-center justify-center group transition-all hover:border-[#00BFFF]/50">
              {about.imageUrl ? (
                <img src={about.imageUrl} alt="About Visual" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-gray-700" size={48} />
              )}
              
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(res: any) => {
                  setAbout({ ...about, imageUrl: res.info.secure_url })
                  toast.success("Image uploaded successfully!")
                }}
              >
                {({ open }) => (
                  <button 
                    type="button" 
                    onClick={() => open()} 
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center font-bold text-sm text-white backdrop-blur-sm"
                  >
                    Change Story Image
                  </button>
                )}
              </CldUploadWidget>
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-bold text-[#00BFFF] italic">Visualizing "My Universe"</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                This image represents your creative flow. It will be displayed prominently in your About section to illustrate your professional journey.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative & Details */}
        <section className="bg-[#161B22] p-8 rounded-3xl border border-[#30363D] shadow-xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Info size={16} className="text-[#00BFFF]" /> Main Heading
            </label>
            <input 
              type="text" 
              placeholder="e.g., Welcome to my digital playground"
              value={about.title} 
              onChange={e => setAbout({...about, title: e.target.value})} 
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-[#00BFFF]/50 focus:border-[#00BFFF] transition-all" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Calendar size={16} className="text-[#00BFFF]" /> Experience Level
              </label>
              <input 
                type="text" 
                placeholder="e.g., 2+ Years in Development"
                value={about.yearsOfExp} 
                onChange={e => setAbout({...about, yearsOfExp: e.target.value})} 
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white outline-none focus:border-[#00BFFF] focus:ring-2 focus:ring-[#00BFFF]/50" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <MapPin size={16} className="text-[#00BFFF]" /> Current Location
              </label>
              <input 
                type="text" 
                placeholder="e.g., Cairo, Egypt"
                value={about.location} 
                onChange={e => setAbout({...about, location: e.target.value})} 
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white outline-none focus:border-[#00BFFF] focus:ring-2 focus:ring-[#00BFFF]/50" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Full Description (Behind the Vision)</label>
            <textarea 
              rows={10} 
              placeholder="Write your professional story here..."
              value={about.description} 
              onChange={e => setAbout({...about, description: e.target.value})} 
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-[#00BFFF]/50 focus:border-[#00BFFF] transition-all resize-none font-sans" 
            />
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button 
            disabled={loading} 
            className="group bg-[#00BFFF] hover:bg-[#3B82F6] text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-[#00BFFF]/30 disabled:opacity-50 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={22} className="group-hover:rotate-12 transition-transform" />}
            Save About Information
          </button>
        </div>
      </form>
    </motion.div>
  )
}