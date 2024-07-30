/**
 * mainTab - 여행지 리스트의 section.
 *
 * 이 section의 id, text, tex2 -> placedetail로 넘어감.
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PlaceSection = ({text, id, text2, structured_formatting}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.section}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PlaceDetails', {text: text, id: id, text2: text2, structured_formatting:structured_formatting})
        }>
        <Image style={styles.image} />
        <Text style={styles.text_Name}>{text}</Text>
        <Text style={styles.text_id}>{id}</Text>
        <Text style={styles.text} numberOfLines={5} ellipsizeMode='middle'>
          Ut nisi consequat ea qui veniam dolor laborum dolor quis eiusmod
          irure. Voluptate culpa voluptate laboris aute nisi velit magna ea ut
          anim consequat mollit. Exercitation proident magna magna et sit enim
          ea exercitation consequat aliqua culpa.
        </Text>
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
});

export default PlaceSection;
