import React, { useContext } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions } from "react-native";
import MapViewStyle from './../../Utils/MapViewStyle.json'
import { UserLocationContex } from '../../Context/UserLocationContext';

export default function AppMapView() {
  
const {location,setLocation} = useContext(UserLocationContex)

   return location?.latitude &&  (
    <View style={styles.container}>
      <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
               
                customMapStyle={MapViewStyle}
                region={{
                  latitude:location?.latitude,
                  longitude:location?.longitude,
                  latitudeDelta:0.0422,
                  longitudeDelta:0.0421
                }}
                  
            >

              <Marker coordinate={{
                latitude:location?.latitude,
                longitude:location?.longitude
              }}>
             <Image source={require('./../../../assets/images/car.png')} style={{
              width:20,
              height:20
             }}></Image>

              </Marker>
            </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
      ...StyleSheet.absoluteFillObject,
      height: Dimensions.get("window").height,
  },
});
