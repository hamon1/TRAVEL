// import axios from 'axios';


import { GOOGLE_PLACE_API_KEY} from "@env";
/**
 * 주어진 장소 ID를 사용하여 Google Places API의 Place Details를 통해
 * 장소의 세부 정보를 가져오는 함수
 *
 * @param {string} placeId - 장소의 고유 ID
 * @returns {Object|null} - API 응답 데이터의 결과 부분 (성공 시) 또는 null (실패 시)
 */

async function fetchPlacesDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;
  try {
    const response = await fetch(url);
     // 응답 데이터를 JSON 형식으로 파싱
    const data = await response.json();
    if (data.status !== 'OK') {
      console.error(`Error fetching place details: ${data.status}, ${data.error_message}`);
      return null;
    }
    return data.result;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
}

export default fetchPlacesDetails;