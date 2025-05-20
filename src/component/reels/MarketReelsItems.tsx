import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Pressable,
} from 'react-native';
import { Video } from 'expo-av';
import {
    MaterialIcons,
    FontAwesome,
    Feather,
    MaterialCommunityIcons
} from '@expo/vector-icons';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const ReelItem = ({
                      item,
                      isActive,
                      onLike,
                      onComment,
                      onShare,
                      onViewProduct,
                      onViewProfile
                  }) => {
    const [paused, setPaused] = useState(!isActive);
    const [muted, setMuted] = useState(false);
    const videoRef = useRef(null);
    const likeAnimation = useRef(new Animated.Value(0)).current;
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            if (!paused && isActive) {
                videoRef.current.playAsync();
            } else {
                videoRef.current.pauseAsync();
            }
        }
    },[paused]);

    useEffect(() => {
        setPaused(!isActive);
    }, [isActive]);

    const handleDoubleTap = () => {
        if (!item.isLiked) {
            onLike(item.id);
            Animated.sequence([
                Animated.timing(likeAnimation, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(likeAnimation, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const likeAnimationStyle = {
        opacity: likeAnimation,
        transform: [
            {
                scale: likeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1.2],
                }),
            },
        ],
    };

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    return (
        <View className="flex-1 w-full" style={{height:WINDOW_HEIGHT-50}}>
            <Pressable
                onPress={() => {
                    setPaused(!paused)
                    console.log(paused)
                }}
                onLongPress={() => setMuted(!muted)}
                delayLongPress={200}
                className="flex-1"
            >
                {/* Video Player */}
                <Video
                    ref={videoRef}
                    source={{ uri: item.videoUri }}
                    className="absolute top-0 left-0 bottom-0 right-0"
                    isLooping
                    isMuted={muted}
                    shouldPlay={isActive && videoLoaded}
                    useNativeControls={false}
                    onError={(error) => console.log('Video error:', error)}
                    onLoad={() => {console.log('Video loaded successfully'),setVideoLoaded(true)}}
                    onLoadStart={() => console.log('Video loading started')}
                />

                {/* Double tap heart animation */}
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginLeft: -40,
                            marginTop: -40,
                        },
                        likeAnimationStyle,
                    ]}
                >
                    <FontAwesome name="heart" size={80} color="#fff" />
                </Animated.View>

                {/* Overlay Content */}
                <View className="absolute bottom-0 left-0 right-0 p-4 pb-16">
                    {/* Product Info */}
                    <TouchableOpacity
                        onPress={() => onViewProduct(item.product)}
                        className="flex-row items-center mb-4 bg-black/40 p-2 rounded-lg"
                    >
                        <MaterialCommunityIcons name="shopping" size={20} color="#fff" />
                        <View className="ml-2 flex-1">
                            <Text className="text-white font-medium text-base">{item.product.name}</Text>
                            <View className="flex-row items-center justify-between mt-1">
                                <Text className="text-white font-bold">{item.product.price}</Text>
                                <View className="px-2 py-0.5 rounded-full bg-white/20">
                                    <Text className={`text-xs ${item.product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Description and User Info */}
                    <View className="mb-4">
                        {/* User info */}
                        <TouchableOpacity
                            onPress={() => onViewProfile(item.user)}
                            className="flex-row items-center mb-2"
                        >
                            <Image
                                source={{ uri: item.user.profilePic }}
                                className="w-10 h-10 rounded-full border border-white"
                            />
                            <View className="ml-2 flex-1">
                                <Text className="text-white font-semibold">{item.user.username}</Text>
                                <View className="flex-row items-center">
                                    <MaterialIcons name="location-on" size={12} color="#fff" style={{ marginRight: 4 }} />
                                    <Text className="text-white/80 text-xs">{item.user.location}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Description */}
                        <Text className="text-white/90 text-sm">{item.description}</Text>
                    </View>
                </View>

                {/* Side Action Buttons */}
                <View className="absolute right-4 bottom-32 items-center space-y-6">
                    {/* Like Button */}
                    <TouchableOpacity
                        onPress={() => onLike(item.id)}
                        className="items-center"
                    >
                        <FontAwesome
                            name="heart"
                            size={28}
                            color="#fff"
                            style={{ color: item.isLiked ? "#f91880" : "#fff" }}
                            solid={item.isLiked}
                        />
                        <Text className="text-white text-xs mt-1">
                            {formatNumber(item.likes)}
                        </Text>
                    </TouchableOpacity>

                    {/* Comment Button */}
                    <TouchableOpacity
                        onPress={() => onComment(item.id)}
                        className="items-center"
                    >
                        <MaterialIcons name="chat-bubble-outline" size={28} color="#fff" />
                        <Text className="text-white text-xs mt-1">
                            {formatNumber(item.comments)}
                        </Text>
                    </TouchableOpacity>

                    {/* Share Button */}
                    <TouchableOpacity
                        onPress={() => onShare(item.id)}
                        className="items-center"
                    >
                        <Feather name="share" size={26} color="#fff" />
                        <Text className="text-white text-xs mt-1">Share</Text>
                    </TouchableOpacity>
                </View>

                {/* Video Paused Indicator */}
                {paused && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-black/30">
                        <View className="w-20 h-20 items-center justify-center rounded-full bg-black/50">
                            <Text className="text-white text-5xl">▶️</Text>
                        </View>
                    </View>
                )}
            </Pressable>
        </View>
    );
};

export default ReelItem;