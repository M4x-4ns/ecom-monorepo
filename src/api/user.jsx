import axios from "axios";


export const createUserCart = async (token, cart) => {
  return axios.post("https://ecomworkshop-api.vercel.app/api/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  return axios.get("https://ecomworkshop-api.vercel.app/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress  = async (token,address) => {
  return axios.post("https://ecomworkshop-api.vercel.app/api/user/address",{address}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveOrder = async (token, payload) => {
  // code body
  return axios.post("https://ecomworkshop-api.vercel.app/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token) => {
  // code body
  return axios.get("https://ecomworkshop-api.vercel.app/api/user/order",  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};