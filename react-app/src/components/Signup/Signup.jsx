import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleApi = () => {
    const url = 'http://localhost:4000/signup';
    const data = { username, password, email, phone }
    axios.post(url, data)
      .then((res) => {
        console.log(res.data)
        if (res.data.message) {
          alert(res.data.message)
          if (res.data) {
            navigate('/login');
          }
        }
      })
      .catch((err) => {
        console.log(err)
        alert('SERVER ERR.')
      })
  }

  return (
    <div className='signup__container'>
      <Navbar />
      <section className="signup__section">
        <div className="form__container">
          <p className="signup" align="center">
            Signup
          </p>
          <div className="form">
            <input
              className="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <input
              className="email"
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <input
              className="phone"
              type="text"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
              }}
            />
            <input
              className="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <button
              className="submit"
              align="center"
              onClick={handleApi}
            >
              Signup
            </button>
            <p align="center">
              <Link to='/login' className="login__component" align="center">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Signup