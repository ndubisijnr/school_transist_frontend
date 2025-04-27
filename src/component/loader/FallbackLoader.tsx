import {ContainerLayout} from "@/view/layout/ContainerLayout";
import {View} from "react-native";
import LottieView from "lottie-react-native";

export const FallbackLoader = ()=>{

    return (
        <ContainerLayout>
            <View className={"flex-1 items-center justify-center"}>
                <LottieView
                    autoPlay
                    style={{
                        width: 60,
                        height: 60,
                    }}
                    resizeMode="cover"
                    source={require('@/assets/lottie/loading-1.json')}
                />
            </View>
        </ContainerLayout>
    )
}