import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './MyItems.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MyItems = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    const url = 'http://localhost:4000/get-items'
    axios.get(url)
      .then((res) => {
        console.log(res);
        if (res.data.items) {
          setItems(res.data.items);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Server error.')
      })
  }, [])

  const handleItem = (id) => {
    navigate('/item/' + id)
  }

  return (
    <div className='my__items__container'>
      <Sidebar />
      <section className="content">
        <div className='my__items__header'>
          Meus achados.
        </div>
        <div className='card__items'>
          {items && items.length > 0 &&
            items.map((item) => {
              return (
                <div key={item._id} onClick={() => handleItem(item._id)} className='card'>
                  <img width='300px' height='200px' src={'http://localhost:4000/' + item.iimage} alt={item.iname} />
                  <p className='m-2'> {item.iname} | {item.category} </p>
                  <p className='m-2 text-success'> {item.idesc} </p>
                </div>
              )
            })}
        </div>
      </section>
    </div>
  )
}

export default MyItems
