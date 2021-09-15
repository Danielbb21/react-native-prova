import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import Splash from "./Components/Splash";
import Authentication from "./Pages/Authentication";
import Routes from "./Routes";
import { store } from "./store/store";

export default function App() {
  return (
    <>
      {/* <Splash /> */}
      <Provider store={store}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
