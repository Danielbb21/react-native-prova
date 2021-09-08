import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
interface ButtonProps {
  color: string;
  name: string;
  isClicked: boolean;
  chose: () => void;
  isNewGame: boolean;
}
const FilterGameButtons: React.FC<ButtonProps> = (props) => {
  console.log(props.isNewGame, props.isClicked);
  if (props.isNewGame) {
    return (
      <TouchableOpacity onPress={props.chose}>
        {props.isClicked ? (
          <View
            style={{
              ...styles.buttonWrapper,
              borderColor: props.color,
              backgroundColor: props.color,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ ...styles.text, color: "#fff" }}>
                {props.name}
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ ...styles.buttonWrapper, borderColor: props.color }}>
            <Text style={{ ...styles.text, color: props.color }}>
              {props.name}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.chose}>
        { props.isClicked ? (
          <View
            style={{
              ...styles.buttonWrapper,
              borderColor: props.color,
              backgroundColor: props.color,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ ...styles.text, color: "#fff" }}>
                {props.name}
              </Text>
              <Icon name="close" style={{ color: "#fff" }} />
            </View>
          </View>
        ) : (
          <View style={{ ...styles.buttonWrapper, borderColor: props.color }}>
            <Text style={{ ...styles.text, color: props.color }}>
              {props.name}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
};

export default FilterGameButtons;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 101,
    height: 30,
    borderWidth: 3,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
