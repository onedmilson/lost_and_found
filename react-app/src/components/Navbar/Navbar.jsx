import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/obj.png';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='nav'>
      <Link to="/" className='site__title'><img src={logo} alt="" className='logo' />Lost and Found</Link>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">Sobre</Link></li>
        <li className='login__nav'><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar