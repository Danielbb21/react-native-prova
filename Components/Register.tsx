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
import useForm from "../hooks/use-form";
import Toast from "react-native-toast-message";
import axios from "axios";
import { api } from "../api";

const { BORDER_COLOR, PRIMARY_COLOR } = colors;
type authScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const Register = () => {
  const icon = "eye";
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const navigation = useNavigation<authScreenProp>();
  const [color, setColor] = useState<string>("#C1C1C1");
  const showPasswordHandler = () => {
    color !== "#B5C401"
      ? (setColor("#B5C401"), setHidePassword(false))
      : (setColor("#C1C1C1"), setHidePassword(true));
  };
  const {
    value: enteredEmail,
    changeValueHandler: changeEmailHandler,
    hasError: emailError,
    isValid: emailIsValid,
    cleanField: cleanEmail,
  } = useForm((value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );
  const {
    value: enteredName,
    changeValueHandler: changeNameHandler,
    hasError: nameError,
    isValid: nameIsValid,
    cleanField: cleanName,
  } = useForm((value) => value.trim().length > 0);
  const {
    value: enteredPassword,
    changeValueHandler: changePasswordHandler,
    hasError: passwordError,
    isValid: passwordIsValid,
    cleanField: cleanPassword,
  } = useForm((value) => value.trim().length >= 6);

  const formIsValid = nameIsValid && passwordIsValid && emailIsValid;

  const registerSubmitSubmit = () => {
    if (!formIsValid) {
      if (!emailIsValid) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Email is invalid",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid field(s)",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    api
      .post("/user", {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      })
      .then((response) => {
        
        Toast.show({
          type: "success",
          text1: "Sucess",
          text2: "User Created",
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        cleanPassword();
        cleanEmail();
        cleanName();
        navigation.navigate('Auth');
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "Request failed with status code 400") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "This Email is alredy been in use",
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Sommeting went wrong",
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
      });
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "space-between" }}>
      <View style={styles.main}>
        <TextInput
          value={enteredName}
          onChange={changeNameHandler}
          autoCompleteType="name"
          textAlign="left"
          textContentType="name"
          style={styles.mainInput}
          placeholder="Name"
        ></TextInput>

        <TextInput
          value={enteredEmail}
          onChange={changeEmailHandler}
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
            value={enteredPassword}
            onChange={changePasswordHandler}
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
            color={color}
            style={{ padding: 31 }}
            onPress={showPasswordHandler}
          />
        </View>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={registerSubmitSubmit}
        >
          <View style={styles.SignInText}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30,
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
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate("Auth")}
      >
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
