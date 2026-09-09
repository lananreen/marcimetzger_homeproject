import { Handshake, Home, KeyRound } from 'lucide-react'

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
  return (
    <section id="services" className="section services">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {SERVICES.map((service) => (
          <article key={service.title} className="services-card">
            <span className="services-card-icon">
              <service.icon size={40} strokeWidth={1.5} />
            </span>
            <h3 className="services-card-title">{service.title}</h3>
            <p className="services-card-text">{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
