import React, { useState, useRef } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    Text,
    ActivityIndicator
} from 'react-native';
import ReelItem from '@/component/reels/MarketReelsItems';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

// Sample data for reels
const REELS_DATA = [
    {
        id: '1',
        videoUri: 'https://cdn.pixabay.com/video/2024/09/01/229254_large.mp4', // Replace with actual video URL
        user: {
            id: '1',
            username: 'FashionHub',
            profilePic: 'https://randomuser.me/api/portraits/women/43.jpg',
            location: 'Lagos, Nigeria'
        },
        product: {
            name: 'Summer Floral Dress',
            price: '₦12,500',
            inStock: true
        },
        description: 'Perfect for summer outings! Our new floral collection is now available.',
        likes: 1243,
        comments: 89,
        isLiked: false,
    },
    {
        id: '2',
        videoUri: 'https://cdn.pixabay.com/video/2024/09/01/229254_large.mp4', // Replace with actual video URL
        user: {
            id: '2',
            username: 'TechGadgetsNG',
            profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
            location: 'Abuja, Nigeria'
        },
        product: {
            name: 'Wireless Earbuds Pro',
            price: '₦35,000',
            inStock: true
        },
        description: 'The best sound quality with active noise cancellation. Limited stock available!',
        likes: 3421,
        comments: 256,
        isLiked: true,
    },
    {
        id: '3',
        videoUri: 'https://cdn.pixabay.com/video/2024/09/01/229254_large.mp4', // Replace with actual video URL
        user: {
            id: '3',
            username: 'HomeStyleDecor',
            profilePic: 'https://randomuser.me/api/portraits/women/22.jpg',
            location: 'Port Harcourt, Nigeria'
        },
        product: {
            name: 'Minimalist Wall Clock',
            price: '₦8,700',
            inStock: false
        },
        description: 'Add a touch of elegance to your living space with our minimalist wall clocks.',
        likes: 872,
        comments: 43,
        isLiked: false,
    },
];

const ReelsScreen = () => {
    const [reels, setReels] = useState(REELS_DATA);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const flatListRef = useRef();

    const handleLike = (id) => {
        setReels(
            reels.map((reel) => {
                if (reel.id === id) {
                    return {
                        ...reel,
                        isLiked: !reel.isLiked,
                        likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
                    };
                }
                return reel;
            })
        );
    };

    const handleComment = (id) => {
        // This would open a comment modal in a real app
        console.log(`Open comment section for reel ${id}`);
        // In a real app, you would open a modal here to show comments
    };

    const handleShare = (id) => {
        // This would open a share sheet in a real app
        console.log(`Share reel ${id}`);
        // In a real app, you would open a share dialog here
    };

    const handleViewProduct = (product) => {
        // This would navigate to product page in a real app
        console.log(`View product: ${product.name}`);
        // In a real app, you would navigate to the product page
    };

    const handleViewProfile = (user) => {
        // This would navigate to user profile in a real app
        console.log(`View profile: ${user.username}`);
        // In a real app, you would navigate to the user profile
    };

    const handleScroll = (event) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.y / WINDOW_HEIGHT
        );
        setActiveIndex(index);
    };

    const loadMoreReels = () => {
        // In a real app, you would fetch more reels from an API
        if (!loading) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                // In a real app, you would append new reels from the API response
                setLoading(false);
            }, 2000);
        }
    };

    return (
                <View className="flex-1 ">

                <FlatList
                ref={flatListRef}
                data={reels}
                renderItem={({ item, index }) => (
                    <ReelItem
                        item={item}
                        isActive={index === activeIndex}
                        onLike={handleLike}
                        onComment={handleComment}
                        onShare={handleShare}
                        onViewProduct={handleViewProduct}
                        onViewProfile={handleViewProfile}
                    />
                )}
                keyExtractor={(item) => item.id}
                onScroll={handleScroll}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={WINDOW_HEIGHT}
                snapToAlignment="start"
                decelerationRate="fast"
                ListFooterComponent={
                    loading ? (
                        <View className="h-40 items-center justify-center">
                            <ActivityIndicator size="large" color="#fff" />
                            <Text className="text-white mt-2">Loading more...</Text>
                        </View>
                    ) : null
                }
            />
                </View>

    );
};

export default ReelsScreen;