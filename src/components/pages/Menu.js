import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import ImageProductos from "../../img/portfolio/productos.jpg";
import ImageRetratos from "../../img/portfolio/retratos.jpg";
import ImageFiltro from "../../img/portfolio/filtro.jpg";
import ImageMacro from "../../img/portfolio/macro.jpg";
import ImageSurrealista from "../../img/portfolio/surrealista.jpg";
import ImageArtisticoVivir from "../../img/portfolio/artistico-vivir.jpg";
import ImageArtisticoPorQue from "../../img/portfolio/artistico-por-que.jpg";

const Menu = () => {
  return (
    <main className={[styles["main-grid"], "can-fade"].join(" ")}>
      <Link className={styles.card} to="/productos">
        <img src={ImageProductos} alt="Productos" />
        <h3>Productos</h3>
      </Link>
      <Link className={styles.card} to="/retratos">
        <img src={ImageRetratos} alt="Retratos" />
        <h3>Retratos</h3>
      </Link>
      <Link className={styles.card} to="/filtro">
        <img src={ImageFiltro} alt="Filtro" />
        <h3>Filtro</h3>
      </Link>
      <Link className={styles.card} to="/macro">
        <img src={ImageMacro} alt="Macro" />
        <h3>Macro</h3>
      </Link>
      <Link className={styles.card} to="/surrealista">
        <img src={ImageSurrealista} alt="Surrealista" />
        <h3>Surrealista</h3>
      </Link>
      <Link className={styles.card} to="/artistico-vivir">
        <img src={ImageArtisticoVivir} alt="Artístico ¿VIVIR?" />
        <h3>Artístico ¿VIVIR?</h3>
      </Link>
      <Link className={styles.card} to="/artistico-por-que">
        <img src={ImageArtisticoPorQue} alt="Artístico ¿POR QUÉ?" />
        <h3>Artístico ¿POR QUÉ?</h3>
      </Link>
    </main>
  );
};

export default Menu;
