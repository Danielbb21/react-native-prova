import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getGameData } from "../store/GameSlice";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { getUserInfo } from "../store/UserSlice";
import FilterGameButtons from "./FilterGameButtons";
import { colors } from "../utils";
const {PRIMARY_COLOR} = colors;
const FilterGame = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.info);
  const allGames = useAppSelector((state) => state.game.items);

  useEffect(() => {
    dispatch(getGameData(token));

    dispatch(getUserInfo(token));
  }, []);
  console.log(user);

  return (
    <View style = {{ top: 100,marginLeft: 20}}>
        <Text style = {{fontSize: 22,color: PRIMARY_COLOR, alignItems: 'center', fontWeight: 'bold', fontStyle: 'italic' }}>Recent Games</Text>
        <Text style ={{fontSize: 17, fontStyle: 'italic', color: '#868686'}}>Filters</Text>
      <View style={styles.buttons}>
        {allGames.length > 0 &&
          allGames.map((game) => (
            <FilterGameButtons  key ={game.id} color={game.color} name={game.type} />
          ))}
      </View>
    </View>
  );
};

export default FilterGame;

const styles = StyleSheet.create({
  buttons: {
   
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});
