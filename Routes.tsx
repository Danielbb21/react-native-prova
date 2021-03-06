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
import { useAppSelector } from "./store/store-hooks";
import MyBets from "./Pages/MyBets";
import Account from "./Pages/Account";
import NewBet from "./Pages/NewBet";

export type RootStackParamList = {
  Auth: undefined;
  Reset: undefined;
  Registration: undefined;
  teste: undefined;
  MyBets: undefined;
  Home: undefined;
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
  const isLogged = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={Authentication} />
      <Stack.Screen name="Reset" component={ResetPassword} />

      <Stack.Screen name="Registration" component={Registration} />
      {isLogged && <Stack.Screen name="teste" component={T2} />}
      {!isLogged && <Stack.Screen name="Hoem2" component={Authentication} />}
    </Stack.Navigator>
  );
};
const T2 = () => {
  return (
    <Tab.Navigator
      initialRouteName="My-bets"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          let size;
          switch (route.name) {
            case "Home":
              iconName = "home";
              size = 30;
              break;
            case "Account":
              iconName = "user";
              size = 28;
              break;
            case "Game":
              iconName = "edit";
              size = 15;
              return (
                <View
                  style={{
                    height: 93,
                    width: 93,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#B5C300",
                    borderRadius: 50,
                    marginBottom: 5,
                    borderWidth: 5,
                    borderColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,

                    elevation: 11,
                  }}
                >
                  <Image
                    style={{ width: "70%", height: "80%", borderRadius: 5 }}
                    source={require("./assets/newbeticon.png")}
                  />
                </View>
              );
            default:
              iconName = "circle";
              size = 10;
              break;
          }
          if (focused) {
            return (
              <View
                style={{
                  borderTopWidth: 5,
                  paddingTop: 10,
                  borderTopColor: "#B5C401",
                  borderRadius: 2,
                }}
              >
                <Icon name={iconName} size={size} color={"#B5C401"} />
              </View>
            );
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        
        // tabBarLabel: ({focused, color}) =>{
        //   if(focused){
        //     color: 'green'
        //   }
        //   else{
        //     color: 'red'
        //   }
        // },
        tabBarLabelStyle:  {
          fontSize: 20,
          margin: 0,
          padding: 0,
          
          
        },
        tabBarOptions: {
          activeTintColor: "yellow",
          inactiveTintColor: "black",
        },
       
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          backgroundColor: "#FFFFFF",
          height: 71,
          
        },
        
        
      })}
    >
      <Tab.Screen
        name="Home"
        component={MyBets}
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
          tabBarActiveTintColor: '#707070',
          
        }}
      />
      <Tab.Screen
        name="Game"
        component={NewBet}
        options={{ headerShown: false, title: "" }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false, tabBarActiveTintColor: '#707070', }}
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
