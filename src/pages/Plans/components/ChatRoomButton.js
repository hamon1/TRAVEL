import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const ChatRoomButton = ({chatRoomId}) => {
    const navigate = useNavigation();

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigate.navigate('chatScreen', { chatRoomId: '12345' })}
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