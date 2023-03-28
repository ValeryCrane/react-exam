import React from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';

export default function ErrorModal({ visible, errorMessage }) {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.container}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000aa",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    errorMessage: {
        color: '#ddd',
        fontSize: 16,
        textAlign: 'center'
    }
})