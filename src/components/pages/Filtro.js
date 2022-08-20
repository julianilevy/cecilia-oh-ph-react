import React from "react";
import Gallery from "../gallery/Gallery";

const Filtro = () => {
  return (
    <Gallery
      imagesCount={4}
      title="Filtro"
      previousPageLink="/retratos"
      previousPageText={<h3>Retratos</h3>}
      nextPageLink="/macro"
      nextPageText={<h3>Macro</h3>}
    />
  );
};

export default Filtro;
