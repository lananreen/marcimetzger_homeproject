import ScrollReveal from '../components/ScrollReveal'
import TiltedCard from '../components/TiltedCard'

const revealEnd = 'top 55%'

function About() {
  return (
    <section id="about" className="section about">
      <div className="about-text">
        <ScrollReveal rotationEnd={revealEnd} wordAnimationEnd={revealEnd}>
          About Marci Metzger
        </ScrollReveal>
        <ScrollReveal
          containerClassName="about-paragraph"
          rotationEnd={revealEnd}
          wordAnimationEnd={revealEnd}
        >
          For nearly three decades, Marci J. Metzger built a highly successful
          career as a dedicated REALTOR, eventually advancing her expertise to
          become a licensed Broker while navigating the dynamic real estate
          landscape of Washington State.
        </ScrollReveal>
        <ScrollReveal
          containerClassName="about-paragraph"
          rotationEnd={revealEnd}
          wordAnimationEnd={revealEnd}
        >
          Today, she has traded the Pacific Northwest for a warmer climate,
          fully enjoying the abundant sunshine while continuing her
          professional passion by expertly guiding clients through the
          thriving Southern Nevada market. Having successfully assisted
          countless buyers and sellers across a wide variety of shifting
          market conditions since she first began her career in 1995, Marci
          brings an unparalleled wealth of knowledge and invaluable industry
          insight to every transaction she handles.
        </ScrollReveal>
      </div>
      <div className="about-image-wrap">
        <TiltedCard
          imageSrc="/marcimetzger.png"
          altText="Marci Metzger"
          containerHeight="auto"
          containerWidth="100%"
          imageHeight="auto"
          imageWidth="100%"
          scaleOnHover={1.05}
          rotateAmplitude={6}
          showMobileWarning={false}
          showTooltip={false}
        />
      </div>
    </section>
  )
}

export default About
