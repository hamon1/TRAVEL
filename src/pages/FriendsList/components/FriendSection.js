/**
 * 친구 목록 - 친구 박스
 *
 *
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Modal,
  Clipboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FriendProfileModal from './FriendProfieModal';

import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import { addFriend } from '../utils/addFriend';
import { removeFriend } from '../utils/removeFriend';
import { getUserAuth } from '../../../utils/getUserAuth';

import CustomToast from '../../../components/CustomToast';

import { createChatRoom } from '../../Chat/util/createChatRoom';
import { create } from 'lodash';

const FriendSection = ({user, docId, userName, userId, photoUrl, onRemove, isAddFriend}) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId_now = getUserAuth();

  const [toastVisible, setToastVisible] = useState(false);
  // const [toastVisibl_not_found, setToastVisible_not_found] = useState(false);

  const onToast = () => {
    setToastVisible(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  // const chatRoomId = createChatRoom(userId_now, userId);

  // const onToast_notFound = () => {
  //   setToastVisible_not_found(true);
  // };

  // const closeToast_notFound = () => {
  //   setToastVisible_not_found(false);
  // };

  useEffect(() => {}, []);

  const onPressModalOpen = () => {
    console.log('팝업을 여는 중입니다.');
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  console.log('user:', userId_now, ' / userId:', docId);
  const remove = () => {
    Alert.alert(
      '삭제',
      '정말 삭제하시겠습니까?',
      [
        {
          text: '삭제',
          onPress: () => {
            // onRemove(id);
            removeFriend(userId_now, docId);
          },
          style: 'destructive',
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.section} onPress={onPressModalOpen}>
        {photoUrl ? (
          <Image
            style={styles.userImage}
            source={{uri: photoUrl}}
            />
        ):
        <Image
          style={styles.userImage}
          /** 이미지 설정(기본 값)
           */
          source={require('../../../assets/Defualtuserimage.png')}
          />
        }
        <Text style={styles.text_Name}>{userName}</Text>
        <Text style={styles.text}>{userId}</Text>
        {/** 친구 삭제 */}
        {isAddFriend ? (
          <TouchableOpacity onPress={()=>addFriend(user, userId, userName, photoUrl, onToast)} style={styles.icon_remove}>
            <Icon name="plus" size={24} color="orange" />
          </TouchableOpacity>
        ):
          <TouchableOpacity onPress={remove} style={styles.icon_remove}>
            <Icon name="x" size={24} color="#000000" />
          </TouchableOpacity>
        }
        {/** 채팅창으로 이동 */}
        <TouchableOpacity
          onPress={async() => {
            console.log('press chat button / create new chat room', userId_now, userId);

            const RoomId = await createChatRoom(userId_now, userId);

            console.log('created new chat room: ', RoomId);

            navigation.navigate('chatScreen', { chatRoomId: RoomId, userId: userId_now });

          }}
          style={styles.icon_message}>
          <Icon2 name="message" size={24} color="#000000" />
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.modalView}>
          <FriendProfileModal
            onPress={onPressModalClose}
            id={userId}
            // text={text}
            // text2={text2}
          />
        </View>
      </Modal>
      <CustomToast visible={toastVisible} message="이미 추가된 친구입니다." OffToast={closeToast}/>
      {/* <CustomToast visible={toastVisible_not_found} message="해당 유저를 찾을 수 없습니다." OffToast={closeToast_notFound}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    // top: 10,
    // bottom: 10,
    backgroundColor: 'white',
    // marginLeft: 10,
    // marginBottom: 10,
    height: 108,
    width: '100%',
    borderBottomWidth: 0.2,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text_Name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    top: 28,
    left: '28%',
    position: 'absolute',
  },
  text: {
    fontSize: 14,
    color: '#616161',
    top: 56,
    left: '28%',
    position: 'absolute',
  },
  icon_remove: {
    width: 24,
    height: 24,
    top: 18,
    left: '92%',
    position: 'absolute',
  },
  icon_message: {
    width: 24,
    height: 24,
    top: 20,
    left: '81%',
    position: 'absolute',
  },
  userImage: {
    width: 64,
    height: 64,
    borderRadius: 45,
    backgroundColor: 'gray',
    left: 16,
    top: '50%',
    transform: [{translateY: -32}],
  },
  modalView: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default FriendSection;
