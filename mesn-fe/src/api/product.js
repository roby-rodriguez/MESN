import Api from '../services/api';

export const getProducts = async () => {
  try {
    const response = await Api.get("/products");
    return response;
  } catch (error) {
    return error;
  }
};

export const createProduct = async (request) => {
  try {
    const response = await Api.post("/products", request);
    return response;
  } catch(error) {
    return error;
  }
};

export const readProduct = async (id) => {
  try {
    const response = await Api.get(`/products/${id}`);
    return response;
  } catch  {
    return error;
  }
}

export const updateProduct = async (id, request) => {
  try {
    const response = await Api.put(`/products/${id}`, request);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await Api.delete(`/products/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}
