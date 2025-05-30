import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapComponent = () => {
    const mapRef = useRef(null);
    const [region, setRegion] = useState({
        latitude: 6.5244, // Lagos, Nigeria
        longitude: 3.3792,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [markers, setMarkers] = useState([
        {
            id: 1,
            coordinate: { latitude: 6.5244, longitude: 3.3792 },
            title: 'Lagos Island',
            description: 'Commercial center of Lagos',
        },
        {
            id: 2,
            coordinate: { latitude: 6.4474, longitude: 3.3903 },
            title: 'Ikoyi',
            description: 'Upscale residential area',
        },
        {
            id: 3,
            coordinate: { latitude: 6.4969, longitude: 3.3567 },
            title: 'Victoria Island',
            description: 'Business district',
        },
    ]);

    const [mapType, setMapType] = useState('standard');

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        const newMarker = {
            id: Date.now(),
            coordinate,
            title: 'New Location',
            description: `Lat: ${coordinate.latitude.toFixed(4)}, Lng: ${coordinate.longitude.toFixed(4)}`,
        };
        setMarkers([...markers, newMarker]);
    };

    const centerMap = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 1000);
        }
    };

    const toggleMapType = () => {
        setMapType(mapType === 'standard' ? 'satellite' : 'standard');
    };

    const clearMarkers = () => {
        Alert.alert(
            'Clear Markers',
            'Are you sure you want to remove all custom markers?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    onPress: () => {
                        setMarkers(markers.slice(0, 3)); // Keep original 3 markers
                    },
                },
            ]
        );
    };

    return (
        <View className="flex-1 bg-gray-100">
            {/* Header */}
            <View className="bg-blue-600 pt-12 pb-4 px-4 shadow-lg">
    <Text className="text-white text-xl font-bold text-center">
        Interactive Map
    </Text>
    </View>

    {/* Map Container */}
    <View className="flex-1 m-4 rounded-lg overflow-hidden shadow-lg">
    <MapView
        ref={mapRef}
    provider={PROVIDER_GOOGLE}
    className="flex-1"
    initialRegion={region}
    mapType={mapType}
    showsUserLocation={true}
    showsMyLocationButton={false}
    onPress={handleMapPress}
    onRegionChangeComplete={setRegion}
        >
        {markers.map((marker) => (
                <Marker
                    key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.id <= 3 ? 'red' : 'blue'}
    />
))}
    </MapView>
    </View>

    {/* Control Panel */}
    <View className="bg-white mx-4 mb-4 rounded-lg shadow-lg p-4">
    <View className="flex-row justify-between items-center mb-3">
    <Text className="text-gray-700 font-semibold text-lg">
        Map Controls
    </Text>
    <Text className="text-gray-500 text-sm">
        {markers.length} markers
    </Text>
    </View>

    <View className="flex-row justify-between space-x-2">
    <TouchableOpacity
        onPress={centerMap}
    className="flex-1 bg-blue-500 py-3 px-4 rounded-lg"
    >
    <Text className="text-white text-center font-medium">
        Center Map
    </Text>
    </TouchableOpacity>

    <TouchableOpacity
    onPress={toggleMapType}
    className="flex-1 bg-green-500 py-3 px-4 rounded-lg mx-1"
    >
    <Text className="text-white text-center font-medium">
    {mapType === 'standard' ? 'Satellite' : 'Standard'}
    </Text>
    </TouchableOpacity>

    <TouchableOpacity
    onPress={clearMarkers}
    className="flex-1 bg-red-500 py-3 px-4 rounded-lg"
    >
    <Text className="text-white text-center font-medium">
        Clear
        </Text>
        </TouchableOpacity>
        </View>
        </View>

    {/* Instructions */}
    <View className="bg-yellow-50 mx-4 mb-4 rounded-lg p-3 border-l-4 border-yellow-400">
    <Text className="text-yellow-800 text-sm text-center">
        Tap anywhere on the map to add a new marker
    </Text>
    </View>
    </View>
);
};

export default MapComponent;