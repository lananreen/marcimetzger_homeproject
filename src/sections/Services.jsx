import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Handshake, Home, KeyRound } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: Home,
    title: 'Real Estate Done Right',
    text: "Nervous about your property adventure? Don’t be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!"
  },
  {
    icon: KeyRound,
    title: 'Commercial & Residential',
    text: "Large or small, condo or mansion, we can find it and get at the price that's right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put you hard-earned dollars."
  },
  {
    icon: Handshake,
    title: 'Rely on Expertise',
    text: "If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way."
  }
]

function Services() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.fromTo(
        cardsRef.current,
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.3,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section services">
      <h2 ref={titleRef} className="services-title">Our Services</h2>
      <div className="services-grid">
        {SERVICES.map((service, index) => (
          <article
            key={service.title}
            ref={(el) => (cardsRef.current[index] = el)}
            className="services-card"
          >
            <header className="services-card-header">
              <span className="services-card-icon">
                <service.icon size={40} strokeWidth={1.5} />
              </span>
              <h3 className="services-card-title">{service.title}</h3>
            </header>
            <p className="services-card-text">{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
