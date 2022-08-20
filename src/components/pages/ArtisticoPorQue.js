import React from "react";
import Gallery from "../gallery/Gallery";

const ArtisticoPorQue = () => {
  return (
    <Gallery
      imagesCount={6}
      title="Artístico"
      subtitle="¿POR QUÉ?"
      subtitleLink="https://drive.google.com/file/d/1cSLs53dGj69b4KeG5BuMwv1NCHQ0kzpP/view"
      previousPageLink="/artistico-vivir"
      previousPageText={<h3>Artístico ¿VIVIR?</h3>}
    />
  );
};

export default ArtisticoPorQue;
