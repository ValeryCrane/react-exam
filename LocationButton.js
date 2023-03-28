import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LocationButton({ onTap }) {
    return (
        <TouchableOpacity style={styles.button}onPress={() => onTap()}>
            <Ionicons name="locate" size={24} color="black" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})