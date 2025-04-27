import ActionSheet, {SheetManager} from "react-native-actions-sheet";
import {StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";

export const ExampleActionSheet = ()=> {

    console.log("example")

    useEffect(() => {
        // SheetManager.hide('example-sheet');

    }, []);
    return (

        <View style={{ width: "100%" }}>
            <ActionSheet containerStyle={{minHeight: 500}}
                         headerAlwaysVisible={true}
                               gestureEnabled={true}   closeOnPressBack={false} initialSnapIndex={1} snapPoints={[30, 60]}>
                <View>
                    <Text>Hi, I am here.</Text>
                    <DefaultTextInput
                        containerClassname={"w-full"}
                        // onChangeText={(text)=> handleSearch(text)}
                        placeholderTextColor={"rgba(42, 44, 43, 0.4)"}
                        placeholder={"Search..."}
                    />
                </View>
            </ActionSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        // backgroundColor: "red"
    },
    rootContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 999,
    },
})