import React from "react";
import axios from "axios";

const API = "http://localhost:4000/api/v1/auth/login";

const loginRequest = async (user) => {
  try {
    const response = await axios.post(API, user);
    console.log('Mensaje del servidor:',response?.data)    
    return response
  } catch (error) {
    console.error("Mensaje de error del servidor", error.response?.data || error.message);
    throw error;
  }
};

export default loginRequest;
