import axios from "axios";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  baseURL: "http://localhost:3000/",
  //headers: { Authorization: localStorage.getItem("token") },
});

// implement a method to execute all the request from here.
const apiRequest = async (method, url, request) => {
  try {
    const headers = { Authorization: localStorage.getItem('token') };
    const response = await axiosAPI({ method, url, headers, data: request });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// function to execute the http get request
const get = (url) => apiRequest("get", url);

// function to execute the http post request
const post = (url, request) => apiRequest("post", url, request);

// function to execute the http put request
const put = (url, request) => apiRequest("put", url, request);

// function to execute the http delete request
const deleteRequest = (url, request) => apiRequest("delete", url, request);

// expose your method to other services or actions
const API = {
  get,
  delete: deleteRequest,
  post,
  put,
};
export default API;
