import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import * as Location from 'expo-location';
import ErrorModal from './ErrorModal';
import LocationButton from './LocationButton';

import AdressSearchBar from './AddressSearchBar';

export default function App() {
  
  const mapView = useRef(null);
  const [userlocation, setUserLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
      }
    })();
  }, []);

  const goToUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    if (location === null) {
      return
    }

    mapView.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 1,
      longitudeDelta: 0.5,
    })
  }

  const setCoordinates = (latitude, longitude) => {
    mapView.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 1,
      longitudeDelta: 0.5,
    })
  }

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapView}
        style={styles.map}
        showsUserLocation={true}
      >
        {
          markerLocation !== null ? (
            <Marker
              coordinate={{
                latitude: markerLocation.latitude,
                longitude: markerLocation.longitude
              }}/>
          ) : null
        }
      </MapView>
      <ErrorModal 
        visible={errorMessage !== null} 
        errorMessage={errorMessage}/>
      <View style={styles.locationButtonContainer}>
        <LocationButton onTap={() => goToUserLocation(userlocation)}/>
      </View>
      <KeyboardAvoidingView behavior='position' style={styles.searchBarContainer}>
        <AdressSearchBar onFound={
          (latitude, longitude) => {
            setCoordinates(latitude, longitude)
            setMarkerLocation({latitude: latitude, longitude: longitude})
          }} />
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  locationButtonContainer: {
    position: "absolute",
    top: 64,
    left: 32
  },
  searchBarContainer: {
    position: "absolute",
    bottom: 56,
    left: 0,
    right: 0,
    padding: 32
  }
});
