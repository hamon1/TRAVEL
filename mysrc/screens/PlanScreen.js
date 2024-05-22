import React from "react";
import { StyleSheet, Text, View} from "react-native";
import SearchButton from "../components/SearchButton";
import Plan_ChatButton from "../components/Plan_ChatButton";
import Plan_Option_Buttons from "../components/Plan_Option_Buttons";
import { useNavigation } from "@react-navigation/native";

function PlanScreen({navigation}) {
    const navigate = useNavigation();
 
    return (
        <View style={styles.block}>
            <View style={styles.addcontainer}>
                <Plan_Option_Buttons 
                title="Plan"
                onPress={() => navigation.navigate('Search_Plan')}
                />
                <Plan_Option_Buttons 
                title="Rent"
                onPress={() => navigation.navigate('Search_Rent')}
                />
                <Plan_Option_Buttons 
                title="Trans"
                onPress={() => navigation.navigate('Search_Trans')}
                />
                <Plan_Option_Buttons 
                title="Rest"
                onPress={() => navigation.navigate('Search_Rest')}
                />
            </View>
            <SearchButton/>
            <Plan_ChatButton />
        </View>
    )
}

const styles = StyleSheet.create({
    addcontainer: {
        flexDirection: 'row',
    },
    block: {
        flex: 1,
        backgroundColor: 'gray',
      },
})

export default PlanScreen;