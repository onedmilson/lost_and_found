import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'
import logo from '../../assets/obj.png';
import './Sidebar.css';
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillBoxFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        <Link to="/account" className="site__title">
          <img src={logo} alt="" className="logo__sidebar" />
        </Link>
      </div>
      <ul className='ul__sidebar'>
        <li>
          <Link to="/add-items"><FaPlus />Adicionar itens</Link>
        </li>
        <li>
          <Link to="/my-items"><BsFillBoxFill />Meus achados</Link>
        </li>
        <li>
          <Link to="/profile"><BsFillPersonFill />Perfil</Link>
        </li>
        <li
          className="logout"
          onClick={handleLogout}
        >
          <CiLogout />Logout
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar