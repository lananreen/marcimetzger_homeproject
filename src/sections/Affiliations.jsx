const LOGOS = [
  { src: '/affiliation1.webp', alt: 'Affiliation 1' },
  { src: '/affiliation2.webp', alt: 'Affiliation 2' },
  { src: '/affiliation3.webp', alt: 'Affiliation 3' },
  { src: '/affiliation4.webp', alt: 'Affiliation 4' },
]

function Affiliations() {
  return (
    <section id="affiliations" className="section affiliations">
      <h2 className="affiliations-title">Our Affiliations</h2>
      <div className="affiliations-logos">
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
