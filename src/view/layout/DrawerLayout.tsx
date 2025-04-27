import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";

export const DrawerLayout = (props: any) => {
    const navigation = useNavigation()
    const tabNavigator = navigation.getState()?.routeNames


  return(
      <View style={styles.container}>
          <StatusBar hidden={true} backgroundColor={"transparent"} />

          <DrawerContentScrollView
              contentContainerStyle={{backgroundColor: "white", marginVertical: 30 }}
              {...props}
          >

              <DrawerItemList {...props} />

          </DrawerContentScrollView>

      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})