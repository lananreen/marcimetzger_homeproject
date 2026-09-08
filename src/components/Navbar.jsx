function Navbar() {
  const links = ['Home', 'Listings', "Let's move", 'About Us']

  return (
    <nav className="navbar">
      <a href="#" onClick={(e) => e.preventDefault()} className="navbar-logo-link">
        <img src="/logo.webp" alt="Marci Metzger - The Ridge Realty Group logo" className="navbar-logo" />
      </a>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
