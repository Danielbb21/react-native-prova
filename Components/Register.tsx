import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../Routes";

import Icon from "react-native-vector-icons/FontAwesome5";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "../utils/index";

const { BORDER_COLOR, PRIMARY_COLOR } = colors;
type authScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const Register = () => {
    const [icon, setIcon] = useState<string>("eye-slash");
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const navigation = useNavigation<authScreenProp>();
    
    const showPasswordHandler = () => {
      icon !== "eye-slash"
        ? (setIcon("eye-slash"), setHidePassword(false))
        : (setIcon("eye"), setHidePassword(true));
    };
  
  return (
    <View style={{ alignItems: "center", justifyContent: "space-between" }}>
      <View style={styles.main}>
        <TextInput
          autoCompleteType="name"
          textAlign="left"
          textContentType="name"
          style={styles.mainInput}
          placeholder="Name"
        ></TextInput>
        <TextInput
          autoCompleteType="email"
          textAlign="left"
          textContentType="emailAddress"
          style={styles.mainInput}
          placeholder="Email"
        ></TextInput>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#DDDDDD",
            borderBottomWidth: 1,
            justifyContent: "space-between",
          }}
        ></View>
         <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Password"
          textContentType="password"
          secureTextEntry={hidePassword} //we pass secure component to identify its password
          style={{
            ...styles.mainInput,
            borderBottomWidth: 0,
            overflow: "hidden",
            maxWidth: "80%",
          }} //give custom styles
        ></TextInput>
        <Icon
          name={icon}
          size={20}
          color="#C1C1C1"
          style={{ padding: 31 }}
          onPress={showPasswordHandler}
        />
      </View>

        <TouchableOpacity style={styles.signInButton}>
          <View style={styles.SignInText}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: BORDER_COLOR,
                  marginRight: 10,
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                Register
              </Text>
              <Icon name="arrow-right" size={25} color={BORDER_COLOR} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInButton} onPress ={() => navigation.navigate('Home')}>
        <View style={styles.SignInText}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="arrow-left" size={25} color={PRIMARY_COLOR} />
            <Text
              style={{
                fontSize: 30,
                color: PRIMARY_COLOR,
                marginLeft: 10,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Back
            </Text>
          </View>
        </View>
      </TouchableOpacity>
   
    </View>
  );
};

export default Register;
const styles = StyleSheet.create({
  main: {
    height: 293,
    width: 306,
    backgroundColor: "#FFFFFF",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 15,
    // shadowOpacity: 0.75,
    // shadowRadius: 5,
    // shadowColor: "red",
    // shadowOffset: { height: 0, width: 0 },
  },
  mainInput: {
    maxWidth: "100%",

    height: 70,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    padding: 26,
    fontSize: 15,
    color: "#9D9D9D",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  forgetText: {
    alignSelf: "flex-end",
    color: "#C1C1C1",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 20,
    marginRight: 30,
  },
  signInButton: {
    height: 100,
    
    width: "100%",
  },
  SignInText: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",

    justifyContent: "center",
  },
});
