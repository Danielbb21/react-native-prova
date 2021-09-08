import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GameInfo = () => {
  return (
    <View style={styles.headerContainer}>
      <Text>teste</Text>
    </View>
  );
};

export default GameInfo;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 100,
    height: 100,
    width: "100%",

    backgroundColor: "red",
  },
});
