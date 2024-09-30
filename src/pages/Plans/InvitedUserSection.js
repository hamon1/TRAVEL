import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { getUserInfo } from './util/getUserInfo';

export const InvitedUserSection = ({userId}) => {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const fetchInvitedUsers = async () => {
            const users = await getUserInfo({id: userId});
            setUserInfo(users);
            console.log('invited user:', users);
        }
        fetchInvitedUsers();
    }, []);

    console.log('Invited', userInfo);
    // getUserInfo({id: userId});
    return (
        <View style={styles.container}>
            {/* <Text>Invited User Section! {userId}</Text> */}
            <Text style={styles.name_text}>{userInfo.displayName}</Text>
            {/* <TouchableOpacity 
            style={styles.add_button} 
            onPress={() => console.log('accept invitation')}>
                <Text style={styles.add_text}>+</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        height: 64,
        // borderBottomWidth: 0.5,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    name_text: {
        fontSize: 16,
        fontWeight: 'bold',
        // marginLeft: 20,
    },
    add_button: {

    },
    add_text: {
        fontSize: 30,
    },
})