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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// eslint-disable-next-line react-hooks/rules-of-hooks

const Place_detaile = ({route}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.image}></Image>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          Place_detaile / Place: {route.params.name} {route.params.id}
        </Text>
        <Text style={styles.infoText}>{route.params.text}</Text>
      </View>
      {/**아래부터 리뷰(별점) 컨테이너 */}
      <View></View>
      <Button
        style={styles.addButton}
        title="add"
        onPress={() => navigation.navigate('addPlace')}
      />
      <Button title="back" onPress={() => navigation.pop()} />
    </View>
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
  textContainer: {
    width: '95%',
    top: 20,
    left: 10,
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
