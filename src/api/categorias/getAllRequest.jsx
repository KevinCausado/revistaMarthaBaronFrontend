import axios from "axios";
import React, { useState } from "react";

const getAllRequest = async (token) => {
  try {
    // console.log("token:", token);
    const response = await axios.get("http://localhost:4000/api/v1/categoria/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response?.data.data);
    return response?.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Status del servidor:", error.response.status);
      console.error("Mensaje del servidor:", error.response.data);
      console.error("Headers:", error.response.headers);
    }

    if (error.request) {
      console.error("Respuesta error:", error.request);
    } else {
      console.log("Otro error", error.message);
    }
  }
};

export default getAllRequest;
