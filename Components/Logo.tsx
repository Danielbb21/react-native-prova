import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils";
import Input from "./Input";
const { PRIMARY_COLOR, BORDER_COLOR, BACKGOUND_COLOR } = colors;

interface LogoProps {
  title: string;
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>TGL</Text>
      <Text style = {styles.title}>{props.title}</Text> 
    
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  logoText: {
    fontSize: 44,

    width: "20%",
    fontWeight: "bold",
    fontStyle: "italic",
    color: PRIMARY_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 7,
    paddingBottom: 4,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: BACKGOUND_COLOR,
  },
  title:{
      fontSize: 35,
      color: PRIMARY_COLOR,
      fontStyle: 'italic',
      fontWeight: 'bold',
      marginTop: 45
  }
});
export default Logo;
