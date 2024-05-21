import React from "react";
import { StyleSheet, Text, View } from "react-native";

function PlanScreen({mavogation}) {
    return (
        <View style={styles.container}>
            <Text>Plan</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default PlanScreen;