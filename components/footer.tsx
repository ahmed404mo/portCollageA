import { Mail, Linkedin, Github, Facebook } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#161B22] border-t border-[#30363D] text-white py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Ahmed */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">Ahmed <span className="text-[#00BFFF]">Mokhtar</span></h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Full-Stack Developer | Creative Tech Solutions | Building innovative digital experiences and educational tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#9CA3AF] hover:text-[#00BFFF] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#9CA3AF] hover:text-[#00BFFF] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-[#9CA3AF] hover:text-[#00BFFF] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#9CA3AF] hover:text-[#00BFFF] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Connect</h3>
            <div className="flex gap-4">
              <a
                href="mailto:ahmed.mokhtar@example.com" // تقدر تعدل الايميل هنا
                className="p-2 bg-[#0D1117] text-[#9CA3AF] border border-[#30363D] rounded-lg hover:text-[#00BFFF] hover:border-[#00BFFF]/50 hover:scale-110 transition-all shadow-lg"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-mokhtar-a23a10372"
                className="p-2 bg-[#0D1117] text-[#9CA3AF] border border-[#30363D] rounded-lg hover:text-[#00BFFF] hover:border-[#00BFFF]/50 hover:scale-110 transition-all shadow-lg"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/ahmed404mo"
                className="p-2 bg-[#0D1117] text-[#9CA3AF] border border-[#30363D] rounded-lg hover:text-[#00BFFF] hover:border-[#00BFFF]/50 hover:scale-110 transition-all shadow-lg"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.facebook.com/ahmed.mokhtar.253168"
                className="p-2 bg-[#0D1117] text-[#9CA3AF] border border-[#30363D] rounded-lg hover:text-[#00BFFF] hover:border-[#00BFFF]/50 hover:scale-110 transition-all shadow-lg"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#30363D] pt-8 text-center text-sm text-[#9CA3AF]">
          <p>&copy; {currentYear} Ahmed Mokhtar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}