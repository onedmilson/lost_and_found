import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditItem = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [iname, setIname] = useState('');
  const [idesc, setIdesc] = useState('');
  const [category, setCategory] = useState('');
  const [iimage, setIimage] = useState('');

  useEffect(() => {

    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/get-item/${itemId}`);
        const item = response.data.item;
        setIname(item.iname);
        setIdesc(item.idesc);
        setCategory(item.category);

      } catch (error) {
        console.error('Error fetching item details:', error);
        alert('Error fetching item details. Please try again later.');
      }
    };
    fetchItemDetails();
  }, [itemId]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('iname', iname);
    formData.append('idesc', idesc);
    formData.append('category', category);
    formData.append('iimage', iimage);

    const url = `http://localhost:4000/update-item/${itemId}`;
    axios.put(url, formData)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate(`/item/${itemId}`);
        }
      })
      .catch((err) => {
        console.error('Error updating item:', err);
        alert('Error updating item. Please try again later.');
      });
  };

  return (
    <div className='edit__item__container'>
      <Sidebar />
      <section className="content">
        <div className='edit__item__header enfase'>
          Editar Item
        </div>
        <div className='form'>
          <div className="item__name">
            <label className="form__label">Nome do Item</label>
            <input
              type="text"
              className="form__control"
              value={iname}
              onChange={(e) => setIname(e.target.value)}
            />
          </div>
          <div className="desc">
            <label className="form__label">Descrição</label>
            <textarea
              className="form__control"
              rows="3"
              value={idesc}
              onChange={(e) => setIdesc(e.target.value)}
            ></textarea>
          </div>
          <div className="item__category">
            <label className="form__label">Categoria</label>
            <select
              className="form__control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
            <label className="form__label">Imagem do Item</label>
            <input
              className="form__control__image"
              type='file'
              onChange={(e) => setIimage(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="btn"
            onClick={handleUpdate}
          >Update</button>
        </div>
      </section>
    </div>
  );
};

export default EditItem;
