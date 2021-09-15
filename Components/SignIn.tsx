import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../Routes";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "../utils/index";
import useForm from "../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { getUserInfo, login, logUser } from "../store/UserSlice";
import { api } from "../api";
import { getGameData } from "../store/GameSlice";
import useApi from "../hooks/use-api";
import { StatusBar } from "expo-status-bar";
import * as Progress from "react-native-progress";
const { BORDER_COLOR, PRIMARY_COLOR } = colors;
type authScreenProp = StackNavigationProp<RootStackParamList, "Home">;
import { Dimensions, ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";
import Splash from '../assets/splashprova.png';
const SignIn = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            splashAnimation.value,
            [0, 10, 20, 45, 60],
            [520, 520, 100, 100, -1100],
            Extrapolate.CLAMP
          ),
        },
      ],
      width: windowWidth,
      height: windowHeight,
    };
  });

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingImage(false);
    }, 4000);
    splashAnimation.value = withTiming(60, { duration: 5000 });
  }, []);
  const icon = "eye";
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const navigation = useNavigation<authScreenProp>();
  const [color, setColor] = useState<string>("#C1C1C1");
  const showPasswordHandler = () => {
    color !== "#B5C401"
      ? (setColor("#B5C401"), setHidePassword(false))
      : (setColor("#C1C1C1"), setHidePassword(true));
  };
  const { betsData, fetchData, isLoading } = useApi();
  const token = useAppSelector((state) => state.user.token);

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
    value: enteredPassword,
    changeValueHandler: changePasswordHandler,
    hasError: passwordError,
    isValid: passwordIsValid,
    cleanField: cleanPassword,
  } = useForm((value) => value.trim().length >= 6);
  const formIsValid = emailIsValid && passwordIsValid;
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  // const [isLoading, setIsLoadding] = useState<boolean>(false);

  const logInHandler = () => {
    if (!formIsValid) {
      if (!emailIsValid && !passwordIsValid) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid field(s)",
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }
      if (!emailIsValid) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Email is invalid",
          visibilityTime: 1500,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        return;
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password less than 6",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }
    // dispatch(logUser(enteredEmail, enteredPassword));
    // setIsLoadding(true);
    api
      .post("/session", {
        email: enteredEmail,
        password: enteredPassword,
      })
      .then((response) => {
        const token = response.data.token;

        dispatch(login(token));
        console.log("token", token);
        dispatch(getGameData(token));
        fetchData(1, [""], token);
        // setPageChosed(0);
        dispatch(getUserInfo(token));
        if (!isLoading) {
          navigation.navigate("teste");
        }

        return true;
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 400") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Email password combination is wrong",
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
        console.log(err.message);
        return false;
      });

    // setIsLoadding(false);
    // cleanEmail();
    // cleanPassword();
  };

  return (
    <>
      {isLoadingImage && (
        <View
          style={{
            backgroundColor: '#fff',
            opacity: .9,
            zIndex: 10,
            position: "absolute",
          }}
        >
          <Animated.Image
            source={require("../assets/splashprova.png")}
            style={brandStyle}
          />
        </View>
      )}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            zIndex: 11418418,
            opacity: 0.8,
            flex: 1,
            height: "100%",
            width: "100%",
            backgroundColor: "#fff",
            backfaceVisibility: "visible",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Progress.Circle
            size={100}
            indeterminate={true}
            color="#B5C401"
            thickness={2}
          />

          <StatusBar style="auto" />
        </View>
      )}
      <View style={{ alignItems: "center" }}>
        <View style={styles.main}>
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
          >
            <TextInput
              placeholder="Password"
              textContentType="password"
              value={enteredPassword}
              onChange={changePasswordHandler}
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
          <Text
            style={styles.forgetText}
            onPress={() => navigation.navigate("Reset")}
          >
            I forget my password
          </Text>
          <TouchableOpacity style={styles.signInButton} onPress={logInHandler}>
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
                    color: BORDER_COLOR,
                    marginRight: 10,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Log In
                </Text>
                <Icon name="arrow-right" size={25} color={BORDER_COLOR} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("Registration")}
        >
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
    </>
  );
};

export default SignIn;
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
