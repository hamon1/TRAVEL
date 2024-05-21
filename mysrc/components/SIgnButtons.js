import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import CustomButton from "./CustomButton";


function SignButtons({isSignUp, onSubmit, loading}) {
    const navigation = useNavigation();

    const primaryTitle = isSignUp ? 'Sign Up' : 'Login';
    const secondaryTitle = isSignUp ? 'Login' : 'Sign Up';

    const onSecondaryButtonPress = () => {
        if (isSignUp) {
            navigation.goBack();
        } else {
            navigation.push('SignIn',{isSignUp: true});
        }
    };

    if (loading) {
        return (
            <View style={styles.spinnerWrapper}>
                <ActivityIndicator size={32} color="#6200ee" />
            </View>
        );
    }

    return (
        <View style={styles.buttons}>
            <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
            <CustomButton
                title={secondaryTitle}
                theme="secondary"
                onPress={onSecondaryButtonPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerWrapper: {
        marginTop: 64,
        height: 104,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        marginTop: 64,
    },
});

export default SignButtons;