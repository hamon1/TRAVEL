/*
메인 스크린에서 여행지 클릭시 전환되는 페이지.

여행지 정보, 사진, 리뷰 등 보여줌.
앞의 HomeScreen의 클릭된 Section에서 props를 가져옴.


--> 이 여행지를 만들어 놓은 혹은 새로 만들 플랜에 집어 넣기 가능. (AddPlace)
 */

import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AddIcon from '../../components/IconPlus';

const Place_detaile = ({route}) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('addPlan');
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {}, []);

  const onPressModalOpen = () => {
    console.log('enlarge a map');
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  // navigation.setOptions({
  //   headerRight: () => <AddIcon onPress={onPress} name="add" color="black" />,
  // });

  return (
    <>
      <ScrollView style={styles.container}>
        <Image style={styles.image} />
        {/* <Pressable onPress={onPressModalOpen}> */}
          {/* <Image style={styles.image_map} /> */}
          <MapView
              style={styles.image_map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                // latitude: 37.78825,
                // longitude: -122.4324,
                latitude: route.params.lat,
                longitude: route.params.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              >
                <Marker
            coordinate={{latitude: route.params.lat,
            longitude: route.params.lng}}
            // title={route.params.name}
            // description={"description"}
         />
                </MapView>
        {/* </Pressable> */}
        <View style={styles.textContainer}>
          {/* <Text style={styles.nameText}>name</Text> */}
          <Text style={styles.nameText}>{route.params.name}</Text>
          <Text style={styles.idText}>{route.params.address}</Text>
          <Text style={styles.infoText} >aa</Text>
          {/* <Text style={styles.nameText}>{route.params.text}</Text>
          <Text style={styles.idText}>id: {route.params.id}</Text>
          <Text style={styles.infoText} >{route.params.text2}</Text> */}
        </View>
          <AddIcon
            onPress={onPress}
            name="add"
            color="#fb8c00"
            style={styles.addButton}
          />
        <View />
        {/**아래부터 리뷰(별점) 컨테이너 */}
        <View style={styles.reviewContainer}>
          {/* <Text style={styles.reviewHeader}>review</Text> */}
          <Pressable
            onPress={() => navigation.navigate('reviewScreen', {id: route.params.id})}
            style={styles.reviewHeader}>
            <Text>별점 평균</Text>
            <Icon
              name="arrow-forward-ios"
              color={'#fb8c00'}
              size={24}
              style={styles.reviewArrowicon}
            />
          </Pressable>
          <View style={styles.reviewPreview}>
            <Text>리뷰 미리보기</Text>
          </View>
        </View>
      </ScrollView>
      {/* <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View style={styles.ModalView}>
          <Pressable
            onPress={onPressModalClose}
            style={styles.ModalViewTouch}
          />
          <Image style={styles.ModalMap} />
        </View>
      </Modal> */}
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
    borderRadius: 15,
    backgroundColor: 'white',
    // backgroundColor: 'yellow',
    padding: 12,
    // shadowColor: '#4d4d4d',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
  },
  reviewContainer: {
    // backgroundColor: 'green',
    top: 40,
    height: 120,
    marginBottom: 42,
  },
  nameText: {
    top: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    // backgroundColor: 'blue',
  },
  infoText: {
    fontSize: 15,
    color: 'black',
    top: 30,
    // backgroundColor: 'green',
  },
  addButton: {
    position: 'absolute',
    // backgroundColor: 'red', 
    top: -460,
    left: '85%',
  },
  idText: {
    top: 10,
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'italic',
    // backgroundColor: 'yellow',
  },
  reviewHeader: {
    height: 32,
    backgroundColor: 'white',
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    zIndex: 999,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  reviewPreview: {
    backgroundColor: 'white',
    height: 88,
    padding: 10,
  },
  reviewArrowicon: {
    position: 'absolute',
    left: '94%',
  },
  ModalView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgroundColor: 'blue',
  },
  ModalViewTouch: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  ModalMap: {
    backgroundColor: '#D9D9D9',
    width: '95%',
    height: 400,
    alignItems: 'center',
    top: 10,
    left: 10,
    borderRadius: 15,
    marginTop: 10,
  },
});

export default Place_detaile;
