import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View , TextInput, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBox } from "../lib/boxes";
import IconRightButton from "../components/IconRightButton";
import { Icon } from "react-native-vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import CalendarButton from "../../../components/CalendarButton";

import firestore, {query, orderBy, doc, deleteDoc} from '@react-native-firebase/firestore';

import moment from 'moment';

const PlanTransScreen = ({route}) => {
    const [description, setDescription] = useState('');
    const [plan, setPlan] = useState([]);
    const navigation = useNavigation();
    const onSubmit = useCallback(async () => {
        //
        navigation.pop();
        await createBox({description});
    }, [description, navigation]);

    console.log(route.params.docId);

    const onInsert = async () => {
        try {
          const nextId = plan.length > 0 ? Math.max(...plan.map(p => p.pid)) + 1 : 1;
          const newPlan = {
            pid: nextId.toString(),
            userId: 0,
            type: 'trans',
            trans: 'train',
            d_month: 1,
            d_day: 22,
            date: moment().format('l'),
            time: moment().format('LT'),
            timestamp: new Date(),
          };
          await firestore()
          .collection('plans')
          .doc(route.params.docId)
          .collection('planDetails')
          .add(newPlan);
          console.log("Inserted plan: " + newPlan.id + "date: " + newPlan.timestamp + newPlan.date);
        } catch (error) {
          console.error("Error adding plan: " + error);
        }
      };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconRightButton onPress={onInsert} name="send" />,
        });
    }, [navigation, onSubmit]);
    
    return (
        <View style={styles.background}>
            <View style = {styles.block}>
                <View style={styles.imgmap}/>

                {/*<View style={styles.circle}>
                    <Pressable>
                        <Icon name="check" color="red" size={24} />
                    </Pressable>
                </View>*/}
                {/*<CalendarButton />*/}
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

export default PlanTransScreen;