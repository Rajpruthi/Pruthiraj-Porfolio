import { useEffect, useState } from 'react'
import ParticleBackground from '../components/ParticleBackground'

const SkillCard = ({ name, progress, delay }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="group bg-gradient-to-br from-gray-900/60 to-gray-800/60 border border-gray-800 rounded-2xl p-6 w-48 hover:border-cyan-400 transition duration-300 hover:shadow-[0_0_30px_#22d3ee80] hover:-translate-y-3">
      <h4 className="text-lg font-semibold text-white">{name}</h4>
      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
        <div 
          className="bg-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedProgress}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{progress}%</p>
    </div>
  )
}

const Skills = () => {
  const frontendSkills = [
    { name: 'HTML', progress: 90 },
    { name: 'CSS', progress: 85 },
    { name: 'JavaScript', progress: 80 },
    { name: 'React', progress: 75 },
  ]

  const backendSkills = [
    { name: 'Node.js', progress: 70 },
    { name: 'Python', progress: 85 },
  ]

  const databaseSkills = [
    { name: 'MongoDB', progress: 70 },
  ]

  const dataScienceSkills = [
    { name: 'Python', progress: 85 },
    { name: 'NumPy', progress: 80 },
    { name: 'Pandas', progress: 80 },
    { name: 'Machine Learning', progress: 70 },
  ]

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 md:px-8 bg-black/40 text-center relative overflow-hidden">
      <ParticleBackground />

      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-cyan-400 tracking-wide">My Skills</h2>
      <p className="text-gray-400 mb-12 max-w-2xl mx-auto px-4">
        A collection of technologies I use to build responsive, efficient, and modern web applications.
      </p>

      {/* Frontend Skills */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Frontend Development</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Creating interactive and responsive user interfaces with modern web technologies.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {frontendSkills.map((skill, index) => (
            <SkillCard key={index} {...skill} delay={index * 0.2} />
          ))}
        </div>
      </div>

      {/* Backend Skills */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Backend Development</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {backendSkills.map((skill, index) => (
            <SkillCard key={index} {...skill} delay={index * 0.2} />
          ))}
        </div>
      </div>

      {/* Database */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Database & Tools</h3>
        <div className="flex justify-center">
          {databaseSkills.map((skill, index) => (
            <SkillCard key={index} {...skill} delay={index * 0.2} />
          ))}
        </div>
      </div>

      {/* Data Science Skills */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Data Science</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Extracting insights from data using analysis, visualization, and machine learning techniques.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {dataScienceSkills.map((skill, index) => (
            <SkillCard key={index} {...skill} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
