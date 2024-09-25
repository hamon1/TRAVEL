import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  useWindowDimensions,
  Modal,
  Pressable,
} from 'react-native';

const SearchUserModal = () => {
    return (
        <View style={styles.container}>
            <Text>Search User Modal</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
});

export default SearchUserModal;