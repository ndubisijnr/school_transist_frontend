import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Image
} from 'react-native';
import {Feather} from "@expo/vector-icons";
import {RouterUtil} from "@/utility/RouterUtil";
import Select from "@/component/select/Select";
import {useAppDispatch, useAppSelector} from "@/store";
import app from "@/store/modules/app";
import { DefaultTextInput } from '@/component/textInput/DefaultTextInput';
import {CreateHubRequest, CreateHubRequestType} from "@/model/request/app/AppRequest";
import {showMessage} from "@/utility/hook/useToast";
import {useFormik} from "formik";

const DriverRegistrationScreen = ({handleOnClick}) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [genderValue, setGenderValue] = useState(null);
    const [vehicleCapacityValue, setVehicleCapacityValue] = useState(null);
    const [vehicleTypeValue, setVehicleTypeValue] = useState(null);
    const dispatch = useAppDispatch();
    const [studentRef, setStudentRef] = useState(CreateHubRequest);

    const {loading, unis} = useAppSelector(state => state.app);
    const {userDetails} = useAppSelector(state => state.auth);

    const options:any = unis?.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    })
    const genderOptions:any = [{

            value: "male",
            label: "Male"

    },{

            value: "female",
            label: "Female"

    }]

    const vehicleTypeOptions:any = [{

        value: "motorcycle",
        label: "motorcycle"

    },{

        value: "car",
        label: "car"

    },{

        value: "tricylce",
        label: "tricylce"

    }]

    const vehicleCapacityOptions:any = [{

        value: "one",
        label: "one seater"

    },{

        value: "two",
        label: "two seater"

    }]


    async function handleSubmit (values: CreateHubRequestType){
        values.uni_id = selectedValue
        values.user_id = userDetails?.user?.id
        values.driver_gender = genderValue
        values.driver_vehicle_capacity = vehicleCapacityValue
        values.driver_vehicle_type = vehicleTypeValue


        console.log(values)

        try{
            const response = await dispatch(app.action.createHub(values))
            console.log('response====', response.payload)
            if (response?.payload?.code === "00"){
                await handleOnClick()
                RouterUtil.navigate('dashboard.homeScreen', { screen: 'Home Screen' });
            }else {
                showMessage(response?.payload?.message)
            }
        }catch (err){
            showMessage(err.error.message)
            console.log(err);
        }
    }

    const formik = useFormik({
        initialValues: studentRef,
        onSubmit: handleSubmit,

    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>Create a Hub Account</Text>

                    {/* Back to selection link */}
                    <TouchableOpacity
                        style={styles.backLink}
                        onPress={handleOnClick}
                    >
                        <Feather name="arrow-left" size={24} color="black" />
                        <Text style={styles.backLinkText}>Back to selection</Text>
                    </TouchableOpacity>

                    {/* Form Fields */}
                    <View style={styles.formContainer}>
                        {/* Business Name */}
                        <View style={styles.inputGroup}>
                            <DefaultTextInput formik={formik} name={'driver_fullname'} label={'Full name'}></DefaultTextInput>
                        </View>

                        <Select
                            label="Gender"
                            options={genderOptions}
                            value={genderValue}
                            onValueChange={setGenderValue}
                            placeholder="Select Gender"
                            searchable={false}
                        />

                        <Select
                            label="Select Your University"
                            options={options}
                            value={selectedValue}
                            onValueChange={setSelectedValue}
                            placeholder="Choose your university"
                            searchable={true}
                            searchPlaceholder="Find your university..."
                        />

                        <View style={styles.inputGroup}>
                            <DefaultTextInput formik={formik} name={'driver_vehicle_name'} label={'Vehicle Name'} placeholder="Toyota Camery"></DefaultTextInput>
                        </View>

                        <View style={styles.inputGroup}>
                            <DefaultTextInput formik={formik} name={'driver_vehicle_color'} label={'Vehicle Color'} placeholder="red"></DefaultTextInput>
                        </View>

                        <Select
                            label="Vehicle Type"
                            options={vehicleTypeOptions}
                            value={vehicleTypeValue}
                            onValueChange={setVehicleTypeValue}
                            placeholder="Choose Vehicle Type"
                            searchable={false}
                        />

                        <Select
                            label="Vehicle Capacity"
                            options={vehicleCapacityOptions}
                            value={vehicleCapacityValue}
                            onValueChange={setVehicleCapacityValue}
                            placeholder="Choose Vehicle Capacity"
                            searchable={false}
                        />




                        {/* Register Button */}
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => formik.handleSubmit()}
                            disabled={loading}
                            className="relative"
                        >
                            {loading && (<ActivityIndicator size='small' className="absolute right-0 left-0 top-0 bottom-0" />)}

                            <Text style={styles.registerButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 8,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    userIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIcon: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    backLinkIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
        tintColor: '#1a73e8',
    },
    backLinkText: {
        color: '#1a73e8',
        fontSize: 14,
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    inputHelper: {
        fontSize: 12,
        color: '#757575',
        marginTop: 4,
    },
    registerButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    registerButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default DriverRegistrationScreen;