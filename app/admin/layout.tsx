"use client"

import Link from "next/link"
import { Toaster } from 'react-hot-toast';
import { usePathname } from "next/navigation"
import { 
  User, Briefcase, GraduationCap, 
  Code, MessageSquare, LayoutDashboard, LogOut, Info 
} from "lucide-react"

const menuItems = [
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "About Me", href: "/admin/about", icon: Info }, 
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Credentials", href: "/admin/credentials", icon: GraduationCap },
  { name: "Skills", href: "/admin/skills", icon: Code },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // دالة لتسجيل الخروج (مسح الكوكي)
  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/login";
  }

  return (
    <div className="flex min-h-screen bg-[#0D1117] text-white">
      {/* تحديث ألوان التنبيهات (Toaster) لتناسب الثيم الأزرق */}
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          duration: 4000, 
          style: { 
            background: '#161B22', 
            color: '#fff', 
            border: '1px solid #00BFFF' 
          } 
        }} 
      />

      {/* Sidebar */}
      <aside className="w-64 bg-[#161B22] border-r border-[#30363D] fixed h-full shadow-xl z-20">
        <div className="p-6">
          {/* تم تغيير اللون للأزرق */}
          <h2 className="text-xl font-bold text-[#00BFFF] flex items-center gap-2">
            <LayoutDashboard size={24} /> Admin Panel
          </h2>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                // تم تحديث لون الخلفية النشطة والظل للأزرق
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#00BFFF] text-white shadow-lg shadow-[#00BFFF]/20" 
                    : "text-gray-400 hover:bg-[#30363D] hover:text-[#00BFFF]"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-8 w-full px-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}