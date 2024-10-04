import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import { addFriendToPlan } from '../util/addFriendToPlan';

export const AddFriendSection = ({userName, userId, docId, topUserId, handleAddFriend}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name_text}>{userName}</Text>
            <TouchableOpacity
                onPress={()=>{
                    console.log('AddFriend => ',  docId, userId, topUserId);
                    // handleAddFriend(userId)
                    addFriendToPlan(docId, userId, topUserId)
                }}
            >
                <Text style={styles.add_text}>+</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        height: 52,
        // borderBottomWidth: 0.5,
        justifyContent: 'center',
        backgroundColor: 'orange',
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    name_text: {
        fontWeight: 'bold',
    },
    add_text: {
        fontSize: 30,
        color: 'white',
        bottom: 2,
    },
})