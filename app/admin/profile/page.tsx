"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Globe, Github, Linkedin, Mail, Image as ImageIcon } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import { toast } from "react-hot-toast"

export default function ProfileAdmin() {
  const [profile, setProfile] = useState({
    name: "",
    headline: "",
    bio: "",
    email: "",
    githubUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
    avatarUrl: ""
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data) setProfile(data)
        setFetching(false)
      })
      .catch(() => {
        toast.error("Failed to load profile data")
        setFetching(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const loadId = toast.loading("Updating your profile...")

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      })

      if (res.ok) {
        toast.success("Profile saved successfully!", { id: loadId })
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error("Could not save changes. Please try again.", { id: loadId })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        {/* تغيير لون الـ Loader للأزرق */}
        <Loader2 className="animate-spin text-[#00BFFF]" size={48} />
        <p className="text-gray-500 animate-pulse">Loading settings...</p>
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
        <h1 className="text-4xl font-extrabold tracking-tight">Profile Settings</h1>
        <p className="text-gray-400">Manage your identity, professional headline, and social presence.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Profile Picture Card */}
        <section className="bg-[#161B22] p-8 rounded-3xl border border-[#30363D] shadow-xl">
          {/* تغيير لون الأيقونة للأزرق */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#00BFFF]">
            <ImageIcon size={20} /> Identity Image
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative group">
              {/* تغيير لون حدود الصورة للأزرق */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#00BFFF]/20 bg-[#0D1117] flex items-center justify-center transition-transform group-hover:scale-105">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-700" size={40} />
                )}
              </div>
            </div>
            
            <div className="space-y-3 text-center sm:text-left">
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) => {
                  setProfile({ ...profile, avatarUrl: result.info.secure_url })
                  toast.success("Image uploaded to Cloudinary!")
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-xl font-bold transition-all"
                  >
                    Change Photo
                  </button>
                )}
              </CldUploadWidget>
              <p className="text-xs text-gray-500">Recommended: Square JPG or PNG. Max 5MB.</p>
            </div>
          </div>
        </section>

        {/* Professional Details Card */}
        <section className="bg-[#161B22] p-8 rounded-3xl border border-[#30363D] shadow-xl space-y-6">
          <h2 className="text-xl font-bold border-b border-[#30363D] pb-4">Professional Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Full Name</label>
              <input 
                type="text" 
                placeholder="Ahmed Mokhtar"
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})} 
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-[#00BFFF]/50 focus:border-[#00BFFF] transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Professional Headline</label>
              <input 
                type="text" 
                placeholder="Full-Stack Developer"
                value={profile.headline} 
                onChange={e => setProfile({...profile, headline: e.target.value})} 
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-[#00BFFF]/50 focus:border-[#00BFFF] transition-all" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Professional Bio</label>
            <textarea 
              rows={5} 
              placeholder="Tell your professional story..."
              value={profile.bio} 
              onChange={e => setProfile({...profile, bio: e.target.value})} 
              className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-[#00BFFF]/50 focus:border-[#00BFFF] transition-all resize-none" 
            />
          </div>
        </section>

        {/* Social & Contact Links Card */}
        <section className="bg-[#161B22] p-8 rounded-3xl border border-[#30363D] shadow-xl space-y-6">
          <h2 className="text-xl font-bold border-b border-[#30363D] pb-4 text-white">Social & Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2"><Mail size={16} className="text-[#00BFFF]"/> Contact Email</label>
              <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-3 focus:border-[#00BFFF] outline-none text-white" placeholder="ahmed@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2"><Github size={16} className="text-[#00BFFF]"/> GitHub URL</label>
              <input type="text" value={profile.githubUrl} onChange={e => setProfile({...profile, githubUrl: e.target.value})} className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-3 focus:border-[#00BFFF] outline-none text-white" placeholder="https://github.com/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2"><Linkedin size={16} className="text-[#00BFFF]"/> LinkedIn URL</label>
              <input type="text" value={profile.linkedinUrl} onChange={e => setProfile({...profile, linkedinUrl: e.target.value})} className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-3 focus:border-[#00BFFF] outline-none text-white" placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2"><Globe size={16} className="text-[#00BFFF]"/> CV / Portfolio Link</label>
              <input type="text" value={profile.resumeUrl} onChange={e => setProfile({...profile, resumeUrl: e.target.value})} className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-3 focus:border-[#00BFFF] outline-none text-white" placeholder="https://drive.google.com/..." />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            disabled={loading} 
            className="group bg-[#00BFFF] hover:bg-[#3B82F6] text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-[#00BFFF]/30 disabled:opacity-50 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={22} className="group-hover:rotate-12 transition-transform" />}
            Save Profile Settings
          </button>
        </div>
      </form>
    </motion.div>
  )
}