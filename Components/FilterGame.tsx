import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getGameData } from "../store/GameSlice";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { getUserInfo } from "../store/UserSlice";
import FilterGameButtons from "./FilterGameButtons";
import { colors } from "../utils";
import Number, { NumberChosed } from "./Number";
const { PRIMARY_COLOR } = colors;

interface CartObj {
  maxNumber: number;
  type: string;
  price: string;
  color: string;
  gameNumbers: string;
  date_game: string;
  game_date: string;
  game_id: number;
  user_id: number;
  id: string;
}

const FilterGame = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.info);
  const allGames = useAppSelector((state) => state.game.items);
  const [gameFilters, setGameFilters] = useState<string[]>([]);
  const bets = useAppSelector((state) => state.cart.items);
  const [betGame, setBetGame] = useState(bets);

  useEffect(() => {
    setBetGame(bets);
  } ,[bets])

  useEffect(() => {
    dispatch(getGameData(token));

    dispatch(getUserInfo(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (gameFilters.length > 0) {
      setBetGame([]);
    }

    for (let i = 0; i < gameFilters.length; i++) {
      
      for (let j = 0; j < bets.length; j++) {
        if (bets[j].type === gameFilters[i]) {
          console.log("betSelected", bets[j]);

          setBetGame((previus) => {
            return [...previus, bets[j]];
          });
        }
      }
    }
    if (gameFilters.length === 0) {
      setBetGame(bets);
    }
  }, [gameFilters]);

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
      <View style={{ height: 400 }}>
        <ScrollView>
          {betGame.map((bet) => {
            return (
              <View
                key={Math.random().toString()}
                style={{
                  ...styles.betInfo,
                  borderLeftWidth: 6,
                  borderLeftColor: bet.color,
                }}
              >
                <Text style={{ ...styles.betNumbers }}>
                  {bet.gameNumbers.toString()}
                </Text>
                <View
                  style={{
                    width: "90%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 7,
                  }}
                >
                  <Text
                    style={{
                      color: "#868686",
                      fontSize: 15,
                      fontWeight: "normal",
                    }}
                  >
                    {bet.date_game} - (R$ {bet.price.replace(".", ",")})
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: bet.color,
                  }}
                >
                  {bet.type}
                </Text>
              </View>
            );
          })}
        </ScrollView>
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
  betInfo: {
    paddingLeft: 14,
    marginLeft: 28,
    marginBottom: 25,
    // borderLeft: 4px solid ${(props) => props.borderColor},
    borderRadius: 5,
  },
  betNumbers: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#868686",
    width: '100%',
    flexWrap: "wrap",
  },
});
