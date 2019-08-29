import axios from 'axios';

// MB TODO: Put this in .env file
const CLIENT_ID = "6bb5bb78cfde81736048d37f2d3399d5024a6a5be277ad88a4b1a366a5e4f77f";
const QUERY = 'puppy';

const API_URL = `https://api.unsplash.com/`;
const PHOTOS_ENDPOINT = 'photos/';

/**
 * Unspash API object responsible for handling request formatting and response handling.
 */
const UnsplashAPI = () => {
  /**
   * Fetch a list of images 
   * @param  {number} [page] Optional page index
   */
  const fetchImages = async (page = 1) => {
    try {
      const imageResponse = await axios.get(`${API_URL}${PHOTOS_ENDPOINT}?query=${QUERY}&page=${page}&client_id=${CLIENT_ID}`)
      return imageResponse.data;
    } catch(e) {
      console.error('Error when fetching from Unsplash', e);
    }
  }
  
  /**
   * Fetch image details for the provided image id.
   * @param  {number} imageID
   */
  const getImageDetail = async (imageID) => {
    try {
      const imageDetail = await axios.get(`${API_URL}${PHOTOS_ENDPOINT}/${imageID}/?client_id=${CLIENT_ID}`);
      return imageDetail.data;
    } catch(e) {
      console.error('Error when fetching from Unsplash', e);
    }
  }

  return {
    fetchImages,
    getImageDetail,
  };
};

export default UnsplashAPI;