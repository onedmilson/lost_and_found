import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Account.css';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const url = 'http://localhost:4000/get-items';
    axios.get(url)
      .then((res) => {
        console.log(res);
        if (res.data.items) {
          setItems(res.data.items);
          setFilteredItems(res.data.items);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Server error.');
      });
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.iname.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.idesc.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchValue, items]);

  const handleItem = (id) => {
    navigate('/item/' + id);
  };

  return (
    <div className='account__container'>
      <Sidebar />
      <section className="content">
        <div className='content__header'>
          <div className='hi__user enfase'>Olá, Escola!</div>
          <div className='search'>
            <FaSearch className='input__icon' />
            <input
              className='text__input'
              type='search'
              placeholder='Encontre algo...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className='card__items'>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={item._id} onClick={() => handleItem(item._id)} className='card'>
                <img width='300px' height='200px' src={'http://localhost:4000/' + item.iimage} alt={item.iname} />
                <p className='m-2'> {item.iname} | {item.category} </p>
                <p className='m-2 text-success'> {item.idesc} </p>
              </div>
            ))
          ) : (
            items.length === 0 ? (
              <p>Sem itens</p>
            ) : (
              <p>Nenhum item encontrado</p>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Account;

