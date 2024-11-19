import axios from 'axios';

// import Config from 'react-native-config';

import { GOOGLE_PLACE_API_KEY} from "@env";

/**
 * 주어진 위치와 페이지 토큰을 사용하여 Google Places API의 Nearby Search를 통해
 * 관광 명소 목록을 가져오는 함수
 *
 * @param {Object} location - 현재 위치 정보 (latitude 및 longitude 속성을 가진 객체)
 * @param {string|null} pageToken - 다음 페이지의 결과를 가져오기 위한 페이지 토큰 (기본값: null)
 * @returns {Object|null} - API 응답 데이터 (성공 시) 또는 null (실패 시)
 */

async function fetchPlaces(location, pageToken = null, type) {
  console.log(type);
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${location.latitude},${location.longitude}`,
        radius: 1500,  // 검색 반경 (미터 단위)
        type: `${type}`,  // 검색할 장소 유형 (관광 명소)
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