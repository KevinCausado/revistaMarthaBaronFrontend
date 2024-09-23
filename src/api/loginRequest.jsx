import React from "react";
import axios from "axios";

const API = "http://localhost:4000/api/v1/auth/login";

const loginRequest = async (user) => {
  try {
    const response = await axios.post(API, user);
    // console.log(response?.data);
    // console.log(response?.data.token);
    return response
  } catch (error) {
    console.error("Error al iniciar sesión", error.response?.data || error.message);
    throw error;
  }
};

export default loginRequest;
