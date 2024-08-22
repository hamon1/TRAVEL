/**
 * 여행지 정보 무한스크롤. (flatlist)
 */

import React, {useState} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

import PlaceSection from './PlaceSection';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDRdIybBpN0aO6gJal9skDd0VG6KMrgqJk';


function PlaceList({place, onEndReached, refreshDataFetch}) {
  console.log('================================', {place}.place[0]);
  // photo_reference를 사용하여 사진 URL 생성
  // const photoUrl = place.photos
  // ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place[0].photos.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
  // : null;

  // console.log("photoUrl: ", photoUrl);

  const [refreshing, setRefreshing] = useState(false);
    
    const getRefreshData = async () => {
     	setRefreshing(true);
        refreshDataFetch();
        console.log('refreshing');
        setRefreshing(false);
    }
    
    const onRefresh = () => {
    	if(!refreshing) {
        	getRefreshData();
        }
    }
    

  return (
    <OptimizedFlatList
      style={style.list}
      data={place}
      renderItem={({item}) => 
        {// photo_reference를 사용하여 사진 URL 생성
        const photoUrl = item.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
          : null;
        return (
          <PlaceSection 
            name={item.name} 
            address={item.vicinity} 
            photo_url={photoUrl} 
            types={item.types} 
            lat={item.geometry.location.lat} 
            lng={item.geometry.location.lng} 
            rating={item.rating}
          />
        );}
        // <PlaceSection name={item.name} address={item.vicinity} photo_url={photoUrl} types={item.types} lat={item.geometry.location.lat} lng={item.geometry.location.lng} />
        // <PlaceSection id={item.id} text={item.text} text2={item.text2} structured_formatting={item.structured_formatting} />
      }
      keyExtractor={item => item.place_id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
      onRefresh={onRefresh}
      refreshing={refreshing}
      disableVirtualization={false} //비정상적인 스크롤 동작 방지
    />
  );
}

const style = StyleSheet.create({
  list: {
    top: -38,
    zIndex: -1,
    // flex: 1,
  },
});

export default PlaceList;
