import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View , TextInput, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBox } from "../lib/boxes";
import IconRightButton from "./IconRightButton";
import { Icon } from "react-native-vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import CalendarButton from "../../../components/CalendarButton";
import BoxCtx from "./BoxCtx";
const PlanOtions = () => {
    const [description, setDescription] = useState('');
    const navigation = useNavigation();
    const onSubmit = useCallback(async () => {
        navigation.pop();
        await createBox({description});
    }, [description, navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
        });
    }, [navigation, onSubmit]);
    
    return (
        <BoxCtx.Provider>
        <View style={styles.background}>
            <View style = {styles.block}>
                <View style={styles.imgmap}/>

                {/*<View style={styles.circle}>
                    <Pressable>
                        <Icon name="check" color="red" size={24} />
                    </Pressable>
                </View>*/}
                {/*<CalendarButton />*/}
                <TextInput 
                    //style={styles.input}
                    placeholder="메모"
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
        </View>
        </BoxCtx.Provider>
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

export default PlanOtions;