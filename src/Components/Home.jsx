import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/items?search=${query}`);
  };

  const handleViewSales = () => {
    navigate('/sales');
  };

  return (
    <div className="home">
      <div className="logo">
        <i className="fas fa-shopping-bag"></i>
      </div>
      
      <h1>Bazar Online</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className="view-sales-container">
        <button className="view-sales-button" onClick={handleViewSales}>
          Ver Ventas
        </button>
      </div>
    </div>
  );
};

export default Home;
