import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PhotoCollage = ({
                          photos = [],
                          onPhotoPress,
                          maxHeight = 500,
                          spacing = 2,
                          headerTitle = 'Photo Collage',
                          loadingColor = '#0099ff',
                      }) => {
    const [layouts, setLayouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (photos.length > 0) {
            generateLayouts();
        }
    }, [photos]);

    const generateLayouts = () => {
        setLoading(true);

        // Different layout patterns based on number of photos
        switch (photos.length) {
            case 0:
                setLayouts([]);
                break;
            case 1:
                setLayouts([{ type: 'full', photos: photos.slice(0, 1) }]);
                break;
            case 2:
                setLayouts([{ type: 'row', photos: photos.slice(0, 2) }]);
                break;
            case 3:
                setLayouts([
                    { type: 'main', photos: photos.slice(0, 1) },
                    { type: 'row', photos: photos.slice(1, 3) },
                ]);
                break;
            case 4:
                setLayouts([
                    { type: 'row', photos: photos.slice(0, 2) },
                    { type: 'row', photos: photos.slice(2, 4) },
                ]);
                break;
            case 5:
                setLayouts([
                    { type: 'main', photos: photos.slice(0, 1) },
                    { type: 'grid', photos: photos.slice(1, 5) },
                ]);
                break;
            default:
                // For 6+ photos, show first 5 and indicate there are more
                const displayPhotos = photos.slice(0, 5);
                const remainingCount = photos.length - 5;

                setLayouts([
                    { type: 'main', photos: displayPhotos.slice(0, 1) },
                    {
                        type: 'grid',
                        photos: displayPhotos.slice(1, 5),
                        lastItemOverlay: remainingCount > 0 ? `+${remainingCount}` : null
                    },
                ]);
                break;
        }

        setLoading(false);
    };

    // Calculate dimensions for different layout types
    const getItemDimensions = (type, index, totalInRow) => {
        switch (type) {
            case 'full':
                return {
                    width: SCREEN_WIDTH - 16,
                    height: maxHeight,
                };
            case 'main':
                return {
                    width: SCREEN_WIDTH - 16,
                    height: maxHeight / 2,
                };
            case 'row':
                return {
                    width: (SCREEN_WIDTH - 16 - spacing * (totalInRow - 1)) / totalInRow,
                    height: maxHeight / 2,
                };
            case 'grid':
                if (index === 0) {
                    return {
                        width: (SCREEN_WIDTH - 16 - spacing) / 2,
                        height: maxHeight / 4,
                    };
                } else {
                    return {
                        width: (SCREEN_WIDTH - 16 - spacing * 2) / 2,
                        height: maxHeight / 4 - spacing / 2,
                    };
                }
            default:
                return {
                    width: SCREEN_WIDTH - 16,
                    height: maxHeight / 3,
                };
        }
    };

    const renderPhoto = (photo, layout, photoIndex, isLast = false, overlay = null) => {
        const { width, height } = getItemDimensions(
            layout.type,
            photoIndex,
            layout.photos.length
        );

        return (
            <TouchableOpacity
                key={`${photo.id || photoIndex}`}
                style={[
                    styles.photoContainer,
                    { width, height, marginRight: photoIndex < layout.photos.length - 1 ? spacing : 0 }
                ]}
                onPress={() => onPhotoPress && onPhotoPress(photo, photoIndex)}
                activeOpacity={0.9}
            >
                <Image
                    source={{ uri: photo.uri }}
                    style={styles.photo}
                    resizeMode="cover"
                />

                {isLast && overlay && (
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>{overlay}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderLayout = (layout, layoutIndex) => {
        switch (layout.type) {
            case 'full':
            case 'main':
                return (
                    <View key={`layout-${layoutIndex}`} style={styles.layoutContainer}>
                        {layout.photos.map((photo, photoIndex) =>
                            renderPhoto(photo, layout, photoIndex)
                        )}
                    </View>
                );
            case 'row':
                return (
                    <View key={`layout-${layoutIndex}`} style={[styles.layoutContainer, styles.rowLayout]}>
                        {layout.photos.map((photo, photoIndex) =>
                            renderPhoto(photo, layout, photoIndex)
                        )}
                    </View>
                );
            case 'grid':
                return (
                    <View key={`layout-${layoutIndex}`} style={[styles.layoutContainer, styles.gridLayout]}>
                        <View style={styles.gridLeft}>
                            {layout.photos.slice(0, 1).map((photo, photoIndex) =>
                                renderPhoto(photo, layout, photoIndex)
                            )}
                        </View>
                        <View style={styles.gridRight}>
                            {layout.photos.slice(1).map((photo, photoIndex) => {
                                const isLast = photoIndex === layout.photos.slice(1).length - 1;
                                return renderPhoto(
                                    photo,
                                    layout,
                                    photoIndex + 1,
                                    isLast,
                                    isLast ? layout.lastItemOverlay : null
                                );
                            })}
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={loadingColor} />
            </View>
        );
    }

    if (photos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No photos to display</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.headerText}>{headerTitle}</Text>
            <View style={styles.collageContainer}>
                {layouts.map((layout, index) => renderLayout(layout, index))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 8,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    collageContainer: {
        width: '100%',
    },
    layoutContainer: {
        marginBottom: 2,
    },
    rowLayout: {
        flexDirection: 'row',
    },
    gridLayout: {
        flexDirection: 'row',
    },
    gridLeft: {
        flex: 1,
        marginRight: 2,
    },
    gridRight: {
        flex: 1,
    },
    photoContainer: {
        overflow: 'hidden',
        borderRadius: 4,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
});

export default PhotoCollage;