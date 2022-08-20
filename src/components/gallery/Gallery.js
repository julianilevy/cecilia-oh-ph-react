import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ZoomedImagesManager from "./ZoomedImagesManager";
import styles from "./Gallery.module.css";
import ImageChevronLeft from "../../img/utils/chevron-left.svg";
import ImageChevronRight from "../../img/utils/chevron-right.svg";

const loadImages = (pathname, imagesCount) => {
  const images = [];
  const pageName = pathname.substring(1);
  for (let i = 0; i < imagesCount; i++) {
    const imgName = `foto (${i + 1})`;
    const imgPath = `${process.env.PUBLIC_URL}/img/pages/${pageName}/${imgName}.jpg`;
    images[i] = { src: imgPath, alt: imgName };
  }

  return images;
};

const Gallery = ({
  imagesCount,
  title,
  subtitle,
  subtitleLink,
  previousPageLink,
  previousPageText,
  nextPageLink,
  nextPageText,
}) => {
  const { pathname } = useLocation();
  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages(loadImages(pathname, imagesCount));
  }, [pathname, imagesCount]);

  const [currentZoomedImage, setCurrentZoomedImage] = useState({
    img: null,
    i: 0,
  });
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const zoomImage = (img, i) => {
    setCurrentZoomedImage({ img, i });
    setIsImageZoomed(true);
  };

  return (
    <main className="can-fade">
      <h2 className={styles["page-title"]}>{title}</h2>
      {subtitle && (
        <div className={styles["page-optional-link-subtitle"]}>
          <a href={subtitleLink} target="_blank" rel="noreferrer">
            {subtitle}
          </a>
        </div>
      )}
      <div className={styles["masonry-gallery"]}>
        {images.map((e, i) => (
          <img
            key={i}
            src={e.src}
            alt={e.alt}
            onClick={(e) => zoomImage(e.target, i)}
          />
        ))}
      </div>
      <div className={styles["previous-and-next-page-button-container"]}>
        {previousPageLink ? (
          <div className={styles["previous-page-button-container"]}>
            <Link to={previousPageLink}>
              <img src={ImageChevronLeft} alt="Chevron Left" />
              {previousPageText}
            </Link>
          </div>
        ) : (
          <div />
        )}
        {nextPageLink ? (
          <div className={styles["next-page-button-container"]}>
            <Link to={nextPageLink}>
              {nextPageText}
              <img src={ImageChevronRight} alt="Chevron Right" />
            </Link>
          </div>
        ) : (
          <div />
        )}
      </div>
      {isImageZoomed && (
        <ZoomedImagesManager
          imgArray={images}
          img={currentZoomedImage.img}
          i={currentZoomedImage.i}
          setIsImageZoomed={setIsImageZoomed}
        />
      )}
    </main>
  );
};

export default Gallery;
