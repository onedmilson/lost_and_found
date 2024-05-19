import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './profile.css';
import { FaUser } from "react-icons/fa";

const Profile = () => {
  return (
    <div className='profile__container'>
      <Sidebar />
      <section className="content__profile">
        <div className='profile__header'>
          <div className='profile__avatar'>

            <FaUser className='profile__avatar-placeholder' />
          </div>
          <div className='profile__info'>
            <p><span>Nome:</span> Escola</p>
            <p><span>Telefone:</span> (19)99999-9999</p>
            <p><span>Email:</span> escola@email.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
