import {ScrollView, ScrollViewProps, StyleSheet, View} from "react-native";
import {ContainerLayout, ContainerLayoutProps} from "@/view/layout/ContainerLayout";

export interface ContainerScrollViewLayoutProps extends ContainerLayoutProps{
    scrollViewProps?: ScrollViewProps
}
export const ContainerScrollViewLayout = ({children, className, scrollViewProps,...props}: ContainerScrollViewLayoutProps)=>{

    return (
        <ContainerLayout {...props}>
            {children}
        </ContainerLayout>
    // <ContainerLayout {...props}>
    //     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView} {...scrollViewProps}>
    //         <View className={`flex-1 grow w-full ${className}`}>
    //             {children}
    //         </View>
    //     </ScrollView>
    // </ContainerLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidingView: {flex: 1, justifyContent: 'flex-end'},
    scrollView: {alignItems: 'center', gap: 10, flex: 1},

})