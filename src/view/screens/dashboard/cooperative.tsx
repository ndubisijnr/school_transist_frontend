import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, ScrollView} from "react-native";
import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import Cooporatives from "@/assets/image/undraw_connected_0xor_org.svg"
import {Ionicons} from "@expo/vector-icons"
import {RouterUtil} from "@/utility/RouterUtil";
import { Feather } from '@expo/vector-icons';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import Bg from "@/assets/image/undraw_connection_ts3f.svg"

const WeatherIcon = ({ name }) => (
    <Feather name={name} size={18} color="#4B5563" />
);

const ChevronLeft = () => <Feather name="chevron-left" size={24} color="#000" />;
const ChevronRight = () => <Feather name="chevron-right" size={20} color="#000" />;

const CooperativeScreen  = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentScreen, setCurrentScreen] = useState('0');
    const authState = useSelector((state: RootState) => state.auth)
    const user = authState?.userDetails

    const handleProceed = ()  => {
        setCurrentScreen('join-interest')
    }

    const InterestSelectionScreen = () => {
        const [selectedInterests, setSelectedInterests] = useState([]);

        const interests = [
            { id: 1, name: 'Art' },
            { id: 2, name: 'Music' },
            { id: 3, name: 'Books' },
            { id: 4, name: 'Science' },
            { id: 5, name: 'Science' },
            { id: 6, name: 'Science' },
            { id: 7, name: 'Science' },
            { id: 8, name: 'Music' },
            { id: 9, name: 'Books' },
            { id: 10, name: 'Music' },
            { id: 11, name: 'Books' },
            { id: 12, name: 'Music' },
            { id: 13, name: 'Books' },
            { id: 14, name: 'Music' },
            { id: 15, name: 'Books' },
            // You can add more interests here
        ];

        const toggleInterest = (interestId) => {
            if (selectedInterests.includes(interestId)) {
                setSelectedInterests(selectedInterests.filter(id => id !== interestId));
            } else {
                setSelectedInterests([...selectedInterests, interestId]);
            }
        };

        const isSelected = (interestId) => {
            return selectedInterests.includes(interestId);
        };

        return (
        
            <View className={'flex-1 pl-5'}>
                <TouchableOpacity className="flex-row items-center" onPress={() => setCurrentScreen('1')}>
                    <Ionicons name="chevron-back" size={30} color="#000" />
                    {/*<Text className="text-xl font-semibold ml-1">DCY Cooperatives</Text>*/}
                </TouchableOpacity>

                <View className="p-5">
                    <View className={'mb-6'}>
                            <Text className={'text-2xl font-bold mb-1'}>Hi {`${selectedOption === 'join' ? user?.first_name : 'Business_name'}`}</Text>
                            <Text className={'text-lg'}>Let know what {selectedOption === 'join' ? 'you are interested in' : 'services your business can offer'}</Text>
                        </View>

                    <View className={'mb-8'}>
                        <View className={'flex-row flex-wrap m-1'}>
                            {interests.map((interest) => (
                                <TouchableOpacity
                                    key={interest.id}
                                    onPress={() => toggleInterest(interest.id)}
                                    className={`m-1 px-4 py-2 rounded-full border ${
                                        isSelected(interest.id)
                                            ? 'bg-blue-500 border-blue-500'
                                            : 'bg-white border-gray-300'
                                    }`}
                                >
                                    <Text
                                        className={`${isSelected(interest.id) ? 'text-white' : 'text-gray-800'}`}
                                    >
                                        {interest.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        className={'bg-orange-400 py-3 px-6 rounded-lg items-center'}
                        onPress={() => console.log('Selected interests:', selectedInterests)}>
                        <Text className={'text-white font-medium text-lg'}>Continue</Text>
                    </TouchableOpacity>
                </View>


            </View>
           
        );
    };

    useEffect(() => {
        console.log(user)

    }, [currentScreen, selectedOption]);

    return (
        <ContainerScrollViewLayout>
            {currentScreen === '0' && (
                <>
                    <TouchableOpacity className="pl-5" onPress={() => RouterUtil.goBack()}>
                        <Ionicons name="chevron-back" size={30} color="#000" />
                    </TouchableOpacity>
                    <View className="flex-1 justify-center p-5">
                        <Cooporatives width="100%" height={300} />


                        {/* Bottom section with heading and text */}
                        <>
                            <View className="p-5 items-center">
                                <Text className="text-3xl font-bold mb-4">DCY Cooperatives</Text>
                                <Text className="text-[#666D80] text-[16px] text-center text-lg mb-4 w-[342px]">
                                    Jon DCY Cooperatives and thousands of online business grow
                                </Text>
                            </View>
                            <View className="pl-4 pr-4">
                                <TouchableOpacity
                                    onPress={() => setCurrentScreen('1')}
                                    className="w-full py-4 bg-orange-400 rounded-[14px] items-center"
                                >
                                    <Text className="text-white text-lg font-semibold">Proceed</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    </View>
                </>
            )}

            {currentScreen === '1' && (
                <>
                    <View className="bg-white rounded-lg mb-6 pl-5">

                        <TouchableOpacity className="flex-row items-center" onPress={() => setCurrentScreen('0')}>
                            <Ionicons name="chevron-back" size={30} color="#000" />
                            {/*<Text className="text-xl font-semibold ml-1">DCY Cooperatives</Text>*/}
                        </TouchableOpacity>

                        {/* Decision tree visualization */}
                        <View className="p-5">
                                <Text className="text-[14px] font-[300] mb-4 text-left">
                                    Join Cooperatives, build and grow your business. request orders, loans and so on.
                                </Text>
                                <View className="p-10">

                                    {/* Vertical line is handled with absolute positioning */}
                                    {/*<View className="absolute left-3 bg-black" style={{ width: 2, top: 10, bottom: 100 }}/>*/}

                                    {/* Option 1 */}
                                    <TouchableOpacity
                                        className={`mb-6 ${selectedOption === 'existing' ? 'translate-x-2' : ''}`}
                                        onPress={() => setSelectedOption('existing')}
                                        activeOpacity={0.7}
                                    >
                                        {/* Horizontal line connecting to chevron */}
                                        <View
                                            className="absolute left-0 top-6 bg-black"
                                            style={{ height: 2, width: 32, left: -28 }}
                                        />

                                        <View className={`flex-row items-center p-3 rounded-md ${
                                            selectedOption === 'existing' ? 'bg-orange-300' : 'bg-white'
                                        }`}>
                                            <ChevronRight />
                                            <Text className={`font-medium ml-2 ${selectedOption === 'existing' ? 'text-white' : 'text-black'}`}>Use existing business</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {/* Option 2 */}
                                    {/*<TouchableOpacity*/}
                                    {/*    className={`mb-6 ${selectedOption === 'create' ? 'translate-x-2' : ''}`}*/}
                                    {/*    onPress={() => setSelectedOption('create')}*/}
                                    {/*    activeOpacity={0.7}>*/}
                                    {/*    /!* Horizontal line connecting to chevron *!/*/}
                                    {/*    <View*/}
                                    {/*        className="absolute left-0 top-6 bg-black"*/}
                                    {/*        style={{ height: 2, width: 32, left: -28 }}*/}
                                    {/*    />*/}

                                    {/*    <View className={`flex-row items-center p-3 rounded-md ${*/}
                                    {/*        selectedOption === 'create' ? 'bg-orange-300' : 'bg-white'*/}
                                    {/*    }`}>*/}
                                    {/*        <ChevronRight />*/}
                                    {/*        <Text className={`font-medium ml-2 ${selectedOption === 'create' ? 'text-white' : 'text-black'}`}>Create A business</Text>*/}
                                    {/*    </View>*/}
                                    {/*</TouchableOpacity>*/}

                                    {/*/!* Divider *!/*/}
                                    {/*<View className="mb-6 relative">*/}
                                    {/*    <View className="h-px bg-black w-full" />*/}
                                    {/*    <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">*/}
                                    {/*        <Text className="bg-white px-4 ">OR</Text>*/}
                                    {/*    </View>*/}
                                    {/*</View>*/}

                                    {/* Option 3 */}
                                    <TouchableOpacity
                                        className={`mb-6 ${selectedOption === 'join' ? 'translate-x-2' : ''}`}
                                        onPress={() => {
                                            setSelectedOption('join')
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        {/* Horizontal line connecting to chevron */}
                                        <View
                                            className="absolute left-0 top-6 bg-black"
                                            style={{ height: 2, width: 32, left: -28 }}
                                        />

                                        <View className={`flex-row items-center p-3 rounded-md ${
                                            selectedOption === 'join' ? 'bg-orange-300' : 'bg-white'
                                        }`}>
                                            <ChevronRight />
                                            <Text className={`font-medium ml-2 ${selectedOption === 'join' ? 'text-white' : 'text-black'}`}>Join as an individual</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            {selectedOption && (
                                <>


                                    <Text className="text-[16px] font-[400] mb-4">
                                        By clicking proceed you agree to Azapal's <Text className="text-orange-400">terms and use of services</Text>
                                    </Text>
                                    <View className="">
                                        <TouchableOpacity
                                            onPress={handleProceed}

                                            className="w-full py-4 bg-orange-400 rounded-[14px] items-center"
                                        >
                                            <Text className="text-white text-lg font-semibold">Proceed</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                            </View>


                    </View>
                </>
            )}

            {currentScreen === 'join-interest' && (
                <InterestSelectionScreen />
            )}

            {
                currentScreen !== '0' && (
                    <View className="absolute right-3 bottom-0 z-[-1]">
                        <Bg width={200} />
                    </View>
                    // <View className="relative">
                    //
                    // </View>
                )
            }


        </ContainerScrollViewLayout>
    )
}
export default CooperativeScreen;