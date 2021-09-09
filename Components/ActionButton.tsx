import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
interface ActionButtonProps {
  hei: number;
  wid: number;
  color: string;
  backColor: string;
  icon?: boolean;
  iconName?: string;
  execute?: () => void;
}
const ActionButton: React.FC<ActionButtonProps> = (props) => {
  return (
    <>
      {props.iconName !== undefined ? (
        <TouchableOpacity
          onPress={props.execute}
          style={{
            width: props.wid,
            height: props.hei,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            borderRadius: 5,
            backgroundColor: props.backColor,
            flexDirection: "row",
          }}
        >
          <Icon
            name={props.iconName}
            size={20}
            color="#fff"
            style={{ marginRight: 5 }}
          />
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "#fff" }}>
            {props.children}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={props.execute}
          style={{
            width: props.wid,
            height: props.hei,
            borderWidth: 2,
            borderColor: props.color,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{ fontSize: 13, fontWeight: "bold", color: props.color }}
          >
            {props.children}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  buttonContainer: {},
});
