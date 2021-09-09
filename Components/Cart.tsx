import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Cart = () => {
  return (
    <View style={styles.cartContainer}>
      <TouchableOpacity
        style={{ position: "absolute", top: 10, right: 0 }}
      >
        <Icon name="close" size={30} color="#B5C401" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row", marginTop: 45, marginLeft: 25 }}
      >
        <Icon name="cart-outline" size={30} color="#B5C401" />
        <Text style={{ color: "#707070", fontWeight: "bold", fontSize: 22, marginLeft: 12 }}>
          CART
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartContainer: {
    position: "absolute",
    right: 0,
    top: 15,
    opacity: 1,
    height: "100%",
    width: 265,
    zIndex: 185181,
    backgroundColor: "#FFFFFF",
  },
});
