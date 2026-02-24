const About = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 md:px-20 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-6 text-cyan-400">About Me</h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-300 leading-relaxed mb-6">
          I'm a motivated fresher with a strong foundation in front-end and back-end technologies.
          I love transforming ideas into functional, user-friendly applications using Python, React, and MongoDB.
          Always eager to learn and collaborate with creative teams to build meaningful software.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          My journey in software development began with a curiosity for how things work behind the scenes.
          I've built projects ranging from responsive web applications to data-driven solutions, always focusing on clean code and user experience.
          When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
        </p>
        <a 
          href="/cv.pdf" 
          download 
          className="bg-cyan-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-400 transition hover:shadow-lg hover:shadow-cyan-500/50 inline-block"
        >
          Download CV
        </a>

        {/* Education Section */}
        <div className="mt-12 text-left">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">Education</h3>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg mb-4">
            <h4 className="text-lg font-semibold text-white">Master of Computer Applications</h4>
            <p className="text-cyan-400">2023- 2025</p>
            <p className="text-gray-400 mt-2">Completed advanced studies in computer applications with a strong foundation in physics, focusing on software development and computational skills.</p>
          </div>
        </div>

        {/* Interests Section */}
        <div className="mt-12 text-left">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">Interests & Hobbies</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-white mb-2">🌐 Web Development</h4>
              <p className="text-gray-400">Passionate about creating interactive and responsive web experiences.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-white mb-2">📚 Learning</h4>
              <p className="text-gray-400">Always exploring new frameworks, tools, and best practices in tech.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-white mb-2">🎯 Problem Solving</h4>
              <p className="text-gray-400">Enjoy algorithmic challenges and logical puzzles.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-white mb-2">🤝 Community</h4>
              <p className="text-gray-400">Active in developer communities, sharing knowledge and helping others.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Passionate Learner</h3>
            <p className="text-gray-400">Continuously exploring new technologies and frameworks to stay ahead in the ever-evolving tech landscape.</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Problem Solver</h3>
            <p className="text-gray-400">Enjoy tackling complex challenges and finding elegant solutions through code and creativity.</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Team Player</h3>
            <p className="text-gray-400">Thrive in collaborative environments, contributing ideas and learning from diverse perspectives.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
