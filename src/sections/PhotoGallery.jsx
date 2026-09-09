import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import AccordionGallery from '../components/AccordionGallery'
import BlurText from '../components/BlurText'

const PHOTOS = [
  { image: '/photo1.webp', label: 'Photo 1' },
  { image: '/photo2.webp', label: 'Photo 2' },
  { image: '/photo3.webp', label: 'Photo 3' },
  { image: '/photo4.webp', label: 'Photo 4' },
  { image: '/photo5.webp', label: 'Photo 5' },
  { image: '/photo6.webp', label: 'Photo 6' },
  { image: '/photo7.webp', label: 'Photo 7' }
]

const revealVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

function PhotoGallery() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (selected === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <section id="photo-gallery" className="section photo-gallery">
      <motion.h2
        className="photo-gallery-title"
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <BlurText text="PHOTO GALLERY" direction="top" />
      </motion.h2>
      <motion.div
        className="photo-gallery-wrap"
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AccordionGallery
          items={PHOTOS}
          defaultIndex={3}
          height={540}
          showLabels={false}
          onSelect={(item) => setSelected(item)}
        />
      </motion.div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              className="photo-lightbox-image"
              src={selected.image}
              alt={selected.label}
              draggable="false"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default PhotoGallery
