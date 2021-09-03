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

const Reset = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "space-between" }}>
      <View style={styles.main}>
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

        <TouchableOpacity style={styles.signInButton}>
          <View style={styles.SignInText}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20
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
                Send link
              </Text>
              <Icon name="arrow-right" size={25} color={BORDER_COLOR} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInButton}>
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
      <TouchableOpacity style={styles.signInButton}>
        <View style={styles.SignInText}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: PRIMARY_COLOR,
                marginRight: 10,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Sign Up
            </Text>
            <Icon name="arrow-right" size={25} color={PRIMARY_COLOR} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Reset;
const styles = StyleSheet.create({
  main: {
    height: 143,
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
