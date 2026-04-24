"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { ProgrammingLanguages } from "@/components/animated-elements"
import ParticlesBackground from "@/components/particles-background"

export default function SkillsPage() {
  const [skillCategories, setSkillCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills")
        const data = await res.json()

        if (Array.isArray(data)) {
          // تجميع المهارات حسب الـ Category عشان تناسب تصميم الصفحة
          const groupedSkills = data.reduce((acc: any[], skill: any) => {
            const existingCategory = acc.find(c => c.category === skill.category)
            if (existingCategory) {
              existingCategory.skills.push({ name: skill.name, level: skill.level })
            } else {
              acc.push({ 
                category: skill.category, 
                skills: [{ name: skill.name, level: skill.level }] 
              })
            }
            return acc
          }, [])

          setSkillCategories(groupedSkills)
        }
      } catch (error) {
        console.error("Failed to load skills", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden font-testing pb-20">
      <ParticlesBackground />
      <ProgrammingLanguages />

      {/* Header Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white"
          >
            My <span className="text-[#FF006E]">Skills</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-[#9CA3AF] max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical expertise and professional capabilities.
          </motion.p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-[#FF006E]" size={48} />
            </div>
          ) : skillCategories.length === 0 ? (
            <div className="text-center py-20 bg-[#161B22] border border-[#30363D] rounded-3xl">
               <p className="text-gray-500 italic">No skills added yet. Update your dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="space-y-6 bg-[#161B22] p-8 rounded-3xl border border-[#30363D] shadow-lg hover:border-[#FF006E]/30 transition-all"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{category.category}</h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-[#FF006E] to-[#FB5581] rounded-full"></div>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill: any, skillIndex: number) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-300">{skill.name}</span>
                          <span className="text-sm font-bold text-[#FF006E]">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-[#0D1117] rounded-full h-3 overflow-hidden border border-[#30363D]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#FF006E] to-[#FB5581] rounded-full shadow-[0_0_10px_rgba(255,0,110,0.5)]"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Skills Section - ثابتة كمهارات شخصية (Soft Skills) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="text-3xl font-bold text-white">Other Competencies</h2>
             <div className="h-1 w-24 bg-gradient-to-r from-[#FF006E] to-[#FB5581] rounded-full mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Communication", description: "Clear and effective communication skills" },
              { title: "Problem Solving", description: "Creative solutions to complex challenges" },
              { title: "Team Collaboration", description: "Working effectively in team environments" },
              { title: "Project Management", description: "Organizing and managing projects efficiently" },
              { title: "Adaptability", description: "Quick learner and adaptable to new technologies" },
              { title: "Leadership", description: "Guiding and mentoring team members" },
            ].map((competency, index) => (
              <motion.div
                key={competency.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="group p-8 rounded-3xl bg-[#161B22] border border-[#30363D] hover:border-[#FF006E]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF006E]/10 flex flex-col items-center justify-center text-center"
              >
                <h3 className="font-bold text-lg text-white group-hover:text-[#FF006E] transition-colors mb-3">{competency.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{competency.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}