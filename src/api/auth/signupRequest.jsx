import axios from 'axios'
import React from 'react'


const signupRequest = async(user) => {
  try {
      const API= 'http://localhost:4000/api/v1/auth/signup' 
      const response = axios.post(API,user)
      console.log('Datos:',response?.data)
      return response 
  } catch (error) {
    console.log('Error:',error)
    throw error
  }
}

export default signupRequest