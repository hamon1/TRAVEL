import axios from 'axios';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDRdIybBpN0aO6gJal9skDd0VG6KMrgqJk';

async function fetchPlaces(location, pageToken = null) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${location.latitude},${location.longitude}`,
        radius: 1500,
        type: 'tourist_attraction',
        key: GOOGLE_PLACES_API_KEY,
        pagetoken: pageToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchPlaces;