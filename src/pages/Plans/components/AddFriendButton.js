import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const AddFriendButton = ({ handleAddFriend, planId, friendId }) => {
    console.log('addFriendButton');
    return (
        <View styles={styles.container}>
      <Icon style={styles.icon} name="people" size={24} color="#000000" />
      {/** 친구목록.length */}
      <Text style={styles.num}></Text>
     <Button title="친구 추가" onPress={() => handleAddFriend(friendId)} />
    </View>
        // <View style={{position: 'absolute', width: 100, height: 100, backgroundColor: 'red',}}>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 56,
        height: 32,
        borderRadius: 15,
      },
      icon: {
        top: 4,
        left: 8,
      },
      num: {
        top: 4,
        position: 'absolute',
        left: 36,
        fontSize: 18,
      },
});

