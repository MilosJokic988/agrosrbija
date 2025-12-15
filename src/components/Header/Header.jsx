import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <h2>AgroMapa Srbije</h2>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        <Link to="/" onClick={() => setOpen(false)}>Mapa</Link>
        <Link to="/dodaj" onClick={() => setOpen(false)}>Dodaj proizvođača</Link>
        <Link to="/o-projektu" onClick={() => setOpen(false)}>O projektu</Link>
      </nav>

      <div 
        className={`hamburger ${open ? 'open' : ''}`} 
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  )
}
