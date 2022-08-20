import React, { useState, useEffect, useCallback } from "react";
import "./ZoomedImagesManager.css";
import ImageCross from "../../img/utils/cross.svg";
import ImageChevronLeft from "../../img/utils/chevron-left.svg";
import ImageChevronRight from "../../img/utils/chevron-right.svg";

const body = document.querySelector("body");
const isMobileDevice = window.matchMedia("(pointer:coarse)").matches;

let isImageBeingGrabbed = false;
let xPosAtImageGrab = 0;

const removeZoom = (setIsImageZoomed) => {
  body.style.overflow = "initial";
  setIsImageZoomed(false);
};

const DesktopElements = ({ moveToNextImage }) => {
  return (
    <div className={"zoomed-image-desktop-control-container"}>
      <div
        className={"zoomed-image-desktop-right-control"}
        onMouseUp={() => moveToNextImage("right")}
      >
        <img src={ImageChevronRight} alt="Right Caret"></img>
      </div>
      <div
        className={"zoomed-image-desktop-left-control"}
        onMouseUp={() => moveToNextImage("left")}
      >
        <img src={ImageChevronLeft} alt="Left Caret"></img>
      </div>
    </div>
  );
};

const ZoomedImage = ({ src, alt, id, onTouchStart, onImageMouseDown }) => {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      id={id}
      className={"zoomed-image"}
      onTouchStart={isMobileDevice ? (e) => onTouchStart(e) : undefined}
      onMouseDown={isMobileDevice ? undefined : (e) => onImageMouseDown(e)}
    />
  );
};

const ZoomedImagesManager = ({ imgArray, img, i, setIsImageZoomed }) => {
  const [isMainDivFadedOut, setIsMainDivFadedOut] = useState(true);
  const [zoomedImage1Data, setZoomedImage1Data] = useState({
    id: "zoomedImage1",
    isEnabled: true,
    willRender: false,
    justRendered: false,
    lastDirection: "",
    i: i,
    src: img.src,
    alt: img.alt,
  });
  const [zoomedImage2Data, setZoomedImage2Data] = useState({
    id: "zoomedImage2",
    isEnabled: false,
    willRender: false,
    justRendered: false,
    lastDirection: "",
    i: 0,
    src: "",
    alt: "",
  });

  const getCurrentZoomedImageData = () => {
    return zoomedImage1Data.isEnabled ? zoomedImage1Data : zoomedImage2Data;
  };

  const moveToNextImage = (direction) => {
    const currentZoomedImageData = getCurrentZoomedImageData();
    let currImage = document.querySelector(`#${currentZoomedImageData.id}`);
    const currImageRect = currImage.getBoundingClientRect();
    currImage.style.position = "fixed";
    currImage.style.height = currImageRect.height + "px";
    currImage.style.width = currImageRect.width + "px";
    currImage.style.top = currImageRect.top + "px";
    currImage.style.left = currImageRect.left + "px";
    currImage.classList.remove(
      "zoomed-image-is-centered-from-right",
      "zoomed-image-is-centered-from-left"
    );
    body.appendChild(currImage);
    setTimeout(() => {
      const imageToRemove = currImage;
      imageToRemove.style.opacity = 0;
      imageToRemove.style.pointerEvents = "none";
      isMobileDevice
        ? (imageToRemove.onTouchStart = {})
        : (imageToRemove.onMouseDown = {});
      imageToRemove.addEventListener(
        "transitionend",
        () => {
          document
            .querySelector("#zoomedImageContainer")
            .appendChild(currImage);
          if (currentZoomedImageData.id === "zoomedImage1") {
            setZoomedImage1Data({
              ...zoomedImage1Data,
              isEnabled: false,
              willRender: false,
              justRendered: false,
              lastDirection: direction,
            });
          } else {
            setZoomedImage2Data({
              ...zoomedImage2Data,
              isEnabled: false,
              willRender: false,
              justRendered: false,
              lastDirection: direction,
            });
          }
        },
        10
      );
      if (currentZoomedImageData.id === "zoomedImage1") {
        setZoomedImage2Data({
          ...zoomedImage2Data,
          isEnabled: false,
          willRender: true,
          justRendered: false,
          lastDirection: direction,
        });
      } else {
        setZoomedImage1Data({
          ...zoomedImage1Data,
          isEnabled: false,
          willRender: true,
          justRendered: false,
          lastDirection: direction,
        });
      }
    }, 10);
  };

  const onZoomedImageRendered = useCallback(
    (zoomedImageData, setZoomedImageData) => {
      const onZoomedImageJustRendered = (direction) => {
        let newCurrImage = document.querySelector(`#${zoomedImageData.id}`);
        if (newCurrImage === null) return;
        newCurrImage.classList.add(
          `zoomed-image-will-move-from-${direction}`,
          `zoomed-image-is-${direction}`
        );
        setTimeout(() => {
          newCurrImage.classList.remove(`zoomed-image-is-${direction}`);
          newCurrImage.classList.add(
            `zoomed-image-is-centered-from-${direction}`
          );
          isImageBeingGrabbed = false;
        }, 10);
        setZoomedImageData({
          ...zoomedImageData,
          justRendered: false,
        });
      };
      if (zoomedImageData.lastDirection === "right") {
        if (zoomedImageData.willRender) {
          let nextImageIndexInArray = zoomedImageData.i + 1;
          if (nextImageIndexInArray >= imgArray.length)
            nextImageIndexInArray = 0;
          const nextImageInArray = imgArray[nextImageIndexInArray];
          setZoomedImageData({
            ...zoomedImageData,
            isEnabled: true,
            willRender: false,
            justRendered: true,
            i: nextImageIndexInArray,
            src: nextImageInArray.src,
            alt: nextImageInArray.alt,
          });
        } else if (zoomedImageData.justRendered)
          onZoomedImageJustRendered(zoomedImageData.lastDirection);
      } else if (zoomedImageData.lastDirection === "left") {
        if (zoomedImageData.willRender) {
          let nextImageIndexInArray = zoomedImageData.i - 1;
          if (nextImageIndexInArray < 0)
            nextImageIndexInArray = imgArray.length - 1;
          const nextImageInArray = imgArray[nextImageIndexInArray];
          setZoomedImageData({
            ...zoomedImageData,
            isEnabled: true,
            willRender: false,
            justRendered: true,
            i: nextImageIndexInArray,
            src: nextImageInArray.src,
            alt: nextImageInArray.alt,
          });
        } else if (zoomedImageData.justRendered)
          onZoomedImageJustRendered(zoomedImageData.lastDirection);
      }
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    onZoomedImageRendered(zoomedImage1Data, setZoomedImage1Data);
  }, [onZoomedImageRendered, zoomedImage1Data]);

  useEffect(() => {
    onZoomedImageRendered(zoomedImage2Data, setZoomedImage2Data);
  }, [onZoomedImageRendered, zoomedImage2Data]);

  function onTouchStart(e) {
    isImageBeingGrabbed = true;
    xPosAtImageGrab = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    if (isImageBeingGrabbed) {
      if (e.target.id === getCurrentZoomedImageData().id) {
        if (xPosAtImageGrab - 70 > e.changedTouches[0].clientX) {
          moveToNextImage("right");
        } else if (xPosAtImageGrab + 70 < e.changedTouches[0].clientX) {
          moveToNextImage("left");
        }
      } else {
        isImageBeingGrabbed = false;
      }
    }
  }

  function onImageMouseDown(e) {
    isImageBeingGrabbed = true;
    xPosAtImageGrab = e.clientX;
  }

  function onMouseUp(e) {
    if (isImageBeingGrabbed) {
      if (e.target.id === getCurrentZoomedImageData().id) {
        if (xPosAtImageGrab - 70 > e.clientX) {
          moveToNextImage("right");
        } else if (xPosAtImageGrab + 70 < e.clientX) {
          moveToNextImage("left");
        }
      } else {
        isImageBeingGrabbed = false;
      }
    }
  }

  useEffect(() => {
    const onEscapeKeyUp = (e) => {
      e.key === "Escape" && removeZoom(setIsImageZoomed);
    };

    document.addEventListener("keyup", onEscapeKeyUp);
    isMobileDevice
      ? document.addEventListener("touchend", onTouchEnd)
      : document.addEventListener("mouseup", onMouseUp);

    body.style.overflow = "hidden";
    document
      .querySelector("#zoomedImage1")
      .classList.add(
        "zoomed-image-will-move-from-right",
        "zoomed-image-is-right"
      );
    setIsMainDivFadedOut(false);

    setTimeout(() => {
      document
        .querySelector("#zoomedImage1")
        .classList.remove("zoomed-image-is-right");
    }, 10);

    return () => {
      document.removeEventListener("keyup", onEscapeKeyUp);
      isMobileDevice
        ? document.removeEventListener("touchend", onTouchEnd)
        : document.removeEventListener("mouseup", onMouseUp);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className={`can-fade ${isMainDivFadedOut ? "faded-out" : "faded-in"}`}>
      <div className={"zoomed-image-background"}>
        <div className={"zoomed-image-header"}>
          <img
            src={ImageCross}
            alt="Close Button"
            onClick={() => removeZoom(setIsImageZoomed)}
          />
        </div>
        <div id="zoomedImageContainer" className={"zoomed-image-container"}>
          {!isMobileDevice && (
            <DesktopElements moveToNextImage={moveToNextImage} />
          )}
          {zoomedImage1Data.isEnabled && (
            <ZoomedImage
              src={zoomedImage1Data.src}
              alt={zoomedImage1Data.alt}
              id={zoomedImage1Data.id}
              onTouchStart={onTouchStart}
              onImageMouseDown={onImageMouseDown}
            />
          )}
          {zoomedImage2Data.isEnabled && (
            <ZoomedImage
              src={zoomedImage2Data.src}
              alt={zoomedImage2Data.alt}
              id={zoomedImage2Data.id}
              onTouchStart={onTouchStart}
              onImageMouseDown={onImageMouseDown}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoomedImagesManager;
