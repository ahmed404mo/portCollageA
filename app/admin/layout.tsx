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

  return (
    <div className="flex min-h-screen bg-[#0D1117] text-white">
<Toaster position="top-center" toastOptions={{ duration: 4000, style: { background: '#161B22', color: '#fff', border: '1px solid #30363D' } }} />
      {/* Sidebar */}
      <aside className="w-64 bg-[#161B22] border-r border-[#30363D] fixed h-full shadow-xl z-20">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#FF006E] flex items-center gap-2">
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
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#FF006E] text-white shadow-lg shadow-[#FF006E]/20" 
                    : "text-gray-400 hover:bg-[#30363D] hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-8 w-full px-4">
          <button className="flex items-center gap-3 p-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut size={20} />
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