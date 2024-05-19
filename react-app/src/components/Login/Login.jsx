import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleApi = () => {
    const url = 'http://localhost:4000/login';
    const data = { username, password }
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message)
          if (res.data.token) {
            localStorage.setItem('token', res.data.token)
            navigate('/account');
          }

        }
      })
      .catch((err) => {
        console.log(err)
        alert('SERVER ERR.')
      })
  }

  return (
    <div className='login__container'>
      <Navbar />
      <section className="login__section">
        <div className="form__container">
          <p className="login" align="center">
            Login
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
              Login
            </button>
            <p align="center">
              Não tem uma conta?
              <Link to='/signup' className="signup__component" align="center">
                Signup
              </Link>
            </p>
            <p className="forgot" align="center">
              <a href="#">Esqueceu a senha? </a>
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Login