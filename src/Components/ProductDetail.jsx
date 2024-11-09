import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { getItemById, getItems, addSale, getProductImages } from '../Services/apiService';
import './ProductDetail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('search');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getItemById(id);
        setProduct(data);
        const imagesData = await getProductImages(id);
        setImages(imagesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems(query);
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchItems();
  }, [query]);

  const handlePurchase = async () => {
    if (!product) return;

    const saleRequest = {
      ventaId: 0,
      productoId: parseInt(id),
      cantidad: quantity,
      fechaVenta: new Date().toISOString(),
      precioVenta: product.precio * quantity
    };

    try {
      const result = await addSale(saleRequest);
      if (result.success) {
        alert('Compra registrada con éxito');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar la compra');
    }
  };

  const handleViewSales = () => {
    navigate('/sales');
  };

  const handleGoBack = () => {
    navigate('/items');
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="product-detail">
      <div className="go-back">
        <button className="go-back-button" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i> Regresar
        </button>
      </div>

      <h2>{product.titulo}</h2>
      <p>{product.desProducto}</p>
      <p>Precio: ${product.precio}</p>
      <p>Marca: {product.marca}</p>
      <p>Stock: {product.existencias}</p>
      <p>Categoría: {product.categoria}</p>
      <div className="images">
        {images.map((img) => (
          <img key={img.idImagen} src={img.imagenUrl} alt={product.titulo} />
        ))}
      </div>
      <label>
        Cantidad:
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1" 
          max={product.existencias} 
        />
      </label>
      <button onClick={handlePurchase}>Comprar</button>

      <div className="view-sales-container">
        <button className="view-sales-button" onClick={handleViewSales}>
          Ver Ventas
        </button>
      </div>

      <div className="product-list">
        {filteredItems.map((item) => (
          <div key={item.productoId} className="product-card">
            <Link to={`/item/${item.productoId}`} className="product-link">
              <div className="product-card-content">
                <div className="product-image">
                  <img src={item.fondo} alt={item.titulo} />
                </div>
                <div className="product-details">
                  <h3>{item.titulo}</h3>
                  <span className="category">{item.categoria}</span>
                  <p className="price">${Number(item.precio || 0).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
