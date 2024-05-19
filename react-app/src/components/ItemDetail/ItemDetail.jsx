import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ItemDetail.css';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:4000/get-item/${itemId}`;
    axios.get(url)
      .then((res) => {
        if (res.data.item) {
          setItem(res.data.item);
        }
      })
      .catch(() => {
        alert('Server error.');
      });
  }, [itemId]);

  const handleDelete = () => {
    const url = `http://localhost:4000/delete-item/${itemId}`;
    axios.delete(url)
      .then(() => {
        alert('Item deletado com sucesso!');
        navigate('/my-items');
      })
      .catch(() => {
        alert('Server error.');
      });
  };

  const handleEdit = () => {
    navigate(`/edit-item/${itemId}`);
  };

  return (
    <div className="item-detail-container">
      <Sidebar />
      <div className="content">
        {item && (
          <div className="item-detail">
            <div className="image-container">
              <img
                className="item-image"
                src={`http://localhost:4000/${item.iimage}`}
                alt={item.iname}
              />
            </div>
            <div className="item-info">
              <div className="item-header">
                <p>{item.iname} | {item.category}</p>
                <div className="icon-container">
                  <FaTrash onClick={handleDelete} className="icon" />
                  <FaEdit onClick={handleEdit} className="icon" />
                </div>
              </div>
              <div className="item-description">
                <p>{item.idesc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
