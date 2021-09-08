import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getGameData } from "../store/GameSlice";
import { useAppDispatch } from "../store/store";
import { useAppSelector } from "../store/store-hooks";
import FilterGameButtons from "./FilterGameButtons";
import GameInfo from "./GameInfo";

const Bet = () => {
  const allGames = useAppSelector((state) => state.game.items);
  const [gameFilters, setGameFilters] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const games = useAppSelector((state) => state.game.items);
  const [filterGame, setFilterGame] = useState<string>("");

  useEffect(() => {
    dispatch(getGameData(token));
    setFilterGame(games[0].type);
  }, [token, dispatch]);

  const setFilterHandler = (type: string) => {
    console.log(type);
    if (filterGame === type) {
      setFilterGame("");
    } else {
      setFilterGame(type);
    }
  };
  return (
    <>
      <View style={{ ...styles.headerContainer, flexDirection: "row" }}>
        {games.map((game) => {
          if (filterGame === game.type) {
            return (
              <FilterGameButtons
                isNewGame={true}
                chose={setFilterHandler.bind(null, game.type)}
                //   chose={() => console.log("teste123")}
                key={game.id}
                color={game.color}
                name={game.type}
                isClicked={true}
              />
            );
          } else {
            return (
              <FilterGameButtons
                isNewGame={true}
                chose={setFilterHandler.bind(null, game.type)}
                //   chose={() => console.log("teste123")}
                key={game.id}
                color={game.color}
                name={game.type}
                isClicked={false}
              />
            );
          }
        })}
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 100 }}>
          <Text style={{ marginTop: 100 }}>tetse</Text>
          <Text style={{ marginTop: 100 }}>tetse</Text>
          <Text style={{ marginTop: 100 }}>tetse</Text>
          <Text style={{ marginTop: 100 }}>tetse</Text>
          <Text style={{ marginTop: 100 }}>tetse</Text>
          <Text style={{ marginTop: 100 }}>tetse</Text>
          <Text style={{ marginTop: 100 }}>tetse</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Bet;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    width: "100%",
    
    marginTop: 100,
    zIndex: 9999,
  },
});
