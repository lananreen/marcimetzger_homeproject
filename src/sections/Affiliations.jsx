const LOGOS = [
  { src: '/affiliation1.webp', alt: 'Affiliation 1' },
  { src: '/affiliation2.webp', alt: 'Affiliation 2' },
  { src: '/affiliation3.webp', alt: 'Affiliation 3' },
  { src: '/affiliation4.webp', alt: 'Affiliation 4' },
]

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Affiliations() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const logosRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%'
          }
        }
      )

      gsap.fromTo(
        logosRef.current.children,
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.2,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%'
          }
        }
      )
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section id="affiliations" className="section affiliations" ref={sectionRef}>
      <h2 className="affiliations-title" ref={titleRef}>Our Affiliations</h2>
      <div className="affiliations-logos" ref={logosRef}>
        {LOGOS.map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            className="affiliations-logo"
          />
        ))}
      </div>
    </section>
  )
}

export default Affiliations
