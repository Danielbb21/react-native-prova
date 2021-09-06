import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import Authentication from "./Pages/Authentication";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logo from "./Components/Logo";
import ResetPassword from "./Pages/ResetPassword";
import Registration from "./Pages/Registration";
import Icon from "react-native-vector-icons/Feather";
import "./assets/newbeticon.png";

export type RootStackParamList = {
  Home: undefined;
  Reset: undefined;
  Registration: undefined;
  teste: undefined;
};

interface Prop {
  text: string;
}
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeButton: React.FC<Prop> = ({ children, text }) => (
  <TouchableOpacity>
    <View style={{ width: 70, height: 70 }}>
      {children}
      <Text style={{ color: "red" }}>{text}</Text>
    </View>
  </TouchableOpacity>
);
const CustomTabGameIcon: React.FC = ({ children }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      width: 100,
      height: 70,
    }}
  >
    <View style={{ width: 70, height: 70 }}>{children}</View>
  </TouchableOpacity>
);
const Teste: React.FC = ({ children }) => (
  <TouchableOpacity
    style={{
      borderTopColor: "#B5C401",
      borderTopWidth: 5,
      padding: 8,
    }}
  >
    <View>{children}</View>
  </TouchableOpacity>
);
export const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Authentication} />
      <Stack.Screen name="Reset" component={ResetPassword} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="teste" component={T2} />
    </Stack.Navigator>
  );
};
const T2 = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          let size;
          switch (route.name) {
            case "Home":
              iconName = "home";
              size = 28;
              break;
            case "Account":
              iconName = "list";
              size = 28;
              break;
            case "Game":
              iconName = "edit";
              size = 15;
              return <Image source={require("./assets/newbeticon.png")} />;
            default:
              iconName = "circle";
              size = 10;
              break;
          }
          if (focused) {
            return <Icon name={iconName} size={size} color={"#B5C401"} />;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 20,
          margin: 0,
          padding: 0,
        },
        tabBarOptions: {
          activeTintColor: "#000",
          inactiveTintColor: "#fff",
        },
      
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          backgroundColor: "#FFFFFF",
          height: 71,
          borderTopColor: "red",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Logo}
        // options={() => ({
        //   tabBarIcon: ({color,focused,size }) => (
        //     <View>
        //       <linearGradient

        //         style={styles.iconTabRound}
        //         // start={{ x: 0, y: 1 }}
        //         elevation={10}
        //         // colors={["#D500F9", "#4A148C"]}
        //       >
        //         <Icon name="plus" size={26} color="#FFF" />
        //       </linearGradient>
        //     </View>
        //   ),
        // })}
        options={{
          headerShown: false,
          // title: '',
          // tabBarButton: (props) => <HomeButton {...props} text="home" />,
        }}
      />
      <Tab.Screen
        name="Game"
        component={Authentication}
        options={{ headerShown: false, title: "" }}
      />
      <Tab.Screen
        name="Account"
        component={Authentication}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#9C27B0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
export default Routes;
