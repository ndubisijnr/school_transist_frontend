import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const DummyMapComponent = () => {
    const [markers, setMarkers] = useState([
        { id: 1, x: 80, y: 120, title: 'Lagos Island', color: 'bg-red-500' },
        { id: 2, x: 180, y: 180, title: 'Victoria Island', color: 'bg-blue-500' },
        { id: 3, x: 140, y: 240, title: 'Ikoyi', color: 'bg-green-500' },
    ]);

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [mapType, setMapType] = useState('standard');

    const handleMapPress = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        const newMarker = {
            id: Date.now(),
            x: locationX,
            y: locationY,
            title: 'New Location',
            color: 'bg-purple-500'
        };
        setMarkers([...markers, newMarker]);
    };

    const clearCustomMarkers = () => {
        Alert.alert(
            'Clear Markers',
            'Remove all custom markers?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', onPress: () => setMarkers(markers.slice(0, 3)) },
            ]
        );
    };

    return (
        <>


            <View className="flex-1 absolute w-full h-[100%] left-0 z-[-1] right-0 top-0 bottom-0 rounded-lg overflow-hidden">
                {/*<View className="flex-1">*/}

                {/*    /!* Selected Marker Info *!/*/}
                {/*    {selectedMarker && (*/}
                {/*        <View className="mx-4 mb-4 bg-white rounded-lg shadow-lg p-4">*/}
                {/*            <View className="flex-row items-center justify-between mb-2">*/}
                {/*                <View className="flex-row items-center">*/}
                {/*                    <View className={`w-4 h-4 ${selectedMarker.color} rounded-full mr-3`} />*/}
                {/*                    <Text className="text-gray-800 text-lg font-bold">*/}
                {/*                        {selectedMarker.title}*/}
                {/*                    </Text>*/}
                {/*                </View>*/}
                {/*                <TouchableOpacity*/}
                {/*                    onPress={() => setSelectedMarker(null)}*/}
                {/*                    className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"*/}
                {/*                >*/}
                {/*                    <Text className="text-gray-600 text-lg">×</Text>*/}
                {/*                </TouchableOpacity>*/}
                {/*            </View>*/}
                {/*            <Text className="text-gray-600 text-sm">*/}
                {/*                Position: ({selectedMarker.x.toFixed(0)}, {selectedMarker.y.toFixed(0)})*/}
                {/*            </Text>*/}
                {/*            <Text className="text-gray-500 text-xs mt-1">*/}
                {/*                Tap marker to select • Tap map to add new markers*/}
                {/*            </Text>*/}
                {/*        </View>*/}
                {/*    )}*/}

                {/*</View>*/}

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handleMapPress}
                    className={`flex-1 relative ${
                        mapType === 'standard'
                            ? 'bg-green-100'
                            : 'bg-gray-600'
                    }`}
                >
                    {/* Map Grid Pattern */}
                    <View className="absolute inset-0">
                        {/* Vertical lines */}
                        {Array.from({ length: 6 }).map((_, i) => (
                            <View
                                key={`v-${i}`}
                                className={`absolute w-px ${
                                    mapType === 'standard' ? 'bg-green-200' : 'bg-gray-500'
                                }`}
                                style={{
                                    left: (i * width) / 6,
                                    top: 0,
                                    bottom: 0,
                                }}
                            />
                        ))}
                        {/* Horizontal lines */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <View
                                key={`h-${i}`}
                                className={`absolute h-px w-full ${
                                    mapType === 'standard' ? 'bg-green-200' : 'bg-gray-500'
                                }`}
                                style={{
                                    top: (i * 300) / 8,
                                }}
                            />
                        ))}
                    </View>

                    {/* Map Features (Roads/Rivers) */}
                    {mapType === 'standard' && (
                        <>
                            {/* Simulated roads */}
                            <View className="absolute opacity-60"
                                  style={{ left: 50, top: 0, width: 3, height: '100%' }} />
                            <View className="absolute bg-gray-300 opacity-60"
                                  style={{ left: 150, top: 0, width: 3, height: '100%' }} />
                            <View className="absolute bg-gray-300 opacity-60"
                                  style={{ left: 0, top: 100, width: '100%', height: 3 }} />
                            <View className="absolute bg-gray-300 opacity-60"
                                  style={{ left: 0, top: 200, width: '100%', height: 3 }} />

                            {/* Simulated water body */}
                            <View className="absolute bg-blue-200 opacity-60 rounded-full"
                                  style={{ left: 200, top: 150, width: 80, height: 60 }} />
                        </>
                    )}

                    {/* Markers */}
                    {markers.map((marker) => (
                        <TouchableOpacity
                            key={marker.id}
                            onPress={() => setSelectedMarker(marker)}
                            className={`absolute w-8 h-8 ${marker.color} rounded-full items-center justify-center shadow-lg border-2 border-white`}
                            style={{
                                left: marker.x - 16,
                                top: marker.y - 16,
                            }}
                        >
                            <View className="w-2 h-2 bg-white rounded-full" />
                        </TouchableOpacity>
                    ))}

                    {/* Zoom Controls */}
                    <View className="absolute top-4 right-4">
                        <TouchableOpacity className="bg-white w-10 h-10 rounded-lg mb-2 items-center justify-center shadow-md">
                            <Text className="text-gray-700 text-lg font-bold">+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-white w-10 h-10 rounded-lg items-center justify-center shadow-md">
                            <Text className="text-gray-700 text-lg font-bold">−</Text>
                        </TouchableOpacity>
                    </View>

                    {/* My Location Button */}
                    <TouchableOpacity className="absolute bottom-4 right-4 bg-white w-12 h-12 rounded-full items-center justify-center shadow-md">
                        <View className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                    </TouchableOpacity>

                    {/* Compass */}
                    <View className="absolute top-4 left-4 bg-white w-12 h-12 rounded-full items-center justify-center shadow-md">
                        <Text className="text-red-500 text-xs font-bold">N</Text>
                        <View className="absolute w-6 h-0.5 bg-red-500" />
                        <View className="absolute w-0.5 h-6 bg-red-500" />
                    </View>
                </TouchableOpacity>
            </View>

        </>
    );
};

export default DummyMapComponent;