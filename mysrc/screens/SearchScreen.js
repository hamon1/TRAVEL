import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchHeader from "../components/SearchHeader";
function SearchScreen() {
    return (
        <View style={styles.block}>
            <SearchHeader />
            <Text>SearchScreen</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: 'blue,',
      },
})

export default SearchScreen;