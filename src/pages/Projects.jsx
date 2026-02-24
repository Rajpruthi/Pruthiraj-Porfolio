import { Link } from 'react-router-dom'

const ProjectCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:-translate-y-3 transition transform shadow-lg hover:shadow-cyan-500/50 hover:shadow-2xl group">
      <img 
        src={image} 
        alt={title} 
        className="rounded-xl mb-4 w-full h-40 object-cover group-hover:scale-105 transition"
      />
      <h4 className="text-xl font-semibold mb-2 text-cyan-400">{title}</h4>
      <p className="text-gray-400 mb-3">{description}</p>
      <Link 
        to={link} 
        className="text-cyan-400 font-semibold hover:underline inline-flex items-center"
      >
        View Project →
      </Link>
    </div>
  )
}

const Projects = () => {
  const projects = [
    {
      title: 'Bulk Email Sender',
      description: 'An application for sending bulk emails efficiently with customizable templates and recipient management.',
      image: '/Bulk-Email-Service.png',
      link: '/projects/bulk-email'
    },
    {
      title: 'Tourism Management',
      description: 'A system for managing tourism services including bookings, itineraries, and customer support.',
      image: '/Tourism Management.jpg',
      link: '/projects/tourism'
    },
    {
      title: 'Movie Recommendation Engine',
      description: 'An AI-powered engine that recommends movies based on user preferences and viewing history.',
      image: '/Movie Recommendation Engine.jpg',
      link: '/projects/movie-recommendation'
    },
    {
      title: 'Car Price Prediction',
      description: 'A machine learning model to predict car prices based on features like make, model, and mileage.',
      image: '/Car Price Prediction.jpg',
      link: '/projects/car-price-prediction'
    },
    {
      title: 'NDT & DT Testing',
      description: 'Non-Destructive Testing and Destructive Testing solutions for material analysis and quality control.',
      image: '/NDT & DT Testing.jpg',
      link: '/projects/ndt-testing'
    },
    {
      title: 'Portfolio',
      description: 'A responsive personal portfolio showcasing skills, projects, and achievements with modern design.',
      image: '/Portfolio.jpg',
      link: '/'
    },
  ]

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 md:px-20 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-cyan-400">My Projects</h2>
      <p className="text-gray-400 mb-12 max-w-2xl mx-auto px-4">
        Here are some of my recent works that showcase my skills and creativity.
        Each project focuses on building functional, user-friendly web solutions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
