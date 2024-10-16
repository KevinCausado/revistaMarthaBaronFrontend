import axios from 'axios';
import React from 'react';

class PaisRequest {
  static async create() {
    try {
      const API = 'http://localhost:4000/api/v1/pais';
      const response = await axios.post(API, user);
      return response?.data;
    } catch (error) {
      console.log('Error en login Request:', error.response?.data || error.message);
      throw error;
    }
  }

  static async getAll(token) {
    try {      
      const API = 'http://localhost:4000/api/v1/pais';
      const response = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response?.data;
    } catch (error) {
      console.log('Error en login Request:', error.response?.data || error.message);
      // throw error;
    }
  }
}

export default PaisRequest;
