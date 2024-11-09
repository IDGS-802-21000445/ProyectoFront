import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSales } from '../Services/apiService';
import '@fortawesome/fontawesome-free/css/all.css';
import './Sales.css';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSale, setSelectedSale] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSales();
        setSales(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSales();
  }, []);

  const filteredSales = sales.filter((sale) =>
    sale.producto.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.ventaId.toString().includes(searchQuery)
  );

  const handleViewDetails = (ventaId) => {
    const sale = sales.find((sale) => sale.ventaId === ventaId);
    setSelectedSale(sale);
  };

  const handleCloseModal = () => {
    setSelectedSale(null);
  };

  const handleLogout = () => {
    navigate('/items');
  };

  return (
    <div className="sales">
      <h2>Compras Registradas</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por producto o ID de venta"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      <div className="sales-list">
        {filteredSales.map((sale) => (
          <div key={sale.ventaId} className="sale-card">
            <div className="sale-header">
              <h3>{sale.producto.titulo}</h3>
              <p>ID Venta: {sale.ventaId}</p>
            </div>
            <div className="sale-body">
              <p><strong>Cantidad:</strong> {sale.cantidad}</p>
              <p><strong>Fecha:</strong> {new Date(sale.fechaVenta).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${sale.producto.precio * sale.cantidad}</p>
            </div>
            <div className="sale-footer">
              <button className="view-button" onClick={() => handleViewDetails(sale.ventaId)}>
                <i className="fas fa-cart-plus"></i> Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="logout-button" onClick={handleLogout}>Salir</button>

      {selectedSale && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles de la Venta</h2>
              <button className="close-modal" onClick={handleCloseModal}>X</button>
            </div>
            <div className="modal-body">
              <p><strong>ID Venta:</strong> {selectedSale.ventaId}</p>
              <p><strong>Producto:</strong> {selectedSale.producto.titulo}</p>
              <p><strong>Cantidad:</strong> {selectedSale.cantidad}</p>
              <p><strong>Precio por unidad:</strong> ${selectedSale.producto.precio}</p>
              <p><strong>Total:</strong> ${selectedSale.producto.precio * selectedSale.cantidad}</p>
              <p><strong>Fecha de Venta:</strong> {new Date(selectedSale.fechaVenta).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
