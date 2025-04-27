import {TouchableOpacity, View} from "react-native";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {ReactNode, useEffect, useState} from "react";
import {useTheme} from "@/libs/useTheme";


export interface BaseTabProps {
    items: {
        label: string,
        active?: boolean,
        component: ReactNode,
        onClick?: ()=> void
    }[],
    initialTab?: number
}
export const BaseTab = ({items, initialTab=0}: BaseTabProps)=>{
    const [activeTab, setActiveTab] = useState<BaseTabProps['items'][0]>()

    const theme = useTheme()

    useEffect(() => {
        const activeTB = items?.find((it)=> it.active)
        if (activeTB){
            setActiveTab(activeTB)
        }else {
            setActiveTab(items?.[initialTab])
        }
    }, []);

    function handleSelectTab(item: BaseTabProps['items'][0]){
        setActiveTab(item)
        // console.log(item)
    }
    return (
        <View className={"flex-1"}>
            <View className={"p-2 rounded-xl mb-4 gap-3 flex-row items-center justify-center h-[40px] bg-gray-200"}>
                {
                    items?.map((it, index)=>{
                        return (
                            <TouchableOpacity onPress={()=> handleSelectTab(it)} key={index} activeOpacity={.5} className={`${activeTab?.label == it.label ? "bg-white rounded" : ""}  h-[34px]  items-center justify-center min-w-[109px] `}>
                                <DefaultTypography className={`${activeTab?.label == it.label ?  "font-sora_semi_bold" : "font-sora_regular"}`} style={{color: activeTab?.label == it.label ? theme.primary : ""}}>{it.label}</DefaultTypography>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View className={"flex-1"}>
                {activeTab && activeTab.component}
            </View>
        </View>
    )
}