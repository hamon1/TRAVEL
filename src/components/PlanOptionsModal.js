import React from "react";
import { StyleSheet , Modal, View, Pressable, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

function PlanOptionsModal({visible, onClose}) {
    return (
        <Modal
         visible={visible}
         transparent={true}
         animationType="fade"
         onRequestClose={onClose}>
         <Pressable style={styles.background} onPress={onClose}>
            <View style={styles.whiteBox}>
                <Pressable
                 style={styles.actionButton}>
                 <Text style={styles.actionText}>Place</Text>
                </Pressable>
                <Pressable
                 style={styles.actionButton}>
                 <Text style={styles.actionText}>Transportation</Text>
                </Pressable>
                <Pressable
                 style={styles.actionButton}>
                 <Text style={styles.actionText}>Rantal Home</Text>
                </Pressable>
                <Pressable
                 style={styles.actionButton}>
                 <Text style={styles.actionText}>Restaurant</Text>
                </Pressable>
            </View>
         </Pressable>

        </Modal>
    )
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteBox: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 4,
        elevation: 2,
    },
    actionButton: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
});

export default PlanOptionsModal;