import React from "react";
import { 
    StyleSheet, 
    View , 
    Pressable,
    Text,
    } from "react-native";
import PlanOtions from "../components/PlanOptions";
import { Icon } from "react-native-vector-icons/MaterialIcons";
import CalendarButton from "../../../components/CalendarButton";

function  Plan_Place_Setting() {
    return (
        <View>
            <View style={styles.calendar}>
                <CalendarButton />
                <PlanOtions />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    calendar: {

    },
});

export default Plan_Place_Setting;