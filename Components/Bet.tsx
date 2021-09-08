import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { getGameData } from "../store/GameSlice";
import { useAppDispatch } from "../store/store";
import { useAppSelector } from "../store/store-hooks";
import FilterGameButtons from "./FilterGameButtons";
import GameInfo from "./GameInfo";
import Number from "./Number";
interface Options {
  type: string;
  description: string;
  range: number;
  price: number;
  color: string;
  game_id: string;
  "max-number": number;
}
interface CartOptions {
  id: string;
  price: number;
  numbers: number[];
  type: string;
  game_id: string;
  color: string;
}

interface ParamTypes {
  id: string;
}

const Bet = () => {
  const allGames = useAppSelector((state) => state.game.items);
  const [gameFilters, setGameFilters] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const games = useAppSelector((state) => state.game.items);
  const [filterGame, setFilterGame] = useState<string>("");

  const [gameOptions, setGameOptions] = useState<Options>();
  const [numbersOfTheGame, setNumbersOfTheGame] = useState<number[]>([]);
  const [chosedNumbers, setChosedNumber] = useState<number[]>([]);
  const [cartNumbers, setCartNumber] = useState<CartOptions[]>([]);
  const fillNumbers = (maxNumbers: number, range: number): number[] => {
    var numeros = [];

    while (numeros.length < maxNumbers) {
      var aleatorio = Math.floor(Math.random() * range) + 1;
      if (numeros.indexOf(aleatorio) === -1) numeros.push(aleatorio);
    }
    return numeros;
  };
  const comparaNumeros = (a: number, b: number): number => {
    if (a === b) return 0;
    if (a < b) return -1;
    if (a > b) return 1;
    else return 3;
  };
  const [filter, setFilter] = useState<string>("");

  const pickNumbersOfTheArray = useCallback((range: number) => {
    const arrayOfNumbers = fillNumbers(range, range);
    const sortedArray = arrayOfNumbers.sort(comparaNumeros);

    setNumbersOfTheGame(sortedArray);
  }, []);
  console.log("numbers", numbersOfTheGame);
  useEffect(() => {
    dispatch(getGameData(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (games.length === 0) return;
    let gameOne = games[0];
    setFilter(games[0].type);
    const {
      price,
      color,
      range,
      type,
      id,
      description,
      "max-number": maxNumber,
    } = gameOne;
    setGameOptions({
      price,
      color,
      range,
      type,
      game_id: id,
      description,
      "max-number": maxNumber,
    });
    pickNumbersOfTheArray(range);
  }, [pickNumbersOfTheArray, games, dispatch, token]);

  const setFilterHandler = (typeGame: string) => {
    const gameChosed = games.filter((game) => game.type === typeGame);
    setFilter(gameChosed[0].type);
    if (typeGame !== gameOptions?.type) {
      setChosedNumber([]);
    }
    const {
      price,
      color,
      range,
      type,
      id,
      description,
      "max-number": maxNumber,
    } = gameChosed[0];
    setGameOptions({
      game_id: id,
      price,
      color,
      range,
      type,
      description,
      "max-number": maxNumber,
    });
    pickNumbersOfTheArray(range);
  };
  const isPosibleToChoseTheNumber = (numberToBeChose: number): boolean => {
    const isAlreadyChosed = chosedNumbers.find(
      (num) => num === numberToBeChose
    );
    const isAlreadyIntheLimit =
      chosedNumbers.length === gameOptions?.["max-number"];
    if (isAlreadyChosed) {
      setChosedNumber((previus) =>
        previus.filter((num) => num !== numberToBeChose)
      );
      return false;
    }
    if (isAlreadyIntheLimit) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You already chosed all the numbers",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });

      return false;
    }

    return true;
  };

  console.log("numbers", chosedNumbers);
  const handleChoseNumber = (numberChosed: number) => {
    const isPosibleToChose = isPosibleToChoseTheNumber(numberChosed);

    if (isPosibleToChose) {
      setChosedNumber((previusState) => {
        let newArray = [...previusState];
        newArray.push(numberChosed);
        return newArray;
      });
    }
  };
  return (
    <>
      <View style={{ ...styles.headerContainer, paddingLeft: 20 }}>
        <Text
          style={{
            fontSize: 22,
            color: "#707070",
            fontWeight: "bold",
            fontStyle: "italic",
            textTransform: "uppercase",
            marginBottom: 15,
            marginTop: 25,
          }}
        >
          NEW BET FOR {gameOptions?.type}
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: "#868686",
            fontStyle: "italic",
            marginBottom: 20,
          }}
        >
          Chose a game
        </Text>
        <View style={{ flexDirection: "row" }}>
          {games.map((game) => {
            if (filter === game.type) {
              return (
                <FilterGameButtons
                  isNewGame={true}
                  chose={setFilterHandler.bind(null, game.type)}
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
        <Text
          style={{
            color: "#868686",
            fontSize: 17,
            fontWeight: "bold",
            fontStyle: "italic",
            marginTop: 20,
          }}
        >
          Fill your bet
        </Text>
        <Text
          style={{
            color: "#868686",
            fontSize: 17,
            fontWeight: "bold",
            fontStyle: "italic",
            marginTop: 20,
          }}
        >
          {gameOptions?.description}
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 380,
            marginBottom: 100,
            width: "100%",
            marginLeft: 20,
            marginRight: 30,
            flexDirection: "row",
            flexWrap: "wrap",
            height: "100%",
          }}
        >
          {numbersOfTheGame.map((number) => {
            if (chosedNumbers.find((num) => num === number)) {
              return (
                <Number
                  isClicked={true}
                  backColor={gameOptions?.color}
                  key={Math.random().toString()}
                  onChose={handleChoseNumber.bind(null, number)}
                >
                  {number}
                </Number>
              );
            }

            return (
              <Number
                isClicked={false}
                key={Math.random().toString()}
                onChose={handleChoseNumber.bind(null, number)}
              >
                {number}
              </Number>
            );
          })}
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
    opacity: 0.8,
    marginTop: 100,
    zIndex: 9999,
    backgroundColor: "#F7F7F7",
  },
});
