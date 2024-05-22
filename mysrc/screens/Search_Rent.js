import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import SearchHeader from "../components/SearchHeader";

function Search_Rent() {
    return (
        <View>
            <SearchHeader/>
            <Text style={styles.block}>
                
                Search_Rent Screen!
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

export default Search_Rent;