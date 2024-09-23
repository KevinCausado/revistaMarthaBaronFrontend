import {React,useEffect} from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const {login,isAuthenticated} = UseAuth();
  const navigate = useNavigate()


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [{isAuthenticated}])
  

  return (
    <>
      <div>Login</div>
      <form onSubmit={handleSubmit((values)=>{login(values)})}>
        <input type="text" {...register('usuario',{required:true})} placeholder="Usuario" />
        <input type="password" {...register('contrasena',{required:true})} placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
};

export default Login;
