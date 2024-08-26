import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View , TextInput, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBox } from "../lib/boxes";
import IconRightButton from "../components/IconRightButton";
import { Icon } from "react-native-vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import CalendarButton from "../../../components/CalendarButton";
const PlanRantalScreen = () => {
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    const navigation = useNavigation();
    const onSubmit = useCallback(async () => {
        //
        navigation.pop();
        await createBox({description});
    }, [description, navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
        });
    }, [navigation, onSubmit]);
    
    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    }

    return (
        <View style={styles.background}>
            <View style = {styles.block}>
                <View style={styles.imgmap}/>
                <View>
                    <CalendarButton onDayPress={onDayPress}/>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    block: {
        width: '90%',
        height: '90%',
        top: 20,
        left: 20,
        borderRadius: 15,
        backgroundColor: 'white',
        padding: 12,
    },
    addbutton: {
        left: 200,
        top: 480,
        flexDirection: 'row',
    },
    imgmap: {
        width: '95%',
        height: '45%',
        top: 0,
        left: 10,
        borderRadius: 15,
        backgroundColor: 'gray',
        padding: 12,
    },
    background: {
        backgroundColor: 'gray',
        height: '100%',
    },
    input: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flex: 1,
        fontSize: 16,
    },
    circle: {
        backgroundColor: 'gray',
        height: '15%',
        marginTop: 190,
    }
});

export default PlanRantalScreen;