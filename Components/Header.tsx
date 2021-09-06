import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "./Logo";
import { colors } from "../utils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const { PRIMARY_COLOR, BORDER_COLOR } = colors;

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.logoWrapper}>
        <Text style={styles.logoText}>TGL</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="logout"
          size={35}
          color="#C1C1C1"
          style={{ marginRight: 35, marginTop: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
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
    width: 78,
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
