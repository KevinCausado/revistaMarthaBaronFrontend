import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { UseAuth } from "../../context/AuthContext";
import getAllRequest from "../../api/categorias/getAllRequest";

const Categorias = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(false);
  const { user } = UseAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // console.log('Probando Token:',user.token)
        const response = await getAllRequest(user.token);
        setData(response);
      } catch (error) {
        // console.log("Error en categoria:", error);

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
