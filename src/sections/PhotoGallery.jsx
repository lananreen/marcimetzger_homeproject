import AccordionGallery from '../components/AccordionGallery'

const PHOTOS = [
  { image: '/photo1.webp', label: 'Photo 1' },
  { image: '/photo2.webp', label: 'Photo 2' },
  { image: '/photo3.webp', label: 'Photo 3' },
  { image: '/photo4.webp', label: 'Photo 4' },
  { image: '/photo5.webp', label: 'Photo 5' },
  { image: '/photo6.webp', label: 'Photo 6' },
  { image: '/photo7.webp', label: 'Photo 7' }
]

function PhotoGallery() {
  return (
    <section id="photo-gallery" className="section photo-gallery">
      <h2 className="photo-gallery-title">Photo Gallery</h2>
      <div className="photo-gallery-wrap">
        <AccordionGallery items={PHOTOS} defaultIndex={3} height={540} showLabels={false} />
      </div>
    </section>
  )
}

export default PhotoGallery
