import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import SearchHeader from "../components/SearchHeader";

function Search_Rest() {
    return (
        <View>
            <SearchHeader/>
            <Text style={styles.block}>
                
                Search_Rest Screen!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: 'blue,',
      },
})

export default Search_Rest;