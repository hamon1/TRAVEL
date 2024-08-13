/**
 * mainTab - 여행지 리스트의 section.
 *
 * 이 section의 id, text, tex2 -> placedetail로 넘어감.
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Tag from './tag/TagContainer';


// text, id, text2, structured_formatting
const PlaceSection = ({name, address, photo_url, types, lat, lng}) => {
  const navigation = useNavigation();
  const typesCount = types.length;

  // if (typesCount > 0) {

  // }
  // console.log("photo: ", photo_url);
  return (
    <View style={styles.section}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PlaceDetails', {name: name, address: address, photo_url: photo_url, types: types, lat: lat, lng: lng})
        }>
        <Image source={{uri: photo_url}} style={styles.image} />
        <Text style={styles.text_Name} numberOfLines={1} ellipsizeMode='end'>{name}</Text>
        <Text style={styles.text_id}>{address}</Text>
        <Text style={styles.text} numberOfLines={5} ellipsizeMode='middle'>
          Ut nisi consequat ea qui veniam dolor laborum dolor quis eiusmod
          irure. Voluptate culpa voluptate laboris aute nisi velit magna ea ut
          anim consequat mollit. Exercitation proident magna magna et sit enim
          ea exercitation consequat aliqua culpa.
        </Text>
        {/* <View style={styles.tag_box}> */}
        <Tag types={types}/>
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 10,
    backgroundColor: 'white',
    // marginLeft: 10,
    // marginTop: 20,
    height: 500,
    width: '100%',
    borderBottomWidth: 0.2,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    backgroundColor: 'gray',
    width: '100%',
    height: 200,
    alignItems: 'center',
    top: 10,
    borderRadius: 15,
  },
  text_Name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: 24,
    left: 10,
  },
  text_id: {
    fontSize: 14,
    color: '#616161',
    margin: 10,
    top: 20,
  },
  text: {
    fontSize: 15,
    color: 'black',
    top: 30,
    // left: 10,
    // backgroundColor: 'red',
    margin: 10,
  },
  icon: {
    backgroundColor: 'red',
    width: 24,
    height: 24,
    position: 'absolute',
    top: 20,
    right: 10,
  },
  tag_box: {
    top: 60,
        margin: 10,
        flexDirection: 'row',
  },
});

export default PlaceSection;
