import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "./Logo";
import { colors } from "../utils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Routes";
import { useNavigation } from "@react-navigation/core";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { logOut } from "../store/UserSlice";
import { showCartComponent } from "../store/CartShowSlice";
const { PRIMARY_COLOR, BORDER_COLOR } = colors;
type authScreenProp = StackNavigationProp<RootStackParamList>;

const Header = () => {
  const navigation = useNavigation<authScreenProp>();
  const dispatch = useAppDispatch();

  const logUserOut = () => {
    dispatch(logOut());
  };
  const goToMyBetsPage = () => {
    navigation.navigate("teste");
  };

  const showCart = () => {
    dispatch(showCartComponent());
  };
  const showCartButton = useAppSelector((state) => state.showCart.isShow);
  console.log("ShowCartButton", showCartButton);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.logoWrapper} onPress={goToMyBetsPage}>
        <Text style={styles.logoText}>TGL</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        {showCartButton && (
          <TouchableOpacity>
            <Icon
              name="cart-outline"
              size={35}
              color="#B5C401"
              style={{ marginRight: 35, marginTop: 10 }}
              onPress={showCart}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity>
          <Icon
            name="logout"
            size={35}
            color="#C1C1C1"
            style={{ marginRight: 35, marginTop: 10 }}
            onPress={logUserOut}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    zIndex: 81818,
    position: "absolute",
    top: 0,
    width: "100%",
    height: 103,
    flexDirection: "row",
    backgroundColor: "#FEFEFE",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoWrapper: {
    // width: 78,
    height: 50,
    marginLeft: 29,
  },
  logoText: {
    fontSize: 30,

    width: "100%",
    height: "100%",
    fontWeight: "bold",
    fontStyle: "italic",
    color: PRIMARY_COLOR,
    borderBottomWidth: 7,
    paddingBottom: 7,
    borderBottomColor: BORDER_COLOR,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
