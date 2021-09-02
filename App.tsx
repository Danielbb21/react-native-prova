import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Authentication from "./Pages/Authentication";
const StyledView = styled.View`
  background-color: papayawhip;
  flex: 1;
  align-items: center;
  justify-content: center;
`
export default function App() {
  return (
    <StyledView>
      <Authentication />
      <StatusBar style="auto" />
    </StyledView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


