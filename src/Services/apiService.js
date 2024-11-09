import axios from 'axios';

const API_URL_BAZAR = 'https://examen20241108174743.azurewebsites.net/api/Bazar';

export const getItems = async (query = '') => {
  const response = await axios.get(`${API_URL_BAZAR}/items?q=${query}`);
  return response.data;
};

export const getItemById = async (id) => {
  const response = await axios.get(`${API_URL_BAZAR}/items/${id}`);
  return response.data;
};

export const addSale = async (saleRequest) => {
  try {
    const response = await axios.post(`${API_URL_BAZAR}/addSale`, saleRequest);
    
    if (response.data.success) {
      return { success: true, message: "Venta realizada exitosamente" };
    } else {
      return { success: false, message: response.data.message || "Error al agregar la venta" };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Error al agregar la venta' };
  }
};

export const getSales = async () => {
  const response = await axios.get(`${API_URL_BAZAR}/sales`);
  return response.data;
};

export const getProductImages = async (id) => {
  const response = await axios.get(`${API_URL_BAZAR}/items/${id}/images`);
  return response.data;
};
