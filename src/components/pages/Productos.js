import React from "react";
import Gallery from "../gallery/Gallery";

const Productos = () => {
  return (
    <Gallery
      imagesCount={11}
      title="Productos"
      nextPageLink="/retratos"
      nextPageText={<h3>Retratos</h3>}
    />
  );
};

export default Productos;
