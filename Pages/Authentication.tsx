import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Logo from "../Components/Logo";
import SignIn from "../Components/SignIn";
import { colors } from "../utils";
const { BACKGOUND_COLOR } = colors;

const Authentication: React.FC = () => {
    
    
  return (
    <Logo title="Authentication">
      <SignIn />
    </Logo>
  );
};

export default Authentication;
