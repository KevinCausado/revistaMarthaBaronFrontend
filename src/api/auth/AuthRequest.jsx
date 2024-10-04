import axios from 'axios';
import React from 'react';

class AuthRequest {

 static async login(user) {
  try {
    const API = 'http://localhost:4000/api/v1/auth/login';
    const response = await axios.post(API, user);
    return response?.data;
  } catch (error) {
    console.log('Error en login Request:', error.response?.data || error.message);
    throw error;
  }
};

}

export default AuthRequest ;
