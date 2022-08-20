import React from "react";
import Gallery from "../gallery/Gallery";
import styles from "../gallery/Gallery.module.css";

const ArtisticoVivir = () => {
  return (
    <Gallery
      imagesCount={4}
      title="Artístico"
      subtitle="¿VIVIR?"
      subtitleLink="https://drive.google.com/file/d/1spP-kyu776nkIkoRta-I1er6tgcRax5m/view"
      previousPageLink="/surrealista"
      previousPageText={<h3>Surrealista</h3>}
      nextPageLink="/artistico-por-que"
      nextPageText={
        <h3>
          Artístico{" "}
          <span
            className={
              styles["previous-and-next-page-button-container-br-span-2"]
            }
          ></span>
          ¿POR QUÉ?
        </h3>
      }
    />
  );
};

export default ArtisticoVivir;
