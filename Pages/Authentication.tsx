import { useNavigation } from "@react-navigation/core";
import axios from "axios";

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { api } from "../api";
import Footer from "../Components/Footer";
import Logo from "../Components/Logo";
import SignIn from "../Components/SignIn";
import { colors } from "../utils";
const { BACKGOUND_COLOR } = colors;

const Authentication: React.FC = () => {
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQxLCJpYXQiOjE2MzA5NDgwNTV9.3cPVdDceGkiIcnw_DFib_KQfxNsoZT3aRSG5PPTLa78";

  // useEffect(() => {
  //   api
  //     .get("/user", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log("response", response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <Logo title="Authentication">
        <SignIn />
      </Logo>
      <Footer />
    </>
  );
};

export default Authentication;
