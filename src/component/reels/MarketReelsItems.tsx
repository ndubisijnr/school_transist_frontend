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
    Heart,
    MessageCircle,
    Share,
    ShoppingBag,
    MapPin,
    User
} from 'lucide-react';

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

    useEffect(() => {
        if (!paused && videoRef.current) {
            videoRef.current.playAsync();
        } else if (paused && videoRef.current) {
            videoRef.current.pauseAsync();
        }
    }, [paused]);

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
        <View className="flex-1 w-full h-full bg-black">
            <Pressable
                onPress={() => setPaused(!paused)}
                onLongPress={() => setMuted(!muted)}
                delayLongPress={200}
                onDoublePress={handleDoubleTap}
                className="flex-1"
            >
                {/* Video Player */}
                <Video
                    ref={videoRef}
                    source={{ uri: item.videoUri }}
                    className="absolute top-0 left-0 bottom-0 right-0"
                    resizeMode="cover"
                    isLooping
                    isMuted={muted}
                    shouldPlay={isActive && !paused}
                    useNativeControls={false}
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
                    <Heart fill="#fff" color="#fff" size={80} />
                </Animated.View>

                {/* Overlay Content */}
                <View className="absolute bottom-0 left-0 right-0 p-4 pb-16">
                    {/* Product Info */}
                    <TouchableOpacity
                        onPress={() => onViewProduct(item.product)}
                        className="flex-row items-center mb-4 bg-black/40 p-2 rounded-lg"
                    >
                        <ShoppingBag color="#fff" size={20} />
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
                                    <MapPin color="#fff" size={12} className="mr-1" />
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
                        <Heart
                            color="#fff"
                            fill={item.isLiked ? "#f91880" : "transparent"}
                            size={28}
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
                        <MessageCircle color="#fff" size={28} />
                        <Text className="text-white text-xs mt-1">
                            {formatNumber(item.comments)}
                        </Text>
                    </TouchableOpacity>

                    {/* Share Button */}
                    <TouchableOpacity
                        onPress={() => onShare(item.id)}
                        className="items-center"
                    >
                        <Share color="#fff" size={26} />
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