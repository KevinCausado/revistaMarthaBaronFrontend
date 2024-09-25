import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isRegistered, serverError } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [{ isRegistered }]);

  return (
    <>
      <div>RegisterUser</div>

      <form
        onSubmit={handleSubmit((values) => {
          signup(values);
        })}
      >
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

      {/* Errores validacion campos */}
      {errors.usuario && <p>Nombre de usuario es requerido</p>}
      {errors.contrasena && <p>Contraseña requerido</p>}
      {errors.confirmarContrasena && <p>Confirmar contraseña requerido</p>}
    </>
  );
};

export default Register;
