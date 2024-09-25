import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/usuarios/Register";
import Login from "../pages/usuarios/Login";
import Categorias from "../pages/categorias/Categorias";

const Router = () => {
  return (
    <>
      {
        <Routes>
          <Route path="/register-user" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categorias" element={<Categorias />}></Route>

          <Route path="*" element={<h1>Página no encontrada</h1>}></Route>
        </Routes>
      }
    </>
  );
};

export default Router;
