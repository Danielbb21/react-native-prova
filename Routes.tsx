import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import Authentication from "./Pages/Authentication";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logo from "./Components/Logo";
import ResetPassword from "./Pages/ResetPassword";

export type RootStackParamList = {
  Home: undefined;
  Reset: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Authentication} />
      <Stack.Screen name="Reset" component={ResetPassword} />
      
    </Stack.Navigator>
  );
};
const T2 = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="teste"
        component={Logo}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
// const Routes = () => {
//   return (
//     <Tab.Navigator  >
//       <Tab.Screen
//         name="Authentication"
//         options={{

//          headerShown: false,
//          tabBarHideOnKeyboard: true
//         }}
//         component={Authentication}
//       />
//     </Tab.Navigator>
//   );
// };

export default Routes;
