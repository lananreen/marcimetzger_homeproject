import About from './sections/About'
import Default from './sections/Default'
import Purpose from './sections/Purpose'
import SearchListing from './sections/SearchListing'
import Affiliations from './sections/Affiliations'
import PhotoGallery from './sections/PhotoGallery'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Default />
      <About />
      <Purpose />
      <SearchListing />
      <Affiliations />
      <PhotoGallery />
      <Footer />
    </>
  )
}

export default App
