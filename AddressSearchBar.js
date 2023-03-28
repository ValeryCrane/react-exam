import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const searchQuery = "http://api.positionstack.com/v1/forward?access_key=591b02c794c2f12a98012b6d37040ab4&query="

// Отвечает за серчбар и поиск координат.
export default function AdressSearchBar({ onFound }) {

    const [input, setInput] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [hasError, setHasError] = useState(false)

    const startSearch = () => {
        if (input === '') {
            return
        }

        setButtonDisabled(true)
        searchLocation(input)
    }

    const searchLocation = (adress) => {
        fetch(searchQuery + adress)
            .then((response) => response.json())
            .then((json) => {
                if (json.data.length > 1) {
                    onFound(json.data[0].latitude, json.data[0].longitude)
                } else {
                    setHasError(true)
                }
                setButtonDisabled(false)
            })
    }

    useEffect(() => {
        setHasError(false)
    }, [input])

    return (
        <View style={styles.searchBarContainer}>
            <TextInput 
                style={[styles.searchBar, {
                    backgroundColor: (hasError ? '#fdd' : '#fff')
                }]}
                placeholder={"Search..."}
                autoCorrect={false}
                onChangeText={(text) => setInput(text)}/>
            <TouchableOpacity 
                style={[styles.searchButton, {
                    backgroundColor: (buttonDisabled ? '#77a' : '#33a')
                }]} 
                disabled={buttonDisabled}
                activeOpacity={1}
                onPress={() => startSearch()}>
                <FontAwesome name="search" size={16} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row'
      },
      searchBar: {
        height: 48,
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 24,
        flex: 1
      },
      searchButton: {
        height: 48,
        width: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: "center",
        marginLeft: 16
      }
})