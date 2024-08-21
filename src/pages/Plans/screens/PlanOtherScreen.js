import React, { useContext } from "react";
import { 
    StyleSheet, 
    View , 
    Pressable,
    Text,
    } from "react-native";
import PlanOtions from "../components/PlanOptions";
import BoxCtxProvider from "../components/BoxCtx";

function  PlanOherScreen() {
    return (
        <View>
            <PlanOtions />
        </View>
    )
};

const styles = StyleSheet.create({

});

export default PlanOherScreen;