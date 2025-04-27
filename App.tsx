import "./gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StyleSheet, Text } from "react-native"
import { Router } from "@/router";
import "@/assets/style/global.css"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SheetProvider } from "react-native-actions-sheet";
import "@/component/actionSheet/index"
import {PaystackProvider} from "react-native-paystack-webview"

export default function App() {

  return (

    <SheetProvider >
      <SafeAreaProvider>
      <PaystackProvider publicKey="pk_test_c9e5c330771a43937800449ed736c73bc647202f" debug={true}>

        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<Text>Loading....</Text>}>
            <GestureHandlerRootView style={styles.container}>
                <Router />
            
            </GestureHandlerRootView>
          </PersistGate>
        </Provider>
        </PaystackProvider>

      </SafeAreaProvider>
    </SheetProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//    "exclude": [
//           "@aws-sdk/client-s3",
//           "redux-logger",
//           "redux-persist"
//         ]
//    "types": ["react-native-dotenv"],

//      [
//         "@config-plugins/react-native-dynamic-app-icon",
//         ["./assets/icon.png", "./assets/icon.png"]
//       ]