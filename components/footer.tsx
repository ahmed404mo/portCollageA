import { Mail, Linkedin, Github, Instagram } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#161B22] border-t border-[#30363D] text-white py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-2">Sara</h3>
            <p className="text-sm text-[#9CA3AF]">
              Early Childhood Education Student | Creative Educator | Educational Technology Enthusiast
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#9CA3AF] hover:text-[#FF006E] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#9CA3AF] hover:text-[#FF006E] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-[#9CA3AF] hover:text-[#FF006E] transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#9CA3AF] hover:text-[#FF006E] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="mailto:saraabdullwhab606@gmail.com"
                className="text-[#9CA3AF] hover:text-[#FF006E] hover:scale-110 transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/sara-abdullwhab"
                className="text-[#9CA3AF] hover:text-[#FF006E] hover:scale-110 transition-all"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-[#9CA3AF] hover:text-[#FF006E] hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.instagram.com/sara_abdullwhab_/"
                className="text-[#9CA3AF] hover:text-[#FF006E] hover:scale-110 transition-all"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#30363D] pt-8 text-center text-sm text-[#9CA3AF]">
          <p>&copy; {currentYear} Sara. All rights reserved. | Faculty of Early Childhood Education</p>
        </div>
      </div>
    </footer>
  )
}
