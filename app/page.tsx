"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2, Download } from "lucide-react";
import ParticlesBackground from "@/components/particles-background";
import Image from "next/image";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 15 أيقونة أساسية
  const techIcons = [
    "/html.png",
    "/css.png",
    "/javascript.png",
    "/typescript.png",
    "/react.png",
    "/tailwind.png",
    "/mongooDB.png",
    "/bootstrap.png",
    "/c++.png",
    "/git.png",
    "/npm.png",
    "/pngegg.png",
    "/postman.png",
    "/python.png",
    "/node-js.png",
  ];

  // هنضيف أول أيقونة في الآخر عشان يبقوا 16 أيقونة بالظبط، 
  // وبالتالي نقدر نقسمهم لـ 8 أزواج (كل زوج فيه 2 بيطلعوا مع بعض)
  const pairedIcons = [...techIcons, techIcons[0]];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/stats"),
        ]);

        const profileData = await profileRes.json();
        const statsData = await statsRes.json();

        setProfile(profileData);

        if (statsData.success && Array.isArray(statsData.stats)) {
          setStats(statsData.stats);
        } else {
          setStats([]);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#00BFFF]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden">
      <ParticlesBackground />

      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#00BFFF] font-semibold text-lg uppercase tracking-wider"
              >
                {profile?.headline || "Junior Developer"}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                Hi, I'm{" "}
                <span className="gradient-text">
                  {profile?.name?.split(" ")[0] || "Ahmed"}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-[#9CA3AF] leading-relaxed italic"
              >
                Building scalable web applications and intuitive digital experiences
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-[#6B7280] leading-relaxed max-w-lg"
              >
                {profile?.bio ||
                  "Building interactive educational experiences and robust web applications."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row flex-wrap gap-4 pt-8"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00BFFF]/50 transition-all hover:scale-105"
                >
                  View Projects
                  <ArrowRight size={20} />
                </Link>

                <a
                  href={profile?.resumeUrl || profile?.cvLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#161B22] border border-[#30363D] text-white font-semibold rounded-lg hover:bg-[#30363D] hover:border-[#00BFFF]/50 transition-all hover:scale-105"
                >
                  <Download size={20} className="text-[#00BFFF]" />
                  Download CV
                </a>
              </motion.div>
            </motion.div>

            {/* Profile Image with Flowing Icons */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2 flex justify-center items-center"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 flex justify-center items-center">
                {/* الإضاءة الخلفية */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] rounded-full blur-3xl opacity-30 animate-pulse z-0" />

                {/* الصورة الشخصية */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#00BFFF]/30 shadow-2xl shadow-[#00BFFF]/20 z-10 bg-[#0D1117]">
                  <Image
                    src={profile?.avatarUrl || "/portTwo.png"}
                    alt={profile?.name || "Profile"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* الأيقونات المتحركة */}
                <div className="absolute inset-0 z-30 flex justify-center overflow-visible pointer-events-none">
                  {pairedIcons.map((iconPath, index) => {
                    const pairIndex = Math.floor(index / 2);
                    const side = index % 2 === 0 ? "right" : "left";
                    
                    const distance = 180 + (pairIndex % 3) * 20; 
                    const startX = side === "right" ? distance : -distance;
                    const wiggleX = (Math.random() - 0.5) * 40;

                    const startY = 350; 
                    const endY = -400; 

                    const animDuration = 10; 
                    const totalPairs = 8;
                    const delay = pairIndex * (animDuration / totalPairs); 

                    return (
                      <motion.div
                        key={index}
                        // التعديل هنا: إزالة الخلفية والبوردر، وإضافة توهج للظل
                        className="absolute w-12 h-12 flex items-center justify-center drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]"
                        initial={{
                          opacity: 0,
                          y: startY,
                          x: startX,
                          scale: 0.5,
                        }}
                        animate={{
                          opacity: [0, 1, 1, 0.8, 0],
                          y: endY,
                          x: [
                            startX,
                            startX + wiggleX,
                            startX - wiggleX,
                            startX,
                          ],
                          scale: [0.5, 1.1, 1.2, 1, 0.6],
                        }}
                        transition={{
                          duration: animDuration,
                          repeat: Infinity,
                          ease: "linear", 
                          delay: delay,
                          times: [0, 0.1, 0.5, 0.85, 1],
                        }}
                      >
                        <Image
                          src={iconPath}
                          alt={`tech-icon-${index}`}
                          width={36} // كبرت الأيقونة شوية لأن الخلفية اتشالت
                          height={36}
                          className="object-contain"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.length > 0 ? (
              stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="text-center p-8 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-[#00BFFF]/50 transition-all group"
                >
                  <div className="text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <p className="text-[#9CA3AF] font-medium">{stat.label}</p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 italic">
                No statistics found. Start adding projects and skills to see
                them here!
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Let's Create Something{" "}
            <span className="gradient-text">Amazing</span> Together
          </motion.h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00BFFF]/50 transition-all hover:scale-105"
          >
            Get In Touch
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}