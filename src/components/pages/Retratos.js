import React from "react";
import Gallery from "../gallery/Gallery";

const Retratos = () => {
  return (
    <Gallery
      imagesCount={16}
      title="Retratos"
      previousPageLink="/productos"
      previousPageText={<h3>Productos</h3>}
      nextPageLink="/filtro"
      nextPageText={<h3>Filtro</h3>}
    />
  );
};

export default Retratos;
