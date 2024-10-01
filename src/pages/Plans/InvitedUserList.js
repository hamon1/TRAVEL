import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';

import firestore, {query, orderBy, doc, deleteDoc, getDocs, collection} from '@react-native-firebase/firestore';


import { getInvitedUser } from './util/getInvitedUser';

import { InvitedUserSection } from './InvitedUserSection';
import { AddFriendSection } from './components/AddFriendSection';

import {useNavigation} from '@react-navigation/native';

import { getUserAuth } from '../../utils/getUserAuth';

export const InvitedUserList = ({route}) => {
    const {topUserId, docId, handleAddFriend } = route.params;
    // const { topUserId } = route.params.topUserId;
    // const { docId } = route.params.docId;

    const [userList, setUserList] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const navigation = useNavigation();

    const [searchValue, setSearchValue] = useState(false);

    const userId = getUserAuth();

    console.log('InvitedUserList: topUserId / docId -> ', topUserId, ' / ', docId);

    useEffect(() => {
        // let isMounted = true;
    
        const unsubscribe = firestore()
            .collection('users')
            .doc(userId)
            .collection('friends')
            // .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
            const fetchedFriends = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            if (fetchedFriends[0] === undefined) {
                console.log('no fetched friends');
                return;
            }
            else {
                setFriendList(fetchedFriends);
    
                // firestore()
                //     .collection('users')
                //     .doc(userId)
                //     .update({
                //     friendCount: fetchedFriends.length,
                //     // pid: fetchedFriends[0].id,
                //     });
                console.log('Fetched Plan Success!// Friends length: ', fetchedFriends.length);
                // handleCountFriend(fetchedFriends.length);
                // setDocId(fetchedFriends[0].docId);
            }
            console.log('Fetched Plan', friendList);
            // console.log('Fetched Plan Success!// docId:', fetchedPlans[0].docId);
        }, error => {
            console.error("Error fetching plans: " + error);
        });
    
        // Clean up the subscription
        return () => {
          // isMounted = false;
            unsubscribe();
        }
    }, [userId]);

    useEffect(() => {
        const fetchInvitedUsers = async () => {
            const users = await getInvitedUser({topUserId, docId});
            setUserList(users);
            console.log('invited user list:', users);
        }
        fetchInvitedUsers();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection: 'row', alignItems: 'center',}} >
                    <TouchableOpacity 
                    style={styles.add_button}
                    onPress={() =>
                    {console.log('InvitedUserList')
                    setSearchValue(true)}
                }
                    >
                        <Text style={styles.add_text}>+</Text>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, []);

    return (
        <View>
            {searchValue ? (
                <View style={styles.searchContainer}>
                    <View>
                        <Text>TextInput</Text>
                        <TextInput></TextInput>
                    </View>
                    <FlatList
                        data={friendList}
                        // keyExtractor={(item) => item.userId}
                        renderItem={({item}) => 
                        // <Text>{item.userName}</Text>
                        <AddFriendSection 
                        userName={item.userName}
                        userId={item.userId}
                        docId={docId}
                        topUserId={topUserId}
                        handleAddFriend={handleAddFriend}
                        />
                            // <InvitedUserSection userId={item}/>
                        }
                    />
                </View>
            ):
            <></>
            }
            {/* <Text>{topUserId}</Text> */}
            {/* <Text>{docId}</Text> */}
            <FlatList
            data={userList}
            keyExtractor={(item) => item.userId}
            renderItem={({item}) => 
            // <Text>{item}</Text>
            <InvitedUserSection userId={item}/>
        }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        height: 240,
        borderBottomWidth: 0.2,
        borderColor: 'gray',
    },
    add_button: {

    },
    add_text: {
        fontSize: 32,
        color: 'orange',
    },
})