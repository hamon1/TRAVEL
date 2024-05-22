import { useNavigation } from "@react-navigation/native";
import React from "react";
import {View, Text, StyleSheet, Pressable} from 'react-native';

function Plan_Option_Buttons({title, onPress}) {
    return (
        <View style={styles.container}>
           <Pressable 
           onPress={onPress}
           style={({pressed}) => [
            Platform.OS === 'ios' && pressed && {opacity: 0.5}
           ]}>
            <Text style={styles.text}>
                {title}
            </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: 35,
    },
    text: {
        fontSize: 25,
        textDecorationLine : 'underline',
    },
})
export default Plan_Option_Buttons;