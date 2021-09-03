import React from "react";
import { View, Text } from "react-native";
import Footer from "../Components/Footer";
import Logo from "../Components/Logo";
import Reset from "../Components/Reset";


const ResetPassword = () => {
  return (
    <>
    <Logo title="Reset password">
      <Reset />
    </Logo>
    <Footer/>
    </>
  );
};

export default ResetPassword;
