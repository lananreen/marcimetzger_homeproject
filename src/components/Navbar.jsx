import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const links = ['Home', 'Listings', "Let's move", 'About Us']
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <a href="#" onClick={(e) => e.preventDefault()} className="navbar-logo-link">
        <img src="/logo.webp" alt="Marci Metzger - The Ridge Realty Group logo" className="navbar-logo" />
      </a>
      <button
        className="navbar-burger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      <ul className={`navbar-links${menuOpen ? ' navbar-links--open' : ''}`}>
        {links.map((link) => (
          <li key={link}>
            <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false) }}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
