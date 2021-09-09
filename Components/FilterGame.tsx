import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getGameData } from "../store/GameSlice";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { getUserInfo } from "../store/UserSlice";
import FilterGameButtons from "./FilterGameButtons";
import { colors } from "../utils";
const { PRIMARY_COLOR } = colors;

const FilterGame = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.info);
  const allGames = useAppSelector((state) => state.game.items);
  const [gameFilters, setGameFilters] = useState<string[]>([]);
  
  useEffect(() => {
    dispatch(getGameData(token));

    dispatch(getUserInfo(token));
  }, [token, dispatch]);

  const setFilterHandler = (type: string) => {
    
    const gameFind = gameFilters.find((game) => game === type);
    if (!gameFind) {
      setGameFilters((previus) => {
        const array = [...previus];
        array.push(type);
        return array;
      });
      return;
    }
    setGameFilters((previus) => {
      const array = [...previus];
      return array.filter((element) => element !== type);
    });
  };
  return (
    <View style={{ top: 100, marginLeft: 20 }}>
      <Text
        style={{
          fontSize: 22,
          color: PRIMARY_COLOR,
          alignItems: "center",
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        Recent Games
      </Text>
      <Text style={{ fontSize: 17, fontStyle: "italic", color: "#868686" }}>
        Filters
      </Text>
      <View style={styles.buttons}>
        {allGames.length > 0 &&
          allGames.map((game) => {
            if (gameFilters.find((g) => g === game.type)) {
              return (
                <FilterGameButtons
                  isNewGame={false}
                  chose={setFilterHandler.bind(null, game.type)}
                  key={game.id}
                  color={game.color}
                  name={game.type}
                  isClicked={true}
                />
              );
            }
            return (
              <FilterGameButtons
                isNewGame={false}
                chose={setFilterHandler.bind(null, game.type)}
                key={game.id}
                color={game.color}
                name={game.type}
                isClicked={false}
              />
            );
          })}
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
