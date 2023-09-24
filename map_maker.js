//All the imports we need
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = '#####################'; // I'd prefer if yall had your own key, have me test it since i have, but I can't share my key
//const iconBase  = ('/unnamed.png');//this is to change since the custom markers are giving me issues

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  
  useEffect(() => {
    (async () => {
      // yadayada to ask for permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // this has the user's location info dudes
      const locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0018,
            longitudeDelta: 0.0018,
          }}
          
          provider={MapView.PROVIDER_GOOGLE}
          //we do this to make sure only the custom marker is visible
          //showsUserLocation={false}
          showsUserLocation={true}
          customMapStyle={[
            
          ]}
        >  
        </MapView>
      )}
    </View>
  );
};

//Styling pizaaz goes here
const styles = StyleSheet.create({
  container: {
     width :350, height: 450, flex:1
  },
  map: {
    width :380, height: 450
  },
});

export default MapComponent;
