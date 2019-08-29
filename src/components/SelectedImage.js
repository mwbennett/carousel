import React from 'react';
import { Flex, Box } from 'reflexbox'; 

/**
 * Image display component that includes display of meta data / stats
 * @param  {Object} image   Serialized image
 */
const SelectedImage = ({ image }) => {
  return (
    <>
      {image ? (
        <div>
          <img style={{maxWidth: '100%'}} src={image.urls.regular} alt={image.name} />
          <Flex w={1}>
            <Box w={1/3} p={1}>{image.views ? <div>Views: {image.views}</div> : null}</Box>
            <Box w={1/3} p={1}>{image.likes ? <div>Likes: {image.likes}</div> : null}</Box>
            <Box w={1/3} p={1}>{image.downloads ? <div>Downloads: {image.downloads}</div> : null}</Box>
          </Flex>
        </div>
      ) : <div>Loading</div>}
    </>
  )
}

export default SelectedImage;