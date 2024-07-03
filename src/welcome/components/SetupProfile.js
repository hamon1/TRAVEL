import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { signOut } from "../../lib/auth";
import { StyleSheet, View } from "react-native";
import BorderedInput from "../../components/BorderedInput";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/users";

function SetupProfile() {
    const [displayName, setDisplayName] = useState('');
    const navigation = useNavigation();

    const {params} = useRoute();
    const {uid} = params || {};

    const onSubmit = () => {
        createUser({
            id: uid,
            displayName,
            photoURL: null,
        });
    };
    const onCancel = () => {
        signOut();
        navigation.goBack();
    };

    return (
        <View style={styles.block}>
            <View style={styles.circle}/>
            <View style={styles.form}>
                <BorderedInput
                    placeholder="닉네임"
                    value={displayName}
                    onChangeText={setDisplayName}
                    onSubmitEditing={onSubmit}
                    returnKeyType="next"
                />
                <View style={styles.buttons}>
                    <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
                    <CustomButton title="취소" onCancel={onCancel} theme="secondary" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 16,
        width: '100%',
    },
    circle: {
        backgroundColor: '#cdcdcd',
        borderRadius: 64,
        width: 128,
        height: 128,
    },
    form: {
        marginTop: 16,
        width: '100%',
    },
    buttons: {
        marginTop: 48,
    },
});

export default SetupProfile;