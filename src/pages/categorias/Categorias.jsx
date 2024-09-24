import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { UseAuth } from "../../context/AuthContext";

const Categorias = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const {isAuthenticaded,user} = UseAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // const token = user?.token;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTcyNzEwNDY5MSwiZXhwIjoxNzM0ODgwNjkxfQ.RurN8LGcD4T-24T5XIkbUcATX9rcagtD3hblFdu9ln4';
        console.log('token:',token)
        const response = await axios.get("http://localhost:4000/api/v1/categoria/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        if (error.response) {
          console.error("Status del servidor:", error.response.status);
          console.error("Mensaje del servidor:", error.response.data);
          console.error("Headers:", error.response.headers);
        }

        if (error.request) {
          console.error("Servidor no manda respuesta:", error.request);
        } else {
          console.log("Otro error", error.message);
        }

        if (error.response && error.response.status === 401) {
          setError(new Error("Por favor, inicie sesión"));
        } else {
          setError(new Error("Error al mostrar los registros"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>Categorias</div>
      {isLoading ? (
        <p>....cargando</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <ul>
          {data?.map((categoria) => (
            <li key={categoria.id}>{categoria.nombre}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Categorias;
