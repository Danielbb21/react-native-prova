import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from 'react-native-toast-message';
import Authentication from "./Pages/Authentication";
import Routes from "./Routes";

export default function App() {
  return (
    
    <>
       <NavigationContainer>
         <Routes />
        </NavigationContainer>
         <Toast ref={(ref) => Toast.setRef(ref)} />
      </>
  );
}



