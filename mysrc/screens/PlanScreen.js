import React from "react";
import { StyleSheet, Text, View} from "react-native";
import SearchButton from "../components/SearchButton";
import Plan_ChatButton from "../components/Plan_ChatButton";

function PlanScreen({navigation}) {
    return (
        <View style={styles.block}>
            <Text>Planning</Text>
            <SearchButton/>
            <Plan_ChatButton />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: 'gray',
      },
})

export default PlanScreen;