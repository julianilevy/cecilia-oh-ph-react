import React from "react";
import Gallery from "../gallery/Gallery";

const Macro = () => {
  return (
    <Gallery
      imagesCount={5}
      title="Macro"
      previousPageLink="/filtro"
      previousPageText={<h3>Filtro</h3>}
      nextPageLink="/surrealista"
      nextPageText={<h3>Surrealista</h3>}
    />
  );
};

export default Macro;
