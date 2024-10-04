import axios from 'axios';
import React from 'react';

class PaisRequest {

 async create() {
  try {
    const API = 'http://localhost:4000/api/v1/pais';
    const response = await axios.post(API, user);
    return response?.data;
  } catch (error) {
    console.log('Error en login Request:', error.response?.data || error.message);
    throw error;
  }
};

async getAll() {
  try {
    const API = 'http://localhost:4000/api/v1/pais';
    const response = await axios.get(API);
    return response?.data;
  } catch (error) {
    console.log('Error en login Request:', error.response?.data || error.message);
    throw error;
  }
};

}

export default PaisRequest ;
