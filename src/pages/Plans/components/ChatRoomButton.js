import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const ChatRoomButton = ({chatRoomId, userId}) => {
    const navigate = useNavigation();

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigate.navigate('chatScreen', { chatRoomId: chatRoomId, userId: userId })}
            >
                <Text style={styles.text}>Chat Room</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {

    },
})