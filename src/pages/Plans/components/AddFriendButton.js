import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; 


export const AddFriendButton = ({ handleAddFriend, planId, friendId, userId, docId, userCount }) => {
    const navigation = useNavigation();

    console.log('addFriendButton', userId, docId);
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            console.log('addFriendButton');
            navigation.navigate('InvitedUserList', {topUserId: userId, docId: docId, handleAddFriend: handleAddFriend});
        }}>
            <Icon style={styles.icon} name="people" size={24} color="#000000" />
            {/** 친구목록.length */}
            <Text style={styles.num}>{userCount}</Text>
            {/* <Button title="친구 추가" onPress={() => handleAddFriend(friendId)} /> */}
        </TouchableOpacity>
        // <View style={{position: 'absolute', width: 100, height: 100, backgroundColor: 'red',}}>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 24,
        left: 20,
        width: 52,
        height: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        flexDirection: 'row',
    },
    icon: {
        marginRight: 4,
        // top: 4,
        // left: 8,
    },
    num: {
        // top: 4,
        // position: 'absolute',
        // left: 36,
        // fontSize: 18,
    },
});

