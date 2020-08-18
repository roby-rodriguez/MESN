import Api from "../services/api";

export const getOrders = async () => {
  try {
    const response = await Api.get('/orders');
    return response;
  } catch (error) {
    return error;
  }
};

export const createOrder = async (request) => {
  try {
    const response = await Api.post('/orders', request);
    return response;
  } catch (error) {
    return error;
  }
}
