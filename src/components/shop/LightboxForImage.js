import React, { useState } from 'react'
import Lightbox from 'react-image-lightbox' //lightbox
import 'react-image-lightbox/style.css' //lightbox

export default function LightboxForImage({
  lightBoxImgArray,
  handleOpenLightbox,
}) {
  const [photoIndex, setPhotoIndex] = useState(0) //lightbox

  return (
    <Lightbox
      mainSrc={lightBoxImgArray[photoIndex]}
      nextSrc={lightBoxImgArray[(photoIndex + 1) % lightBoxImgArray.length]}
      prevSrc={
        lightBoxImgArray[
          (photoIndex + lightBoxImgArray.length - 1) % lightBoxImgArray.length
        ]
      }
      onCloseRequest={() => handleOpenLightbox(false)}
      onMovePrevRequest={() =>
        setPhotoIndex(
          (photoIndex + lightBoxImgArray.length - 1) % lightBoxImgArray.length
        )
      }
      onMoveNextRequest={() =>
        setPhotoIndex((photoIndex + 1) % lightBoxImgArray.length)
      }
    />
  )
}
