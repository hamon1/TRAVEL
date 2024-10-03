import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const ChatRoomButton = ({chatRoomId, userId}) => {
    const navigate = useNavigation();

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigate.navigate('chatScreen', { chatRoomId: chatRoomId, userId: userId, group: true })}
            >
                <IconMaterialCommunityIcons name="message" size={24} color="orange" />

                {/* <Text style={styles.text}>Chat Room</Text> */}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {

    },
})