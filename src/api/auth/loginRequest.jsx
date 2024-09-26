import axios from 'axios';
import React from 'react';

const loginRequest = async (user) => {
  try {
    const API = 'http://localhost:4000/api/v1/auth/login';
    const response = await axios.post(API, user);
    // console.log('Datos completos:', response); // Muestra toda la respuesta para ver su estructura.
    // console.log('Datos devueltos:', response?.data); // Verifica si los datos están en response.data    
    return response?.data;
  } catch (error) {
    console.log('Error en login Request:', error.response?.data || error.message);
    throw error;
  }
};

export default loginRequest;
