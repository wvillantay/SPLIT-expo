import {StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import MapView, {Polyline, Marker} from 'react-native-maps'

const MapIntegration = ({width, height}) => {
    const [lineCoordinates, setLineCoordinates] = useState([])

    const handleMapPress = (event) => {
        const {coordinate} = event.nativeEvent
        setLineCoordinates([...lineCoordinates, coordinate])
    }

    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const polygonCoordinates = [
        {latitude: 37.78825, longitude: -122.4324},
        {latitude: 37.78825, longitude: -122.4024},
        {latitude: 37.75825, longitude: -122.4024},
        {latitude: 37.75825, longitude: -122.4324}
    ]
    return (
        <View style={{width: width, height: height}}>
            <MapView style={{...styles.map, width: '100%', height: '100%'}} initialRegion={initialRegion} minZoomLevel={3} maxZoomLevel={200} showsIndoors={false} onPress={handleMapPress}>
                {lineCoordinates.length > 1 && <Polyline coordinates={lineCoordinates} strokeWidth={4} fillColor="rgba(0, 200, 0, 0.5)" strokeColor="green" />}
                <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}} title="Me" description="My" />
            </MapView>
        </View>
    )
}

export default MapIntegration

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
})