import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { api } from "../api";
import { hideUpdate } from "../store/ShowUpdate";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { getUserInfo } from "../store/UserSlice";

const UpdateUser = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  const user = useAppSelector((state) => state.user.info);

  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] =
    useState<string>("");
  const emailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
    enteredEmail
  );
  const nameValid = enteredName.trim().length !== 0;
  const passwordValid = enteredPassword.trim().length >= 6;
  const passwordConfirmValid = enteredConfirmPassword.trim().length >= 6;
  const formIsValid =
    nameValid && emailValid && passwordValid && passwordConfirmValid;

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo(token));
      setEnteredName(user.name);
      setEnteredEmail(user.email);
    }
  }, [token, dispatch, user.name, user.email]);
  console.log("email", enteredEmail);
  console.log("email", enteredName);
  const save = () => {
    if (formIsValid) {
      if (enteredConfirmPassword !== enteredPassword) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Password doen´t match",
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }
      api
        .put(
          "/user",
          {
            email: enteredEmail,
            password: enteredPassword,
            password_confirmation: enteredConfirmPassword,
            name: enteredName,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          Toast.show({
            type: "success",
            text1: "Error",
            text2: "Updated information",
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 400") {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Email already in use",
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
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid Field(s)",
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
  return (
    <View style={styles.mainWrapper}>
      <Text style={{ ...styles.textStyle, fontSize: 20 }}>
        Update your data
      </Text>
      <TextInput
        value={enteredName}
        onChange={(event) => setEnteredName(event.nativeEvent.text)}
        autoCompleteType="name"
        textAlign="left"
        textContentType="name"
        style={styles.mainInput}
        placeholder="Name"
      ></TextInput>
      <TextInput
        value={enteredEmail}
        onChange={(event) => setEnteredEmail(event.nativeEvent.text)}
        autoCompleteType="email"
        textAlign="left"
        textContentType="emailAddress"
        style={styles.mainInput}
        placeholder="Email"
      ></TextInput>
      <TextInput
        value={enteredPassword}
        onChange={(event) => setEnteredPassword(event.nativeEvent.text)}
        autoCompleteType="password"
        textAlign="left"
        textContentType="password"
        secureTextEntry={true}
        style={styles.mainInput}
        placeholder="New Password"
      ></TextInput>
      <TextInput
        value={enteredConfirmPassword}
        onChange={(event) => setEnteredConfirmPassword(event.nativeEvent.text)}
        autoCompleteType="password"
        textAlign="left"
        textContentType="password"
        secureTextEntry={true}
        style={styles.mainInput}
        placeholder="Confirm New Password"
      ></TextInput>
      <TouchableOpacity onPress={save} style = {styles.butons}>
        <Text style ={{color: '#fff'}}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(hideUpdate())} style = {styles.butons}>
        <Text style ={{color: '#fff'}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  mainWrapper: {
    height: 480,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "absolute",
    top: 120,
    left: 50,
    borderRadius: 15
  },
  textStyle: {
    fontWeight: "bold",
    fontStyle: "italic",
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
  butons:{
    width: 100,
    marginTop: 15,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01AC66',
    borderRadius: 10
  }
});
