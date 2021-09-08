import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
interface NumberProps {
  onChose: () => void;
  backColor?: string;
  isClicked: boolean;
}

interface NumberChosedProps {
  colorGame?: string;
  onRemove?: () => void;
}

const Number: React.FC<NumberProps> = (props) => {
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={props.onChose}>
        {props.isClicked ? (
          <View style={{ ...styles.number, backgroundColor: props.backColor }}>
            <Text style={styles.textNumber}>{props.children}</Text>
          </View>
        ) : (
          <View style={{ ...styles.number, backgroundColor: "#ADC0C4" }}>
            <Text style={styles.textNumber}>{props.children}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export const NumberChosed: React.FC<NumberChosedProps> = (props) => {
  return (
    <View style={styles.numberChosedWrapper}>
      <View style = {{flexDirection: 'row-reverse', backgroundColor: 'red'}}>
        <TouchableOpacity style={styles.numberChosed} onPress={props.onRemove}>
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "#fff" }}>
            {props.children}
          </Text>
          <Icon name="close" style={{ color: "#fff" }} />
        </TouchableOpacity>
      </View>
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
  numberChosedWrapper: {
    // width: "90%",
    flexWrap: "wrap",
    maxHeight: 20,
    flexDirection: 'row'
  },
  numberChosed: {
    width: 40,
    height: 40,
    backgroundColor: "#ADC0C4",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
