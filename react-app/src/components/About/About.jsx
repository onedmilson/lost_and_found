import React from 'react'
import Navbar from '../Navbar/Navbar'
import './About.css';

const About = () => {
  return (
    <div className='about__container'>
      <Navbar />
      <div className='content__about'>
        <h1>Grupo do Projeto Integrador I</h1>
        <section className="about__section">
          <p>Carla Letícia de Almeida, RA 2206120</p>
          <p>Denise Pozzani de Freitas Barbosa, RA 23211806</p>
          <p>Edmilson Oliveira, RA 2224064</p>
          <p>Leandro dos Santos Amaral, RA 2203517</p>
          <p>Pedro Paulo Soares Souza, RA 2200598</p>
          <p>Victor Neves Silva, RA 23201639</p>
        </section>
      </div>
    </div>
  )
}

export default About;
