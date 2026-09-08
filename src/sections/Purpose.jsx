function Purpose() {
  const items = [
    {
      src: '/kitchen.webp',
      alt: 'Modern kitchen',
      title: 'Top Residential Sales Last 5 Years',
      hoverText:
        'We helped nearly 90 clients in 2021, and closed 28.5 million in sales! Our team works hard everyday to grow and learn, so that we may continue to excel in our market. Our clients deserve our best, & we want to make sure our best is better every year.',
    },
    {
      src: '/home.webp',
      alt: 'Beautiful home',
      title: "Don't Just List it",
      hoverText:
        'Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home.',
    },
    {
      src: '/keys.webp',
      alt: 'House keys',
      title: 'Guide to Buyers',
      hoverText:
        'Nobody knows the market like we do. Enjoy having a pro at your service. Market analysis, upgrades lists, contractors on speed dial, & more!',
    },
  ]

  return (
    <section id="purpose" className="section purpose">
      <h2 className="purpose-title">GET IT SOLD</h2>
      <div className="purpose-images">
        {items.map((item) => (
          <figure key={item.src} className="purpose-card" tabIndex={0}>
            <img src={item.src} alt={item.alt} className="purpose-image" />
            <figcaption className="purpose-card-caption">
              <h3 className="purpose-card-title">{item.title}</h3>
              <span className="purpose-line" aria-hidden="true" />
              <p className="purpose-hover-text">{item.hoverText}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Purpose
