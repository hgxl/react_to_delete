import React, { Component } from 'react'
import {
   StyleSheet
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps'



export default CustomMapView = (props) => {
  var markers = [
    {
      latitude: 28.485833,
      longitude: -80.544444,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive'
    }
  ];
  
   return (
     
    <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.container}
    annotation={markers}
    region={{
        latitude: 28.485833,
        longitude: -80.544444,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }}
    showsUserLocation={true}
>
<Marker coordinate={{
        latitude: 28.485833,
        longitude: -80.544444}}>
</Marker>
</MapView>
   )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });