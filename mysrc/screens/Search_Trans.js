import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import SearchHeader from "../components/SearchHeader";

function Search_Trans() {
    return (
        <View style={styles.block}>
            <SearchHeader/>
            <Text>
                Search_Trans Screen!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
      },
})

export default Search_Trans;