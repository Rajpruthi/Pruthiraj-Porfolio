const ParticleBackground = () => {
  const particles = Array.from({ length: 9 }, (_, i) => ({
    left: `${(i + 1) * 10}%`,
    delay: `${i}s`
  }))

  return (
    <>
      {particles.map((particle, index) => (
        <div 
          key={index}
          className="particle"
          style={{ 
            left: particle.left, 
            animationDelay: particle.delay 
          }}
        />
      ))}
    </>
  )
}

export default ParticleBackground
