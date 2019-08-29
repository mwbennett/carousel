import React, { useState, useEffect } from 'react';
import { Flex, Box } from 'reflexbox'; 
import cxs from 'cxs';

import SelectedImage from './SelectedImage.js';

const prevNextStyles = cxs({
  cursor: 'pointer',
  width: '100%',
})

/**
 * Image carouse that handles displaying a list of images and requesting more images when needed.
 * @param  {Object[]} images  List of serialized images.
 * @param  {func} loadNewImages Callback for requesting more images.
 * @param  {func} onNewImageSelected Callback for informing the consumer when a new image is selected.
 */
const Carousel = ({ images, loadNewImages, onNewImageSelected }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const prevImage = selectedImageIndex === 0 ? null : images[selectedImageIndex - 1];
  const selectedImage = images[selectedImageIndex];
  const selectedImageId = selectedImage ? selectedImage.id : null;
  const nextImage = selectedImageIndex < images.length - 1 ? images[selectedImageIndex + 1] : null;

  // If necessary, request new images whenever our selectedImage index changes.
  useEffect(() => {
    if (images.length < selectedImageIndex + 2) {
      loadNewImages();
    }

  }, [selectedImageIndex, loadNewImages, images.length]);

  // Communicate to the consumer that we have a new image selected.
  useEffect(() => {
    onNewImageSelected(selectedImageId);
  }, [onNewImageSelected, selectedImageId])

  const onClickPrev = () => {
    setSelectedImageIndex((selectedImageIndex) => selectedImageIndex - 1);
  }
  
  const onClickNext = () => {
    setSelectedImageIndex((selectedImageIndex) => selectedImageIndex + 1);
  }

  return (
    <div>
      <Flex w={1} align='center' justify='space-between'>
        <Box w={1/4} px={2} className={prevNextStyles}>
          {prevImage && (
            <img style={{maxWidth: '100%'}} src={prevImage.urls.small} alt={prevImage.name} onClick={onClickPrev} />
          )}
        </Box>
        <Box w={1/2} px={2}>
          <SelectedImage image={selectedImage} />
        </Box>
        <Box w={1/4} px={2} className={prevNextStyles}>
          {nextImage && (
            <img style={{maxWidth: '100%'}} src={nextImage.urls.small} alt={nextImage.name} onClick={onClickNext} />
          )}
        </Box>
      </Flex>
      
    </div>
  )
}

export default Carousel;