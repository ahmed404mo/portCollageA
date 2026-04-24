"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react" // ضفنا أيقونات العين
import ParticlesBackground from "@/components/particles-background"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false) // حالة إظهار الباسورد
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push("/admin/profile")
      } else {
        // لو الداتا رجعت خطأ من السيرفر
        setError(data.error || "Invalid credentials")
      }
    } catch (err) {
      // لو السيرفر واقع أو المسار غلط
      setError("Connection error. Please check your API.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center relative overflow-hidden px-4">
      <ParticlesBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[#161B22] border border-[#30363D] p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-white">Admin <span className="text-[#FF006E]">Portal</span></h1>
            <p className="text-gray-400">Welcome back, Sara!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-3 text-white focus:border-[#FF006E] focus:ring-1 focus:ring-[#FF006E] outline-none transition-all"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Lock size={16} /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // تغيير النوع بناءً على الحالة
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-3 text-white focus:border-[#FF006E] focus:ring-1 focus:ring-[#FF006E] outline-none transition-all pr-12"
                  placeholder="••••••••"
                />
                {/* زر إظهار وإخفاء الباسورد */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF006E] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF006E] to-[#FB5581] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#FF006E]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}