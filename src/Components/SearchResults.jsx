import { useEffect, useState } from 'react';
import { getItems } from '../Services/apiService';
import { Link, useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const query = new URLSearchParams(useLocation().search).get('search');

  const fetchItems = async (searchQuery = '') => {
    try {
      const data = await getItems(searchQuery);
      setItems(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchItems(query || '');
  }, [query]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      fetchItems();
    } else {
      fetchItems(term);
    }
  };

  return (
    <div className="search-results">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={() => fetchItems(searchTerm)}>
          <i className="fas fa-search"></i>
        </button>
      </div>

      <label className="result-count">
        Resultados encontrados: {items.length}
      </label>

      <div className="product-list">
        {items.map((item) => (
          <div key={item.productoId} className="product-card">
            <Link to={`/item/${item.productoId}`} className="product-link">
              <div className="product-card-content">
                <div className="product-image">
                  <img src={item.fondo} alt={item.titulo} />
                </div>
                <div className="product-details">
                  <div className="product-header">
                    <h3>{item.titulo}</h3>
                    <span className="category">{item.categoria}</span>
                  </div>
                  <p className="description">{item.desProducto}</p>
                  <p className="price">${Number(item.precio || 0).toFixed(2)}</p>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
