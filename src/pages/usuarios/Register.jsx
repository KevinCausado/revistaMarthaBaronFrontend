import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {UseAuth} from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const { signup, isRegistered } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
       navigate('/login')
    }  
    
  }, [{isRegistered}])
  

  return (
    <>
      <div>RegisterUser</div>

      <form onSubmit={handleSubmit((values) => {signup(values);})}>
        <input type="text" {...register("usuario", { required: true })} placeholder="usuario" />
        <input type="password" {...register("contrasena", { required: true })} placeholder="contraseña" />
        <input type="password" {...register("confirmarContrasena", { required: true })} placeholder="confirmar contraseña" />
        <label htmlFor="">Rol</label>
        <select {...register("rol")}>
          <option value="admin">admin</option>
          <option value="cliente">cliente</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;
