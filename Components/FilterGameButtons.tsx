import React from "react";
import { View, Text, StyleSheet } from "react-native";
interface ButtonProps{
    color: string;
    name: string;
}
const FilterGameButtons:React.FC<ButtonProps> = (props) => {
  return (
    <View style= {{...styles.buttonWrapper, borderColor: props.color}}>
      <Text style= {{...styles.text, color: props.color}}>{props.name}</Text>
    </View>
  );
};

export default FilterGameButtons;

const styles = StyleSheet.create({
    buttonWrapper:{
        width: 101,
        height: 30,
        borderWidth: 3,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text:{
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',

    }
})