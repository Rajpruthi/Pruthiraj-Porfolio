import { Link } from 'react-router-dom'
import ParticleBackground from '../components/ParticleBackground'

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="float z-10">
        <img 
          src="/pr.jpg" 
          alt="Pruthiraj Rout" 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-6 border-4 border-cyan-400 shadow-lg"
        />
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Hi, I'm <span className="text-cyan-400">Pruthiraj Rout</span>
        </h2>
        <p className="text-base md:text-lg text-gray-300">
          A passionate <span className="text-cyan-400">Python Developer</span> and fresher eager to create modern web apps.
        </p>
        
        <div className="mt-8 flex flex-col items-center sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 z-10">
          <Link 
            to="/projects" 
            className="bg-cyan-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-400 transition hover:shadow-lg hover:shadow-cyan-500/50"
          >
            View Projects
          </Link>
          <Link 
            to="/contact" 
            className="border border-cyan-500 px-6 py-2 rounded-full font-semibold hover:bg-cyan-500 hover:text-black transition hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
