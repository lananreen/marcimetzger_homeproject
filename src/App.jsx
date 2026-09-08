import About from './sections/About'
import Blog from './sections/Blog'
import Contact from './sections/Contact'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Blog />
      <Contact />
      <Footer />
    </>
  )
}

export default App
