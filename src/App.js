import React, { useState } from 'react';
import _ from 'lodash';

import UnsplashAPI from './api/Unsplash.js';
import Carousel from './components/Carousel.js';
import './App.css';


function App() {
  const unsplashAPI = UnsplashAPI();
  const [images, setImages] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  const fetchImages = async () => {
    const newImages = await unsplashAPI.fetchImages(nextPage);
    setImages((prevImages => prevImages.concat(newImages)));
    setNextPage((nextPage) => nextPage += 1);
  }

  const possibleFetchImageDetails = async (imageID) => {
    // If we already have the image details, no need to duplicate the call.
    // MB TODO: Inefficient!
    const image = _.find(images, { id: imageID });
    if (!image || image.hasDetails) {
      return;
    }

    // Otherwise, let's fetch the meta data we need.
    const imageDetails = await unsplashAPI.getImageDetail(imageID);
    const { views, likes, downloads } = imageDetails;

    setImages((prevImages) => prevImages.map((image)=> (
      image.id === imageID 
        ? {
          ...image,
          hasDetails: true,
          views,
          likes,
          downloads,
        }
        : image
    )));
  }

  return (
    <div className="App">
      <header className="App-header">Unsplash Carousel</header>
      <Carousel
        images={images}
        loadNewImages={fetchImages}
        onNewImageSelected={possibleFetchImageDetails}
      />
    </div>
  );
}

export default App;
