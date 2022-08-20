import React from "react";
import Gallery from "../gallery/Gallery";
import styles from "../gallery/Gallery.module.css";

const Surrealista = () => {
  return (
    <Gallery
      imagesCount={6}
      title="Surrealista"
      previousPageLink="/macro"
      previousPageText={<h3>Macro</h3>}
      nextPageLink="/artistico-vivir"
      nextPageText={
        <h3>
          Artístico{" "}
          <span
            className={
              styles["previous-and-next-page-button-container-br-span-1"]
            }
          ></span>
          ¿VIVIR?
        </h3>
      }
    />
  );
};

export default Surrealista;
