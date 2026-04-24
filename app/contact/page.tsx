"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { useState } from "react"
import { ProgrammingLanguages } from "@/components/animated-elements"
import ParticlesBackground from "@/components/particles-background"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("Sending message...")

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save message")

      setSubmitStatus("Message sent successfully! 🚀")
      setFormData({ name: "", email: "", subject: "", message: "" })

    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى. 😔")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ahmed.mokhtar@example.com", // تم التحديث ليناسب الاسم الجديد
      link: "mailto:ahmed.mokhtar@example.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+20 100 000 0000",
      link: "tel:+201000000000",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Cairo, Egypt",
      link: "#",
    },
  ]

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
            <h1 className="text-5xl md:text-6xl font-bold text-white">Get In <span className="text-[#00BFFF]">Touch</span></h1>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Have a question or want to collaborate with Ahmed? I'd love to hear from you. 
              Send me a message and I'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group p-6 rounded-2xl bg-[#161B22] shadow-lg hover:shadow-xl transition-all border border-[#30363D] hover:border-[#00BFFF]/50 duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00BFFF] to-[#3B82F6] flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-[#00BFFF]/20">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-[#00BFFF] transition-colors">{info.title}</h3>
                      <p className="text-[#9CA3AF] text-sm">{info.value}</p>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-[#161B22] rounded-3xl p-8 shadow-2xl border border-[#30363D]"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-[#0D1117] text-white w-full px-4 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]/50 transition-all placeholder:text-gray-600"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="bg-[#0D1117] text-white w-full px-4 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]/50 transition-all placeholder:text-gray-600"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="bg-[#0D1117] text-white w-full px-4 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]/50 transition-all placeholder:text-gray-600"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="bg-[#0D1117] text-white w-full px-4 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none focus:ring-1 focus:ring-[#00BFFF]/50 transition-all resize-none placeholder:text-gray-600"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00BFFF]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>

              {submitStatus && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center font-bold text-sm ${
                    submitStatus.includes("successfully") ? "text-[#00BFFF]" : "text-red-500"
                  }`}
                >
                  {submitStatus}
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  )
}