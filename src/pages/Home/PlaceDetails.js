/*
메인 스크린에서 여행지 클릭시 전환되는 페이지.

여행지 정보, 사진, 리뷰 등 보여줌.
앞의 HomeScreen의 클릭된 Section에서 props를 가져옴.


--> 이 여행지를 만들어 놓은 혹은 새로 만들 플랜에 집어 넣기 가능. (AddPlace)
 */

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// eslint-disable-next-line react-hooks/rules-of-hooks

const Place_detaile = ({route}) => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView style={styles.container}>
        <Image style={styles.image} />
        {/**아래 이미지 지도 - 클릭 시, 지도 확대*/}
        <Pressable>
          <Image style={styles.image_map} />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            Place_detaile / Place: {route.params.name} {route.params.id}
          </Text>
          <Text style={styles.infoText}>{route.params.text}</Text>
        </View>
        <View />
        {/**아래부터 리뷰(별점) 컨테이너 */}
        <View style={styles.reviewContainer}>
          <Text>review</Text>
        </View>
      </ScrollView>
      <Button
        style={styles.addButton}
        title="add"
        onPress={() => navigation.navigate('addPlace')}
      />
      <Button title="back" onPress={() => navigation.goBack()} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    backgroundColor: 'gray',
    width: '95%',
    height: 200,
    alignItems: 'center',
    top: 10,
    left: 10,
    borderRadius: 15,
  },
  image_map: {
    backgroundColor: '#D9D9D9',
    width: '95%',
    height: 200,
    alignItems: 'center',
    top: 10,
    left: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  textContainer: {
    width: '95%',
    height: 500,
    top: 20,
    left: 10,
    backgroundColor: 'red',
  },
  reviewContainer: {
    backgroundColor: 'green',
    top: 40,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    fontSize: 15,
    color: 'black',
    top: 20,
  },
  addButton: {
    position: 'absolute',
  },
});

export default Place_detaile;
