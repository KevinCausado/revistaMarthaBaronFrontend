import React from "react";
import { Link } from "react-router-dom";
Link;
const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to={"/categorias"}>Categorias</Link>
      <div></div>
    </>
  );
};

export default Home;
