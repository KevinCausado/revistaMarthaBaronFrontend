import React from "react";
import axios from "axios";

const API = "http://localhost:4000/api/v1/auth/signup";

const registerRequest = async (user) => {
  try {
    const response = await axios.post(API, user);
    console.log(response?.data);
  } catch (error) {
    console.error("Error al registrar el usuario", error.response?.data || error.message);
    throw error;
  }
};

export default registerRequest;
