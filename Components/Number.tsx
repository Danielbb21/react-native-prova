import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface NumberProps {
  onChose: () => void;
  backColor?: string;
  isClicked: boolean;
}
const Number: React.FC<NumberProps> = (props) => {
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress = {props.onChose}>
          {props.isClicked ?<View style={{...styles.number, backgroundColor: props.backColor}}>
          <Text style={styles.textNumber}>{props.children}</Text>
        </View>  : <View style={{...styles.number, backgroundColor: '#ADC0C4'}}>
          <Text style={styles.textNumber}>{props.children}</Text>
        </View>}
   
      </TouchableOpacity>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  number: {
    width: 59,
    height: 59,
    // backgroundColor: "#ADC0C4",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textNumber: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
});
