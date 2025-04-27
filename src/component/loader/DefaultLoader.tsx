import {View} from "react-native";
import LoaderIcon from "@/assets/icon/loading-icon.svg";
import {MotiView} from "moti";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {DefaultModal} from "@/component/modal/modules/DefaultModal";
import {useTheme} from "@/libs/useTheme";

export const DefaultLoader = () => {
    const baseState = useSelector((state: RootState) => state.base);

    const theme = useTheme()

    return (
        <DefaultModal visible={baseState.loading}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                  className={` w-full h-full justify-center items-center`}>
                <MotiView
                    from={{opacity: 0.7, scale: 1}}
                    animate={{opacity: 0, scale: 2}}
                    transition={{
                        // type: "timing",
                        duration: 500,
                        loop: true,
                        repeatReverse: false,
                    }}
                    className={'absolute w-[100px] h-[100px] items-center justify-center'}
                >
                    <View className={'bg-white w-[65px] h-[65px] rounded-full justify-center items-center'}>
                        <LoaderIcon className={'!w-[40px] !h-[40px]'} fill={"red"}/>
                    </View>
                </MotiView>
            </View>
        </DefaultModal>
    )
}