import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './AddItems.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddItems = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const [iname, setIname] = useState('');
  const [idesc, setIdesc] = useState('');
  const [category, setCategory] = useState('');
  const [iimage, setIimage] = useState('');

  const handleApi = () => {

    const formData = new FormData();
    formData.append('iname', iname)
    formData.append('idesc', idesc)
    formData.append('category', category)
    formData.append('iimage', iimage)
    formData.append('userId', localStorage.getItem('userId'))

    const url = 'http://localhost:4000/add-items';
    axios.post(url, formData)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate('/my-items')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }



  return (
    <div className='add__items__container'>
      <Sidebar />
      <section className="content">
        <div className='add__items__header my__items__header'>
          Adicionar itens.
        </div>
        <div className='form'>
          <div className="item__name">
            <label className="form__label">Nome do item</label>
            <input
              type="text"
              className="form__control"
              placeholder="Digite o nome do item"
              value={iname}
              onChange={(e) => {
                setIname(e.target.value)
              }}
            />
          </div>
          <div className="desc">
            <label className="form__label">Descrição</label>
            <textarea
              className="form__control"
              rows="3"
              placeholder="Digite a descrição do item"
              value={idesc}
              onChange={(e) => {
                setIdesc(e.target.value)
              }}
            ></textarea>
          </div>
          <div className="item__category">
            <label className="form__label">Categoria</label>
            <select
              className="form__control"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            >
              <option value="">Selecione</option>
              <option value="Eletrônico">Eletrônico</option>
              <option value="Acessório">Acessório</option>
              <option value="Papelaria">Papelaria</option>
              <option value="Vestuário">Vestuário</option>
              <option value="Esportivo">Esportivo</option>
              <option value="Documento">Documento</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="item__image">
            <label className="form__label">Imagem do item</label>
            <input
              className="form__control__image"
              type='file'
              onChange={(e) => {
                setIimage(e.target.files[0])
              }}
            />
          </div>
          <button
            type="submit"
            className="btn"
            onClick={handleApi}
          >Enviar</button>
        </div>
      </section>
    </div>
  )
}

export default AddItems