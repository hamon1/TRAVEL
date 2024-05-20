/**
 * mainTab - 여행지 리스트의 section.
 *
 * 이 section의 id, text, tex2 -> placedetail로 넘어감.
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PlaceSection = ({id, text, text2}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.section}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PlaceDetails', {name: text, id: id, text: text2})
        }>
        <Image style={styles.image} />
        <Text style={styles.text_Name}>{text}</Text>
        <Text style={styles.text}>{id}</Text>
        <Text style={styles.text}>
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
    top: 20,
    left: 10,
  },
  text: {
    fontSize: 15,
    color: 'black',
    top: 30,
    left: 10,
  },
});

export default PlaceSection;
