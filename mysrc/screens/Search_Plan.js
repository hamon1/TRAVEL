import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import SearchHeader from "../components/SearchHeader";

function Search_Plan() {
    return (
        <View style={styles.block}>
            <SearchHeader/>
            <Text>
                Search_Plan Screen!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
      },
})

export default Search_Plan;