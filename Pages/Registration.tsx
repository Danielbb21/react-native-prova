import React from "react";
import { View, Text } from "react-native";
import Logo from "../Components/Logo";
import Register from "../Components/Register";
import Reset from "../Components/Reset";


const Registration = () => {
  return (
    <Logo title="Registration">
      <Register />
    </Logo>
  );
};

export default Registration;