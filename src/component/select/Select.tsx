import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * A customizable select/dropdown component for React Native with NativeWind
 *
 * @param {Object} props
 * @param {Array} props.options - Array of option objects with value and label
 * @param {any} props.value - Currently selected value
 * @param {Function} props.onValueChange - Function called when selection changes
 * @param {String} props.placeholder - Placeholder text when no value is selected
 * @param {String} props.label - Optional label text for the select
 * @param {Object} props.containerStyle - Additional style for the container
 * @param {Boolean} props.disabled - Whether the select is disabled
 * @param {Boolean} props.searchable - Whether to include search functionality
 * @param {String} props.searchPlaceholder - Placeholder text for search input
 */
const Select = ({
                    options = [],
                    value,
                    onValueChange,
                    placeholder = "Select an option",
                    label,
                    containerStyle = "",
                    disabled = false,
                    searchable = true,
                    searchPlaceholder = "Search options..."
                }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    // Find selected option to display its label
    const selectedOption = options.find(option => option.value === value);

    // Use useMemo to calculate filtered options instead of using state and useEffect
    const filteredOptions = useMemo(() => {
        if (searchQuery.trim() === '') {
            return options;
        } else {
            return options.filter(option =>
                option.label.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    }, [searchQuery, options]);

    // Reset search when modal opens
    useEffect(() => {
        if (isOpen) {
            setSearchQuery('');

            // Focus the search input when the modal opens (if searchable)
            if (searchable && searchInputRef.current) {
                setTimeout(() => {
                    searchInputRef.current.focus();
                }, 100);
            }
        }
    }, [isOpen, searchable]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (option) => {
        onValueChange(option.value);
        setIsOpen(false);
    };

    return (
        <View className={`w-full ${containerStyle}`}>
            {label && (
                <Text className="text-gray-700 mb-1 font-medium">{label}</Text>
            )}

            <TouchableOpacity
                activeOpacity={disabled ? 1 : 0.7}
                onPress={toggleDropdown}
                className={`flex-row mb-[20px] justify-between items-center p-3 border rounded-md ${
                    disabled ? "bg-gray-100 border-gray-300" : "bg-white border-gray-300"
                }`}
            >
                <Text className={`flex-1 ${!selectedOption ? "text-gray-500" : "text-gray-800"}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Feather
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={18}
                    color={disabled ? "#9CA3AF" : "#374151"}
                />
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable
                    className="flex-1 bg-black bg-opacity-20"
                    onPress={() => setIsOpen(false)}
                >
                    <View className="mt-20 mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
                        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                            <Text className="text-lg font-medium">Select Option</Text>
                            <TouchableOpacity onPress={() => setIsOpen(false)}>
                                <Feather name="x" size={24} color="#374151" />
                            </TouchableOpacity>
                        </View>

                        {searchable && (
                            <View className="px-4 py-2 border-b border-gray-100">
                                <View className="flex-row items-center bg-gray-100 rounded-md px-3 py-2">
                                    <Feather name="search" size={16} color="#9CA3AF" />
                                    <TextInput
                                        ref={searchInputRef}
                                        className="flex-1 ml-2 text-gray-800"
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        placeholder={searchPlaceholder}
                                        placeholderTextColor="#9CA3AF"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {searchQuery !== '' && (
                                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                                            <Feather name="x-circle" size={16} color="#9CA3AF" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}

                        {filteredOptions.length > 0 ? (
                            <FlatList
                                data={filteredOptions}
                                keyExtractor={(item) => item.value.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        className={`p-4 border-b border-gray-100 ${
                                            item.value === value ? "bg-blue-50" : ""
                                        }`}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <View className="flex-row items-center justify-between">
                                            <Text className={`${item.value === value ? "text-blue-600 font-medium" : "text-gray-800"}`}>
                                                {item.label}
                                            </Text>
                                            {item.value === value && (
                                                <Feather name="check" size={18} color="#2563EB" />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                )}
                                className="max-h-64"
                            />
                        ) : (
                            <View className="py-8 items-center justify-center">
                                <Feather name="inbox" size={24} color="#9CA3AF" />
                                <Text className="text-gray-500 mt-2">No options found</Text>
                            </View>
                        )}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default Select;