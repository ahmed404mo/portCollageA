"use client"

import { useState, useEffect } from "react"
import { Mail, Trash2, Calendar, User, MessageSquareText, Loader2, Inbox, Reply, AlertTriangle } from "lucide-react" // ضفنا AlertTriangle
import { motion, AnimatePresence } from "framer-motion" // ضفنا AnimatePresence
import { toast } from "react-hot-toast"

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  
  // State للتحكم في ظهور الـ Delete Popup
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages")
      if (res.ok) {
        const data = await res.json()
        setMessages(data || [])
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
      toast.error("Failed to load messages")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  // دالة الحذف اللي بتشتغل لما تدوس Delete من الـ Popup
  const confirmDelete = async () => {
    if (!deleteId) return
    
    const tid = toast.loading("Deleting message...")
    try {
      const res = await fetch(`/api/messages?id=${deleteId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("Message deleted", { id: tid })
        setDeleteId(null) // نقفل الـ Popup
        fetchMessages() // نحدث القائمة
      } else {
        throw new Error("Failed to delete")
      }
    } catch (e) {
      toast.error("Could not delete message", { id: tid })
    }
  }

  // دالة الرد عبر Gmail
  const handleReply = (email: string, subject: string) => {
    const replySubject = encodeURIComponent(`Re: ${subject || "Your Message"}`)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${replySubject}`
    window.open(gmailUrl, "_blank")
  }

  return (
    <div className="space-y-8 pb-10 relative">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Inbox className="text-[#FF006E]" size={32} /> Inbox
        </h1>
        <p className="text-gray-400 mt-1">View and manage messages sent by your visitors</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="animate-spin text-[#FF006E] mb-4" size={40} />
            <p className="text-gray-500 animate-pulse font-medium">Checking your inbox...</p>
          </div>
        ) : messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-[#161B22] border-2 border-dashed border-[#30363D] rounded-3xl"
          >
            <div className="bg-[#0D1117] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#30363D]">
              <Inbox className="text-gray-600" size={32} />
            </div>
            <h3 className="text-white font-bold text-lg">Your inbox is empty</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              When someone contacts you through your website, their message will appear here.
            </p>
          </motion.div>
        ) : (
          messages.map((msg: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={msg.id}
              className="bg-[#161B22] border border-[#30363D] p-6 rounded-3xl hover:border-[#FF006E]/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-[#FF006E]/10 rounded-full flex items-center justify-center text-[#FF006E] shadow-lg shadow-[#FF006E]/5">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{msg.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <Mail size={14} /> {msg.email}
                    </p>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 bg-[#0D1117] px-3 py-1.5 rounded-lg uppercase tracking-widest font-bold border border-[#30363D]">
                    <Calendar size={12} className="text-[#FF006E]" /> {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  
                  {/* زرار الرد */}
                  <button 
                    onClick={() => handleReply(msg.email, msg.subject)}
                    className="p-2 text-blue-400 bg-blue-400/10 hover:bg-blue-400 hover:text-white rounded-xl transition-all"
                    title="Reply via Gmail"
                  >
                    <Reply size={18} />
                  </button>

                  {/* زرار الحذف (بيفتح الـ Popup) */}
                  <button 
                    onClick={() => setDeleteId(msg.id)}
                    className="p-2 text-red-400 bg-red-400/10 hover:bg-red-400 hover:text-white rounded-xl transition-all"
                    title="Delete Message"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-[#0D1117] p-5 rounded-2xl border border-[#30363D]">
                 <h4 className="text-sm font-bold text-[#FF006E] mb-3 flex items-center gap-2">
                   <MessageSquareText size={16} /> {msg.subject || "No Subject"}
                 </h4>
                 <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* الخلفية الشفافة */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setDeleteId(null)} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            {/* صندوق التأكيد */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="bg-[#1C2128] border border-[#30363D] p-8 rounded-[2.5rem] max-w-sm w-full z-10 text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <AlertTriangle size={40} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Delete Message?</h3>
                <p className="text-gray-400 text-sm">This action is permanent and cannot be undone.</p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteId(null)} 
                  className="flex-1 bg-[#30363D] hover:bg-gray-700 text-white py-3 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}