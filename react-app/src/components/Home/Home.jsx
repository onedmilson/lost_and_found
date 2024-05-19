import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { FaSearch } from "react-icons/fa";
import './Home.css';
import axios from 'axios';
import { objNav } from '../../Data';

const Home = () => {
  const [icategory, setIcategory] = useState({ category: 'tudo' });
  const [active, setActive] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const url = 'http://localhost:4000/get-items';
      axios.get(url)
        .then((res) => {
          if (res.data.items) {
            setItems(res.data.items);
            setFilteredItems(res.data.items);
          }
        })
        .catch((err) => {
          console.error(err);
          alert('Server error.');
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = items;

    if (icategory.category !== 'tudo') {
      filtered = items.filter((item) => item.category.toLowerCase() === icategory.category.toLowerCase());
    }

    if (searchValue.trim() !== '') {
      filtered = filtered.filter((item) =>
        item.iname.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [items, icategory, searchValue]);

  const handleClick = (e, index) => {
    setIcategory({ category: e.target.textContent });
    setActive(index);
  };

  const handleButtonClick = (index) => {
    const updatedItems = [...filteredItems];
    updatedItems[index].showContactMessage = true;
    setFilteredItems(updatedItems);
  };

  return (
    <div className='home'>
      <Navbar />
      <section className='home__section__home'>
        <div className="search__container__home">
          <FaSearch className='input__icon__home' />
          <input
            className='text__input__home'
            type='search'
            placeholder='Encontre algo...'
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='obj__filters__home'>
          {objNav.map((item, index) => (
            <span
              onClick={(e) => handleClick(e, index)}
              className={`${active === index ? 'active__item__home' : ''} obj__item__filter__home`}
              key={index}
            >
              {item.name}
            </span>
          ))}
        </div>
        <div className='lost__container__home'>
          {filteredItems.length === 0 ? (
            <div className="no-items-message">Nenhum item encontrado!</div>
          ) : (
            <div className='item__obj__home'>
              {filteredItems.map((item, index) => (
                <div className='card__home' key={index}>
                  <img width='300px' height='200px' src={`http://localhost:4000/${item.iimage}`} alt={item.iname} />
                  <p className='m-2'>{item.iname} | <span className='span__categoria'>{item.category}</span></p>
                  <p className="item-desc">{item.idesc}</p>
                  {item.showContactMessage ? (
                    <div className="contact__message">
                      Entre em contato: (19)99999-9999 ou escola@email.com
                    </div>
                  ) : (
                    <div className="button__div__home">
                      <button className='button__home' onClick={() => handleButtonClick(index)}>Solicitar objeto</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
